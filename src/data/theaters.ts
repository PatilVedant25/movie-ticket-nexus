
export interface Theater {
  id: number;
  name: string;
  location: string;
  address: string;
}

export const theaters: Theater[] = [
  {
    id: 1,
    name: "Cineplex Grand",
    location: "Downtown",
    address: "123 Main Street, Downtown"
  },
  {
    id: 2,
    name: "MovieMax IMAX",
    location: "Midtown",
    address: "456 Oak Avenue, Midtown"
  },
  {
    id: 3,
    name: "Starplex Cinema",
    location: "Westside Mall",
    address: "789 Pine Road, Westside Mall"
  },
  {
    id: 4,
    name: "Royal Theatres",
    location: "Uptown",
    address: "101 Maple Boulevard, Uptown"
  }
];
