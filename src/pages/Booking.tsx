import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { movies } from '@/data/movies';
import { showtimes } from '@/data/showtimes';
import { theaters } from '@/data/theaters';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Film, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { useToast } from '@/components/ui/use-toast';
import EnvDebug from '@/components/EnvDebug';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, XCircle } from "lucide-react";
import { cn } from '@/lib/utils';

interface SeatType {
  id: string;
  status: 'available' | 'selected' | 'booked';
}

const initialSeatMap = Array(8)
  .fill(null)
  .map((_, rowIndex) => 
    Array(10)
      .fill(null)
      .map((_, colIndex) => {
        const isBooked = Math.random() < 0.2;
        return {
          id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
          status: isBooked ? 'booked' as const : 'available' as const
        };
      })
  );

const Booking = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string, showtimeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [seatMap, setSeatMap] = useState<SeatType[][]>(initialSeatMap);
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
  const [paymentStep, setPaymentStep] = useState<'seat-selection' | 'checkout'>('seat-selection');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<{ row: number; col: number } | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const movie = movies.find(m => m.id === Number(movieId));
  const showtime = showtimeId 
    ? showtimes.find(s => s.id === Number(showtimeId))
    : showtimes.find(s => s.movieId === Number(movieId));
  
  const theater = showtime ? theaters.find(t => t.id === showtime.theaterId) : null;
  
  useEffect(() => {
    if (!movie) {
      navigate('/movies');
    }
  }, [movie, navigate]);
  
  if (!movie || !showtime || !theater) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Information not found</h1>
          <p className="mb-8">The booking information you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <div onClick={() => navigate(-1)}>Go Back</div>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const seat = seatMap[rowIndex][seatIndex];
    
    if (seat.status === 'booked') return;
    
    const newSeatMap = [...seatMap];
    const newSeat = { ...seat };
    
    if (seat.status === 'available') {
      if (selectedSeats.length >= 10) return;
      
      newSeat.status = 'selected';
      setSelectedSeats([...selectedSeats, newSeat]);
    } else {
      newSeat.status = 'available';
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    }
    
    newSeatMap[rowIndex][seatIndex] = newSeat;
    setSeatMap(newSeatMap);
  };
  
  const handleSeatHover = (rowIndex: number, seatIndex: number) => {
    const seat = seatMap[rowIndex][seatIndex];
    if (seat.status === 'available') {
      setHoveredSeat({ row: rowIndex, col: seatIndex });
    }
  };

  const handleSeatLeave = () => {
    setHoveredSeat(null);
  };
  
  const totalPrice = selectedSeats.length * showtime.price;
  
  const handleProceedToCheckout = () => {
    setPaymentStep('checkout');
  };
  
  const handleBack = () => {
    setPaymentStep('seat-selection');
  };
  
  const validateForm = () => {
    const errors: typeof formErrors = {};
    
    if (!customerInfo.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(customerInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };
  
  const clearError = () => setError(null);
  
  const handleComplete = async () => {
    if (!validateForm()) {
      return;
    }
    
    if (!movie || !showtime || !theater) return;
    
    setError(null);
    setIsSubmitting(true);
    try {
      const bookingData = {
        movieId: movie.id,
        showtimeId: showtime.id,
        theaterId: theater.id,
        seats: selectedSeats.map(seat => seat.id),
        customerInfo,
        totalPrice,
        status: 'confirmed' as const,
        timestamp: new Date().toISOString()
      };

      console.log('Sending booking data:', bookingData);
      const response = await mockApi.createBooking(bookingData);
      console.log('Booking response:', response);
      
      if (response.success) {
        toast({
          title: "Booking Successful!",
          description: "Your tickets have been booked successfully.",
          duration: 5000
        });
        navigate('/booking-confirmation', { 
          state: { 
            bookingId: response.bookingId,
            movieTitle: movie.title,
            showtime: showtime.time,
            date: showtime.date,
            theater: theater.name,
            seats: selectedSeats.map(seat => seat.id),
            totalPrice
          }
        });
      } else {
        setError({
          title: "Booking Failed",
          message: response.message || "Failed to create booking"
        });
        toast({
          title: "Booking Failed",
          description: response.message || "Failed to create booking",
          variant: "destructive",
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError({
        title: "Booking Error",
        message: "An unexpected error occurred. Please try again."
      });
      toast({
        title: "Booking Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderError = () => {
    if (!error) return null;
    
    return (
      <Alert variant="destructive" className="mb-6">
        <XCircle className="h-4 w-4" />
        <AlertTitle>{error.title}</AlertTitle>
        <AlertDescription className="mt-2">
          {error.message}
          <Button
            variant="outline"
            size="sm"
            onClick={clearError}
            className="ml-4"
          >
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Ticket Booking</h1>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                paymentStep === 'seat-selection' ? "bg-movie-primary" : "bg-muted"
              )}>
                <span className="text-sm font-medium">1</span>
              </div>
              <span className="text-sm">Select Seats</span>
            </div>
            <div className="flex-1 h-0.5 bg-muted mx-4" />
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                paymentStep === 'checkout' ? "bg-movie-primary" : "bg-muted"
              )}>
                <span className="text-sm font-medium">2</span>
              </div>
              <span className="text-sm">Payment</span>
            </div>
          </div>
        </div>
        
        {renderError()}
        
        {process.env.NODE_ENV === 'development' && <EnvDebug />}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {paymentStep === 'seat-selection' ? (
              <div className="space-y-8">
                <div className="flex flex-col-reverse md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">Select Seats</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Select up to 10 seats. Click on a seat to select/deselect it.
                    </p>
                    
                    <div className="w-full max-w-xl mx-auto">
                      <div className="relative mb-8">
                        <div className="h-2 bg-movie-primary rounded-md w-full"></div>
                        <p className="text-center text-xs text-muted-foreground mt-2">SCREEN</p>
                      </div>
                      
                      <div className="space-y-3">
                        {seatMap.map((row, rowIndex) => (
                          <div key={rowIndex} className="flex items-center">
                            <div className="w-6 text-center text-sm font-medium">
                              {String.fromCharCode(65 + rowIndex)}
                            </div>
                            <div className="flex-1 grid grid-cols-10 gap-1.5">
                              {row.map((seat, seatIndex) => (
                                <button
                                  key={seatIndex}
                                  className={cn(
                                    "seat w-6 h-6 rounded-t-md text-xs font-medium flex items-center justify-center transition-all duration-200",
                                    seat.status === 'available' && "bg-muted-foreground/30 hover:bg-muted-foreground/50 available hover:scale-110",
                                    seat.status === 'selected' && "bg-movie-primary selected",
                                    seat.status === 'booked' && "bg-muted-foreground/80 opacity-50 booked",
                                    hoveredSeat?.row === rowIndex && hoveredSeat?.col === seatIndex && "ring-2 ring-movie-primary ring-offset-2"
                                  )}
                                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                                  onMouseEnter={() => handleSeatHover(rowIndex, seatIndex)}
                                  onMouseLeave={handleSeatLeave}
                                  disabled={seat.status === 'booked'}
                                >
                                  {seatIndex + 1}
                                </button>
                              ))}
                            </div>
                            <div className="w-6 text-center text-sm font-medium">
                              {String.fromCharCode(65 + rowIndex)}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Seat Preview */}
                      {hoveredSeat && (
                        <div className="mt-4 p-3 bg-card rounded-lg border border-border">
                          <div className="flex items-center gap-2">
                            <div className="seat w-4 h-4 rounded-t-md bg-muted-foreground/30"></div>
                            <span className="text-sm">
                              Seat {String.fromCharCode(65 + hoveredSeat.row)}{hoveredSeat.col + 1}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Click to select this seat
                          </p>
                        </div>
                      )}
                      
                      <div className="flex justify-center gap-6 mt-8">
                        <div className="flex items-center gap-2">
                          <div className="seat w-4 h-4 rounded-t-md bg-muted-foreground/30"></div>
                          <span className="text-xs">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="seat w-4 h-4 rounded-t-md bg-movie-primary"></div>
                          <span className="text-xs">Selected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="seat w-4 h-4 rounded-t-md bg-muted-foreground/80 opacity-50"></div>
                          <span className="text-xs">Booked</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="p-6 bg-card rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={cn(
                            formErrors.name && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                        {formErrors.name && (
                          <p className="text-sm text-destructive">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className={cn(
                            formErrors.email && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                        {formErrors.email && (
                          <p className="text-sm text-destructive">{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className={cn(
                          formErrors.phone && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <h3 className="font-semibold mb-3">Card Information</h3>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <Input 
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              className="pr-10"
                            />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv"
                              placeholder="000"
                              type="password"
                              maxLength={4}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="sticky top-4 p-6 bg-card rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Film className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{movie.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {movie.duration > 0 ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : 'TBA'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      {new Date(showtime.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{showtime.time} ({showtime.format})</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-movie-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{theater.name}</h3>
                    <p className="text-sm text-muted-foreground">{theater.address}</p>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4">
                  <h3 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h3>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {selectedSeats.map(seat => (
                        <span 
                          key={seat.id} 
                          className="inline-block px-2 py-1 bg-muted text-xs rounded"
                        >
                          {seat.id}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mb-2">No seats selected</p>
                  )}
                </div>
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Ticket Price (x{selectedSeats.length})</span>
                    <span>${showtime.price.toFixed(2)} each</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  {paymentStep === 'seat-selection' ? (
                    <Button 
                      className="w-full" 
                      disabled={selectedSeats.length === 0}
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button 
                        className="w-full"
                        onClick={handleComplete}
                        disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : 'Complete Payment'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        Back to Seat Selection
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
