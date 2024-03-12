const AWS = require('aws-sdk');

// Configurar las credenciales y la región de AWS
AWS.config.update({ region: process.env.AWS_REGION}); // por ejemplo, 'us-east-1'

// Crear un nuevo cliente de DynamoDB
const dynamodb = new AWS.DynamoDB();

// Función principal de la Lambda
exports.handler = async (event, context) => {
    try {
        // Obtener la fecha y hora actual en formato UNIX timestamp
        const currentTimestamp = Math.floor(new Date() / 1000);
        const params = {
            TableName: process.env.TABLE_NAME,
            IndexName: 'expire_at-index', // Nombre de tu GSI si lo tienes
            KeyConditionExpression: 'Exp_date < :currentDate', // Filtra los elementos cuya fecha de expiración sea menor que la fecha actual
            ExpressionAttributeValues: {
                ':currentDate': { N: currentTimestamp.toString() } 
            }
        };
        const data = await dynamodb.query(params).promise();
        // Preparar los elementos para la operación batchWriteItem
        const deleteRequests = data.Items.map(item => ({
            DeleteRequest: {
                Key: {
                    'short_url': item.short_url // Usa el Id del elemento para identificarlo en la tabla
                }
            }
        }));

        // Preparar el formato de los elementos para batchWriteItem
        const paramsBatchWrite = {
            RequestItems: {
                [process.env.TABLE_NAME]: deleteRequests // Especifica el nombre de la tabla y los elementos a eliminar
            }
        };
        // Realizar la operación batchWriteItem para eliminar los elementos
        await dynamodb.batchWriteItem(paramsBatchWrite).promise();
        
        return { statusCode: 200, body: 'Proceso de limpieza completado exitosamente.' };
    } catch (error) {
        console.error('Error en la función Lambda:', error);
        return { statusCode: 500, body: 'Error al procesar la solicitud.' };
    }
};
