var chars = [
  65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
  77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 90, 50, 51, 52, 53, 54, 55
]

module.exports = encode

function encode (u8a) {
  var i = 0, j = 0
  var l = u8a.length
  var m = quintets(u8a.buffer) * 8
  var code, shift = 0, digit = 0
  var encoded = new Uint8Array(m)

  while (i < l) {
    code = u8a[i]

    if (shift > 3) {
      digit = code & (255 >> shift)
      shift = (shift + 5) % 8
      digit = (digit << shift) |
        (i + 1 < l ? u8a[i + 1] : 0) >>
        (8 - shift)
      i++
    }

    else {
      digit = (code >> (8 - (shift + 5))) & 31
      shift = (shift + 5) % 8
      if (shift === 0) i++
    }

    encoded[j++] = chars[digit]
  }

  while (j < m) encoded[j++] = 61
  return encoded
}

function quintets (buf) {
  var quintets = ~~(buf.byteLength / 5)
  return buf.byteLength % 5 ? quintets + 1 : quintets
}
