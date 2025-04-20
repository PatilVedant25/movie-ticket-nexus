
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { type Movie } from '@/data/movies';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className={cn("group block", className)}>
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="movie-poster w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {movie.status === 'coming-soon' && (
          <div className="absolute top-2 right-2 bg-movie-primary text-white text-xs font-semibold px-2 py-1 rounded">
            Coming Soon
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white font-semibold truncate">{movie.title}</h3>
          {movie.rating > 0 && (
            <div className="flex items-center mt-1">
              <Star className="h-3.5 w-3.5 text-movie-secondary fill-movie-secondary mr-1" />
              <span className="text-white text-sm">{movie.rating}/10</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-muted-foreground">
          {movie.genre.slice(0, 3).join(', ')}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
