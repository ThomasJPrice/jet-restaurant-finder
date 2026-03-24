export interface Restaurant {
  name: string;
  id: string;
  cuisines: { name: string; uniqueName: string }[];
  rating: {
    starRating: number;
    count: number;
  };
  address: {
    firstLine: string;
    city: string;
    postalCode: string;
  }
}

export type ApiResponse = {
  restaurants: Restaurant[]
}