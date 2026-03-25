import { Restaurant } from "@/types/restaurant"
import React from "react"

type RestaurantCardProps = {
  restaurant: Restaurant
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2.5 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-medium leading-snug">{restaurant.name}</h3>

        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-0.5 shrink-0">

          <p className="text-sm"><span className="font-medium">{restaurant.rating.toFixed(1)}</span> <span className="text-gray-600">({restaurant.ratingCount})</span></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {restaurant?.cuisines && restaurant?.cuisines.map((cuisine) => (
          <p className="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200" key={cuisine.uniqueName}>
            {cuisine.name}
          </p>
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-2">{restaurant.address}</p>
    </div>
  )
}

export default RestaurantCard