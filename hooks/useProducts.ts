"use client"

import { create } from "zustand"
import { type FilterState } from "@/types/product"
import { type Product } from "@/types/product"
import { useAdminStore } from "@/lib/admin-store"
import { filterProducts, DEFAULT_FILTERS, countActiveFilters } from "@/lib/utils"

interface ProductStore {
  filters: FilterState
  filteredProducts: Product[]
  activeFilterCount: number
  page: number
  perPage: number
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  toggleArrayFilter: <K extends keyof FilterState>(key: K, value: string) => void
  clearFilters: () => void
  loadMore: () => void
  resetPage: () => void
}

function getProducts(): Product[] {
  try {
    return useAdminStore.getState().products
  } catch {
    // Fallback if admin store not yet initialized
    return []
  }
}

export const useProductStore = create<ProductStore>((set, get) => ({
  filters: DEFAULT_FILTERS,
  filteredProducts: getProducts(),
  activeFilterCount: 0,
  page: 1,
  perPage: 12,

  setFilter: (key, value) => {
    const allProducts = getProducts()
    const newFilters = { ...get().filters, [key]: value }
    set({
      filters: newFilters,
      filteredProducts: filterProducts(allProducts, newFilters),
      activeFilterCount: countActiveFilters(newFilters),
      page: 1,
    })
  },

  toggleArrayFilter: (key, value) => {
    const allProducts = getProducts()
    const current = get().filters[key] as string[]
    const newValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    const newFilters = { ...get().filters, [key]: newValue }
    set({
      filters: newFilters,
      filteredProducts: filterProducts(allProducts, newFilters),
      activeFilterCount: countActiveFilters(newFilters),
      page: 1,
    })
  },

  clearFilters: () => {
    const allProducts = getProducts()
    set({
      filters: DEFAULT_FILTERS,
      filteredProducts: allProducts,
      activeFilterCount: 0,
      page: 1,
    })
  },

  loadMore: () => {
    set((state) => ({ page: state.page + 1 }))
  },

  resetPage: () => set({ page: 1 }),
}))

// Subscribe to admin store product changes to keep filteredProducts in sync
if (typeof window !== "undefined") {
  useAdminStore.subscribe((state, prevState) => {
    if (state.products !== prevState.products) {
      const filters = useProductStore.getState().filters
      useProductStore.setState({
        filteredProducts: filterProducts(state.products, filters),
      })
    }
  })
}
