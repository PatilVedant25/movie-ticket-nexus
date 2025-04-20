import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Ticket, Search, Menu, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-movie-dark border-b border-movie-gray">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-movie-primary" />
            <span className="font-bold text-xl">MovieTix</span>
          </Link>
          
          {!isMobile && (
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for movies..."
                  className="pl-8 bg-muted border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          )}
          
          {isMobile ? (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          ) : (
            <nav className="flex items-center gap-6">
              <Link to="/movies" className="text-foreground hover:text-movie-primary transition-colors">
                Movies
              </Link>
              <Link to="/theaters" className="text-foreground hover:text-movie-primary transition-colors">
                Theaters
              </Link>
              <Link to="/coming-soon" className="text-foreground hover:text-movie-primary transition-colors">
                Coming Soon
              </Link>
              <Link to="/sign-in">
                <Button variant="outline" className="gap-2">
                  <User size={16} />
                  <span>Sign In</span>
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 p-4">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Film className="h-6 w-6 text-movie-primary" />
              <span className="font-bold text-xl">MovieTix</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for movies..."
                className="pl-8 bg-muted border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <nav className="flex flex-col gap-4">
            <Link 
              to="/movies" 
              className="text-foreground hover:text-movie-primary transition-colors py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/theaters" 
              className="text-foreground hover:text-movie-primary transition-colors py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Theaters
            </Link>
            <Link 
              to="/coming-soon" 
              className="text-foreground hover:text-movie-primary transition-colors py-2 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Coming Soon
            </Link>
            <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>
              <Button className="gap-2 mt-4 w-full">
                <User size={16} />
                <span>Sign In</span>
              </Button>
            </Link>
          </nav>
        </div>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-movie-dark border-t border-movie-gray py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Film className="h-6 w-6 text-movie-primary" />
                <span className="font-bold text-xl">MovieTix</span>
              </Link>
              <p className="text-muted-foreground">
                Your one-stop destination for movies and tickets.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link to="/movies" className="text-muted-foreground hover:text-movie-primary transition-colors">
                  All Movies
                </Link>
                <Link to="/theaters" className="text-muted-foreground hover:text-movie-primary transition-colors">
                  Theaters
                </Link>
                <Link to="/coming-soon" className="text-muted-foreground hover:text-movie-primary transition-colors">
                  Coming Soon
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <p>support@movietix.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-movie-gray mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MovieTix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
