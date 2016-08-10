var api = require('./api');
var OApi = require('./observable-api');
var noop = function () {};

var api = OApi(api);

var log = console.log.bind(console);
api.on('fetch', log);

api.fetch({}, noop);
