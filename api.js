var nextTick = process.nextTick.bind(process);
var asyncFn = function (name, opts, cb) {
    nextTick(cb.bind(null, null, { test: name }));
}

module.exports = {
    fetch: asyncFn.bind(null, 'fetch'),
    add: asyncFn.bind(null, 'add'),
    update: asyncFn.bind(null, 'update'),
    delete: asyncFn.bind(null, 'delete')
};
