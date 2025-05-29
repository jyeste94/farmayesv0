"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ShowcaseCategory {
  id: string
  name: string
  description: string
  href: string
  image: string
  backgroundImage?: string
  featured?: boolean
  trending?: boolean
  productCount: number
  highlightColor: string
  textColor?: "light" | "dark"
  specialOffer?: {
    text: string
    discount: string
  }
}

interface CategoryShowcaseProps {
  categories: ShowcaseCategory[]
  title?: string
  subtitle?: string
  className?: string
}

export function CategoryShowcase({
  categories,
  title = "Explore Our Categories",
  subtitle = "Find exactly what you need for your health and wellness journey",
  className = "",
}: CategoryShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Split categories into featured (large) and regular (small)
  const featuredCategories = categories.filter((cat) => cat.featured).slice(0, 2)
  const regularCategories = categories.filter((cat) => !cat.featured).slice(0, 4)

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

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Featured Categories - Large Cards */}
          {featuredCategories.map((category, index) => (
            <div key={category.id} className="lg:col-span-2">
              <FeaturedCategoryCard
                category={category}
                isActive={activeCategory === category.id}
                onHover={setActiveCategory}
                size="large"
              />
            </div>
          ))}

          {/* Regular Categories - Small Cards */}
          {regularCategories.map((category) => (
            <div key={category.id} className="lg:col-span-1">
              <FeaturedCategoryCard
                category={category}
                isActive={activeCategory === category.id}
                onHover={setActiveCategory}
                size="small"
              />
            </div>
          ))}
        </div>

        {/* Quick Access Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.slice(0, 6).map((category) => (
            <QuickAccessCard key={`quick-${category.id}`} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeaturedCategoryCardProps {
  category: ShowcaseCategory
  isActive: boolean
  onHover: (id: string | null) => void
  size: "large" | "small"
}

function FeaturedCategoryCard({ category, isActive, onHover, size }: FeaturedCategoryCardProps) {
  const isLarge = size === "large"

  return (
    <Link href={category.href}>
      <Card
        className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer h-full"
        onMouseEnter={() => onHover(category.id)}
        onMouseLeave={() => onHover(null)}
      >
        <CardContent className="p-0 relative">
          {/* Background Image */}
          <div className={cn("relative overflow-hidden", isLarge ? "aspect-[16/10]" : "aspect-square")}>
            <img
              src={category.backgroundImage || category.image || "/placeholder.svg?height=400&width=600"}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${category.highlightColor}80 0%, ${category.highlightColor}40 50%, transparent 100%)`,
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
                {category.specialOffer && (
                  <Badge className="bg-green-500 text-white text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {category.specialOffer.discount} OFF
                  </Badge>
                )}
              </div>

              {/* Category Info */}
              <div className="space-y-2 md:space-y-3">
                <h3
                  className={cn(
                    "font-bold font-montserrat transition-all duration-300 group-hover:translate-y-0 translate-y-2",
                    isLarge ? "text-xl md:text-2xl lg:text-3xl" : "text-lg md:text-xl",
                    category.textColor === "dark" ? "text-charcoal" : "text-white",
                  )}
                >
                  {category.name}
                </h3>

                <p
                  className={cn(
                    "font-inter leading-relaxed transition-all duration-300 delay-100 group-hover:translate-y-0 translate-y-2 group-hover:opacity-100 opacity-80",
                    isLarge ? "text-sm md:text-base" : "text-xs md:text-sm",
                    category.textColor === "dark" ? "text-gray-700" : "text-white/90",
                  )}
                >
                  {category.description}
                </p>

                {/* Product Count & CTA */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs md:text-sm font-medium",
                      category.textColor === "dark" ? "text-gray-600" : "text-white/80",
                    )}
                  >
                    {category.productCount}+ products
                  </span>

                  <Button
                    size={isLarge ? "default" : "sm"}
                    className={cn(
                      "group/btn transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100",
                      category.textColor === "dark"
                        ? "bg-primary-blue text-white hover:bg-primary-blue-hover"
                        : "bg-white text-primary-blue hover:bg-gray-100",
                    )}
                  >
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
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

function QuickAccessCard({ category }: { category: ShowcaseCategory }) {
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
            />
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
