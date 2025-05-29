"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PromotionItem {
  id: string
  type: "product" | "promotion" | "category"
  title: string
  description?: string
  price?: number
  originalPrice?: number
  discount?: number
  rating?: number
  reviewCount?: number
  image: string
  href: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  ctaText?: string
}

interface PromotionCarouselProps {
  items: PromotionItem[]
  title?: string
  subtitle?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
  showNavigation?: boolean
  showDots?: boolean
  className?: string
}

export function PromotionCarousel({
  items,
  title,
  subtitle,
  autoPlay = true,
  autoPlayInterval = 4000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  showNavigation = true,
  showDots = true,
  className = "",
}: PromotionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.mobile)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Responsive items per view
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
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

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isHovered || items.length <= itemsToShow) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, items.length - itemsToShow)
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, items.length, itemsToShow, autoPlayInterval])

  const maxIndex = Math.max(0, items.length - itemsToShow)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  if (items.length === 0) return null

  const totalSlides = Math.ceil(items.length / itemsToShow)

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 md:mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 font-montserrat text-charcoal">{title}</h2>
          )}
          {subtitle && <p className="text-gray-600 font-inter text-sm md:text-base">{subtitle}</p>}
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
              width: `${(items.length * 100) / itemsToShow}%`,
            }}
          >
            {items.map((item, index) => (
              <div key={item.id} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${100 / items.length}%` }}>
                <PromotionCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {showNavigation && items.length > itemsToShow && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white shadow-lg hover:shadow-xl z-10 w-10 h-10 md:w-12 md:h-12"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white shadow-lg hover:shadow-xl z-10 w-10 h-10 md:w-12 md:h-12"
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
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
    </div>
  )
}

function PromotionCard({ item }: { item: PromotionItem }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={item.image || "/placeholder.svg?height=300&width=300"}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Badge */}
          {item.badge && (
            <Badge variant={item.badge.variant || "destructive"} className="absolute top-2 left-2 text-xs font-medium">
              {item.badge.text}
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white w-8 h-8"
          >
            <Heart className="w-4 h-4" />
          </Button>

          {/* Quick Action Overlay */}
          {item.type === "product" && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" className="bg-white text-primary-blue hover:bg-gray-100">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-4">
          {/* Rating (for products) */}
          {item.type === "product" && item.rating && (
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-3 h-3 md:w-4 md:h-4",
                    star <= item.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
              {item.reviewCount && <span className="text-xs text-gray-600 ml-1 font-inter">({item.reviewCount})</span>}
            </div>
          )}

          {/* Title */}
          <Link href={item.href}>
            <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 hover:text-primary-blue transition-colors font-inter">
              {item.title}
            </h3>
          </Link>

          {/* Description */}
          {item.description && (
            <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 font-inter">{item.description}</p>
          )}

          {/* Price (for products) */}
          {item.type === "product" && item.price && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-primary-blue font-inter">${item.price.toFixed(2)}</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-500 line-through font-inter">${item.originalPrice.toFixed(2)}</span>
              )}
              {item.discount && (
                <Badge variant="destructive" className="text-xs">
                  -{item.discount}%
                </Badge>
              )}
            </div>
          )}

          {/* CTA Button */}
          <Button asChild size="sm" className="w-full text-xs md:text-sm">
            <Link href={item.href}>{item.ctaText || (item.type === "product" ? "Add to Cart" : "Learn More")}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
