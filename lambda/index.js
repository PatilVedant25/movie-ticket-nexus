const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'MovieTickets';

// CORS headers
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Origin',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Handle OPTIONS requests for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight successful' })
        };
    }
    
    try {
        // Parse the incoming request body
        let body;
        try {
            body = JSON.parse(event.body);
            console.log('Request body:', body);
        } catch (parseError) {
            console.error('Error parsing request body:', parseError);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid request body',
                    error: parseError.message
                })
            };
        }

        const { action, data } = body;
        if (!action) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Missing action parameter'
                })
            };
        }

        let result;
        switch (action) {
            case 'createBooking':
                if (!data) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            success: false,
                            message: 'Missing booking data'
                        })
                    };
                }
                result = await createBooking(data);
                break;
            case 'getBookings':
                result = await getBookings();
                break;
            case 'getBooking':
                if (!data?.id) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({
                            success: false,
                            message: 'Missing booking ID'
                        })
                    };
                }
                result = await getBooking(data.id);
                break;
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ 
                        success: false,
                        message: `Invalid action: ${action}` 
                    })
                };
        }
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                ...result
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false,
                message: 'Internal server error',
                error: error.message 
            })
        };
    }
};

async function createBooking(bookingData) {
    console.log('Creating booking:', bookingData);
    
    // Validate required fields
    const requiredFields = ['movieId', 'showtimeId', 'theaterId', 'seats', 'customerInfo'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    const bookingId = Date.now().toString();
    const params = {
        TableName: TABLE_NAME,
        Item: {
            id: bookingId,
            timestamp: new Date().toISOString(),
            ...bookingData,
            status: 'confirmed'
        }
    };

    try {
        console.log('DynamoDB put params:', params);
        await dynamoDB.put(params).promise();
        console.log('Booking created successfully:', bookingId);
        return {
            message: 'Booking created successfully',
            bookingId: bookingId,
            data: params.Item
        };
    } catch (error) {
        console.error('DynamoDB Error:', error);
        throw new Error(`Failed to create booking: ${error.message}`);
    }
}

async function getBookings() {
    console.log('Fetching all bookings');
    const params = {
        TableName: TABLE_NAME
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        console.log('Fetched bookings:', result.Items.length);
        return {
            bookings: result.Items
        };
    } catch (error) {
        console.error('DynamoDB Error:', error);
        throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
}

async function getBooking(id) {
    console.log('Fetching booking:', id);
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id
        }
    };

    try {
        const result = await dynamoDB.get(params).promise();
        console.log('Fetched booking:', result.Item);
        return {
            booking: result.Item
        };
    } catch (error) {
        console.error('DynamoDB Error:', error);
        throw new Error(`Failed to fetch booking: ${error.message}`);
    }
} 