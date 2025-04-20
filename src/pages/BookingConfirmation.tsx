
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const BookingConfirmation = () => {
  // In a real app, this would come from the booking process
  const bookingNumber = `MOVTIX-${Math.floor(100000 + Math.random() * 900000)}`;
  
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
