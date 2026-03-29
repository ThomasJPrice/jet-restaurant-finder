export interface APIRestaurant {
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
  restaurants: APIRestaurant[]
}

export type Restaurant = {
  id: string;
  name: string;
  cuisines: { name: string; uniqueName: string }[]
  rating: number;
  ratingCount: number;
  address: string;
}

export type RestaurantError =
  | { type: 'INVALID_POSTCODE'; message: string }
  | { type: 'NOT_FOUND'; message: string }
  | { type: 'API_ERROR'; message: string }

export type RestaurantResult =
  | { ok: true; data: Restaurant[] }
  | { ok: false; error: RestaurantError }
