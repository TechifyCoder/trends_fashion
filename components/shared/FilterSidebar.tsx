"use client"

import { X, SlidersHorizontal } from "lucide-react"
import { useProductStore } from "@/hooks/useProducts"
import { FABRICS, OCCASIONS, ALL_COLORS } from "@/lib/products"

const CATEGORIES = ["ethnic", "western", "bridal", "fusion"]
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]
const TAGS = ["bestseller", "new", "trending", "sale"]
const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest First" },
]

const colorHexMap: Record<string, string> = {
  Red: "#ef4444", Gold: "#C9A96E", Black: "#1a1a1a", Green: "#22c55e",
  Blue: "#3b82f6", Pink: "#ec4899", White: "#f5f5f5", Maroon: "#7B1A1A",
  Yellow: "#eab308", Orange: "#f97316", Purple: "#a855f7", Beige: "#D7CCC8",
  Navy: "#1e3a5f", Teal: "#0d9488", Ivory: "#FFFFF0", Peach: "#FFCCBC",
  Lavender: "#E8D5F5", Brown: "#92400e", Grey: "#6b7280", Silver: "#C0C0C0",
  Cream: "#FFFDD0",
}

interface FilterSidebarProps {
  isMobileSheet?: boolean
  onClose?: () => void
}

export default function FilterSidebar({ isMobileSheet = false, onClose }: FilterSidebarProps) {
  const {
    filters, setFilter, toggleArrayFilter, clearFilters, activeFilterCount, filteredProducts,
  } = useProductStore()

  const CheckboxRow = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer ${
          checked
            ? "bg-[#C9A96E] border-[#C9A96E]"
            : "border-[rgba(201,169,110,0.3)] group-hover:border-[rgba(201,169,110,0.6)]"
        }`}
      >
        {checked && <div className="w-2 h-2 bg-black rounded-sm" />}
      </div>
      <span className="text-sm text-[rgba(245,245,240,0.7)] capitalize group-hover:text-[#F5F5F0] transition-colors">
        {label}
      </span>
    </label>
  )

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-3">{children}</h4>
  )

  return (
    <div
      className={`${
        isMobileSheet
          ? "p-5 pb-20"
          : "w-64 flex-shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto"
      } space-y-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#C9A96E]" />
          <span className="font-display text-lg text-[#F5F5F0]">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-[#C9A96E] text-black text-xs font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              id="clear-filters"
              className="text-xs text-[rgba(201,169,110,0.7)] hover:text-[#C9A96E] underline"
            >
              Clear All
            </button>
          )}
          {isMobileSheet && onClose && (
            <button onClick={onClose} className="p-1">
              <X size={18} className="text-[rgba(245,245,240,0.6)]" />
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-[rgba(245,245,240,0.4)]">
        Showing {filteredProducts.length} products
      </div>

      {/* Sort */}
      <div>
        <SectionTitle>Sort By</SectionTitle>
        <select
          id="sort-select"
          value={filters.sortBy}
          onChange={(e) => setFilter("sortBy", e.target.value as typeof filters.sortBy)}
          className="w-full bg-[#1a1a1a] border border-[rgba(201,169,110,0.2)] text-[#F5F5F0] text-sm rounded-xl px-3 py-2 outline-none focus:border-[rgba(201,169,110,0.5)] appearance-none cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <SectionTitle>Category</SectionTitle>
        <div className="space-y-0.5">
          {CATEGORIES.map((cat) => (
            <CheckboxRow
              key={cat}
              label={cat}
              checked={filters.categories.includes(cat)}
              onChange={() => toggleArrayFilter("categories", cat)}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <SectionTitle>Price Range</SectionTitle>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[rgba(245,245,240,0.6)]">
            <span>₹{filters.minPrice.toLocaleString("en-IN")}</span>
            <span className="flex-1 text-center">—</span>
            <span>₹{filters.maxPrice.toLocaleString("en-IN")}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[rgba(245,245,240,0.4)]">
              <span>Min</span>
            </div>
            <input
              type="range"
              id="price-min"
              min={0}
              max={50000}
              step={500}
              value={filters.minPrice}
              onChange={(e) => setFilter("minPrice", Number(e.target.value))}
              className="w-full accent-[#C9A96E]"
            />
            <div className="flex items-center gap-2 text-xs text-[rgba(245,245,240,0.4)]">
              <span>Max</span>
            </div>
            <input
              type="range"
              id="price-max"
              min={0}
              max={50000}
              step={500}
              value={filters.maxPrice}
              onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
              className="w-full accent-[#C9A96E]"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <SectionTitle>Size</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              id={`size-filter-${size}`}
              onClick={() => toggleArrayFilter("sizes", size)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all duration-200 ${
                filters.sizes.includes(size)
                  ? "bg-[#C9A96E] border-[#C9A96E] text-black font-semibold"
                  : "border-[rgba(201,169,110,0.25)] text-[rgba(245,245,240,0.6)] hover:border-[rgba(201,169,110,0.5)]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <SectionTitle>Color</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.slice(0, 12).map((color) => (
            <button
              key={color}
              id={`color-filter-${color}`}
              onClick={() => toggleArrayFilter("colors", color)}
              title={color}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                filters.colors.includes(color)
                  ? "border-[#C9A96E] scale-110 shadow-[0_0_8px_rgba(201,169,110,0.5)]"
                  : "border-transparent hover:border-white/40"
              }`}
              style={{ backgroundColor: colorHexMap[color] ?? "#888" }}
            />
          ))}
        </div>
      </div>

      {/* Fabric */}
      <div>
        <SectionTitle>Fabric</SectionTitle>
        <div className="space-y-0.5 max-h-36 overflow-y-auto pr-1">
          {FABRICS.map((fab) => (
            <CheckboxRow
              key={fab}
              label={fab}
              checked={filters.fabrics.includes(fab)}
              onChange={() => toggleArrayFilter("fabrics", fab)}
            />
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <SectionTitle>Occasion</SectionTitle>
        <div className="space-y-0.5">
          {OCCASIONS.map((occ) => (
            <CheckboxRow
              key={occ}
              label={occ}
              checked={filters.occasions.includes(occ)}
              onChange={() => toggleArrayFilter("occasions", occ)}
            />
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <SectionTitle>Min Rating</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              id={`rating-filter-${r}`}
              onClick={() => setFilter("minRating", filters.minRating === r ? 0 : r)}
              className={`text-xs px-3 py-1 rounded-lg border transition-all duration-200 ${
                filters.minRating === r
                  ? "bg-[#C9A96E] border-[#C9A96E] text-black font-semibold"
                  : "border-[rgba(201,169,110,0.25)] text-[rgba(245,245,240,0.6)] hover:border-[rgba(201,169,110,0.5)]"
              }`}
            >
              ★ {r}+
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <SectionTitle>Tags</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              id={`tag-filter-${tag}`}
              onClick={() => toggleArrayFilter("tags", tag)}
              className={`text-xs px-3 py-1 rounded-full border capitalize transition-all duration-200 ${
                filters.tags.includes(tag)
                  ? "bg-[#C9A96E] border-[#C9A96E] text-black font-semibold"
                  : "border-[rgba(201,169,110,0.25)] text-[rgba(245,245,240,0.6)] hover:border-[rgba(201,169,110,0.5)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
