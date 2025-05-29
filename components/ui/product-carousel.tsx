"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart, Eye, TrendingUp, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  image: string
  href: string
  category: string
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isPrescriptionRequired?: boolean
  tags?: string[]
  brand?: string
  quickViewEnabled?: boolean
}

interface ProductCarouselProps {
  products: Product[]
  title: string
  subtitle?: string
  type?: "recommended" | "featured" | "bestselling" | "trending" | "recently-viewed" | "related"
  autoPlay?: boolean
  autoPlayInterval?: number
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
    wide: number
  }
  showNavigation?: boolean
  showDots?: boolean
  showQuickActions?: boolean
  showViewAll?: boolean
  enableQuickView?: boolean
  className?: string
  onProductClick?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  onQuickView?: (product: Product) => void
}

export function ProductCarousel({
  products,
  title,
  subtitle,
  type = "featured",
  autoPlay = false,
  autoPlayInterval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4, wide: 5 },
  showNavigation = true,
  showDots = true,
  showQuickActions = true,
  showViewAll = true,
  enableQuickView = false,
  className = "",
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.mobile)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  // Responsive items calculation
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1536) {
        setItemsToShow(itemsPerView.wide)
      } else if (window.innerWidth >= 1024) {
        setItemsToShow(itemsPerView.desktop)
      } else if (window.innerWidth >= 768) {
        setItemsToShow(itemsPerView.tablet)
      } else {
        setItemsToShow(itemsPerView.mobile)
      }
    }

    updateItemsToShow()
    window.addEventListener("resize", updateItemsToShow)
    return () => window.removeEventListener("resize", updateItemsToShow)
  }, [itemsPerView])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, products.length - itemsToShow)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, autoPlayInterval)
  }, [products.length, itemsToShow, autoPlayInterval])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [])

  useEffect(() => {
    if (isPlaying && !isHovered && isVisible && products.length > itemsToShow) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }

    return stopAutoPlay
  }, [isPlaying, isHovered, isVisible, products.length, itemsToShow, startAutoPlay, stopAutoPlay])

  const maxIndex = Math.max(0, products.length - itemsToShow)
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < maxIndex

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  const getTypeIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
      case "recently-viewed":
        return <Clock className="w-4 h-4 md:w-5 md:h-5" />
      case "bestselling":
        return <Zap className="w-4 h-4 md:w-5 md:h-5" />
      default:
        return <Star className="w-4 h-4 md:w-5 md:h-5" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "trending":
        return "text-red-500"
      case "recently-viewed":
        return "text-blue-500"
      case "bestselling":
        return "text-yellow-500"
      case "recommended":
        return "text-green-500"
      default:
        return "text-primary-blue"
    }
  }

  if (products.length === 0) return null

  return (
    <section
      ref={carouselRef}
      className={cn("py-8 md:py-12", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 md:gap-3">
              <div className={cn("flex items-center justify-center", getTypeColor())}>{getTypeIcon()}</div>
              <h2
                className={cn(
                  "text-xl md:text-2xl lg:text-3xl font-bold font-montserrat text-charcoal transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                {title}
              </h2>
              {type === "trending" && (
                <Badge variant="destructive" className="animate-pulse text-xs">
                  🔥 Hot
                </Badge>
              )}
            </div>
            {subtitle && (
              <p
                className={cn(
                  "text-gray-600 font-inter text-sm md:text-base transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-play control */}
            {autoPlay && (
              <Button variant="ghost" size="sm" onClick={() => setIsPlaying(!isPlaying)} className="hidden md:flex">
                {isPlaying ? "Pause" : "Play"}
              </Button>
            )}

            {/* View All */}
            {showViewAll && (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "transition-all duration-700 delay-200",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                <Link href={`/categories?type=${type}`}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Products Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
                width: `${(products.length * 100) / itemsToShow}%`,
              }}
            >
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <ProductCard
                    product={product}
                    index={index}
                    isVisible={isVisible}
                    showQuickActions={showQuickActions}
                    enableQuickView={enableQuickView}
                    onProductClick={onProductClick}
                    onAddToCart={onAddToCart}
                    onAddToWishlist={onAddToWishlist}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {showNavigation && products.length > itemsToShow && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg hover:shadow-xl z-10 w-10 h-10 md:w-12 md:h-12 transition-all duration-300",
                  canGoPrevious ? "opacity-100" : "opacity-50 cursor-not-allowed",
                )}
                onClick={goToPrevious}
                disabled={!canGoPrevious}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white shadow-lg hover:shadow-xl z-10 w-10 h-10 md:w-12 md:h-12 transition-all duration-300",
                  canGoNext ? "opacity-100" : "opacity-50 cursor-not-allowed",
                )}
                onClick={goToNext}
                disabled={!canGoNext}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {showDots && products.length > itemsToShow && (
          <div className="flex justify-center mt-6 md:mt-8">
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(products.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                    Math.floor(currentIndex / itemsToShow) === index
                      ? "bg-primary-blue scale-125"
                      : "bg-gray-300 hover:bg-gray-400",
                  )}
                  onClick={() => goToSlide(index * itemsToShow)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {autoPlay && isPlaying && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-primary-blue transition-all duration-100 ease-linear"
              style={{
                width: `${((Date.now() % autoPlayInterval) / autoPlayInterval) * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

interface ProductCardProps {
  product: Product
  index: number
  isVisible: boolean
  showQuickActions: boolean
  enableQuickView: boolean
  onProductClick?: (product: Product) => void
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
  onQuickView?: (product: Product) => void
}

function ProductCard({
  product,
  index,
  isVisible,
  showQuickActions,
  enableQuickView,
  onProductClick,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardDelay = Math.min(index * 100, 600)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleProductClick = () => {
    onProductClick?.(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(product)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  return (
    <Link href={product.href} onClick={handleProductClick}>
      <Card
        className={cn(
          "group relative overflow-hidden border border-gray-200 hover:border-primary-blue hover:shadow-xl transition-all duration-500 cursor-pointer h-full",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          !product.inStock && "opacity-75",
        )}
        style={{ transitionDelay: `${cardDelay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0 relative">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full animate-bounce" />
              </div>
            )}

            {/* Product Image */}
            <img
              src={product.image || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
                isHovered ? "scale-110" : "scale-100",
              )}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-black/40 transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {!product.inStock && (
                <Badge variant="secondary" className="text-xs font-medium bg-gray-500 text-white">
                  Out of Stock
                </Badge>
              )}
              {product.isNew && (
                <Badge variant="secondary" className="text-xs font-medium bg-green-500 text-white">
                  New
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge variant="default" className="text-xs font-medium bg-yellow-500 text-white">
                  Best Seller
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="text-xs font-medium">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Prescription Badge */}
            {product.isPrescriptionRequired && (
              <Badge variant="outline" className="absolute top-2 right-2 text-xs bg-white/90 backdrop-blur-sm">
                Rx Required
              </Badge>
            )}

            {/* Quick Actions */}
            {showQuickActions && (
              <div
                className={cn(
                  "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 transition-all duration-300",
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75",
                )}
              >
                {enableQuickView && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-charcoal shadow-lg"
                    onClick={handleQuickView}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  className="bg-primary-blue hover:bg-primary-blue-hover text-white shadow-lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute bottom-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 shadow-md w-8 h-8 transition-all duration-300",
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
              onClick={handleAddToWishlist}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-3 md:p-4 space-y-2 md:space-y-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-3 h-3 md:w-4 md:h-4",
                    star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
              <span className="text-xs md:text-sm text-gray-600 ml-1 font-inter">
                ({product.reviewCount > 999 ? "999+" : product.reviewCount})
              </span>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="font-semibold text-sm md:text-base font-inter text-charcoal line-clamp-2 group-hover:text-primary-blue transition-colors">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-xs md:text-sm text-gray-600 font-inter line-clamp-2 mt-1">{product.description}</p>
              )}
            </div>

            {/* Brand & Category */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {product.brand && <span className="font-medium">{product.brand}</span>}
              <span className="uppercase tracking-wide">{product.category}</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg md:text-xl font-bold text-primary-blue font-inter">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through font-inter">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <Badge variant={product.isPrescriptionRequired ? "secondary" : "outline"} className="text-xs">
                {product.isPrescriptionRequired ? "Rx" : "OTC"}
              </Badge>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-primary-blue hover:bg-primary-blue-hover text-white font-medium text-sm py-2"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </Button>
          </div>

          {/* Hover Border Effect */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-1 bg-primary-blue transition-all duration-500",
              isHovered ? "w-full" : "w-0",
            )}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
