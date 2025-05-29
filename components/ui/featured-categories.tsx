"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, ArrowRight, TrendingUp, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoryData {
  id: string
  name: string
  description: string
  href: string
  image: string
  icon?: React.ReactNode
  productCount: number
  trending?: boolean
  popular?: boolean
  featured?: boolean
  color: {
    primary: string
    secondary: string
    accent: string
  }
  stats?: {
    avgRating?: number
    totalReviews?: number
    newProducts?: number
  }
}

interface FeaturedCategoriesProps {
  categories: CategoryData[]
  title?: string
  subtitle?: string
  layout?: "grid" | "carousel" | "masonry"
  showStats?: boolean
  showViewAll?: boolean
  maxItems?: number
  className?: string
}

export function FeaturedCategories({
  categories,
  title = "Shop by Category",
  subtitle = "Discover our comprehensive range of health and wellness products",
  layout = "grid",
  showStats = true,
  showViewAll = true,
  maxItems,
  className = "",
}: FeaturedCategoriesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const displayCategories = maxItems ? categories.slice(0, maxItems) : categories

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("featured-categories")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const getLayoutClasses = () => {
    switch (layout) {
      case "carousel":
        return "flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      case "masonry":
        return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6"
      default:
        return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
    }
  }

  return (
    <section id="featured-categories" className={cn("py-8 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="space-y-2 md:space-y-3">
            <h2
              className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-charcoal transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={cn(
                  "text-gray-600 font-inter text-sm md:text-base lg:text-lg max-w-2xl transition-all duration-700 delay-100",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          {showViewAll && (
            <Button
              asChild
              variant="outline"
              className={cn(
                "group transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              <Link href="/categories">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </div>

        {/* Categories Grid/Carousel */}
        <div className={getLayoutClasses()}>
          {displayCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              layout={layout}
              showStats={showStats}
              isVisible={isVisible}
              isHovered={hoveredCategory === category.id}
              onHover={setHoveredCategory}
            />
          ))}
        </div>

        {/* Category Stats Summary */}
        {showStats && (
          <div
            className={cn(
              "mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <StatCard
              icon={<TrendingUp className="w-5 h-5 md:w-6 md:h-6" />}
              value="10,000+"
              label="Products Available"
              color="text-primary-blue"
            />
            <StatCard
              icon={<Users className="w-5 h-5 md:w-6 md:h-6" />}
              value="50,000+"
              label="Happy Customers"
              color="text-secondary-teal"
            />
            <StatCard
              icon={<Star className="w-5 h-5 md:w-6 md:h-6" />}
              value="4.8/5"
              label="Average Rating"
              color="text-yellow-500"
            />
            <StatCard
              icon={<ChevronRight className="w-5 h-5 md:w-6 md:h-6" />}
              value="24/7"
              label="Expert Support"
              color="text-green-500"
            />
          </div>
        )}
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: CategoryData
  index: number
  layout: "grid" | "carousel" | "masonry"
  showStats: boolean
  isVisible: boolean
  isHovered: boolean
  onHover: (id: string | null) => void
}

function CategoryCard({ category, index, layout, showStats, isVisible, isHovered, onHover }: CategoryCardProps) {
  const cardDelay = Math.min(index * 100, 600)

  return (
    <Link href={category.href} className={layout === "carousel" ? "flex-shrink-0 w-64 snap-start" : ""}>
      <Card
        className={cn(
          "group relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer h-full",
          layout === "masonry" && "break-inside-avoid mb-4 md:mb-6",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
        style={{
          transitionDelay: `${cardDelay}ms`,
          background: `linear-gradient(135deg, ${category.color.primary}15 0%, ${category.color.secondary}10 100%)`,
        }}
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
      >
        <CardContent className="p-0 relative">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-5 transition-opacity duration-500 group-hover:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, ${category.color.accent} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${category.color.primary} 0%, transparent 50%)`,
            }}
          />

          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={category.image || "/placeholder.svg?height=300&width=300"}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {category.trending && (
                <Badge variant="destructive" className="text-xs font-medium animate-pulse">
                  🔥 Trending
                </Badge>
              )}
              {category.popular && (
                <Badge variant="secondary" className="text-xs font-medium">
                  ⭐ Popular
                </Badge>
              )}
              {category.featured && <Badge className="text-xs font-medium bg-primary-blue">✨ Featured</Badge>}
            </div>

            {/* Product Count */}
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
                {category.productCount}+ items
              </Badge>
            </div>

            {/* Hover Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <Button size="sm" className="bg-white text-primary-blue hover:bg-gray-100 font-medium shadow-lg">
                Explore Category
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-3">
            {/* Category Icon & Name */}
            <div className="flex items-center gap-3">
              {category.icon && (
                <div
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: `${category.color.primary}20` }}
                >
                  <div style={{ color: category.color.primary }}>{category.icon}</div>
                </div>
              )}
              <h3 className="font-semibold text-base md:text-lg font-montserrat text-charcoal group-hover:text-primary-blue transition-colors duration-300">
                {category.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 font-inter text-sm md:text-base leading-relaxed line-clamp-2">
              {category.description}
            </p>

            {/* Stats */}
            {showStats && category.stats && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs md:text-sm text-gray-500">
                  {category.stats.avgRating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{category.stats.avgRating}</span>
                    </div>
                  )}
                  {category.stats.totalReviews && <span>({category.stats.totalReviews} reviews)</span>}
                </div>
                {category.stats.newProducts && (
                  <Badge variant="outline" className="text-xs">
                    {category.stats.newProducts} new
                  </Badge>
                )}
              </div>
            )}

            {/* Action Indicator */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs md:text-sm text-gray-500 font-inter">Shop {category.name.toLowerCase()}</span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-all duration-300",
                  isHovered ? "text-primary-blue translate-x-1" : "",
                )}
              />
            </div>
          </div>

          {/* Animated Border */}
          <div
            className={cn("absolute bottom-0 left-0 h-1 transition-all duration-500", isHovered ? "w-full" : "w-0")}
            style={{ backgroundColor: category.color.primary }}
          />
        </CardContent>
      </Card>
    </Link>
  )
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode
  value: string
  label: string
  color: string
}) {
  return (
    <div className="text-center p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className={cn("flex justify-center mb-2 md:mb-3", color)}>{icon}</div>
      <div className="font-bold text-lg md:text-xl lg:text-2xl font-montserrat text-charcoal mb-1">{value}</div>
      <div className="text-xs md:text-sm text-gray-600 font-inter">{label}</div>
    </div>
  )
}
