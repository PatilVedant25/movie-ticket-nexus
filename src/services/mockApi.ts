// Mock API service for development
console.log('Mock API Service initialized');

// Generate a random booking ID
const generateBookingId = () => {
  return `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

export const mockApi = {
  async createBooking(bookingData: any) {
    console.log('Mock API: Sending booking data:', bookingData);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success response
    return {
      success: true,
      bookingId: generateBookingId(),
      message: 'Booking created successfully'
    };
  },
  
  async getBookings() {
    console.log('Mock API: Fetching bookings');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock bookings
    return {
      success: true,
      bookings: [
        {
          id: 'BK123456789',
          movieId: 1,
          showtimeId: 1,
          theaterId: 1,
          seats: ['A1', 'A2'],
          customerInfo: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890'
          },
          totalPrice: 20,
          status: 'confirmed',
          timestamp: new Date().toISOString()
        }
      ]
    };
  },
  
  async getBooking(id: string) {
    console.log('Mock API: Fetching booking:', id);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock booking
    return {
      success: true,
      booking: {
        id: id,
        movieId: 1,
        showtimeId: 1,
        theaterId: 1,
        seats: ['A1', 'A2'],
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890'
        },
        totalPrice: 20,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      }
    };
  }
}; 