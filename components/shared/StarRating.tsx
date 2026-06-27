"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md"
}

export default function StarRating({ rating, reviewCount, size = "sm" }: StarRatingProps) {
  const starSize = size === "sm" ? 12 : 16
  const filled = Math.floor(rating)
  const partial = rating - filled

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < filled
          const isPartial = i === filled && partial > 0
          return (
            <div key={i} className="relative" style={{ width: starSize, height: starSize }}>
              {/* Background star */}
              <Star
                size={starSize}
                className="text-[#2a2a2a] absolute inset-0"
                fill="currentColor"
              />
              {/* Filled star */}
              {(isFilled || isPartial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isFilled ? "100%" : `${partial * 100}%` }}
                >
                  <Star
                    size={starSize}
                    className="text-[#C9A96E]"
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <span className="text-[#C9A96E] font-semibold text-xs">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-[rgba(245,245,240,0.4)] text-xs">({reviewCount})</span>
      )}
    </div>
  )
}
