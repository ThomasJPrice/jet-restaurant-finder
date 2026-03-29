import { Suspense } from 'react'
import RestaurantCard from "@/components/RestaurantCard"
import SearchForm from "@/components/SearchForm"
import { fetchRestaurants } from "@/lib/restaurants"

type HomeProps = {
  searchParams: Promise<{
    postcode?: string
  }>
}

async function Results({ postcode }: { postcode: string }) {
  const result = await fetchRestaurants(postcode)

  if (!result.ok) {
    return (
      <p className="text-red-600" role="alert">
        {result.error.message}
      </p>
    )
  }

  return (
    <>
      <p className="mb-4">
        Showing <span className="font-mono font-medium">{result.data.length}</span> results for <span className="font-mono font-medium">{postcode}</span>
      </p>
      <ul>
        {result.data.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} index={index} key={restaurant.id} />
        ))}
      </ul>
    </>
  )
}

function ResultsLoading() {
  return (
    <div className='w-full flex justify-center'>
      <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        Searching...
      </div>
    </div>
  )
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const postcode = params.postcode?.trim()

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="mb-6 font-serif text-xl text-center">
        Find restaurants near{" "}
        <span className="font-bold text-brand italic">you</span>
      </h1>
      <SearchForm />
      {postcode ? (
        <Suspense key={postcode} fallback={<ResultsLoading />}>
          <Results postcode={postcode} />
        </Suspense>
      ) : (
        <p className="text-center text-gray-500">
          Enter your postcode to see nearby restaurants.
        </p>
      )}
    </main>
  )
}