const { addseq } = require("../encoding/appendseq")
const { base62encoder } = require("../encoding/encoding")
const { hashText, hashTextToInt } = require("../encoding/hashing")
const { randompick7 } = require("../encoding/randompick")


function generateShortURL(longURL){
    const decodedURL = decodeURI(longURL) //decode if not utf8
    const appendedURL = addseq(decodedURL) //append a seq number to not be predictable
    const md5hash = hashTextToInt(appendedURL) // md5 hash the text, returns hex
    const base62encodedInt = base62encoder(md5hash) //encode in base62 return 22characters string
    const picked7randletters = randompick7(base62encodedInt) // select 7 random characters from the string to create the url
    return picked7randletters
}

/*const encodedURL = "https%3A%2F%2Fmedium.com%2Fdouble-pointer%2F-5-videos-for-web-crawler-system-design-interview-75b7ac9c04ce";
console.log(generateShortURL(encodedURL))*/

module.exports = {generateShortURL}