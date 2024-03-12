const AWS  = require('aws-sdk');
const { generateShortURL } = require('./generateshortURL/generateShortURL.js');
const { validateRequest } = require('./validation/validate.js');
const { dynamoWriteRequest } = require('./dynamoDbRequest/makedbRequest.js');
const { errorReturn } = require('./errorReturn/errorReturn.js');
AWS.config.update({ region: process.env.AWS_REGION}); // update Region if needed
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        //validate Input
        const {longUrl,nowDate,expire_at} = validateRequest(event.body)
        //search for long url if exist  
        const params = {
            TableName: process.env.TABLE_NAME, 
            IndexName: "long_url-index",
            Key: {
                'long_url': { S: longUrl } 
            }
        };
        const preresult = await dynamodb.getItem(params).promise();    

        /************************* */

        //transform to shortUrl if no result is found  
        if (Object.keys(preresult).length === 0 && preresult.constructor === Object){
            const short_url = generateShortURL(longUrl);
            //write the request to the Db
            const result = dynamoWriteRequest(dynamodb,process.env.TABLE_NAME,short_url,longUrl,nowDate,expire_at)  
            console.log("result: ", result);    

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
        }
        else {
            return { //return for succesfull operation.
                "statusCode": 200, 
                "body": JSON.stringify({
                    message: "complete Operation",
                    ...preresult.Item
                }),
                "headers": {
                    "Content-Type": "application/json"
                }
            } 
        }     
    } catch (e) {
        console.log(JSON.stringify(e));
        return errorReturn(e)    
    }
};

