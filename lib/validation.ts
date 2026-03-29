export function isValidPostcode(postcode: string): boolean {
  const cleaned = sanitisePostcode(postcode)
  return /^([A-Za-z][A-Ha-hJ-Yj-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/.test(cleaned) // official royal mail postcode validation regex (with GIR0AA special case)
}

export function sanitisePostcode(postcode: string): string {
  return postcode.replace(/\s+/g, '').toUpperCase()
}