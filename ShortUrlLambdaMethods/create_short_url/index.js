const AWS  = require('aws-sdk');
const { generateShortURL } = require('/opt/urlDevPackage/generateshortURL/generateShortURL.js');
const { validateRequest } = require('/opt/urlDevPackage/validation/validate.js');
const { dynamoWriteRequest } = require('/opt/urlDevPackage/dynamoDbRequest/makedbRequest.js');
const { errorReturn } = require('/opt/urlDevPackage/errorReturn/errorReturn.js');
AWS.config.update({ region: process.env.AWS_REGION}); // update Region if needed
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
    //validate Input
    const {longUrl,nowDate,expire_at} = validateRequest(event.body)
    //transform to shortUrl   
    const short_url = generateShortURL(longUrl);
    //write the request to the Db
    const result = await dynamoWriteRequest(dynamodb,process.env.TABLE_NAME,short_url,longUrl,nowDate,expire_at)  
    //console.log("result: ", result);    

    return { //return for succesfull operation.
        "statusCode": 200, 
        "body": JSON.stringify({
            message: "complete Operation",
            ...result
        }),
        "headers": {
            "Content-Type": "application/json"
        }
    } ;  
    } catch (e) {
        console.log(JSON.stringify(e));
        return errorReturn(e)    
    }
};

