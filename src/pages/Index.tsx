
import React from 'react';
import Layout from '@/components/Layout';
import HeroSlider from '@/components/HeroSlider';
import MovieCarousel from '@/components/MovieCarousel';
import { movies } from '@/data/movies';

const Index = () => {
  const featuredMovies = movies.filter(movie => movie.status === 'now-showing').slice(0, 5);
  const nowShowingMovies = movies.filter(movie => movie.status === 'now-showing');
  const comingSoonMovies = movies.filter(movie => movie.status === 'coming-soon');
  
  return (
    <Layout>
      <HeroSlider movies={featuredMovies} />
      
      <div className="container mx-auto px-4 py-12 space-y-12">
        <MovieCarousel title="Now Showing" movies={nowShowingMovies} />
        <MovieCarousel title="Coming Soon" movies={comingSoonMovies} />
      </div>
    </Layout>
  );
};

export default Index;
