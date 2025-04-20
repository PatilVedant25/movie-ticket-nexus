
import React from 'react';
import Layout from '@/components/Layout';
import { theaters } from '@/data/theaters';
import { showtimes } from '@/data/showtimes';
import { movies } from '@/data/movies';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Film } from 'lucide-react';

const Theaters = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get all showtimes for today
  const todaysShowtimes = showtimes.filter(showtime => showtime.date === today);
  
  // Group showtimes by theater
  const theaterWithShowtimes = theaters.map(theater => {
    const theaterShowtimes = todaysShowtimes.filter(showtime => showtime.theaterId === theater.id);
    
    // Group showtimes by movie
    const movieShowtimes = theaterShowtimes.reduce((acc, showtime) => {
      const movie = movies.find(m => m.id === showtime.movieId);
      if (!movie) return acc;
      
      if (!acc[movie.id]) {
        acc[movie.id] = {
          movie,
          showtimes: []
        };
      }
      
      acc[movie.id].showtimes.push(showtime);
      return acc;
    }, {} as Record<number, { movie: typeof movies[0], showtimes: typeof showtimes }> );
    
    return {
      theater,
      movies: Object.values(movieShowtimes)
    };
  });
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Theaters</h1>
        
        <div className="space-y-8">
          {theaterWithShowtimes.map(({ theater, movies }) => (
            <div key={theater.id} className="p-6 bg-card rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{theater.name}</h2>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{theater.address}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Directions</span>
                  </Button>
                </div>
              </div>
              
              {movies.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Today's Showtimes</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {movies.map(({ movie, showtimes }) => (
                      <div key={movie.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:block w-16 h-24 bg-muted overflow-hidden rounded">
                            <img 
                              src={movie.poster} 
                              alt={movie.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                              <div>
                                <Link to={`/movie/${movie.id}`} className="font-semibold hover:text-movie-primary transition-colors">
                                  {movie.title}
                                </Link>
                                <div className="flex items-center gap-x-4 text-xs text-muted-foreground mt-1">
                                  <span>{movie.duration > 0 ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : 'TBA'}</span>
                                  <span>{movie.genre.slice(0, 3).join(', ')}</span>
                                </div>
                              </div>
                              
                              <Link to={`/movie/${movie.id}`}>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Film className="h-4 w-4" />
                                  <span>Movie Details</span>
                                </Button>
                              </Link>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {showtimes
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .map(showtime => (
                                  <Link 
                                    key={showtime.id} 
                                    to={`/booking/${movie.id}/${showtime.id}`}
                                  >
                                    <Button variant="outline" size="sm" className="whitespace-nowrap">
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
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 bg-muted rounded-lg">
                  <p className="text-muted-foreground">No showtimes available for today at this theater.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Theaters;
