import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Product, type FilterState } from "@/types/product"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  let result = [...products]

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Category
  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category))
  }

  // Price
  result = result.filter(
    (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
  )

  // Sizes
  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      filters.sizes.some((s) => p.sizes.includes(s))
    )
  }

  // Colors
  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      filters.colors.some((c) => p.colors.includes(c))
    )
  }

  // Fabrics
  if (filters.fabrics.length > 0) {
    result = result.filter((p) => filters.fabrics.includes(p.fabric))
  }

  // Occasions
  if (filters.occasions.length > 0) {
    result = result.filter((p) => filters.occasions.includes(p.occasion))
  }

  // Rating
  if (filters.minRating > 0) {
    result = result.filter((p) => p.rating >= filters.minRating)
  }

  // Tags
  if (filters.tags.length > 0) {
    result = result.filter((p) =>
      filters.tags.some((t) => p.tags.includes(t))
    )
  }

  // Sort
  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      result.sort((a, b) => b.price - a.price)
      break
    case "rating":
      result.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      result.sort((a, b) => (b.tags.includes("new") ? 1 : 0) - (a.tags.includes("new") ? 1 : 0))
      break
    default:
      break
  }

  return result
}

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  categories: [],
  minPrice: 0,
  maxPrice: 50000,
  sizes: [],
  colors: [],
  fabrics: [],
  occasions: [],
  minRating: 0,
  tags: [],
  sortBy: "default",
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  if (filters.search) count++
  if (filters.categories.length > 0) count++
  if (filters.minPrice > 0 || filters.maxPrice < 50000) count++
  if (filters.sizes.length > 0) count++
  if (filters.colors.length > 0) count++
  if (filters.fabrics.length > 0) count++
  if (filters.occasions.length > 0) count++
  if (filters.minRating > 0) count++
  if (filters.tags.length > 0) count++
  if (filters.sortBy !== "default") count++
  return count
}
