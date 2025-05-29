import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  reviewCount?: number
  className?: string
}

export function Rating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className = "",
}: RatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= Math.floor(rating)
          const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0

          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                isFilled || isHalfFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
              )}
            />
          )
        })}
      </div>
      {showValue && <span className={cn("text-dark-gray font-inter", textSizeClasses[size])}>{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className={cn("text-dark-gray font-inter", textSizeClasses[size])}>({reviewCount})</span>
      )}
    </div>
  )
}
