"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ChevronDown, ChevronUp, Filter, RotateCcw, Search, Star, Pill, Heart, Shield } from "lucide-react"

export interface FilterState {
  priceRange: [number, number]
  brands: string[]
  categories: string[]
  ratings: number[]
  features: {
    prescriptionRequired: boolean | null
    inStock: boolean | null
    onSale: boolean | null
    isNew: boolean | null
  }
  dosageForms: string[]
  sizes: string[]
  searchTerm: string
}

interface ProductFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableFilters: {
    brands: string[]
    categories: string[]
    dosageForms: string[]
    sizes: string[]
    priceRange: [number, number]
  }
  productCount: number
  isOpen: boolean
  onToggle: () => void
  className?: string
}

const defaultFilters: FilterState = {
  priceRange: [0, 100],
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
}

export function ProductFilters({
  filters,
  onFiltersChange,
  availableFilters,
  productCount,
  isOpen,
  onToggle,
  className = "",
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    categories: true,
    features: true,
    dosageForms: false,
    sizes: false,
    ratings: false,
  })

  // Debounced filter updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(localFilters)
    }, 300)

    return () => clearTimeout(timer)
  }, [localFilters, onFiltersChange])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (localFilters.brands.length > 0) count++
    if (localFilters.categories.length > 0) count++
    if (localFilters.ratings.length > 0) count++
    if (localFilters.dosageForms.length > 0) count++
    if (localFilters.sizes.length > 0) count++
    if (localFilters.searchTerm.trim()) count++
    if (
      localFilters.priceRange[0] > availableFilters.priceRange[0] ||
      localFilters.priceRange[1] < availableFilters.priceRange[1]
    )
      count++

    Object.values(localFilters.features).forEach((value) => {
      if (value !== null) count++
    })

    return count
  }, [localFilters, availableFilters.priceRange])

  const updateFilters = (updates: Partial<FilterState>) => {
    setLocalFilters((prev) => ({ ...prev, ...updates }))
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      ...defaultFilters,
      priceRange: availableFilters.priceRange,
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const toggleArrayFilter = (array: string[], value: string) => {
    return array.includes(value) ? array.filter((item) => item !== value) : [...array, value]
  }

  const FilterSection = ({
    title,
    icon: Icon,
    isExpanded,
    onToggle,
    children,
    count,
  }: {
    title: string
    icon: any
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode
    count?: number
  }) => (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-3 h-auto font-medium text-left hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gray-600" />
            <span>{title}</span>
            {count !== undefined && count > 0 && (
              <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                {count}
              </Badge>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        <div className="pt-2 space-y-3">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className={`bg-white border-r h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="font-semibold text-gray-900">Filters</h2>
            {activeFilterCount > 0 && <Badge className="bg-primary-blue text-white">{activeFilterCount}</Badge>}
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-3">{productCount} products found</p>

        {/* Clear all filters */}
        {activeFilterCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full text-xs">
            <RotateCcw className="w-3 h-3 mr-1" />
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Filters Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {/* Search Filter */}
          <FilterSection
            title="Search Products"
            icon={Search}
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name or description..."
                value={localFilters.searchTerm}
                onChange={(e) => updateFilters({ searchTerm: e.target.value })}
                className="pl-9 text-sm"
              />
            </div>
          </FilterSection>

          <Separator />

          {/* Price Range Filter */}
          <FilterSection
            title="Price Range"
            icon={Pill}
            isExpanded={expandedSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="space-y-4">
              <div className="px-2">
                <Slider
                  value={localFilters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  max={availableFilters.priceRange[1]}
                  min={availableFilters.priceRange[0]}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Input
                  type="number"
                  value={localFilters.priceRange[0]}
                  onChange={(e) => {
                    const value = Math.max(0, Number.parseInt(e.target.value) || 0)
                    updateFilters({
                      priceRange: [value, localFilters.priceRange[1]],
                    })
                  }}
                  className="w-20 h-8 text-xs"
                  min={0}
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="number"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value) || availableFilters.priceRange[1]
                    updateFilters({
                      priceRange: [localFilters.priceRange[0], value],
                    })
                  }}
                  className="w-20 h-8 text-xs"
                  min={0}
                />
              </div>
              <div className="text-xs text-gray-600 text-center">
                ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
              </div>
            </div>
          </FilterSection>

          <Separator />

          {/* Product Features */}
          <FilterSection
            title="Product Features"
            icon={Shield}
            isExpanded={expandedSections.features}
            onToggle={() => toggleSection("features")}
            count={Object.values(localFilters.features).filter((v) => v !== null).length}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="prescription-required"
                  checked={localFilters.features.prescriptionRequired === true}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      features: {
                        ...localFilters.features,
                        prescriptionRequired: checked ? true : null,
                      },
                    })
                  }}
                />
                <Label htmlFor="prescription-required" className="text-sm">
                  Prescription Required
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={localFilters.features.inStock === true}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      features: {
                        ...localFilters.features,
                        inStock: checked ? true : null,
                      },
                    })
                  }}
                />
                <Label htmlFor="in-stock" className="text-sm">
                  In Stock Only
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={localFilters.features.onSale === true}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      features: {
                        ...localFilters.features,
                        onSale: checked ? true : null,
                      },
                    })
                  }}
                />
                <Label htmlFor="on-sale" className="text-sm">
                  On Sale
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-new"
                  checked={localFilters.features.isNew === true}
                  onCheckedChange={(checked) => {
                    updateFilters({
                      features: {
                        ...localFilters.features,
                        isNew: checked ? true : null,
                      },
                    })
                  }}
                />
                <Label htmlFor="is-new" className="text-sm">
                  New Products
                </Label>
              </div>
            </div>
          </FilterSection>

          <Separator />

          {/* Brand Filter */}
          <FilterSection
            title="Brands"
            icon={Heart}
            isExpanded={expandedSections.brands}
            onToggle={() => toggleSection("brands")}
            count={localFilters.brands.length}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableFilters.brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={localFilters.brands.includes(brand)}
                    onCheckedChange={() => {
                      updateFilters({
                        brands: toggleArrayFilter(localFilters.brands, brand),
                      })
                    }}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm flex-1">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          <Separator />

          {/* Category Filter */}
          <FilterSection
            title="Categories"
            icon={Pill}
            isExpanded={expandedSections.categories}
            onToggle={() => toggleSection("categories")}
            count={localFilters.categories.length}
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableFilters.categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={localFilters.categories.includes(category)}
                    onCheckedChange={() => {
                      updateFilters({
                        categories: toggleArrayFilter(localFilters.categories, category),
                      })
                    }}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm flex-1">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          <Separator />

          {/* Rating Filter */}
          <FilterSection
            title="Customer Rating"
            icon={Star}
            isExpanded={expandedSections.ratings}
            onToggle={() => toggleSection("ratings")}
            count={localFilters.ratings.length}
          >
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={localFilters.ratings.includes(rating)}
                    onCheckedChange={() => {
                      updateFilters({
                        ratings: toggleArrayFilter(localFilters.ratings, rating.toString()),
                      })
                    }}
                  />
                  <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">& up</span>
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          <Separator />

          {/* Dosage Forms */}
          {availableFilters.dosageForms.length > 0 && (
            <>
              <FilterSection
                title="Dosage Forms"
                icon={Pill}
                isExpanded={expandedSections.dosageForms}
                onToggle={() => toggleSection("dosageForms")}
                count={localFilters.dosageForms.length}
              >
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableFilters.dosageForms.map((form) => (
                    <div key={form} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dosage-${form}`}
                        checked={localFilters.dosageForms.includes(form)}
                        onCheckedChange={() => {
                          updateFilters({
                            dosageForms: toggleArrayFilter(localFilters.dosageForms, form),
                          })
                        }}
                      />
                      <Label htmlFor={`dosage-${form}`} className="text-sm flex-1">
                        {form}
                      </Label>
                    </div>
                  ))}
                </div>
              </FilterSection>
              <Separator />
            </>
          )}

          {/* Sizes */}
          {availableFilters.sizes.length > 0 && (
            <FilterSection
              title="Package Sizes"
              icon={Pill}
              isExpanded={expandedSections.sizes}
              onToggle={() => toggleSection("sizes")}
              count={localFilters.sizes.length}
            >
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableFilters.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={localFilters.sizes.includes(size)}
                      onCheckedChange={() => {
                        updateFilters({
                          sizes: toggleArrayFilter(localFilters.sizes, size),
                        })
                      }}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm flex-1">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
