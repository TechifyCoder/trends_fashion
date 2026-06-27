export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: "ethnic" | "western" | "bridal" | "fusion"
  subcategory: string
  sizes: string[]
  colors: string[]
  tags: string[]
  description: string
  fabric: string
  occasion: string
  inStock: boolean
  rating: number
  reviewCount: number
  cssColor: string
  patternType: "solid" | "printed" | "embroidered" | "sequined"
}

export interface FilterState {
  search: string
  categories: string[]
  minPrice: number
  maxPrice: number
  sizes: string[]
  colors: string[]
  fabrics: string[]
  occasions: string[]
  minRating: number
  tags: string[]
  sortBy: "price-asc" | "price-desc" | "rating" | "newest" | "default"
}

export type SortOption = FilterState["sortBy"]
