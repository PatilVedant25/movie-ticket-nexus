// Immediate log to verify JavaScript is running
console.log('API Service initialized');
console.log('API_URL:', import.meta.env.VITE_API_URL);

import axios from 'axios';
import { BookingData, BookingResponse, GetBookingResponse, GetBookingsResponse } from '@/types/booking';

const API_URL = import.meta.env.VITE_API_URL || 'YOUR_API_GATEWAY_URL';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add retry logic
apiClient.interceptors.response.use(undefined, async (error) => {
    if (error.config && error.config.__retryCount < 2) {
        error.config.__retryCount = error.config.__retryCount || 0;
        error.config.__retryCount += 1;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return apiClient(error.config);
    }
    return Promise.reject(error);
});

export const api = {
    async createBooking(bookingData: BookingData): Promise<BookingResponse> {
        console.log('Starting booking request...');
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
            
            console.log('Sending request to API...');
            const response = await apiClient.post('', {
                action: 'createBooking',
                data: bookingData
            });
            
            console.log('Response received:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
            });
            
            const result = response.data;
            
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
            
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    return {
                        success: false,
                        message: 'Request timed out. Please try again.'
                    };
                }
                
                if (!error.response) {
                    return {
                        success: false,
                        message: 'Network error. Please check your connection and try again.'
                    };
                }
                
                const status = error.response.status;
                if (status === 404) {
                    return {
                        success: false,
                        message: 'API endpoint not found. Please check your configuration.'
                    };
                }
                
                if (status === 403) {
                    return {
                        success: false,
                        message: 'Access to the API is forbidden. Please check CORS configuration.'
                    };
                }
                
                return {
                    success: false,
                    message: `Server error (${status}): ${error.response.data?.message || error.message}`
                };
            }
            
            return {
                success: false,
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    },

    async getBookings(): Promise<GetBookingsResponse> {
        try {
            const response = await apiClient.post('', {
                action: 'getBookings'
            });
            return response.data;
        } catch (error) {
            console.error('Get Bookings Error:', error);
            throw error;
        }
    },

    async getBooking(id: string): Promise<GetBookingResponse> {
        try {
            const response = await apiClient.post('', {
                action: 'getBooking',
                data: { id }
            });
            return response.data;
        } catch (error) {
            console.error('Get Booking Error:', error);
            throw error;
        }
    }
}; 