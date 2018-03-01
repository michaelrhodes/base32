var bytes = [
  255, 255, 26, 27, 28, 29, 30, 31, 255, 255, 255,
  255, 255, 255, 255, 255, 255, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255,
  255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 255, 255, 255, 255, 255
]

var bl = bytes.length

module.exports = decode

function decode (u8a) {
  var i = 0, j = 0
  var l = u8a.length
  var m = Math.ceil(l * 5 / 8)
  var c, b, shift = 0, digit = 0
  var decoded = new Uint8Array(m)

  for (; i < l; i++) {
    if (u8a[i] === 61) break
    if ((b = u8a[i] - 48) >= bl)
      throw new Error('Invalid input')

    digit = bytes[b]

    if (shift <= 3) {
      shift = (shift + 5) % 8
      if (shift === 0) {
        decoded[j++] = c |= digit
        c = 0
      }
      else {
        c |= 255 & (digit << (8 - shift))
      }
    }
    else {
      shift = (shift + 5) % 8
      decoded[j++] = c |= 255 & (digit >>> shift)
      c = 255 & (digit << (8 - shift))
    }
  }

  return j < m ?
    decoded.slice(0, j) :
    decoded
}
