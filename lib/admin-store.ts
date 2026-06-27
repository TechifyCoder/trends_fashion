"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type Product } from "@/types/product"
import { products as defaultProducts } from "@/lib/products"

// ─── Types ─────────────────────────────────────────────────
export interface Review {
  id: string
  name: string
  area: string
  rating: number
  text: string
  initials: string
  color: string
}

export interface SiteSettings {
  whatsappNumber: string
  storeName: string
  tagline: string
  yearsCount: number
  customersCount: number
  designsCount: number
}

export interface AdminUser {
  username: string
  role: string
}

interface AdminState {
  // Auth
  isLoggedIn: boolean
  currentUser: AdminUser | null
  login: (username: string, password: string) => boolean
  logout: () => void

  // Products
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  toggleStock: (id: string) => void
  bulkDelete: (ids: string[]) => void
  bulkToggleStock: (ids: string[], inStock: boolean) => void

  // Reviews
  reviews: Review[]
  addReview: (review: Review) => void
  updateReview: (id: string, updates: Partial<Review>) => void
  deleteReview: (id: string) => void

  // Settings
  settings: SiteSettings
  updateSettings: (updates: Partial<SiteSettings>) => void

  // Reset
  resetToDefaults: () => void
}

// ─── Hardcoded Credentials ─────────────────────────────────
const ADMIN_CREDENTIALS: { username: string; password: string; role: string }[] = [
  { username: "satish", password: "trends@2024", role: "Super Admin" },
  { username: "admin", password: "boutique#admin", role: "Admin" },
  { username: "manager", password: "store@mgr01", role: "Manager" },
  { username: "staff", password: "trends#staff", role: "Staff" },
]

// ─── Default Reviews ───────────────────────────────────────
const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-001",
    name: "Priya Sharma",
    area: "Vijay Nagar, Indore",
    rating: 5,
    text: "Bahut sundar collection hai! Maine apni behen ki shaadi ke liye yahan se bridal lehenga liya — sabne tarif ki. Quality ekdum first-class. Trends Boutique is the best!",
    initials: "PS",
    color: "#E91E63",
  },
  {
    id: "rev-002",
    name: "Sunita Verma",
    area: "Palasia, Indore",
    rating: 5,
    text: "Navratri ke liye chaniya choli liya tha — dono bahenen ke liye. Price bhi sahi tha aur delivery bhi time pe. Ab toh bas yahan se hi leti hoon!",
    initials: "SV",
    color: "#9C27B0",
  },
  {
    id: "rev-003",
    name: "Kavita Malhotra",
    area: "New Palasia, Indore",
    rating: 5,
    text: "The AI try-on feature is amazing! Mujhe pehle se idea aa gaya ki outfit kaisi lagegi. Phir shop mein aayi aur wahi liya jo AI ne suggest kiya. Perfect fit!",
    initials: "KM",
    color: "#2196F3",
  },
  {
    id: "rev-004",
    name: "Anita Joshi",
    area: "Rajwada Area",
    rating: 5,
    text: "Custom stitching bahut acha karte hain! Meri saree perfect size mein aayi. Owner bhi bahut friendly hain. Rajwada ke paas hone se aana bhi aasaan hai.",
    initials: "AJ",
    color: "#FF9800",
  },
  {
    id: "rev-005",
    name: "Deepa Agarwal",
    area: "MG Road, Indore",
    rating: 5,
    text: "Maine western fusion section mein se ek gorgeous co-ord set liya. Office aur party dono ke liye perfect. Quality is outstanding for the price!",
    initials: "DA",
    color: "#4CAF50",
  },
]

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "919479800674",
  storeName: "Trends Boutique",
  tagline: "Indore ki Pehchan, Fashion ki Zuban",
  yearsCount: 8,
  customersCount: 500,
  designsCount: 3000,
}

// ─── Store ─────────────────────────────────────────────────
export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      // Auth
      isLoggedIn: false,
      currentUser: null,

      login: (username: string, password: string): boolean => {
        const match = ADMIN_CREDENTIALS.find(
          (c) => c.username === username && c.password === password
        )
        if (match) {
          set({ isLoggedIn: true, currentUser: { username: match.username, role: match.role } })
          return true
        }
        return false
      },

      logout: () => set({ isLoggedIn: false, currentUser: null }),

      // Products
      products: defaultProducts,

      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      toggleStock: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, inStock: !p.inStock } : p
          ),
        })),

      bulkDelete: (ids) =>
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p.id)),
        })),

      bulkToggleStock: (ids, inStock) =>
        set((state) => ({
          products: state.products.map((p) =>
            ids.includes(p.id) ? { ...p, inStock } : p
          ),
        })),

      // Reviews
      reviews: DEFAULT_REVIEWS,

      addReview: (review) =>
        set((state) => ({ reviews: [review, ...state.reviews] })),

      updateReview: (id, updates) =>
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      deleteReview: (id) =>
        set((state) => ({
          reviews: state.reviews.filter((r) => r.id !== id),
        })),

      // Settings
      settings: DEFAULT_SETTINGS,

      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      // Reset
      resetToDefaults: () =>
        set({
          products: defaultProducts,
          reviews: DEFAULT_REVIEWS,
          settings: DEFAULT_SETTINGS,
        }),
    }),
    {
      name: "trends-boutique-admin",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        currentUser: state.currentUser,
        products: state.products,
        reviews: state.reviews,
        settings: state.settings,
      }),
    }
  )
)
