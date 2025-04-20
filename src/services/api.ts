// Immediate log to verify JavaScript is running
console.log('API Service initialized');
console.log('API_URL:', import.meta.env.VITE_API_URL);

import { BookingData, BookingResponse, GetBookingResponse, GetBookingsResponse } from '@/types/booking';

const API_URL = import.meta.env.VITE_API_URL || 'YOUR_API_GATEWAY_URL';

export const api = {
    async createBooking(bookingData: BookingData): Promise<BookingResponse> {
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
            
            // Validate booking data before sending
            if (!bookingData.movieId || !bookingData.showtimeId || !bookingData.theaterId || !bookingData.seats || !bookingData.customerInfo) {
                throw new Error('Missing required booking data fields');
            }
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': window.location.origin
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

            if (response.status === 403) {
                console.error('Access forbidden. CORS might not be configured correctly.');
                return {
                    success: false,
                    message: 'Access to the API is forbidden. Please check CORS configuration.'
                };
            }
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error! Status: ${response.status}, Body:`, errorText);
                throw new Error(`API request failed: ${response.status} - ${errorText || 'No error details available'}`);
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
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                return {
                    success: false,
                    message: 'Unable to connect to the server. Please check your internet connection and try again.'
                };
            }
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    },

    async getBookings(): Promise<GetBookingsResponse> {
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

    async getBooking(id: string): Promise<GetBookingResponse> {
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