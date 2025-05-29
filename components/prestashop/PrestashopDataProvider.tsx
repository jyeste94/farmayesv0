"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { productsAPI, categoriesAPI, clearCache } from "@/lib/prestashop-api"

interface PrestashopDataContextType {
  categories: any[]
  featuredProducts: any[]
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
  refreshData: () => Promise<void>
}

const PrestashopDataContext = createContext<PrestashopDataContextType | undefined>(undefined)

export function PrestashopDataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<any[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Load categories and featured products in parallel
      const [categoriesData, productsData] = await Promise.all([
        categoriesAPI.getCategories(),
        productsAPI.getFeaturedProducts(8),
      ])

      setCategories(categoriesData)
      setFeaturedProducts(productsData)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error loading PrestaShop data:", err)
      setError(err instanceof Error ? err.message : "Error al cargar datos de PrestaShop")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshData = useCallback(async () => {
    // Clear cache before refreshing
    clearCache()
    await loadData()
  }, [loadData])

  // Initial load
  useEffect(() => {
    loadData()
  }, [loadData])

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshData()
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [refreshData])

  return (
    <PrestashopDataContext.Provider
      value={{
        categories,
        featuredProducts,
        isLoading,
        error,
        lastUpdated,
        refreshData,
      }}
    >
      {children}
    </PrestashopDataContext.Provider>
  )
}

export function usePrestashopData() {
  const context = useContext(PrestashopDataContext)
  if (context === undefined) {
    throw new Error("usePrestashopData must be used within a PrestashopDataProvider")
  }
  return context
}
