
import React from 'react';
import Layout from '@/components/Layout';
import { movies } from '@/data/movies';
import MovieCard from '@/components/MovieCard';

const ComingSoon = () => {
  const comingSoonMovies = movies.filter(movie => movie.status === 'coming-soon');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Coming Soon</h1>
        
        {comingSoonMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {comingSoonMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No upcoming movies scheduled at this time.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ComingSoon;
