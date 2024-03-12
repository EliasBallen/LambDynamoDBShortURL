  
function decodeURI(url) {
    /*const decodedURL = decodeURIComponent(encodedURL);    
    return decodedURL;*/
  } 
function transformtoUTF8arr(urlstring){
    const decodedURL = decodeURI(urlstring)
    const arrutf8 =  new TextEncoder().encode(decodedURL)
    return arrutf8
}  
module.exports = {transformtoUTF8arr,decodeURI}
