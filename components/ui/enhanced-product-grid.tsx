"use client"

import { useState, useMemo, useEffect } from "react"
import { EnhancedProductCard } from "@/components/ui/enhanced-product-card"
import { ProductFilters, type FilterState } from "@/components/ui/product-filters"
import { ActiveFilters } from "@/components/ui/active-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
  dosageForm?: string
  size?: string
}

interface EnhancedProductGridProps {
  products?: Product[]
  loading?: boolean
  className?: string
}

// Enhanced mock product data
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
    dosageForm: "Tablets",
    size: "100 count",
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
    dosageForm: "Softgels",
    size: "60 count",
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
    dosageForm: "Caplets",
    size: "50 count",
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
    dosageForm: "Capsules",
    size: "120 count",
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
    dosageForm: "Tablets",
    size: "30 count",
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
    dosageForm: "Gummies",
    size: "90 count",
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
    dosageForm: "Capsules",
    size: "60 count",
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
    dosageForm: "Tablets",
    size: "180 count",
  },
  {
    id: "9",
    name: "Melatonin 5mg Sleep Aid",
    description: "Natural sleep support for better rest and relaxation",
    price: 14.99,
    rating: 4.1,
    reviewCount: 234,
    isInStock: true,
    category: "Sleep Aid",
    brand: "SleepWell",
    tags: ["sleep", "melatonin"],
    dosageForm: "Gummies",
    size: "60 count",
  },
  {
    id: "10",
    name: "Zinc Immune Support",
    description: "High-potency zinc supplement for immune system support",
    price: 11.99,
    originalPrice: 15.99,
    rating: 4.6,
    reviewCount: 87,
    isOnSale: true,
    isNew: true,
    isInStock: true,
    category: "Immune Support",
    brand: "ImmuneBoost",
    tags: ["zinc", "immune support"],
    dosageForm: "Lozenges",
    size: "30 count",
  },
]

export function EnhancedProductGrid({
  products = mockProducts,
  loading = false,
  className = "",
}: EnhancedProductGridProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [visibleProducts, setVisibleProducts] = useState(12)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Initialize filters with available data
  const availableFilters = useMemo(() => {
    const brands = [...new Set(products.map((p) => p.brand))].sort()
    const categories = [...new Set(products.map((p) => p.category))].sort()
    const dosageForms = [...new Set(products.map((p) => p.dosageForm).filter(Boolean))].sort()
    const sizes = [...new Set(products.map((p) => p.size).filter(Boolean))].sort()
    const prices = products.map((p) => p.price)
    const priceRange: [number, number] = [Math.min(...prices), Math.max(...prices)]

    return { brands, categories, dosageForms, sizes, priceRange }
  }, [products])

  const [filters, setFilters] = useState<FilterState>({
    priceRange: availableFilters.priceRange,
    brands: [],
    categories: [],
    ratings: [],
    features: {
      prescriptionRequired: null,
      inStock: null,
      onSale: null,
      isNew: null,
    },
    dosageForms: [],
    sizes: [],
    searchTerm: "",
  })

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Search term filter
      if (filters.searchTerm.trim()) {
        const searchTerm = filters.searchTerm.toLowerCase()
        const searchableText =
          `${product.name} ${product.description} ${product.brand} ${product.category}`.toLowerCase()
        if (!searchableText.includes(searchTerm)) {
          return false
        }
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false
      }

      // Rating filter
      if (filters.ratings.length > 0) {
        const hasMatchingRating = filters.ratings.some((rating) => product.rating >= Number.parseInt(rating))
        if (!hasMatchingRating) {
          return false
        }
      }

      // Feature filters
      if (filters.features.prescriptionRequired !== null) {
        if (filters.features.prescriptionRequired !== !!product.isPrescriptionRequired) {
          return false
        }
      }

      if (filters.features.inStock !== null) {
        if (filters.features.inStock !== !!product.isInStock) {
          return false
        }
      }

      if (filters.features.onSale !== null) {
        if (filters.features.onSale !== !!product.isOnSale) {
          return false
        }
      }

      if (filters.features.isNew !== null) {
        if (filters.features.isNew !== !!product.isNew) {
          return false
        }
      }

      // Dosage form filter
      if (filters.dosageForms.length > 0 && product.dosageForm) {
        if (!filters.dosageForms.includes(product.dosageForm)) {
          return false
        }
      }

      // Size filter
      if (filters.sizes.length > 0 && product.size) {
        if (!filters.sizes.includes(product.size)) {
          return false
        }
      }

      return true
    })
  }, [products, filters])

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

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
  }, [filteredProducts, sortBy])

  const displayedProducts = sortedProducts.slice(0, visibleProducts)
  const hasMoreProducts = visibleProducts < sortedProducts.length

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProducts((prev) => Math.min(prev + 12, sortedProducts.length))
    setIsLoadingMore(false)
  }

  const handleRemoveFilter = (filterType: string, value?: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      switch (filterType) {
        case "priceRange":
          newFilters.priceRange = availableFilters.priceRange
          break
        case "searchTerm":
          newFilters.searchTerm = ""
          break
        case "brands":
          if (value) newFilters.brands = newFilters.brands.filter((b) => b !== value)
          break
        case "categories":
          if (value) newFilters.categories = newFilters.categories.filter((c) => c !== value)
          break
        case "ratings":
          if (value) newFilters.ratings = newFilters.ratings.filter((r) => r !== value)
          break
        case "features":
          if (value) newFilters.features = { ...newFilters.features, [value]: null }
          break
        case "dosageForms":
          if (value) newFilters.dosageForms = newFilters.dosageForms.filter((d) => d !== value)
          break
        case "sizes":
          if (value) newFilters.sizes = newFilters.sizes.filter((s) => s !== value)
          break
      }

      return newFilters
    })
  }

  const handleClearAllFilters = () => {
    setFilters({
      priceRange: availableFilters.priceRange,
      brands: [],
      categories: [],
      ratings: [],
      features: {
        prescriptionRequired: null,
        inStock: null,
        onSale: null,
        isNew: null,
      },
      dosageForms: [],
      sizes: [],
      searchTerm: "",
    })
  }

  // Reset visible products when filters change
  useEffect(() => {
    setVisibleProducts(12)
  }, [filters])

  if (loading) {
    return (
      <div className={`flex ${className}`}>
        {/* Sidebar skeleton */}
        <div className="hidden lg:block w-80 bg-white border-r">
          <div className="p-4 space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 p-4 space-y-6">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
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
      </div>
    )
  }

  return (
    <div className={`flex ${className}`}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <ProductFilters
          filters={filters}
          onFiltersChange={setFilters}
          availableFilters={availableFilters}
          productCount={sortedProducts.length}
          isOpen={filtersOpen}
          onToggle={() => setFiltersOpen(!filtersOpen)}
        />
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableFilters={availableFilters}
            productCount={sortedProducts.length}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
          availableFilters={availableFilters}
        />

        {/* Toolbar */}
        <div className="bg-white border-b p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Mobile filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center gap-2"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
              </Sheet>

              <span className="text-sm text-gray-600 whitespace-nowrap">
                {displayedProducts.length} of {sortedProducts.length} products
              </span>

              {/* Filter badges */}
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
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none border-l"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 p-4">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={handleClearAllFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div
                className={`
                  ${
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                      : "space-y-4"
                  }
                `}
              >
                {displayedProducts.map((product, index) => (
                  <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <EnhancedProductCard
                      {...product}
                      viewMode={viewMode}
                      onAddToCart={(quantity) => console.log(`Added ${quantity} ${product.name} to cart`)}
                      onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
                      onQuickView={() => console.log(`Quick view ${product.name}`)}
                    />
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
                      `Load More Products (${sortedProducts.length - visibleProducts} remaining)`
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
