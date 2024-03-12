const {testDate} = require("./testdate.js")
const { regextest } = require('./testregex.js');

function validateRequest(body){
    const jsBody = JSON.parse(body);    
    const longUrl = regextest(jsBody.long_Url);  
    const nowDate = Math.floor(Date.now()/1000);
    var expire_at =  Math.floor(Number(jsBody.expire_at)/1000);
    if (!testDate(expire_at, nowDate)){
        expire_at = nowDate+(5*3.154e+7);
    }
    return {longUrl,nowDate,expire_at}
}

module.exports = {validateRequest}