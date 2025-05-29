"use client"

import Link from "next/link"
import { Star, Heart, ShoppingCart, Eye, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface EnhancedProductCardProps {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  imageUrl?: string
  imageAlt?: string
  isNew?: boolean
  isOnSale?: boolean
  isPrescriptionRequired?: boolean
  isInStock?: boolean
  category?: string
  brand?: string
  onAddToCart?: (quantity: number) => void
  onAddToWishlist?: () => void
  onQuickView?: () => void
  className?: string
  viewMode?: "grid" | "list"
}

export function EnhancedProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  imageAlt,
  isNew = false,
  isOnSale = false,
  isPrescriptionRequired = false,
  isInStock = true,
  category,
  brand,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  className = "",
  viewMode = "grid",
}: EnhancedProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    onAddToCart?.(quantity)
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  if (viewMode === "list") {
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative flex-shrink-0 w-32 h-32">
              <Link href={`/product/${id}`}>
                <div className="w-full h-full bg-light-gray rounded-lg overflow-hidden group-hover:bg-gray-200 transition-colors">
                  {imageUrl ? (
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={imageAlt || name}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">📦</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Badges */}
              <div className="absolute top-1 left-1 flex flex-col gap-1">
                {isNew && (
                  <Badge className="bg-green-500 text-white font-semibold text-xs px-1.5 py-0.5 animate-pulse">
                    NEW
                  </Badge>
                )}
                {isOnSale && (
                  <Badge className="bg-red-500 text-white font-semibold text-xs px-1.5 py-0.5">
                    {discountPercentage}% OFF
                  </Badge>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Category and Brand */}
                {(category || brand) && (
                  <div className="flex items-center gap-2 mb-2">
                    {category && (
                      <Badge variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    )}
                    {brand && <span className="text-xs text-gray-500 uppercase tracking-wide">{brand}</span>}
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-sm text-dark-gray font-inter ml-1">({reviewCount})</span>
                </div>

                {/* Product Info */}
                <Link href={`/product/${id}`}>
                  <h3 className="font-inter font-semibold text-charcoal mb-2 hover:text-primary-blue transition-colors">
                    {name}
                  </h3>
                </Link>

                {description && <p className="text-sm text-dark-gray font-inter mb-3 line-clamp-2">{description}</p>}

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-bold text-primary-blue font-inter">${price.toFixed(2)}</span>
                  {originalPrice && (
                    <span className="text-sm text-dark-gray line-through font-inter">${originalPrice.toFixed(2)}</span>
                  )}
                  <Badge variant={isPrescriptionRequired ? "secondary" : "outline"} className="ml-auto">
                    {isPrescriptionRequired ? "Rx" : "OTC"}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Quantity Selector */}
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                {/* Add to Cart */}
                <Button
                  className="flex-1 bg-primary-blue hover:bg-primary-blue-hover text-white"
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                {/* Wishlist */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isWishlisted ? "bg-red-50 border-red-200 text-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>

                {/* Quick View */}
                <Button variant="outline" size="icon" onClick={onQuickView}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Grid view (default)
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 h-full flex flex-col ${className}`}>
      <CardContent className="p-3 sm:p-4 flex flex-col h-full">
        <div className="relative mb-3 sm:mb-4">
          {/* Product Image */}
          <Link href={`/product/${id}`}>
            <div className="aspect-square bg-light-gray rounded-lg overflow-hidden group-hover:bg-gray-200 transition-colors relative">
              {imageUrl ? (
                <>
                  {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>}
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={imageAlt || name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    } group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl">📦</span>
                </div>
              )}
            </div>
          </Link>

          {/* Badges */}
          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-green-500 text-white font-semibold text-xs px-1.5 py-0.5 animate-pulse">NEW</Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-500 text-white font-semibold text-xs px-1.5 py-0.5">
                {discountPercentage}% OFF
              </Badge>
            )}
            {!isInStock && (
              <Badge variant="secondary" className="bg-gray-500 text-white text-xs px-1.5 py-0.5">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-50 w-7 h-7 sm:w-8 sm:h-8"
              onClick={handleWishlistToggle}
            >
              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-50 w-7 h-7 sm:w-8 sm:h-8"
              onClick={onQuickView}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          {/* Prescription Badge */}
          {isPrescriptionRequired && (
            <Badge
              variant="secondary"
              className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-warning text-white text-xs px-1.5 py-0.5"
            >
              <span className="hidden sm:inline">Prescription Required</span>
              <span className="sm:hidden">Rx</span>
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category and Brand */}
          {(category || brand) && (
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              {brand && <span className="text-xs text-gray-500 uppercase tracking-wide">{brand}</span>}
            </div>
          )}

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

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-primary-blue font-inter">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs sm:text-sm text-dark-gray line-through font-inter">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <Badge variant={isPrescriptionRequired ? "secondary" : "outline"} className="text-xs">
              {isPrescriptionRequired ? "Rx" : "OTC"}
            </Badge>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-2">
            {/* Quantity Selector */}
            <div className="flex items-center justify-center border rounded-md w-fit mx-auto">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white font-inter font-medium text-xs sm:text-sm py-2 sm:py-2.5"
              onClick={handleAddToCart}
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
        </div>
      </CardContent>
    </Card>
  )
}
