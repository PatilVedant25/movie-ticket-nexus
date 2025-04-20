import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Clock, Film, MapPin } from 'lucide-react';

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
  const state = location.state as BookingState;
  
  // If no state is passed, generate a random booking number
  const bookingNumber = state?.bookingId || `MOVTIX-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
          
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Your tickets have been booked successfully. A confirmation email has been sent to your registered email address.
          </p>
          
          <div className="p-4 bg-card rounded-lg mb-8">
            <h2 className="font-medium mb-2">Booking Reference</h2>
            <p className="text-2xl font-mono font-bold">{bookingNumber}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Please show this code at the theater to collect your tickets
            </p>
          </div>
          
          {state && (
            <div className="p-4 bg-card rounded-lg mb-8 text-left">
              <h2 className="font-medium mb-4">Booking Details</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Film className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{state.movieTitle}</h3>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      {new Date(state.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
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
                
                <div className="pt-3 border-t border-border">
                  <h3 className="font-medium mb-2">Selected Seats ({state.seats.length})</h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
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
                
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${state.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-3">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/movies">Browse More Movies</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmation;
