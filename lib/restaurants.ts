import { ApiResponse } from "@/types/restaurant"

export async function fetchRestaurants(postalCode: string) {
  // todo: validate postal code

  const BASE_URL = process.env.JET_BASE_URL
  if (!BASE_URL) return // todo: handle gracefully

  const response = await fetch(`${BASE_URL}/${postalCode}`)
  if (!response.ok) throw new Error(`HTTP error ${response.status}`)
  
  const data: ApiResponse = await response.json()

  const restaurants = data?.restaurants

  if (!restaurants) return // todo: handle gracefully

  const topRestaurants = restaurants
    .slice(0,10)
    .map((restaurant) => ({
      name: restaurant.name,
      id: restaurant.id,
      cuisines: restaurant.cuisines,
      rating: restaurant.rating,
      address: restaurant.address
    }))

  return topRestaurants
}