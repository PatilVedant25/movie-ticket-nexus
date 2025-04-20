import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { movies } from '@/data/movies';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'now-showing' | 'coming-soon'>('all');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [recommendedMovies, setRecommendedMovies] = useState<typeof movies>([]);
  
  // Extract all unique genres from movies
  const allGenres = Array.from(
    new Set(movies.flatMap(movie => movie.genre))
  ).sort();
  
  // Update search term when URL parameter changes
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter movies whenever search, genre, or status filters change
  useEffect(() => {
    const filtered = movies.filter(movie => {
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
                          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filter by selected genres
      const matchesGenres = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => movie.genre.includes(genre));
      
      // Filter by status
      const matchesStatus = filterStatus === 'all' || movie.status === filterStatus;
      
      return matchesSearch && matchesGenres && matchesStatus;
    });

    setFilteredMovies(filtered);

    // Update recommended movies based on filtered results
    if (searchTerm) {
      const searchedMoviesGenres = filtered.flatMap(movie => movie.genre);
      const uniqueSearchedGenres = Array.from(new Set(searchedMoviesGenres));
      
      const recommendations = movies
        .filter(movie => 
          !filtered.includes(movie) && // Not in filtered results
          movie.genre.some(genre => uniqueSearchedGenres.includes(genre)) // Has similar genres
        )
        .slice(0, 5); // Limit to 5 recommendations
      
      setRecommendedMovies(recommendations);
    } else {
      setRecommendedMovies([]);
    }
  }, [searchTerm, selectedGenres, filterStatus]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Movies</h1>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies..."
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={filterStatus === 'all' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilterStatus('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={filterStatus === 'now-showing' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilterStatus('now-showing')}
                      >
                        Now Showing
                      </Button>
                      <Button 
                        variant={filterStatus === 'coming-soon' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setFilterStatus('coming-soon')}
                      >
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Genres</h4>
                    <div className="flex flex-wrap gap-2">
                      {allGenres.map(genre => (
                        <Badge
                          key={genre}
                          variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleGenre(genre)}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            {searchTerm !== '' && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                {filteredMovies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {filteredMovies.map(movie => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">No movies found matching your criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedGenres([]);
                        setFilterStatus('all');
                        setSearchParams({});
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {searchTerm !== '' && recommendedMovies.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {recommendedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}

            {searchTerm === '' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">All Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Movies;
