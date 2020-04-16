const net = require('net')
const Protocol = require('simple-hypercore-protocol')

const server = net.createServer((c) => {
  const protocol = new Protocol(true, {
    send (data) { // send hook should send data
      c.write(data)
    },
    destroy (err) {
      console.log('native', err)
    }
  })

  c.on('data', data => {
    if (data.toString() === 'request') {
      protocol.request(10, {
        index: 42
      })
      return
    }

    protocol.recv(data)
  })
})

server.on('error', (err) => {
  throw err
})

server.listen(4000, () => {
  console.log('server bound')
})
