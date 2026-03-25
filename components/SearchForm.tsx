"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

const SearchForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [postcode, setPostcode] = useState(searchParams.get("postcode") ?? "")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const value = postcode.trim().toUpperCase()
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("postcode", value)
    } else {
      params.delete("postcode")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-6 flex gap-2'>
      <input  
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder='Enter postcode'
        className='w-full rounded border px-3 py-2' 
      />
      <button className='rounded border px-4 py-2' type='submit'>Search</button>
    </form>
  )
}

export default SearchForm