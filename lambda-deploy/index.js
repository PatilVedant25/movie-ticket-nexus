const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'MovieTickets';

exports.handler = async (event) => {
    try {
        // Parse the incoming request body
        const body = JSON.parse(event.body);
        const { action, data } = body;

        switch (action) {
            case 'createBooking':
                return await createBooking(data);
            case 'getBookings':
                return await getBookings();
            case 'getBooking':
                return await getBooking(data.id);
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Invalid action' })
                };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};

async function createBooking(bookingData) {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...bookingData
        }
    };

    await dynamoDB.put(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Booking created successfully', data: params.Item })
    };
}

async function getBookings() {
    const params = {
        TableName: TABLE_NAME
    };

    const result = await dynamoDB.scan(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
}

async function getBooking(id) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    const result = await dynamoDB.get(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
} 