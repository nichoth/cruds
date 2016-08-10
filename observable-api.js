var EE = require('events').EventEmitter;
var inherits = require('util').inherits;

function ObservApi (fns) {
    if ( !(this instanceof ObservApi) ) return new ObservApi(fns);
    this.fns = fns;
    EE.call(this);
}

inherits(ObservApi, EE);

ObservApi.prototype.fetch = callAndEmit('fetch');
ObservApi.prototype.add = callAndEmit('add');
ObservApi.prototype.update = callAndEmit('update');
ObservApi.prototype.delete = callAndEmit('delete');

function callAndEmit (name) {
    return function (opts, cb) {
        var self = this;
        this.fns[name](opts, function onResp (err, res) {
            if (err) {
                self.emit('error', err);
                return cb(err);
            }

            self.emit(name, res);
            cb(null, res);
        });
    }
}

module.exports = ObservApi;
