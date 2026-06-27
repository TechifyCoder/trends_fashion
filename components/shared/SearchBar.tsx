"use client"

import { useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useProductStore } from "@/hooks/useProducts"

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const search = useProductStore((s) => s.filters.search)
  const setFilter = useProductStore((s) => s.setFilter)
  const filteredCount = useProductStore((s) => s.filteredProducts.length)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter("search", e.target.value)
  }

  const clearSearch = () => {
    setFilter("search", "")
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full group">
      <div className="relative flex items-center">
        {/* Search icon */}
        <div className="absolute left-4 z-10 transition-transform duration-300 group-focus-within:scale-90">
          <Search size={18} className="text-[rgba(201,169,110,0.6)] group-focus-within:text-[#C9A96E]" />
        </div>

        <input
          ref={inputRef}
          id="product-search"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search sarees, lehengas, kurtis..."
          className="w-full h-12 pl-11 pr-28 bg-[#161616] border border-[rgba(201,169,110,0.2)] rounded-2xl text-[#F5F5F0] placeholder:text-[rgba(245,245,240,0.35)] text-sm outline-none transition-all duration-300 focus:border-[rgba(201,169,110,0.6)] focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
        />

        {/* Right side: count + clear */}
        <div className="absolute right-3 flex items-center gap-2">
          <span className="text-xs text-[rgba(245,245,240,0.4)] whitespace-nowrap">
            {filteredCount} items
          </span>
          {search && (
            <button
              onClick={clearSearch}
              id="search-clear"
              className="flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(201,169,110,0.15)] hover:bg-[rgba(201,169,110,0.3)] transition-colors"
            >
              <X size={12} className="text-[#C9A96E]" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
