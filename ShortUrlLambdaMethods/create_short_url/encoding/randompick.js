//randomly pick 7 characters for the short url
function randompick7(linestring){
    let pickedindex = []
    let randomgenString = ""
    const lengthstring = linestring.length   
    while(pickedindex.length < 7){
        let picked = Math.floor(Math.random()*lengthstring)
        if(pickedindex.includes(picked)){continue}
        pickedindex.push(picked)
        randomgenString += ''+linestring[picked]
    }
    return randomgenString
}
module.exports = {randompick7}