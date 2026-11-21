'use client'

// This is a client component because it responds to typing and uses Next.js
// navigation hooks to update the URL without a full page reload.
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState, useEffect } from 'react'

function NavSearch() {
  // Read the current URL query string (for example, ?search=lamp).
  const searchParams = useSearchParams()

  // `replace` navigates to another URL but does not add every keystroke to the
  // browser's Back history, unlike `push`.
  const { replace } = useRouter()

  // Keep an input value in local state so each keystroke appears immediately.
  // Initialize it from the URL so a reload or shared search link fills the box.
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || '',
  )

  // Wait until the user pauses typing for 300ms before changing the URL.
  // Updating the URL causes the products page to receive the new search term.
  const handleSearch = useDebouncedCallback((value: string) => {
    // Start from the existing query parameters to preserve unrelated values,
    // such as a selected product layout.
    const params = new URLSearchParams(searchParams)

    // Store non-empty input as the `search` query parameter. Remove it when
    // the field is cleared so the products page can show all products again.
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }

    // Navigate to the products listing with the updated query string.
    // The framework then renders that page using the new search parameter.
    replace(`/products?${params.toString()}`)
  }, 300)

  // If navigation clears the URL's search term (for example, after leaving
  // the listing), clear the field too so local state stays in sync with URL.
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams.get('search')])
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted "
      onChange={(e) => {
        // Update the visible input immediately, then schedule the debounced
        // URL update. The product list is filtered from that URL value.
        setSearch(e.target.value)
        handleSearch(e.target.value)
      }}
      value={search}
    />
  )
}
export default NavSearch
