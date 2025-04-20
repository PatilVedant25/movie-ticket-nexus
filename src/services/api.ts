// Immediate log to verify JavaScript is running
console.log('API Service initialized');
console.log('API_URL:', import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL || 'YOUR_API_GATEWAY_URL';

export const api = {
    async createBooking(bookingData: any) {
        console.log('Sending booking data:', bookingData);
        console.log('API URL:', API_URL);
        try {
            // Check if API_URL is still the placeholder
            if (API_URL === 'YOUR_API_GATEWAY_URL') {
                console.warn('API_URL is still using the placeholder value. Using mock API instead.');
                return {
                    success: true,
                    bookingId: `BK${Date.now()}${Math.floor(Math.random() * 1000)}`,
                    message: 'Booking created successfully (mock)'
                };
            }
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    action: 'createBooking',
                    data: bookingData
                })
            });
            console.log('Response status:', response.status);
            
            if (response.status === 404) {
                console.error('API endpoint not found. Check your API_URL configuration.');
                return {
                    success: false,
                    message: 'API endpoint not found. Please check your configuration.'
                };
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('API Response:', result);
            
            // Check if the response has a body property (Lambda format)
            if (result.body) {
                try {
                    // Parse the body if it's a string
                    const parsedBody = typeof result.body === 'string' 
                        ? JSON.parse(result.body) 
                        : result.body;
                    
                    // Return a standardized format
                    return {
                        success: true,
                        bookingId: parsedBody.data?.id || parsedBody.id,
                        message: parsedBody.message || 'Booking created successfully'
                    };
                } catch (parseError) {
                    console.error('Error parsing response body:', parseError);
                    throw new Error('Invalid response format from server');
                }
            }
            
            // If no body property, return the result as is
            return {
                success: true,
                bookingId: result.bookingId || result.id,
                message: result.message || 'Booking created successfully'
            };
        } catch (error) {
            console.error('API Error:', error);
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    },

    async getBookings() {
        console.log('Fetching bookings from:', API_URL);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    action: 'getBookings'
                })
            });
            console.log('Get Bookings Response status:', response.status);
            const result = await response.json();
            console.log('Get Bookings Response:', result);
            return result;
        } catch (error) {
            console.error('Get Bookings Error:', error);
            throw error;
        }
    },

    async getBooking(id: string) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    action: 'getBooking',
                    data: { id }
                })
            });
            return response.json();
        } catch (error) {
            console.error('Get Booking Error:', error);
            throw error;
        }
    }
}; 