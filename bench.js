var Benchmark = require('benchmark')
var u8a = require('u8a/from-string')
var t32 = require('thirty-two')
var b32 = require('./')

if (typeof window !== 'undefined')
  window.Benchmark = Benchmark

var str = 'there can be only one'
var tei = Buffer.from(str)
var bei = u8a(str)
var tdi = t32.encode(tei)
var bdi = b32.encode(tei)

Benchmark.Suite()
  .add('encode (thirty-two)', function () {
    t32.encode(tei)
  })
  .add('encode (base32)', function () {
    b32.encode(bei)
  })
  .add('decode (thirty-two)', function () {
    t32.decode(tdi)
  })
  .add('decode (base32)', function () {
    b32.decode(bdi)
  })
  .on('error', error)
  .on('cycle', cycle)
  .run()

function error (e) {
  console.error(e.target.error.stack)
}

function cycle (e) {
  console.log(String(e.target))
}
