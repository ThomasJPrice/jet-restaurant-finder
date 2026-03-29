"use client"

import { isValidPostcode, sanitisePostcode } from '@/lib/validation'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

const SearchForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [postcode, setPostcode] = useState(searchParams.get("postcode") ?? "")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cleaned = sanitisePostcode(postcode)

    if (!isValidPostcode(cleaned)) {
      setError("Please enter a valid UK postcode")
      return
    }

    setError(null)

    const params = new URLSearchParams(searchParams.toString())

    if (cleaned) {
      params.set("postcode", cleaned)
    } else {
      params.delete("postcode")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className='mb-6 flex flex-col gap-1'>
      <div className='flex gap-2'>
        <input
          type="text"
          value={postcode}
          onChange={(e) => {
            setPostcode(e.target.value)
            if (error) setError(null)
          }}
          placeholder='Enter postcode'
          className='w-full rounded border px-3 py-2 uppercase placeholder:normal-case'
          aria-label='Postcode'
          aria-describedby={error ? 'postcode-error' : undefined}
        />
        <button className='rounded border px-4 py-2 cursor-pointer hover:bg-[#4b4946]/5 transition-colors duration-300' type='submit'>Search</button>
      </div>
      {error && (
        <p id='postcode-error' className="text-sm text-red-600" role='alert'>
          {error}
        </p>
      )}
    </form>
  )
}

export default SearchForm