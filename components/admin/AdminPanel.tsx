"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAdminStore, type Review } from "@/lib/admin-store"
import { type Product } from "@/types/product"
import { formatPrice } from "@/lib/utils"
import {
  LayoutDashboard, Package, Star, Settings, LogOut, Plus, Pencil, Trash2,
  Search, ChevronDown, X, Check, RotateCcw, AlertTriangle
} from "lucide-react"

// ─── Tabs ──────────────────────────────────────────────────
type Tab = "dashboard" | "products" | "reviews" | "settings"

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "products", label: "Products", icon: <Package size={18} /> },
  { id: "reviews", label: "Reviews", icon: <Star size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
]

// ─── Confirm Dialog ────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#161616] border border-[rgba(201,169,110,0.2)] rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={24} className="text-red-400" />
          <h3 className="font-display text-lg text-[#F5F5F0]">Confirm</h3>
        </div>
        <p className="text-sm text-[rgba(245,245,240,0.7)] mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 h-10 border border-[rgba(245,245,240,0.1)] rounded-xl text-sm text-[rgba(245,245,240,0.6)] hover:bg-[rgba(245,245,240,0.05)] transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 h-10 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-400 hover:bg-red-500/30 transition-colors">Delete</button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Dashboard Tab ─────────────────────────────────────────
function DashboardPanel() {
  const products = useAdminStore((s) => s.products)
  const reviews = useAdminStore((s) => s.reviews)

  const stats = useMemo(() => {
    const inStock = products.filter((p) => p.inStock).length
    const outOfStock = products.length - inStock
    const ethnic = products.filter((p) => p.category === "ethnic").length
    const western = products.filter((p) => p.category === "western").length
    const bridal = products.filter((p) => p.category === "bridal").length
    const fusion = products.filter((p) => p.category === "fusion").length
    const avgRating = products.length > 0 ? (products.reduce((a, p) => a + p.rating, 0) / products.length).toFixed(1) : "0"
    return { total: products.length, inStock, outOfStock, ethnic, western, bridal, fusion, avgRating, reviews: reviews.length }
  }, [products, reviews])

  const cards = [
    { label: "Total Products", value: stats.total, color: "#C9A96E" },
    { label: "In Stock", value: stats.inStock, color: "#4CAF50" },
    { label: "Out of Stock", value: stats.outOfStock, color: "#f44336" },
    { label: "Reviews", value: stats.reviews, color: "#2196F3" },
    { label: "Avg Rating", value: stats.avgRating, color: "#FF9800" },
  ]

  const categories = [
    { label: "Ethnic", count: stats.ethnic, color: "#E91E63" },
    { label: "Western", count: stats.western, color: "#9C27B0" },
    { label: "Bridal", count: stats.bridal, color: "#C9A96E" },
    { label: "Fusion", count: stats.fusion, color: "#00BCD4" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl text-[#F5F5F0]">Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-[#161616] border border-[rgba(201,169,110,0.1)] rounded-2xl p-5">
            <p className="text-xs text-[rgba(245,245,240,0.45)] uppercase tracking-wider mb-1">{c.label}</p>
            <p className="text-3xl font-bold" style={{ color: c.color }}>{c.value}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-lg text-[#F5F5F0] mb-3">Category Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.label} className="bg-[#161616] border border-[rgba(201,169,110,0.1)] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
              <div>
                <p className="text-sm text-[#F5F5F0] font-medium">{c.label}</p>
                <p className="text-xs text-[rgba(245,245,240,0.4)]">{c.count} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Product Form ──────────────────────────────────────────
const EMPTY_PRODUCT: Omit<Product, "id"> = {
  name: "", price: 0, category: "ethnic", subcategory: "", sizes: [], colors: [],
  tags: [], description: "", fabric: "", occasion: "", inStock: true, rating: 4.5,
  reviewCount: 0, cssColor: "#8B1A1A", patternType: "solid",
}

function ProductForm({ product, onSave, onCancel }: {
  product?: Product
  onSave: (data: Product) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Product, "id"> & { id?: string }>(
    product ?? { ...EMPTY_PRODUCT }
  )
  const [sizesText, setSizesText] = useState((product?.sizes ?? []).join(", "))
  const [colorsText, setColorsText] = useState((product?.colors ?? []).join(", "))
  const [tagsText, setTagsText] = useState((product?.tags ?? []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = form.id ?? `prod-${Date.now()}`
    const sizes = sizesText.split(",").map((s) => s.trim()).filter(Boolean)
    const colors = colorsText.split(",").map((s) => s.trim()).filter(Boolean)
    const tags = tagsText.split(",").map((s) => s.trim()).filter(Boolean)
    onSave({ ...form, id, sizes, colors, tags } as Product)
  }

  const fieldClass = "w-full h-10 bg-[#1a1a1a] border border-[rgba(201,169,110,0.15)] rounded-lg px-3 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A96E] transition-colors"
  const labelClass = "block text-xs text-[rgba(245,245,240,0.5)] mb-1"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Product Name *</label>
          <input required className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Price (₹) *</label>
          <input required type="number" className={fieldClass} value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        </div>
        <div>
          <label className={labelClass}>Original Price (₹)</label>
          <input type="number" className={fieldClass} value={form.originalPrice ?? ""} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) || undefined })} />
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select className={fieldClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}>
            <option value="ethnic">Ethnic</option>
            <option value="western">Western</option>
            <option value="bridal">Bridal</option>
            <option value="fusion">Fusion</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Subcategory</label>
          <input className={fieldClass} value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Fabric *</label>
          <input required className={fieldClass} value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Occasion</label>
          <input className={fieldClass} value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Pattern Type</label>
          <select className={fieldClass} value={form.patternType} onChange={(e) => setForm({ ...form, patternType: e.target.value as Product["patternType"] })}>
            <option value="solid">Solid</option>
            <option value="printed">Printed</option>
            <option value="embroidered">Embroidered</option>
            <option value="sequined">Sequined</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>CSS Color (hex)</label>
          <div className="flex gap-2">
            <input className={fieldClass} value={form.cssColor} onChange={(e) => setForm({ ...form, cssColor: e.target.value })} />
            <div className="w-10 h-10 rounded-lg border border-[rgba(201,169,110,0.15)] flex-shrink-0" style={{ backgroundColor: form.cssColor }} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Rating (0-5)</label>
          <input type="number" step="0.1" min="0" max="5" className={fieldClass} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
        </div>
        <div>
          <label className={labelClass}>Sizes (comma separated)</label>
          <input className={fieldClass} value={sizesText} onChange={(e) => setSizesText(e.target.value)} placeholder="S, M, L, XL" />
        </div>
        <div>
          <label className={labelClass}>Colors (comma separated)</label>
          <input className={fieldClass} value={colorsText} onChange={(e) => setColorsText(e.target.value)} placeholder="Red, Gold, Blue" />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Tags (comma separated)</label>
          <input className={fieldClass} value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="bestseller, trending, new, sale" />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea className={`${fieldClass} h-20 resize-none py-2`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="accent-[#C9A96E]" />
          <span className="text-sm text-[#F5F5F0]">In Stock</span>
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 h-10 border border-[rgba(245,245,240,0.1)] rounded-xl text-sm text-[rgba(245,245,240,0.6)] hover:bg-[rgba(245,245,240,0.05)] transition-colors">
          Cancel
        </button>
        <button type="submit" className="flex-1 h-10 bg-[#C9A96E] text-black rounded-xl text-sm font-semibold hover:bg-[#E8C98A] transition-colors">
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  )
}

// ─── Products Tab ──────────────────────────────────────────
function ProductsPanel() {
  const products = useAdminStore((s) => s.products)
  const { addProduct, updateProduct, deleteProduct, toggleStock, bulkDelete, bulkToggleStock } = useAdminStore()
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | undefined>()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q) || p.fabric.toLowerCase().includes(q))
  }, [products, search])

  const toggleSelect = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((p) => p.id)))
    }
  }

  const handleSave = (product: Product) => {
    if (editProduct) {
      updateProduct(product.id, product)
    } else {
      addProduct(product)
    }
    setFormOpen(false)
    setEditProduct(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="font-display text-2xl text-[#F5F5F0]">Products ({products.length})</h2>
        <button onClick={() => { setEditProduct(undefined); setFormOpen(true) }} className="flex items-center gap-2 h-10 px-5 bg-[#C9A96E] text-black rounded-xl text-sm font-semibold hover:bg-[#E8C98A] transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] flex items-start justify-center p-4 pt-20 overflow-y-auto">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-[#111] border border-[rgba(201,169,110,0.2)] rounded-2xl p-6 w-full max-w-2xl mb-20">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl text-[#F5F5F0]">{editProduct ? "Edit Product" : "Add New Product"}</h3>
                <button onClick={() => { setFormOpen(false); setEditProduct(undefined) }} className="text-[rgba(245,245,240,0.4)] hover:text-[#F5F5F0]"><X size={20} /></button>
              </div>
              <ProductForm product={editProduct} onSave={handleSave} onCancel={() => { setFormOpen(false); setEditProduct(undefined) }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search + Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(245,245,240,0.3)]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full h-10 bg-[#161616] border border-[rgba(201,169,110,0.15)] rounded-xl pl-10 pr-4 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A96E] transition-colors" />
        </div>
        {selected.size > 0 && (
          <div className="flex gap-2">
            <button onClick={() => bulkToggleStock([...selected], true)} className="h-10 px-4 bg-green-500/15 border border-green-500/25 rounded-xl text-xs text-green-400 hover:bg-green-500/25 transition-colors">Mark In Stock</button>
            <button onClick={() => bulkToggleStock([...selected], false)} className="h-10 px-4 bg-orange-500/15 border border-orange-500/25 rounded-xl text-xs text-orange-400 hover:bg-orange-500/25 transition-colors">Mark Out</button>
            <button onClick={() => setBulkDeleteConfirm(true)} className="h-10 px-4 bg-red-500/15 border border-red-500/25 rounded-xl text-xs text-red-400 hover:bg-red-500/25 transition-colors">Delete ({selected.size})</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(201,169,110,0.1)]">
              <th className="text-left py-3 px-2 w-8">
                <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} className="accent-[#C9A96E]" />
              </th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium">Color</th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium">Name</th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium hidden sm:table-cell">Category</th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium">Price</th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium hidden md:table-cell">Fabric</th>
              <th className="text-left py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium">Stock</th>
              <th className="text-right py-3 px-2 text-[rgba(245,245,240,0.4)] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[rgba(245,245,240,0.04)] hover:bg-[rgba(201,169,110,0.03)] transition-colors">
                <td className="py-3 px-2">
                  <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="accent-[#C9A96E]" />
                </td>
                <td className="py-3 px-2">
                  <div className="w-8 h-8 rounded-lg border border-[rgba(245,245,240,0.1)]" style={{ backgroundColor: p.cssColor }} />
                </td>
                <td className="py-3 px-2">
                  <p className="text-[#F5F5F0] font-medium">{p.name}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-[rgba(201,169,110,0.1)] text-[#C9A96E] uppercase">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2 text-[rgba(245,245,240,0.6)] capitalize hidden sm:table-cell">{p.category}</td>
                <td className="py-3 px-2 text-[#C9A96E] font-semibold">{formatPrice(p.price)}</td>
                <td className="py-3 px-2 text-[rgba(245,245,240,0.5)] hidden md:table-cell">{p.fabric}</td>
                <td className="py-3 px-2">
                  <button onClick={() => toggleStock(p.id)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${p.inStock ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-red-500/30 text-red-400 bg-red-500/10"}`}>
                    {p.inStock ? "In Stock" : "Out"}
                  </button>
                </td>
                <td className="py-3 px-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setEditProduct(p); setFormOpen(true) }} className="w-8 h-8 rounded-lg flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:text-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)] transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[rgba(245,245,240,0.3)]">No products found</div>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <ConfirmDialog message="Are you sure you want to delete this product?" onConfirm={() => { deleteProduct(deleteConfirm); setDeleteConfirm(null); setSelected((s) => { const n = new Set(s); n.delete(deleteConfirm); return n }) }} onCancel={() => setDeleteConfirm(null)} />
      )}
      {bulkDeleteConfirm && (
        <ConfirmDialog message={`Delete ${selected.size} selected products?`} onConfirm={() => { bulkDelete([...selected]); setSelected(new Set()); setBulkDeleteConfirm(false) }} onCancel={() => setBulkDeleteConfirm(false)} />
      )}
    </div>
  )
}

// ─── Review Form ───────────────────────────────────────────
function ReviewForm({ review, onSave, onCancel }: {
  review?: Review
  onSave: (data: Review) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState<Omit<Review, "id"> & { id?: string }>(
    review ?? { name: "", area: "", rating: 5, text: "", initials: "", color: "#E91E63" }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = form.id ?? `rev-${Date.now()}`
    const initials = form.initials || form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    onSave({ ...form, id, initials } as Review)
  }

  const fieldClass = "w-full h-10 bg-[#1a1a1a] border border-[rgba(201,169,110,0.15)] rounded-lg px-3 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A96E] transition-colors"
  const labelClass = "block text-xs text-[rgba(245,245,240,0.5)] mb-1"
  const COLORS = ["#E91E63", "#9C27B0", "#2196F3", "#FF9800", "#4CAF50", "#00BCD4", "#F44336", "#795548"]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Customer Name *</label>
          <input required className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Area / Location *</label>
          <input required className={fieldClass} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Rating (1-5)</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all ${n <= form.rating ? "border-[#C9A96E] bg-[rgba(201,169,110,0.15)] text-[#C9A96E]" : "border-[rgba(245,245,240,0.08)] text-[rgba(245,245,240,0.2)]"}`}>★</button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>Avatar Color</label>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button key={c} type="button" onClick={() => setForm({ ...form, color: c })} className={`w-8 h-8 rounded-full border-2 transition-all ${form.color === c ? "border-white scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className={labelClass}>Review Text *</label>
        <textarea required className={`${fieldClass} h-24 resize-none py-2`} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 h-10 border border-[rgba(245,245,240,0.1)] rounded-xl text-sm text-[rgba(245,245,240,0.6)] hover:bg-[rgba(245,245,240,0.05)] transition-colors">Cancel</button>
        <button type="submit" className="flex-1 h-10 bg-[#C9A96E] text-black rounded-xl text-sm font-semibold hover:bg-[#E8C98A] transition-colors">{review ? "Update Review" : "Add Review"}</button>
      </div>
    </form>
  )
}

// ─── Reviews Tab ───────────────────────────────────────────
function ReviewsPanel() {
  const reviews = useAdminStore((s) => s.reviews)
  const { addReview, updateReview, deleteReview } = useAdminStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editReview, setEditReview] = useState<Review | undefined>()
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const handleSave = (review: Review) => {
    if (editReview) {
      updateReview(review.id, review)
    } else {
      addReview(review)
    }
    setFormOpen(false)
    setEditReview(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-[#F5F5F0]">Reviews ({reviews.length})</h2>
        <button onClick={() => { setEditReview(undefined); setFormOpen(true) }} className="flex items-center gap-2 h-10 px-5 bg-[#C9A96E] text-black rounded-xl text-sm font-semibold hover:bg-[#E8C98A] transition-colors">
          <Plus size={16} /> Add Review
        </button>
      </div>

      <AnimatePresence>
        {formOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90] flex items-center justify-center p-4">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-[#111] border border-[rgba(201,169,110,0.2)] rounded-2xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl text-[#F5F5F0]">{editReview ? "Edit Review" : "Add New Review"}</h3>
                <button onClick={() => { setFormOpen(false); setEditReview(undefined) }} className="text-[rgba(245,245,240,0.4)] hover:text-[#F5F5F0]"><X size={20} /></button>
              </div>
              <ReviewForm review={editReview} onSave={handleSave} onCancel={() => { setFormOpen(false); setEditReview(undefined) }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-[#161616] border border-[rgba(201,169,110,0.08)] rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: r.color }}>
              {r.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[#F5F5F0] font-medium text-sm">{r.name}</p>
                <span className="text-[rgba(245,245,240,0.3)] text-xs">•</span>
                <p className="text-xs text-[rgba(245,245,240,0.4)]">{r.area}</p>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-[#C9A96E] text-xs">★</span>
                ))}
              </div>
              <p className="text-sm text-[rgba(245,245,240,0.65)] line-clamp-2">{r.text}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => { setEditReview(r); setFormOpen(true) }} className="w-8 h-8 rounded-lg flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:text-[#C9A96E] hover:bg-[rgba(201,169,110,0.1)] transition-colors">
                <Pencil size={14} />
              </button>
              <button onClick={() => setDeleteConfirm(r.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {deleteConfirm && (
        <ConfirmDialog message="Delete this review?" onConfirm={() => { deleteReview(deleteConfirm); setDeleteConfirm(null) }} onCancel={() => setDeleteConfirm(null)} />
      )}
    </div>
  )
}

// ─── Settings Tab ──────────────────────────────────────────
function SettingsPanel() {
  const settings = useAdminStore((s) => s.settings)
  const { updateSettings, resetToDefaults } = useAdminStore()
  const [saved, setSaved] = useState(false)

  const fieldClass = "w-full h-10 bg-[#1a1a1a] border border-[rgba(201,169,110,0.15)] rounded-lg px-3 text-sm text-[#F5F5F0] outline-none focus:border-[#C9A96E] transition-colors"
  const labelClass = "block text-xs text-[rgba(245,245,240,0.5)] mb-1"

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="font-display text-2xl text-[#F5F5F0]">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>WhatsApp Number</label>
          <input className={fieldClass} value={settings.whatsappNumber} onChange={(e) => { updateSettings({ whatsappNumber: e.target.value }); showSaved() }} placeholder="919479800674" />
        </div>
        <div>
          <label className={labelClass}>Store Name</label>
          <input className={fieldClass} value={settings.storeName} onChange={(e) => { updateSettings({ storeName: e.target.value }); showSaved() }} />
        </div>
        <div>
          <label className={labelClass}>Tagline</label>
          <input className={fieldClass} value={settings.tagline} onChange={(e) => { updateSettings({ tagline: e.target.value }); showSaved() }} />
        </div>
      </div>

      <div>
        <h3 className="text-sm text-[#C9A96E] font-semibold uppercase tracking-widest mb-3">Stats (About Section)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Years</label>
            <input type="number" className={fieldClass} value={settings.yearsCount} onChange={(e) => { updateSettings({ yearsCount: Number(e.target.value) }); showSaved() }} />
          </div>
          <div>
            <label className={labelClass}>Customers</label>
            <input type="number" className={fieldClass} value={settings.customersCount} onChange={(e) => { updateSettings({ customersCount: Number(e.target.value) }); showSaved() }} />
          </div>
          <div>
            <label className={labelClass}>Designs</label>
            <input type="number" className={fieldClass} value={settings.designsCount} onChange={(e) => { updateSettings({ designsCount: Number(e.target.value) }); showSaved() }} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-400 text-sm">
            <Check size={16} /> Settings saved automatically
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-4 border-t border-[rgba(201,169,110,0.1)]">
        <button onClick={resetToDefaults} className="flex items-center gap-2 h-10 px-5 border border-red-500/25 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-colors">
          <RotateCcw size={14} /> Reset All to Defaults
        </button>
        <p className="text-xs text-[rgba(245,245,240,0.3)] mt-2">This will reset all products, reviews, and settings to original values.</p>
      </div>
    </div>
  )
}

// ─── Main Admin Panel ──────────────────────────────────────
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const { currentUser, logout } = useAdminStore()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-16 md:w-60 bg-[#111] border-r border-[rgba(201,169,110,0.1)] flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-[rgba(201,169,110,0.1)]">
          <p className="font-display text-lg text-[#C9A96E] hidden md:block">Trends Admin</p>
          <p className="font-display text-lg text-[#C9A96E] md:hidden text-center">TB</p>
          {currentUser && (
            <p className="text-xs text-[rgba(245,245,240,0.35)] mt-1 hidden md:block">{currentUser.username} • {currentUser.role}</p>
          )}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-[rgba(201,169,110,0.15)] text-[#C9A96E]"
                  : "text-[rgba(245,245,240,0.5)] hover:text-[#F5F5F0] hover:bg-[rgba(245,245,240,0.03)]"
              }`}
            >
              {tab.icon}
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-[rgba(201,169,110,0.1)]">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {activeTab === "dashboard" && <DashboardPanel />}
        {activeTab === "products" && <ProductsPanel />}
        {activeTab === "reviews" && <ReviewsPanel />}
        {activeTab === "settings" && <SettingsPanel />}
      </main>
    </div>
  )
}
