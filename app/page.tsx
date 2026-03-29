import RestaurantCard from "@/components/RestaurantCard";
import SearchForm from "@/components/SearchForm";
import { fetchRestaurants } from "@/lib/restaurants";
import { Restaurant, RestaurantError } from "@/types/restaurant";

type HomeProps = {
  searchParams: Promise<{
    postcode?: string;
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const postcode = params.postcode?.trim()

  let restaurants: Restaurant[] = [];
  let error: RestaurantError | null = null

  if (postcode) {
    const result = await fetchRestaurants(postcode)

    if (result.ok === true) {
      restaurants = result.data
    } else {
      error = result.error
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="mb-6 font-serif text-xl text-center">Find restaurants near <span className="font-bold text-[#FF8000] italic">you</span></h1>

      <SearchForm />

      {/* results */}
      <div>
        {postcode && error && (
          <p className="mb-4 text-red-600" role="alert">
            {error.message}
          </p>
        )}

        {!postcode && (
          <div className="text-center">
            <p>Enter your postcode to see nearby locations.</p>
          </div>
        )}

        {!error && restaurants.length > 0 && (
          <>
            <p className="mb-4">
              Showing <span className="font-mono font-medium">{restaurants.length}</span> results for <span className="font-mono font-medium">{postcode}</span>
            </p>

            <ul>
              {restaurants.map((restaurant, index) => (
                <RestaurantCard restaurant={restaurant} index={index} key={restaurant.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
