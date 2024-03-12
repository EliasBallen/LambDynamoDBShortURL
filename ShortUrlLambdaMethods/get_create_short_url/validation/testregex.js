const regex = /^(https?:\/\/)?([\w#-]{2,}\.)?([\w#-]+\.[\w#-]+)(\/[\w#-]+)*(\/|(\.[A-Za-z]+))?$/

function regextest(url){
    if(!regex.test(url)){
        throw new Error("invalid url");
    }
    return url;
}

module.exports = {regextest}