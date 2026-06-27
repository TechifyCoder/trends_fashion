"use client"

import { create } from "zustand"
import { type Product } from "@/types/product"
import { type ModelType } from "@/types/tryon"
import { generateTryOn } from "@/lib/gemini"

interface TryOnStore {
  selectedProduct: Product | null
  selectedModel: ModelType | null
  customDescription: string
  result: string | null
  isLoading: boolean
  error: string | null
  isOpen: boolean
  setProduct: (product: Product) => void
  setModel: (model: ModelType) => void
  setDescription: (desc: string) => void
  generate: () => Promise<void>
  reset: () => void
  openModal: (product: Product) => void
  closeModal: () => void
}

export const useTryOnStore = create<TryOnStore>((set, get) => ({
  selectedProduct: null,
  selectedModel: null,
  customDescription: "",
  result: null,
  isLoading: false,
  error: null,
  isOpen: false,

  setProduct: (product) => set({ selectedProduct: product, result: null }),
  setModel: (model) => set({ selectedModel: model, result: null, error: null }),
  setDescription: (desc) => set({ customDescription: desc }),

  generate: async () => {
    const { selectedProduct, selectedModel, customDescription } = get()
    if (!selectedProduct || !selectedModel) {
      set({ error: "Please select a product and model type first." })
      return
    }

    set({ isLoading: true, error: null, result: null })
    try {
      const text = await generateTryOn({
        productName: selectedProduct.name,
        fabric: selectedProduct.fabric,
        color: selectedProduct.colors[0] ?? "Multi",
        pattern: selectedProduct.patternType,
        price: selectedProduct.price,
        modelType: selectedModel,
        customDescription: customDescription || undefined,
      })
      set({ result: text, isLoading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Something went wrong. Please try again.",
        isLoading: false,
      })
    }
  },

  reset: () =>
    set({ result: null, error: null, customDescription: "", selectedModel: null }),

  openModal: (product) =>
    set({ isOpen: true, selectedProduct: product, result: null, error: null, selectedModel: null }),

  closeModal: () =>
    set({ isOpen: false, result: null, error: null, customDescription: "" }),
}))
