import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Clock, Film, MapPin } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { BookingData } from '@/types/booking';

interface BookingState {
  bookingId: string;
  movieTitle: string;
  showtime: string;
  date: string;
  theater: string;
  seats: string[];
  totalPrice: number;
}

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingState;
  const [booking, setBooking] = useState<BookingData | null>(null);
  
  useEffect(() => {
    // If no state is passed, redirect to home
    if (!state?.bookingId) {
      navigate('/');
      return;
    }

    // Try to fetch the booking details
    const fetchBooking = async () => {
      try {
        const response = await mockApi.getBooking(state.bookingId);
        if (response.success && response.booking) {
          setBooking(response.booking);
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    fetchBooking();
  }, [state, navigate]);
  
  if (!state) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your tickets have been booked successfully. Please save your booking reference.
          </p>
          
          <div className="p-4 bg-card rounded-lg mb-8">
            <h2 className="font-medium mb-2">Booking Reference</h2>
            <p className="text-2xl font-mono font-bold">{state.bookingId}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Please show this code at the theater to collect your tickets
            </p>
          </div>
          
          <div className="space-y-6 text-left p-6 bg-card rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <Film className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">{state.movieTitle}</h3>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">{state.date}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{state.showtime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">{state.theater}</h3>
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <h3 className="font-medium mb-2">Selected Seats ({state.seats.length})</h3>
              <div className="flex flex-wrap gap-1.5">
                {state.seats.map(seat => (
                  <span 
                    key={seat} 
                    className="inline-block px-2 py-1 bg-muted text-xs rounded"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total Paid</span>
                <span>${state.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-x-4">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmation;
