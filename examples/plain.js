/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var express = require('express'),
    status = require('../lib/index.js');

var app = express();

app.use(status());

console.log('Go to: http://127.0.0.1:8000/status.html');
app.listen(8000);
