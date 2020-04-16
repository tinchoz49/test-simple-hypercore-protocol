# simple-hypercore-protocol test

This a test of two nodes (A and B) connection through simple-hypercore-protocol
where we are using sodium-native on node `A` and sodium-javascript-plus on node `B`.

## How to run

Start a server on node A
```
$ node a
```

Connect B to the server A
```
$ node b
```

Expect:

Node B should get a request from A `got request message { index: 42, bytes: 0, hash: false, nodes: 0 } on channel 10`

