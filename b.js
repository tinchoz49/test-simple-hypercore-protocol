const net = require('net')
const proxyquire = require('proxyquire').noCallThru()
const sodium = require('@geut/sodium-javascript-plus')
sodium['@global'] = true

// const Protocol = require('simple-hypercore-protocol')
const Protocol = proxyquire('simple-hypercore-protocol', { 'sodium-native': sodium, 'sodium-universal': sodium })

const socket = net.connect(4000)

const protocol = new Protocol(false, {
  onrequest (channel, message) {
    console.log('got request message', message, 'on channel', channel)
  },
  send (data) {
    socket.write(data)
  },
  destroy (err) {
    console.log('plus', err)
  }
})

socket.on('data', data => {
  protocol.recv(data)
})

socket.write('request')
