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

-----------------------------------------------------

emit events from async function call 

```
// pass in async fns
var actions = CrudEmitter({
    edit: (cb) => process.nextTick(cb)
});

// subscribe to events
actions.on('asyncStart')
actions.on('edit')

actions.onAction((action) => { action has `type` that is fn name });

// async fns are props on the emitter
actions.edit({}, myCb);  // emits 'edit'
```


-----------------------------------------------------


stream events from our api calls

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

-----------------------------------------------------

crud-store stream

```
// describe what to do with events
store = Store({
    edit: (state, ev) => newState
});

// this is how we get events
// 'data' in stream must be like { type: '', data: {} }
crudStream.pipe(store);

// subscribe to changes in store state
store(function onChange() {...})
```

-----------------------------------------------------

crud store subscribe

```
var store = Store({
    'edit': (state, ev) => newState
});

store.subscribe = (ee) => {
    evHash.forEach((fn, name) => ee.on(name, (d) => this.send(name, d)));
}

store.subscribe(ee);
```

-----------------------------------------------------


all together

```
// pass in our api functions
var actions = Actions(api.assets);

var store = CrudStore();

actions.createStream().pipe(store);
websocket.assets.createStream().pipe(toCrudStream).pipe(store);

// subscribe the view to store updates
var controller = Controller(MyElmt);
store.pipe(controller);

var reactClass = controller.view();  // => react.cc({ 

// stream everything? why not
controller.pipe(actions);
```

-----------------------------------------------------

controller
```
var Controller = function (reactClass) {
    var writableStream = ...;

    writableStream.view = function () {
        var View = reactClass;

        return React.createClass({
            componentWillMount: () => {
                // subscribe to updates
                writableStream.on('data', (ev) => this.setState(ev));
            },

            willUnmount: () => { // need to destroy stream },

            render: () => {
                <View {...this.state} {...this.props} />;
            }
        });
    };

    return writableStream;
};

store.pipe(Controller(myElmt))

```



----------------

Different channels to update the same state. No event name collisions this way.

```
model = Model(initState)
subscribeToApi = model({ actions })
subscribeToSocket = model({ otherActions })

model.onChange((data) => ...)

subscribeToApi(apiEventEmitter)
subscribeToSocket(socket)
subscribeToSocket(otherSocket)

subscribeToApi.send('update', {})
```



