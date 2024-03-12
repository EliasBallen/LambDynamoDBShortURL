//Base 62 encoding
const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
.split('')

function base62encoder(integer){   
    if (integer === 0) {
        return 0;
      }
      let s = [];
      while (integer > 0) {
        s = [charset[integer % 62], ...s];
        integer = Math.floor(integer / 62);
      }
      return s.join('');
}
function base62decode(chars){
    return chars.split('').reverse().reduce((prev, curr, i) =>
    prev + (charset.indexOf(curr) * (62 ** i)), 0)
}

module.exports = {base62decode,base62encoder}