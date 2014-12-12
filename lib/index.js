/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var url = require('url'),
    timethat = require('timethat');

module.exports = function(config) {
    config = config || {};
    config.url = config.url || '/status.html';
    return function(req, res, next) {
        var respond,
            responseText = config.text || 'OK';
        if (!config.text) {
            if (config.version) {
                responseText += ' - Node: ' + process.version;
            }
            if (config.uptime) {
                responseText += ' - Uptime: ' + timethat.calc((new Date(Date.now() - (process.uptime() * 1000))));
            }
        }
        req.url_parsed = req.url_parsed || url.parse(req.url);
        if (req.url_parsed.pathname === config.url) {
            respond = (config.check) ? config.check(req) : true;
            if (respond) {
                res.writeHead(200, {
                    'Content-Type' : 'text/plain'
                });
                res.end(responseText);
            } else {
                res.writeHead(404, {
                    'Content-Type' : 'text/plain'
                });
                res.end('Not Found');
            }
        } else {
            next();
        }
    };
};
