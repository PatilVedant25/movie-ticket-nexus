
export interface Movie {
  id: number;
  title: string;
  poster: string;
  backdrop: string;
  releaseDate: string;
  duration: number; // in minutes
  genre: string[];
  rating: number; // out of 10
  director: string;
  cast: string[];
  synopsis: string;
  status: 'now-showing' | 'coming-soon';
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1925&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-03-01",
    duration: 166,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    status: "now-showing"
  },
  {
    id: 2,
    title: "The Batman",
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-03-04",
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    rating: 7.9,
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright", "Colin Farrell"],
    synopsis: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    status: "now-showing"
  },
  {
    id: 3,
    title: "Everything Everywhere All at Once",
    poster: "https://images.unsplash.com/photo-1632266484284-a11d9e3a460a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-02-10",
    duration: 139,
    genre: ["Action", "Adventure", "Comedy"],
    rating: 7.8,
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan", "Jamie Lee Curtis"],
    synopsis: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes.",
    status: "now-showing"
  },
  {
    id: 4,
    title: "Oppenheimer",
    poster: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-02-15",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    rating: 8.4,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    status: "now-showing"
  },
  {
    id: 5,
    title: "Barbie",
    poster: "https://images.unsplash.com/photo-1700305772078-5a80dab6e565?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1594844184210-2a08597adfa2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-01-21",
    duration: 114,
    genre: ["Adventure", "Comedy", "Fantasy"],
    rating: 7.0,
    director: "Greta Gerwig",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera", "Kate McKinnon"],
    synopsis: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land.",
    status: "now-showing"
  },
  {
    id: 6,
    title: "Deadpool 3",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1759&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    releaseDate: "2024-07-26",
    duration: 0,
    genre: ["Action", "Adventure", "Comedy"],
    rating: 0,
    director: "Shawn Levy",
    cast: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin", "Morena Baccarin"],
    synopsis: "Wade Wilson teams up with Wolverine for an adventure that will shake the Marvel Cinematic Universe to its core.",
    status: "coming-soon"
  },
  {
    id: 7,
    title: "Gladiator II",
    poster: "https://images.unsplash.com/photo-1491566102020-21838225c3c8?auto=format&fit=crop&q=80&w=1930&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1542566331-1057aa8e686e?auto=format&fit=crop&q=80&w=2077&ixlib=rb-4.0.3",
    releaseDate: "2024-11-22",
    duration: 0,
    genre: ["Action", "Adventure", "Drama"],
    rating: 0,
    director: "Ridley Scott",
    cast: ["Paul Mescal", "Denzel Washington", "Pedro Pascal", "Connie Nielsen"],
    synopsis: "The sequel to the Academy Award-winning 'Gladiator' follows a new hero's rise in ancient Rome.",
    status: "coming-soon"
  },
  {
    id: 8,
    title: "Furiosa: A Mad Max Saga",
    poster: "https://images.unsplash.com/photo-1598548446144-845f3c2100dd?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3",
    backdrop: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2065&ixlib=rb-4.0.3",
    releaseDate: "2024-05-24",
    duration: 0,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 0,
    director: "George Miller",
    cast: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
    synopsis: "The origin story of the powerful warrior Furiosa before she teamed up with Mad Max.",
    status: "coming-soon"
  }
];
