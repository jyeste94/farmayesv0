"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { FilterState } from "./product-filters"

interface ActiveFiltersProps {
  filters: FilterState
  onRemoveFilter: (filterType: string, value?: string) => void
  onClearAll: () => void
  availableFilters: {
    priceRange: [number, number]
  }
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll, availableFilters }: ActiveFiltersProps) {
  const activeFilters: Array<{ type: string; label: string; value?: string }> = []

  // Price range filter
  if (
    filters.priceRange[0] > availableFilters.priceRange[0] ||
    filters.priceRange[1] < availableFilters.priceRange[1]
  ) {
    activeFilters.push({
      type: "priceRange",
      label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
    })
  }

  // Search term
  if (filters.searchTerm.trim()) {
    activeFilters.push({
      type: "searchTerm",
      label: `Search: "${filters.searchTerm}"`,
    })
  }

  // Brands
  filters.brands.forEach((brand) => {
    activeFilters.push({
      type: "brands",
      label: brand,
      value: brand,
    })
  })

  // Categories
  filters.categories.forEach((category) => {
    activeFilters.push({
      type: "categories",
      label: category,
      value: category,
    })
  })

  // Ratings
  filters.ratings.forEach((rating) => {
    activeFilters.push({
      type: "ratings",
      label: `${rating}+ stars`,
      value: rating,
    })
  })

  // Features
  Object.entries(filters.features).forEach(([key, value]) => {
    if (value === true) {
      const labels: Record<string, string> = {
        prescriptionRequired: "Prescription Required",
        inStock: "In Stock",
        onSale: "On Sale",
        isNew: "New Products",
      }
      activeFilters.push({
        type: "features",
        label: labels[key],
        value: key,
      })
    }
  })

  // Dosage forms
  filters.dosageForms.forEach((form) => {
    activeFilters.push({
      type: "dosageForms",
      label: form,
      value: form,
    })
  })

  // Sizes
  filters.sizes.forEach((size) => {
    activeFilters.push({
      type: "sizes",
      label: size,
      value: size,
    })
  })

  if (activeFilters.length === 0) {
    return null
  }

  return (
    <div className="bg-white border-b p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Active filters:</span>

        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.type}-${filter.value || filter.label}-${index}`}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200"
          >
            <span className="text-xs">{filter.label}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 hover:bg-blue-100"
              onClick={() => onRemoveFilter(filter.type, filter.value)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}

        {activeFilters.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-xs text-gray-600 hover:text-gray-900 ml-2"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  )
}
