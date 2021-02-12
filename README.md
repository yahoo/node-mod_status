# ARCHIVED


mod_status for Node
===================

Simple express/connect middleware to provide an "apache-like" `/status.html` page.

Installation
------------

`npm install mod_status`

Usage
-----

```javascript
var express = require('express'),
    status = require('../lib/index.js');

var app = express();

app.use(status({
    url: '/status',
    version: true,
    uptime: true,
    check: function(req) {
        if (req.something == false) {
            return false; //Don't show status
        }
        return true; //Show status
    }
}));

console.log('Go to: http://127.0.0.1:8000/status');
app.listen(8000);
```

Configuration
-------------

   * `url` - The URL to respond to, defaults to `/status.html` 
   * `version` - Show the Node.js version in the output. Default: `false`
   * `uptime` - Show the uptime of the process in the output: Default: `false`
   * `text` - Provide custom response text, will override all the above. Default: `null`
   * `check` - A function to check the request to see if the status page should be shown. Default: `returns true to always show`

Example Output
--------------

   * `OK` - Default
   * `OK - NodeJS: v0.10.17` - From `version: true`
   * `OK - Uptime: 2 days, 3 hours, 4 minutes` - From `uptime: true`
   * `OK - NodeJSL v0.10.17 - Uptime: 2 days, 3 hours, 4 minutes` - From `uptime: true & version: true`
   * `WORKS` - From `text: 'WORKS'`

Build Status
------------

[![Build Status](https://secure.travis-ci.org/yahoo/node-mod_status.png?branch=master)](http://travis-ci.org/yahoo/node-mod_status)

Node Badge
----------

[![NPM](https://nodei.co/npm/mod_status.png)](https://nodei.co/npm/mod_status/)

