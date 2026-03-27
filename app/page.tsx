import RestaurantCard from "@/components/RestaurantCard";
import SearchForm from "@/components/SearchForm";
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
      <h1 className="mb-6 font-serif text-xl text-center">Find restaurants near <span className="font-bold text-[#FF8000] italic">you</span></h1>

      <SearchForm />

      {/* results */}
      <div>
        <p className="mb-4">Showing <span className="font-mono font-medium">{restaurants.length}</span> results for <span className="font-mono font-medium">{postcode}</span></p>

        <div>
          {restaurants?.length > 0 ? (
            <ul className="grid grid-cols-1">
              {restaurants && restaurants.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} index={index} key={restaurant.id} />
              ))}
            </ul>
          ) : (
            <div className="text-center">
              <p>Enter your postcode to see near locations!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
