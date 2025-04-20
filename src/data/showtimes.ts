
export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  date: string;
  time: string;
  price: number;
  format: 'standard' | '3D' | 'IMAX';
}

export const showtimes: Showtime[] = [
  // Dune: Part Two
  {
    id: 1,
    movieId: 1,
    theaterId: 1,
    date: "2024-04-16",
    time: "10:30",
    price: 12.99,
    format: "standard"
  },
  {
    id: 2,
    movieId: 1,
    theaterId: 1,
    date: "2024-04-16",
    time: "13:45",
    price: 12.99,
    format: "standard"
  },
  {
    id: 3,
    movieId: 1,
    theaterId: 1,
    date: "2024-04-16",
    time: "17:15",
    price: 14.99,
    format: "standard"
  },
  {
    id: 4,
    movieId: 1,
    theaterId: 1,
    date: "2024-04-16",
    time: "20:30",
    price: 14.99,
    format: "standard"
  },
  {
    id: 5,
    movieId: 1,
    theaterId: 2,
    date: "2024-04-16",
    time: "11:00",
    price: 18.99,
    format: "IMAX"
  },
  {
    id: 6,
    movieId: 1,
    theaterId: 2,
    date: "2024-04-16",
    time: "14:30",
    price: 18.99,
    format: "IMAX"
  },
  {
    id: 7,
    movieId: 1,
    theaterId: 2,
    date: "2024-04-16",
    time: "18:00",
    price: 20.99,
    format: "IMAX"
  },
  {
    id: 8,
    movieId: 1,
    theaterId: 2,
    date: "2024-04-16",
    time: "21:30",
    price: 20.99,
    format: "IMAX"
  },
  
  // The Batman
  {
    id: 9,
    movieId: 2,
    theaterId: 1,
    date: "2024-04-16",
    time: "11:15",
    price: 12.99,
    format: "standard"
  },
  {
    id: 10,
    movieId: 2,
    theaterId: 1,
    date: "2024-04-16",
    time: "14:30",
    price: 12.99,
    format: "standard"
  },
  {
    id: 11,
    movieId: 2,
    theaterId: 1,
    date: "2024-04-16",
    time: "18:00",
    price: 14.99,
    format: "standard"
  },
  {
    id: 12,
    movieId: 2,
    theaterId: 3,
    date: "2024-04-16",
    time: "10:45",
    price: 12.99,
    format: "standard"
  },
  {
    id: 13,
    movieId: 2,
    theaterId: 3,
    date: "2024-04-16",
    time: "13:30",
    price: 12.99,
    format: "standard"
  },
  {
    id: 14,
    movieId: 2,
    theaterId: 3,
    date: "2024-04-16",
    time: "16:45",
    price: 14.99,
    format: "standard"
  },
  {
    id: 15,
    movieId: 2,
    theaterId: 3,
    date: "2024-04-16",
    time: "20:15",
    price: 14.99,
    format: "standard"
  },
  
  // Everything Everywhere All at Once
  {
    id: 16,
    movieId: 3,
    theaterId: 1,
    date: "2024-04-16",
    time: "12:00",
    price: 12.99,
    format: "standard"
  },
  {
    id: 17,
    movieId: 3,
    theaterId: 1,
    date: "2024-04-16",
    time: "15:15",
    price: 12.99,
    format: "standard"
  },
  {
    id: 18,
    movieId: 3,
    theaterId: 1,
    date: "2024-04-16",
    time: "19:30",
    price: 14.99,
    format: "standard"
  },
  
  // Oppenheimer
  {
    id: 19,
    movieId: 4,
    theaterId: 2,
    date: "2024-04-16",
    time: "10:00",
    price: 18.99,
    format: "IMAX"
  },
  {
    id: 20,
    movieId: 4,
    theaterId: 2,
    date: "2024-04-16",
    time: "14:00",
    price: 18.99,
    format: "IMAX"
  },
  {
    id: 21,
    movieId: 4,
    theaterId: 2,
    date: "2024-04-16",
    time: "19:00",
    price: 20.99,
    format: "IMAX"
  },
  
  // Barbie
  {
    id: 22,
    movieId: 5,
    theaterId: 3,
    date: "2024-04-16",
    time: "11:30",
    price: 12.99,
    format: "standard"
  },
  {
    id: 23,
    movieId: 5,
    theaterId: 3,
    date: "2024-04-16",
    time: "14:45",
    price: 12.99,
    format: "standard"
  },
  {
    id: 24,
    movieId: 5,
    theaterId: 3,
    date: "2024-04-16",
    time: "17:30",
    price: 14.99,
    format: "standard"
  },
  {
    id: 25,
    movieId: 5,
    theaterId: 4,
    date: "2024-04-16",
    time: "12:15",
    price: 12.99,
    format: "standard"
  },
  {
    id: 26,
    movieId: 5,
    theaterId: 4,
    date: "2024-04-16",
    time: "15:30",
    price: 12.99,
    format: "standard"
  },
  {
    id: 27,
    movieId: 5,
    theaterId: 4,
    date: "2024-04-16",
    time: "18:45",
    price: 14.99,
    format: "standard"
  }
];
