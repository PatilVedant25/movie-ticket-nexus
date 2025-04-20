export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface BookingData {
  id?: string;
  movieId: number;
  showtimeId: number;
  theaterId: number;
  seats: string[];
  customerInfo: CustomerInfo;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  timestamp: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
  data?: any;
}

export interface GetBookingResponse {
  success: boolean;
  booking?: BookingData;
  message?: string;
}

export interface GetBookingsResponse {
  success: boolean;
  bookings: BookingData[];
  message?: string;
} 