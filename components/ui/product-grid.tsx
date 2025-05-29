"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
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
  category: string
  brand: string
  tags: string[]
}

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  viewMode?: "grid" | "list"
  onViewModeChange?: (mode: "grid" | "list") => void
  showFilters?: boolean
  className?: string
}

// Mock product data for demonstration
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ibuprofen 400mg Tablets",
    description: "Fast-acting pain relief for headaches, muscle pain, and inflammation",
    price: 12.99,
    originalPrice: 16.99,
    rating: 4.5,
    reviewCount: 124,
    isOnSale: true,
    isInStock: true,
    category: "Pain Relief",
    brand: "Generic",
    tags: ["pain relief", "anti-inflammatory"],
  },
  {
    id: "2",
    name: "Vitamin D3 2000 IU Softgels",
    description: "Essential vitamin D supplement for bone health and immune support",
    price: 18.99,
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
    isInStock: true,
    category: "Vitamins",
    brand: "NatureWell",
    tags: ["vitamins", "immune support"],
  },
  {
    id: "3",
    name: "Acetaminophen Extra Strength",
    description: "Effective pain reliever and fever reducer for adults",
    price: 9.99,
    rating: 4.3,
    reviewCount: 67,
    isInStock: true,
    category: "Pain Relief",
    brand: "Tylenol",
    tags: ["pain relief", "fever reducer"],
  },
  {
    id: "4",
    name: "Omega-3 Fish Oil Capsules",
    description: "High-quality fish oil supplement for heart and brain health",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.6,
    reviewCount: 156,
    isOnSale: true,
    isInStock: true,
    category: "Supplements",
    brand: "OceanPure",
    tags: ["omega-3", "heart health"],
  },
  {
    id: "5",
    name: "Prescription Allergy Relief",
    description: "24-hour allergy relief for seasonal and year-round allergies",
    price: 32.99,
    rating: 4.7,
    reviewCount: 203,
    isPrescriptionRequired: true,
    isInStock: true,
    category: "Allergy",
    brand: "AllergyFree",
    tags: ["allergy", "prescription"],
  },
  {
    id: "6",
    name: "Multivitamin for Women",
    description: "Complete daily multivitamin specially formulated for women's health",
    price: 21.99,
    rating: 4.4,
    reviewCount: 98,
    isNew: true,
    isInStock: false,
    category: "Vitamins",
    brand: "WomenCare",
    tags: ["multivitamin", "women's health"],
  },
  {
    id: "7",
    name: "Probiotic Complex",
    description: "Advanced probiotic formula for digestive health and immune support",
    price: 28.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviewCount: 142,
    isOnSale: true,
    isInStock: true,
    category: "Digestive Health",
    brand: "GutHealth",
    tags: ["probiotics", "digestive health"],
  },
  {
    id: "8",
    name: "Calcium + Magnesium",
    description: "Essential minerals for bone health and muscle function",
    price: 16.99,
    rating: 4.2,
    reviewCount: 76,
    isInStock: true,
    category: "Supplements",
    brand: "BoneStrong",
    tags: ["calcium", "bone health"],
  },
]

export function ProductGrid({
  products = mockProducts,
  loading = false,
  viewMode = "grid",
  onViewModeChange,
  showFilters = true,
  className = "",
}: ProductGridProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [currentViewMode, setCurrentViewMode] = useState(viewMode)
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Sort products based on selected criteria
  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        // Featured: prioritize new and on-sale items
        return sorted.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          if (a.isOnSale && !b.isOnSale) return -1
          if (!a.isOnSale && b.isOnSale) return 1
          return b.rating - a.rating
        })
    }
  }, [products, sortBy])

  const handleViewModeChange = (mode: "grid" | "list") => {
    setCurrentViewMode(mode)
    onViewModeChange?.(mode)
  }

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProducts((prev) => Math.min(prev + 8, sortedProducts.length))
    setIsLoadingMore(false)
  }

  const displayedProducts = sortedProducts.slice(0, visibleProducts)
  const hasMoreProducts = visibleProducts < sortedProducts.length

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Loading skeleton for toolbar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="h-10 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Loading skeleton for products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Toolbar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Showing {displayedProducts.length} of {sortedProducts.length} products
            </span>

            {/* Product count badges */}
            <div className="flex items-center gap-2">
              {sortedProducts.filter((p) => p.isNew).length > 0 && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {sortedProducts.filter((p) => p.isNew).length} New
                </Badge>
              )}
              {sortedProducts.filter((p) => p.isOnSale).length > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {sortedProducts.filter((p) => p.isOnSale).length} On Sale
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View mode toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={currentViewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={currentViewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none border-l"
                onClick={() => handleViewModeChange("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div
        className={`
          ${
            currentViewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              : "space-y-4"
          }
        `}
      >
        {displayedProducts.map((product, index) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProductCard
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviewCount={product.reviewCount}
              imageUrl={product.imageUrl}
              imageAlt={product.imageAlt}
              isOnSale={product.isOnSale}
              isPrescriptionRequired={product.isPrescriptionRequired}
              isInStock={product.isInStock}
              category={product.category}
              onAddToCart={() => console.log(`Added ${product.name} to cart`)}
              onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
              className={currentViewMode === "list" ? "flex-row" : ""}
            />

            {/* New badge overlay */}
            {product.isNew && (
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-green-500 text-white font-semibold animate-pulse">NEW</Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-primary-blue hover:bg-primary-blue-hover text-white font-medium"
          >
            {isLoadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </>
            ) : (
              <>
                Load More Products
                <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* No products message */}
      {sortedProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}
