# base32

A reworking of [chrisumbel/thirty-two](https://github.com/chrisumbel/thirty-two) that eschews [feross/buffer](https://github.com/feross/buffer). As a result it’s tiny, and decodes significantly faster in browsers.

[![build status](https://travis-ci.org/michaelrhodes/base32.svg?branch=master)](https://travis-ci.org/michaelrhodes/base32)

## install
```sh
pnpm install michaelrhodes/base32#1.0.0
```

## use
```js
var encode = require('base32/encode')
var decode = require('base32/decode')
var u8a = require('u8a/from-string')
var str = require('u8a/to-string')

str(encode(u8a('bee')))
> 'MJSWK==='
```

## obey
[MIT](https://opensource.org/licenses/MIT)
