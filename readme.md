trying crud things


crud-stream

```
'data' event
    {
        type: 'edit',
        data: {...}
    },
    {
        type: 'asyncStart',
        data: { method: 'edit' }
    }

```

---------

crud-actions

```
actions = CrudActions({
    edit: function (cb) {
        process.nextTick(cb);
    })
});

var crudStream = actions.createStream();

actions.edit(cb);
// emits stream data
// calls cb
```

---------

crud-store

```
store = Store();
crudStream.pipe(store);
store(function onChange() {...})
```

---------

```
var actions = Actions(api.assets);
var store = Store();
actions.createStream().pipe(store);
websocket.assets.createStream().pipe(toCrudStream).pipe(store);
var controller = Controller(MyElmt);
store.pipe(controller);
var reactClass = controller.view();  // => react.cc({ 

controller.pipe(actions);
```

