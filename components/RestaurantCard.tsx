import { Restaurant } from "@/types/restaurant"
import React from "react"

type RestaurantCardProps = {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  const ratingProgressPercent = restaurant.rating / 5 * 100

  return (
    <div className="flex py-4 border-t last:border-b border-[#a5a097] items-center">
      {/* todo: allow for no index in case of not listing it and just card */}
      <div className="mr-6 h-full flex">
        <span className="text-xs font-mono mt-2">{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="grow mr-4">
        <h3 className="text-lg leading-tight font-serif">{restaurant.name}</h3>

        <ul className="text-sm font-semibold flex flex-wrap text-[#2b2926]">
          {restaurant.cuisines.map((cuisine) => (
            <li className="after:content-['·'] after:mx-1 last:after:content-['']" key={cuisine.uniqueName}>{cuisine.name}</li>
          ))}
        </ul>

        <p className="text-sm italic text-[#5c5a56]">{restaurant.address}</p>
      </div>

      <div className="flex flex-col items-end">
        <div className="mb-1">
          <h4 className="text-2xl font-serif">{restaurant.rating.toFixed(1)}</h4>
          <div className="w-full relative h-0.5 bg-black">
            <div style={{ width: `${ratingProgressPercent}%`}} className="absolute top-0 left-0 h-0.5 bg-[#FF8000]"></div>
          </div>
        </div>
        <span className="text-xs text-right hidden sm:block font-mono">{restaurant.ratingCount} reviews</span>
        <span className="text-xs text-right sm:hidden font-mono">({restaurant.ratingCount})</span>
      </div>
    </div>
  )
}

export default RestaurantCard