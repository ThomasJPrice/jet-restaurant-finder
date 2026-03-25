import { ApiResponse, APIRestaurant, Restaurant } from "@/types/restaurant"

export function mapRestaurant(restaurant: APIRestaurant): Restaurant {
  return {
    id: restaurant.id,
    name: restaurant.name,
    cuisines: restaurant.cuisines,
    rating: restaurant.rating.starRating,
    ratingCount: restaurant.rating.count,
    address: `${restaurant.address.firstLine}, ${restaurant.address.city}, ${restaurant.address.postalCode}`
  }
}

export async function fetchRestaurants(postalCode: string) {
  // todo: validate postal code

  const BASE_URL = process.env.JET_BASE_URL
  if (!BASE_URL) throw new Error('JET_BASE_URL environment variable not set')

  const response = await fetch(`${BASE_URL}/${postalCode}`)
  if (!response.ok) throw new Error(`HTTP error ${response.status}`)
  
  const data: ApiResponse = await response.json()
  if (!data?.restaurants) return []

  return data.restaurants
    .slice(0, 10)
    .map(mapRestaurant)
}