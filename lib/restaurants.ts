import { ApiResponse, APIRestaurant, Restaurant, RestaurantResult } from "@/types/restaurant"
import { isValidPostcode, sanitisePostcode } from "./validation"

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

export async function fetchRestaurants(postalCode: string): Promise<RestaurantResult> {
  const validPostcode = isValidPostcode(postalCode)

  if (!validPostcode) {
    return { ok: false, error: { type: 'INVALID_POSTCODE', message: 'Please enter a valid UK postcode' }}
  }

  try {
    const BASE_URL = process.env.JET_BASE_URL
    
    if (!BASE_URL) {
      return { ok: false, error: { type: 'API_ERROR', message: 'Please add JET_BASE_URL in environment variables'}}
    }
  
    const response = await fetch(`${BASE_URL}/${sanitisePostcode(postalCode)}`)

    if (!response.ok) {
      return { ok: false, error: { type: 'API_ERROR', message: `Something went wrong (${response.status})`}}
    }
    
    const data: ApiResponse = await response.json()
    
    if (!data?.restaurants?.length) {
      return { ok: false, error: {type: 'NOT_FOUND', message: 'No restaurants found for this postcode.'}}
    }
  
    return {
      ok: true,
      data: data.restaurants.slice(0,10).map(mapRestaurant)
    }
  } catch (error) {
    return {
      ok: false,
      error: { type: 'API_ERROR', message: 'Unable to reach the restaurant service'}
    }
  }
}