export type ModelType =
  | "woman-young"
  | "woman-middle"
  | "woman-elderly"
  | "man-young"
  | "man-middle"
  | "man-elderly"
  | "girl-child"
  | "boy-child"

export interface ModelAvatar {
  id: ModelType
  label: string
  emoji: string
  description: string
}

export interface TryOnParams {
  productName: string
  fabric: string
  color: string
  pattern: string
  price: number
  modelType: ModelType
  customDescription?: string
}

export interface TryOnResult {
  visualDescription: string
  stylingTips: string[]
  occasions: string[]
  accessories: string
  careTips: string
  rawText: string
}

export interface TryOnState {
  selectedProduct: import("./product").Product | null
  selectedModel: ModelType | null
  customDescription: string
  result: string | null
  isLoading: boolean
  error: string | null
}
