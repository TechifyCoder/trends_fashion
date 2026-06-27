"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { useProductStore } from "@/hooks/useProducts"
import ProductCard from "@/components/shared/ProductCard"
import FilterSidebar from "@/components/shared/FilterSidebar"
import SearchBar from "@/components/shared/SearchBar"
import { useIsMobile } from "@/hooks/useFilter"

export default function ProductCatalog() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const isMobile = useIsMobile()

  const {
    filteredProducts,
    activeFilterCount,
    page,
    perPage,
    loadMore,
  } = useProductStore()

  const visibleProducts = filteredProducts.slice(0, page * perPage)
  const hasMore = visibleProducts.length < filteredProducts.length

  return (
    <section id="catalog" className="py-24 relative">
      {/* BG */}
      <div className="absolute inset-0 bg-[#0f0f0f] mesh-bg" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3"
          >
            Browse & Shop
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold text-[#F5F5F0]"
          >
            Our Designs
          </motion.h2>
        </div>

        {/* Search + Filter Button Row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          {/* Mobile filter trigger */}
          <button
            id="mobile-filter-btn"
            onClick={() => setMobileFilterOpen(true)}
            className="relative md:hidden flex items-center gap-2 h-12 px-4 bg-[#161616] border border-[rgba(201,169,110,0.2)] rounded-2xl text-[rgba(245,245,240,0.7)] text-sm flex-shrink-0"
          >
            <SlidersHorizontal size={16} className="text-[#C9A96E]" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9A96E] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-display text-2xl text-[#F5F5F0] mb-2">Koi product nahi mila</h3>
                <p className="text-[rgba(245,245,240,0.5)] mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => useProductStore.getState().clearFilters()}
                  className="px-6 py-2.5 bg-[#C9A96E] text-black rounded-xl font-semibold text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="text-sm text-[rgba(245,245,240,0.45)] mb-5">
                  Showing {visibleProducts.length} of {filteredProducts.length} products
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                  {visibleProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      id="load-more-btn"
                      onClick={loadMore}
                      className="group px-10 py-3.5 border border-[rgba(201,169,110,0.3)] text-[#C9A96E] rounded-2xl text-sm font-semibold hover:bg-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.5)] transition-all duration-300"
                    >
                      Load More ({filteredProducts.length - visibleProducts.length} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] rounded-t-3xl max-h-[85vh] overflow-y-auto md:hidden border-t border-[rgba(201,169,110,0.2)]"
            >
              <div className="sticky top-0 bg-[#111] pt-3 pb-2 flex justify-center z-10">
                <div className="w-10 h-1 rounded-full bg-[rgba(245,245,240,0.2)]" />
              </div>
              <FilterSidebar isMobileSheet onClose={() => setMobileFilterOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
