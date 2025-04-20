// Mock API service for development
import { BookingData, BookingResponse, GetBookingResponse, GetBookingsResponse } from '@/types/booking';

console.log('Mock API Service initialized');

// Store bookings in memory (will be reset on page refresh)
let mockBookings: BookingData[] = [];

export const mockApi = {
  async createBooking(bookingData: BookingData): Promise<BookingResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Validate required fields
      if (!bookingData.movieId || !bookingData.showtimeId || !bookingData.theaterId || !bookingData.seats || !bookingData.customerInfo) {
        return {
          success: false,
          message: 'Missing required booking information. Please fill in all fields.'
        };
      }

      // Generate a random booking ID
      const bookingId = `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
      
      // Create the booking
      const newBooking = {
        ...bookingData,
        id: bookingId,
        timestamp: new Date().toISOString()
      };

      // Add to mock database
      mockBookings.push(newBooking);

      // Simulate successful booking
      return {
        success: true,
        bookingId,
        message: 'Booking created successfully',
        data: newBooking
      };
    } catch (error) {
      console.error('Mock API Error:', error);
      return {
        success: false,
        message: 'An error occurred while processing your booking. Please try again.'
      };
    }
  },
  
  async getBookings(): Promise<GetBookingsResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      bookings: mockBookings
    };
  },
  
  async getBooking(id: string): Promise<GetBookingResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const booking = mockBookings.find(b => b.id === id);

    if (!booking) {
      return {
        success: false,
        message: 'Booking not found'
      };
    }

    return {
      success: true,
      booking
    };
  }
}; 