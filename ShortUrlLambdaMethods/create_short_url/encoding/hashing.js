
//MD5 Hashing 
const { createHash } = require('node:crypto');

function hashText(content, algo = 'md5') {
  const hashFunc = createHash(algo);   // you can also sha256, sha512 etc
  hashFunc.update(content);
  return hashFunc.digest('hex');       // will return hash, formatted to HEX
//digest()default for binary
}

function hashTextToInt(content, algo = 'md5'){
    const hextext = hashText(content) //128bits  hex value 
    return parseInt(hextext,16)   //transform to int
}


//const hashed = hashText("https://stackoverflow.com/questions/14733374/how-to-generate-an-md5-hash-from-a-string-in-javascript-node-js")
module.exports = {hashText,hashTextToInt}