const AWS  = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION}); // Actualiza la región si es necesario
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    try {
        const params = {
            TableName: process.env.TABLE_NAME, // Nombre de la tabla
            Key: {
                'short_url': { S: 'xdaszes' } // Valor de la clave de partición
            }
        };
        // Realiza la operación de lectura de un usuario
        const result = await dynamodb.getItem(params).promise();
        return result.Item;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
//DynamoDB_CRUD_FOR_prefix-lbproj1





