"use client"

import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  imageUrl?: string
  imageAlt?: string
  isOnSale?: boolean
  isPrescriptionRequired?: boolean
  isInStock?: boolean
  category?: string
  onAddToCart?: () => void
  onAddToWishlist?: () => void
  className?: string
}

export function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  imageAlt,
  isOnSale = false,
  isPrescriptionRequired = false,
  isInStock = true,
  category,
  onAddToCart,
  onAddToWishlist,
  className = "",
}: ProductCardProps) {
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 h-full flex flex-col ${className}`}>
      <CardContent className="p-3 sm:p-4 flex flex-col h-full">
        <div className="relative mb-3 sm:mb-4">
          {/* Product Image */}
          <Link href={`/product/${id}`}>
            <div className="aspect-square bg-light-gray rounded-lg overflow-hidden group-hover:bg-gray-200 transition-colors">
              {imageUrl ? (
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={imageAlt || name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl">📦</span>
                </div>
              )}
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
            {isOnSale && (
              <Badge className="bg-error text-white font-inter text-xs px-1.5 py-0.5">{discountPercentage}% OFF</Badge>
            )}
            {!isInStock && (
              <Badge variant="secondary" className="bg-medium-gray text-charcoal font-inter text-xs px-1.5 py-0.5">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md hover:bg-gray-50 w-7 h-7 sm:w-8 sm:h-8"
            onClick={onAddToWishlist}
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>

          {/* Prescription Badge */}
          {isPrescriptionRequired && (
            <Badge
              variant="secondary"
              className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-warning text-white font-inter text-xs px-1.5 py-0.5"
            >
              <span className="hidden sm:inline">Prescription Required</span>
              <span className="sm:hidden">Rx</span>
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
            <span className="text-xs sm:text-sm text-dark-gray font-inter ml-1">
              ({reviewCount > 999 ? "999+" : reviewCount})
            </span>
          </div>

          {/* Product Info */}
          <Link href={`/product/${id}`}>
            <h3 className="font-inter font-semibold text-charcoal mb-2 line-clamp-2 hover:text-primary-blue transition-colors text-sm sm:text-base">
              {name}
            </h3>
          </Link>

          {description && (
            <p className="text-xs sm:text-sm text-dark-gray font-inter mb-3 line-clamp-2 flex-1">{description}</p>
          )}

          {/* Category */}
          {category && <p className="text-xs text-dark-gray font-inter mb-2 uppercase tracking-wide">{category}</p>}

          {/* Price and Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-primary-blue font-inter">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-dark-gray line-through font-inter">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Badge variant={isPrescriptionRequired ? "secondary" : "outline"} className="font-inter text-xs">
              {isPrescriptionRequired ? "Rx" : "OTC"}
            </Badge>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white font-inter font-medium text-xs sm:text-sm py-2 sm:py-2.5"
            onClick={onAddToCart}
            disabled={!isInStock}
          >
            {isInStock ? (
              <>
                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            ) : (
              <span className="text-xs sm:text-sm">Out of Stock</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
