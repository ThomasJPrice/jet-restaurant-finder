import RestaurantCard from "@/components/RestaurantCard";
import { fetchRestaurants } from "@/lib/restaurants";
import { Restaurant } from "@/types/restaurant";

type HomeProps = {
  searchParams: Promise<{
    postcode?: string;
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const postcode = params.postcode?.trim()

  let restaurants: Restaurant[] = [];

  if (postcode) {
    restaurants = await fetchRestaurants(postcode)
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">

      
      {restaurants?.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
        {restaurants && restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
      ) : (
        <div className="text-center">
          <p>Enter your postcode to see near locations!</p>
        </div>
      )}
    </main>
  );
}
