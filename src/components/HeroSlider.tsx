
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Movie } from '@/data/movies';

interface HeroSliderProps {
  movies: Movie[];
}

const HeroSlider = ({ movies }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!movies.length) return null;
  
  const movie = movies[currentSlide];
  
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            <div className="hidden md:block w-60 shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{movie.title}</h1>
              
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
                  <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div>
                  {movie.genre.slice(0, 3).join(', ')}
                </div>
              </div>
              
              <p className="text-base text-muted-foreground mb-6 line-clamp-3 md:line-clamp-none">
                {movie.synopsis}
              </p>
              
              <div className="flex gap-4">
                {movie.status === 'now-showing' ? (
                  <>
                    <Button asChild>
                      <Link to={`/booking/${movie.id}`}>Book Tickets</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/movie/${movie.id}`}>More Info</Link>
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                    <Link to={`/movie/${movie.id}`}>More Info</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-movie-primary' : 'w-2 bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
