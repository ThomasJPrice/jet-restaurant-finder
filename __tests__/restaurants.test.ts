import { mapRestaurant } from '@/lib/restaurants'
import { isValidPostcode, sanitisePostcode } from '@/lib/validation'
import { APIRestaurant } from '@/types/restaurant'

// Fixtures

const mockAPIRestaurant: APIRestaurant = {
  id: '12345',
  name: 'Test Restaurant',
  cuisines: [
    { name: 'Italian', uniqueName: 'italian' },
    { name: 'Pizza', uniqueName: 'pizza' },
  ],
  rating: {
    starRating: 4.5,
    count: 120,
  },
  address: {
    firstLine: '1 Test Street',
    city: 'London',
    postalCode: 'EC4M 7RF',
  },
}

// mapRestaurant

describe('mapRestaurant', () => {
  it('maps id correctly', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.id).toBe('12345')
  })

  it('maps name correctly', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.name).toBe('Test Restaurant')
  })

  it('maps cuisines array correctly', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.cuisines).toEqual([
      { name: 'Italian', uniqueName: 'italian' },
      { name: 'Pizza', uniqueName: 'pizza' },
    ])
  })

  it('maps starRating to rating', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.rating).toBe(4.5)
  })

  it('maps rating count to ratingCount', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.ratingCount).toBe(120)
  })

  it('formats address as a single comma-separated string', () => {
    const result = mapRestaurant(mockAPIRestaurant)
    expect(result.address).toBe('1 Test Street, London, EC4M 7RF')
  })

  it('handles a restaurant with no cuisines', () => {
    const result = mapRestaurant({ ...mockAPIRestaurant, cuisines: [] })
    expect(result.cuisines).toEqual([])
  })

  it('handles a zero rating', () => {
    const result = mapRestaurant({
      ...mockAPIRestaurant,
      rating: { starRating: 0, count: 0 },
    })
    expect(result.rating).toBe(0)
    expect(result.ratingCount).toBe(0)
  })
})

// sanitisePostcode

describe('sanitisePostcode', () => {
  it('removes spaces', () => {
    expect(sanitisePostcode('EC4M 7RF')).toBe('EC4M7RF')
  })

  it('converts to uppercase', () => {
    expect(sanitisePostcode('ec4m7rf')).toBe('EC4M7RF')
  })

  it('removes multiple spaces', () => {
    expect(sanitisePostcode('EC4M  7RF')).toBe('EC4M7RF')
  })

  it('handles already clean input', () => {
    expect(sanitisePostcode('EC4M7RF')).toBe('EC4M7RF')
  })
})

// isValidPostcode 

describe('isValidPostcode', () => {
  describe('valid postcodes', () => {
    it('accepts a standard postcode with space', () => {
      expect(isValidPostcode('EC4M 7RF')).toBe(true)
    })

    it('accepts a standard postcode without space', () => {
      expect(isValidPostcode('EC4M7RF')).toBe(true)
    })

    it('accepts lowercase postcode', () => {
      expect(isValidPostcode('ec4m7rf')).toBe(true)
    })

    it('accepts single-letter area code', () => {
      expect(isValidPostcode('L4 0TH')).toBe(true)
    })

    it('accepts SW1A format', () => {
      expect(isValidPostcode('SW1A 1AA')).toBe(true)
    })

    it('accepts the GIR 0AA special case', () => {
      expect(isValidPostcode('GIR 0AA')).toBe(true)
    })

    it('accepts GIR0AA without space', () => {
      expect(isValidPostcode('GIR0AA')).toBe(true)
    })
  })

  describe('invalid postcodes', () => {
    it('rejects an empty string', () => {
      expect(isValidPostcode('')).toBe(false)
    })

    it('rejects a partial postcode', () => {
      expect(isValidPostcode('EC4M')).toBe(false)
    })

    it('rejects a random string', () => {
      expect(isValidPostcode('NOTAPOSTCODE')).toBe(false)
    })

    it('rejects numbers only', () => {
      expect(isValidPostcode('12345')).toBe(false)
    })

    it('rejects a postcode that is too short', () => {
      expect(isValidPostcode('E1')).toBe(false)
    })

    it('rejects a postcode with invalid characters', () => {
      expect(isValidPostcode('EC4M 7R!')).toBe(false)
    })
  })
})