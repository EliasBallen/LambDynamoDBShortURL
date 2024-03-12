

async function dynamoWriteRequest(dynamodb,tableName,short_url,longUrl,nowDate,expire_at){
    const params = {
        TableName: tableName, 
        Item: {
            'short_url': { S: short_url }, // particion key
            'long_url': { S: longUrl },
            'create_at': { N: '' + nowDate },
            'expire_at': { N: '' + expire_at },
        },
        ConditionExpression: "attribute_not_exists(short_url)"   
    };    
    // create short url and save long url    
    const result = await dynamodb.putItem(params).promise().then(()=>params.Item); 
    return result
}
module.exports = {dynamoWriteRequest}