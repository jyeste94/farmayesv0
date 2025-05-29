"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp, Package, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

interface FeaturedCategory {
  id: string
  name: string
  description: string
  href: string
  image: string
  backgroundImage?: string
  featured?: boolean
  trending?: boolean
  popular?: boolean
  productCount: number
  highlightColor?: string
  textColor?: "light" | "dark"
  specialOffer?: {
    text: string
    discount: string
  }
  color?: {
    primary: string
    secondary: string
    accent: string
  }
  stats?: {
    avgRating: number
    totalReviews: number
    newProducts: number
  }
  icon?: React.ReactNode
}

interface FeaturedCategoriesProps {
  categories: FeaturedCategory[]
  title?: string
  subtitle?: string
  layout?: "grid" | "carousel"
  showStats?: boolean
  showViewAll?: boolean
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  className?: string
}

export function FeaturedCategories({
  categories,
  title = "Explore Our Categories",
  subtitle = "Find exactly what you need for your health and wellness journey",
  layout = "grid",
  showStats = false,
  showViewAll = true,
  isLoading = false,
  error = null,
  onRetry,
  className = "",
}: FeaturedCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Handle loading state
  if (isLoading) {
    return (
      <section className={cn("py-8 md:py-16", className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-charcoal mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-gray-600 font-inter text-sm md:text-base lg:text-lg max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-lg">Cargando categorías...</span>
          </div>
        </div>
      </section>
    )
  }

  // Handle error state
  if (error) {
    return (
      <section className={cn("py-8 md:py-16", className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-charcoal mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-gray-600 font-inter text-sm md:text-base lg:text-lg max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <Package className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-semibold">Error al cargar categorías</p>
              <p className="text-sm">{error}</p>
            </div>
            {onRetry && (
              <Button onClick={onRetry} variant="outline">
                Reintentar
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <section className={cn("py-8 md:py-16", className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-charcoal mb-3 md:mb-4">
              {title}
            </h2>
            <p className="text-gray-600 font-inter text-sm md:text-base lg:text-lg max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay categorías disponibles</h3>
            <p className="text-gray-500 mb-4">Las categorías se cargarán desde PrestaShop</p>
            {onRetry && (
              <Button onClick={onRetry} variant="outline">
                Recargar Categorías
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Adapt layout based on number of categories
  const adaptiveLayout = categories.length <= 2 ? "simple" : categories.length <= 4 ? "compact" : "full"

  const getStatusInfo = () => {
    if (isLoading) {
      return {
        icon: <Clock className="w-4 h-4" />,
        status: "Cargando...",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
      }
    }

    if (error) {
      return {
        icon: <Package className="w-4 h-4" />,
        status: "Error",
        color: "bg-red-500",
        textColor: "text-red-700",
      }
    }

    return {
      icon: <CheckCircle className="w-4 h-4" />,
      status: "Conectado",
      color: "bg-green-500",
      textColor: "text-green-700",
    }
  }

  return (
    <section className={cn("py-8 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-montserrat text-charcoal mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-gray-600 font-inter text-sm md:text-base lg:text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Adaptive Grid Layout */}
        {adaptiveLayout === "simple" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                size="large"
                showStats={showStats}
                isActive={activeCategory === category.id}
                onHover={setActiveCategory}
              />
            ))}
          </div>
        )}

        {adaptiveLayout === "compact" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                size="medium"
                showStats={showStats}
                isActive={activeCategory === category.id}
                onHover={setActiveCategory}
              />
            ))}
          </div>
        )}

        {adaptiveLayout === "full" && (
          <>
            {/* Featured Categories - Large Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  size="large"
                  showStats={showStats}
                  isActive={activeCategory === category.id}
                  onHover={setActiveCategory}
                />
              ))}
            </div>

            {/* Additional Categories - Small Cards */}
            {categories.length > 3 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.slice(3, 9).map((category) => (
                  <QuickAccessCard key={`quick-${category.id}`} category={category} />
                ))}
              </div>
            )}
          </>
        )}

        {/* View All Button */}
        {showViewAll && categories.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/products-prestashop">
              <Button variant="outline" size="lg">
                Ver Todos los Productos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

interface CategoryCardProps {
  category: FeaturedCategory
  size: "small" | "medium" | "large"
  showStats: boolean
  isActive: boolean
  onHover: (id: string | null) => void
}

function CategoryCard({ category, size, showStats, isActive, onHover }: CategoryCardProps) {
  const isLarge = size === "large"
  const isMedium = size === "medium"

  const highlightColor = category.color?.primary || category.highlightColor || "#3b82f6"

  return (
    <Link href={category.href}>
      <Card
        className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer h-full"
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
      >
        <CardContent className="p-0 relative">
          {/* Background Image */}
          <div
            className={cn(
              "relative overflow-hidden",
              isLarge ? "aspect-[16/10]" : isMedium ? "aspect-[4/3]" : "aspect-square",
            )}
          >
            <img
              src={category.backgroundImage || category.image || "/placeholder.svg?height=400&width=600"}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category.name)}`
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${highlightColor}80 0%, ${highlightColor}40 50%, transparent 100%)`,
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
              {/* Badges */}
              <div className="flex gap-2 mb-3 md:mb-4">
                {category.trending && (
                  <Badge className="bg-red-500 text-white text-xs animate-pulse">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                {category.popular && (
                  <Badge className="bg-green-500 text-white text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Popular
                  </Badge>
                )}
                {category.specialOffer && (
                  <Badge className="bg-orange-500 text-white text-xs">{category.specialOffer.discount} OFF</Badge>
                )}
              </div>

              {/* Category Info */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center gap-2">
                  {category.icon && <div className="text-white">{category.icon}</div>}
                  <h3
                    className={cn(
                      "font-bold font-montserrat transition-all duration-300 group-hover:translate-y-0 translate-y-2 text-white",
                      isLarge
                        ? "text-xl md:text-2xl lg:text-3xl"
                        : isMedium
                          ? "text-lg md:text-xl"
                          : "text-base md:text-lg",
                    )}
                  >
                    {category.name}
                  </h3>
                </div>

                <p
                  className={cn(
                    "font-inter leading-relaxed transition-all duration-300 delay-100 group-hover:translate-y-0 translate-y-2 group-hover:opacity-100 opacity-80 text-white/90",
                    isLarge ? "text-sm md:text-base" : "text-xs md:text-sm",
                  )}
                >
                  {category.description}
                </p>

                {/* Product Count & Stats */}
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-medium text-white/80">
                    {category.productCount}+ productos
                  </span>

                  {showStats && category.stats && (
                    <div className="text-xs text-white/80">
                      ⭐ {category.stats.avgRating.toFixed(1)} ({category.stats.totalReviews})
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button
                  size={isLarge ? "default" : "sm"}
                  className="transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 bg-white text-primary-blue hover:bg-gray-100"
                >
                  Explorar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Special Offer Banner */}
            {category.specialOffer && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-lg">
                {category.specialOffer.text}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function QuickAccessCard({ category }: { category: FeaturedCategory }) {
  return (
    <Link href={category.href}>
      <Card className="group hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary-blue">
        <CardContent className="p-3 md:p-4 text-center">
          <div className="aspect-square mb-2 md:mb-3 overflow-hidden rounded-lg">
            <img
              src={category.image || "/placeholder.svg?height=100&width=100"}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=100&width=100&text=${encodeURIComponent(category.name)}`
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {category.icon && <div className="text-primary-blue">{category.icon}</div>}
          </div>
          <h4 className="font-medium text-xs md:text-sm font-inter text-charcoal group-hover:text-primary-blue transition-colors line-clamp-2">
            {category.name}
          </h4>
          <p className="text-xs text-gray-500 mt-1">{category.productCount}+ items</p>
        </CardContent>
      </Card>
    </Link>
  )
}
