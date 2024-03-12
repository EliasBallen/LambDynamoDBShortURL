const AWS  = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION}); // update Region if needed
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        //console.log(event)
        const params = {
            TableName: process.env.TABLE_NAME, 
            Key: {
                'short_url': { S: getShortUrl(event.path) } // particion key
            }
        };
        // Read operations for the url
        const result = await dynamodb.getItem(params).promise();
        
        if (Object.keys(result).length === 0 && result.constructor === Object){
                return {
                    "statusCode": 404, // internal server error
                    "body": JSON.stringify({
                        message: "no results found on your search",
                    }),
                    "headers": {
                        "Content-Type": "application/json"
                    }
                }
        }
        return {
            "statusCode":200,
            "body":JSON.stringify(result.Item),
            "headers":{
              "Content-Type":"application/json"      
            }
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            "statusCode": 500, // internal server error
            "body": JSON.stringify({
                message: "error server has happened",
                error: error.message // error message 
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        };
    }
};

const getShortUrl = (fullpath)=>{
    const arrpath = fullpath.split("/")
    return arrpath[2]
}







