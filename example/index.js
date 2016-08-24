
var Force = require('..');
var data = require('../data/sample-data.json')[0].data;
var el = document.createElement('div');
document.body.appendChild(el);
var force = new Force(el, data);
