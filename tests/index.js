var vows = require('vows'),
    assert = require('assert'),
    mod_status = require('../lib/index.js');

var tests = {
    'loading': {
        topic: function() {
            return mod_status;
        },
        'should be a function': function(topic) {
            assert.isFunction(topic);
        },
        'and should return': {
            topic: function() {
                return mod_status();
            },
            'a function': function(topic) {
                assert.isFunction(topic);
            }
        }
    },
    'should go to next by default': {
        topic: function() {
            var fn = mod_status(),
                next = false;

            fn({
                url: '/foo'
            }, {}, function() {
                next = true;
            });
            
            return next;
        },
        'should be true': function(topic) {
            assert.isTrue(topic);
        }
    },
    'should send good response': {
        topic: function() {
            var fn = mod_status(),
                code = null,
                next = false,
                text = null,
                req = {
                    url: '/status.html'
                };

            fn(req, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next,
                parsedUrl : req.parsedUrl
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should be OK': function(topic) {
            assert.equal(topic.text, 'OK');
        },
        'code should be 200': function(topic) {
            assert.equal(topic.code, 200);
        },
        'request should be stamped with parse_url': function(topic) {
            assert.isObject(topic.parsedUrl);
        }
    },
    'should send bad response': {
        topic: function() {
            var fn = mod_status({
                    check: function() { return false; }
                }),
                code = null,
                next = false,
                text = null;

            fn({
                url: '/status.html'
            }, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should be Not Found': function(topic) {
            assert.equal(topic.text, 'Not Found');
        },
        'code should be 404': function(topic) {
            assert.equal(topic.code, 404);
        }
    },
    'should send good response with node version': {
        topic: function() {
            var fn = mod_status({
                version: true
            }),
                code = null,
                next = false,
                text = null;

            fn({
                url: '/status.html'
            }, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should be OK - Node: VERSION': function(topic) {
            assert.equal(topic.text, 'OK - Node: ' + process.version);
        },
        'code should be 200': function(topic) {
            assert.equal(topic.code, 200);
        }
    },
    'should send good response with uptime': {
        topic: function() {
            var fn = mod_status({
                uptime: true
            }),
                code = null,
                next = false,
                text = null;

            fn({
                url: '/status.html'
            }, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should contain Uptime info': function(topic) {
            assert.ok(/- Uptime: /.test(topic.text));
        },
        'code should be 200': function(topic) {
            assert.equal(topic.code, 200);
        }
    },
    'should send good response with custom text': {
        topic: function() {
            var fn = mod_status({
                text: 'THIS STUFFS WORKS',
                uptime: true
            }),
                code = null,
                next = false,
                text = null;

            fn({
                url: '/status.html'
            }, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should not contain Uptime info': function(topic) {
            assert.isFalse(/- Uptime: /.test(topic.text));
        },
        'data should contain custom text': function(topic) {
            assert.equal(topic.text, 'THIS STUFFS WORKS');
        },
        'code should be 200': function(topic) {
            assert.equal(topic.code, 200);
        }
    },
    'should use parsedUrl if its already there': {
        topic: function() {
            var fn = mod_status(),
                code = null,
                next = false,
                text = null,
                req = {
                    url: '/foo',
                    parsedUrl : {
                        pathname : '/status.html'
                    }
                };

            fn(req, {
                writeHead: function(c) {
                    code = c;
                },
                end: function(d) {
                    text = d;
                }
            }, function() {
                next = true;
            });
            
            return {
                code: code,
                text: text,
                next: next
            };
        },
        'next should be false': function(topic) {
            assert.isFalse(topic.next);
        },
        'data should be OK': function(topic) {
            assert.equal(topic.text, 'OK');
        },
        'code should be 200': function(topic) {
            assert.equal(topic.code, 200);
        }
    }
    
};


vows.describe('mod_status').addBatch(tests)['export'](module);
