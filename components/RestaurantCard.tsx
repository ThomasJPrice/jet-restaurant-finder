import { Restaurant } from "@/types/restaurant"
import React from "react"

type RestaurantCardProps = {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  const ratingProgressPercent = restaurant.rating / 5 * 100

  return (
    <div className="flex py-4 border-t last:border-b border-divider items-center">
      {index !== undefined && (
        <div className="mr-6 flex">
          <span className="text-xs font-mono">{String(index + 1).padStart(2, '0')}</span>
        </div>
      )}

      <div className="grow mr-4">
        <h2 className="text-lg leading-tight font-serif">{restaurant.name}</h2>

        <ul className="text-sm font-semibold flex flex-wrap text-ink-strong">
          {restaurant.cuisines.map((cuisine) => (
            <li className="after:content-['·'] after:mx-1 last:after:content-['']" key={cuisine.uniqueName}>{cuisine.name}</li>
          ))}
        </ul>

        <p className="text-sm italic text-ink-muted">{restaurant.address}</p>
      </div>

      <div className="flex flex-col items-end">
        <div className="mb-1">
          <span className="text-2xl font-serif">{restaurant.rating.toFixed(1)}</span>
          <div className="w-full relative h-0.5 bg-ink-muted">
            <div style={{ width: `${ratingProgressPercent}%` }} className="absolute top-0 left-0 h-0.5 bg-brand"></div>
          </div>
        </div>
        <span className="text-xs text-right hidden sm:block font-mono">{restaurant.ratingCount} reviews</span>
        <span className="text-xs text-right sm:hidden font-mono">({restaurant.ratingCount})</span>
      </div>
    </div>
  )
}

export default RestaurantCard