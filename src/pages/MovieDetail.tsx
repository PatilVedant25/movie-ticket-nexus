
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { movies } from '@/data/movies';
import { showtimes } from '@/data/showtimes';
import { theaters } from '@/data/theaters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Star, Calendar as DateIcon, Film, MapPin } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const movie = movies.find(m => m.id === Number(id));
  
  if (!movie) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="mb-8">The movie you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/movies">Browse Movies</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Get unique dates for showtimes
  const availableDates = Array.from(
    new Set(
      showtimes
        .filter(s => s.movieId === movie.id)
        .map(s => s.date)
    )
  ).sort();
  
  // If we have available dates and selected date is not in the list, select the first available date
  useEffect(() => {
    if (availableDates.length > 0 && !availableDates.includes(selectedDate)) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);
  
  // Get all showtimes for this movie and selected date
  const movieShowtimes = showtimes.filter(
    s => s.movieId === movie.id && s.date === selectedDate
  );
  
  // Group showtimes by theater
  const showtimesByTheater = movieShowtimes.reduce((acc, showtime) => {
    const theater = theaters.find(t => t.id === showtime.theaterId);
    if (!theater) return acc;
    
    if (!acc[showtime.theaterId]) {
      acc[showtime.theaterId] = {
        theater,
        showtimes: []
      };
    }
    
    acc[showtime.theaterId].showtimes.push(showtime);
    return acc;
  }, {} as Record<number, { theater: typeof theaters[0], showtimes: typeof showtimes }> );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-48 md:w-64 mx-auto md:mx-0 shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg movie-poster"
            />
          </div>
          
          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
              {movie.rating > 0 && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-movie-secondary fill-movie-secondary mr-1" />
                  <span>{movie.rating}/10</span>
                </div>
              )}
              
              {movie.duration > 0 && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-muted-foreground mr-1" />
                  <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}m</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-muted-foreground mr-1" />
                <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genre.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-muted-foreground mb-6">
              {movie.synopsis}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Director</h3>
                <p>{movie.director}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Cast</h3>
                <p>{movie.cast.join(', ')}</p>
              </div>
            </div>
            
            {movie.status === 'now-showing' && (
              <Button size="lg" asChild>
                <Link to={`/booking/${movie.id}`}>Book Tickets</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Showtimes Section */}
      {movie.status === 'now-showing' && (
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="showtimes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="showtimes" className="gap-2">
                <DateIcon className="h-4 w-4" />
                Showtimes
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <Film className="h-4 w-4" />
                About
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="showtimes">
              <div className="space-y-8">
                {/* Date Selection */}
                {availableDates.length > 0 ? (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Select Date</h3>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {availableDates.map(date => (
                          <Button
                            key={date}
                            variant={selectedDate === date ? 'default' : 'outline'}
                            className="whitespace-nowrap"
                            onClick={() => setSelectedDate(date)}
                          >
                            {formatDate(date)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Theaters and Showtimes */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Available Showtimes</h3>
                      {Object.values(showtimesByTheater).length > 0 ? (
                        <div className="space-y-6">
                          {Object.values(showtimesByTheater).map(({ theater, showtimes }) => (
                            <div key={theater.id} className="p-4 bg-card rounded-lg">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="font-semibold">{theater.name}</h4>
                                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{theater.address}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {showtimes.sort((a, b) => a.time.localeCompare(b.time)).map(showtime => (
                                  <Link 
                                    key={showtime.id}
                                    to={`/booking/${movie.id}/${showtime.id}`} 
                                    className="block"
                                  >
                                    <Button variant="outline" className="whitespace-nowrap">
                                      <span>
                                        {showtime.time} 
                                        {showtime.format !== 'standard' && (
                                          <span className="ml-1 text-movie-primary font-semibold">
                                            • {showtime.format}
                                          </span>
                                        )}
                                      </span>
                                    </Button>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-card rounded-lg">
                          <p className="text-muted-foreground">No showtimes available for the selected date.</p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg">
                    <p className="text-muted-foreground">No showtimes are currently available for this movie.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="about">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Synopsis</h3>
                  <p className="text-muted-foreground">{movie.synopsis}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Cast</h3>
                    <ul className="space-y-2">
                      {movie.cast.map((actor, index) => (
                        <li key={index} className="text-muted-foreground">{actor}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Director</h3>
                    <p className="text-muted-foreground">{movie.director}</p>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Release Date</h3>
                    <p className="text-muted-foreground">
                      {new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-8 mb-4">Genre</h3>
                    <p className="text-muted-foreground">{movie.genre.join(', ')}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Layout>
  );
};

export default MovieDetail;
