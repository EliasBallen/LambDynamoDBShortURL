

function errorReturn(error,headers){
    return {
        "statusCode": error.statusCode||500, //internal server error
        "body": JSON.stringify({
            message: (error.code === "ConditionalCheckFailedException")?
            "The short url id is already in use":
            (error.message||"server Error"),
        }),
        "headers":headers
    };
}
module.exports = {errorReturn}