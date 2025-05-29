"use client"

import { useState, useEffect, useCallback } from "react"
import { categoriesAPI, getCachedData, setCachedData } from "@/lib/prestashop-api"

export function usePrestashopCategories() {
  const [categories, setCategories] = useState<any[]>([])
  const [categoryTree, setCategoryTree] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Check cache first
      const cacheKey = "prestashop-categories"
      const cachedData = getCachedData<any[]>(cacheKey)

      if (cachedData) {
        setCategories(cachedData)
        setIsLoading(false)
        return
      }

      // Fetch from API
      const fetchedCategories = await categoriesAPI.getCategories()
      const tree = await categoriesAPI.getCategoryTree()

      // Fallback data if API fails
      if (!fetchedCategories || fetchedCategories.length === 0) {
        const fallbackCategories = [
          {
            id: "1",
            name: "Medicamentos",
            description: "Productos farmacéuticos y medicamentos",
            href: "/categories/1",
            image: "/placeholder.svg?height=300&width=300&text=Medicamentos",
            productCount: 0,
            parentId: null,
            level: 0,
            active: true,
          },
          {
            id: "2",
            name: "Vitaminas",
            description: "Vitaminas y suplementos",
            href: "/categories/2",
            image: "/placeholder.svg?height=300&width=300&text=Vitaminas",
            productCount: 0,
            parentId: null,
            level: 0,
            active: true,
          },
          {
            id: "3",
            name: "Belleza",
            description: "Productos de belleza y cuidado personal",
            href: "/categories/3",
            image: "/placeholder.svg?height=300&width=300&text=Belleza",
            productCount: 0,
            parentId: null,
            level: 0,
            active: true,
          },
          {
            id: "4",
            name: "Bebé",
            description: "Productos para bebés y mamás",
            href: "/categories/4",
            image: "/placeholder.svg?height=300&width=300&text=Bebé",
            productCount: 0,
            parentId: null,
            level: 0,
            active: true,
          },
        ]
        setCategories(fallbackCategories)
        setCategoryTree(fallbackCategories)
        return
      }

      setCategories(fetchedCategories)
      setCategoryTree(tree)

      // Cache the data
      setCachedData(cacheKey, fetchedCategories)
      setCachedData("prestashop-category-tree", tree)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar categorías"
      setError(errorMessage)
      console.error("Error loading categories:", err)

      // Set fallback categories on error
      const fallbackCategories = [
        {
          id: "1",
          name: "Medicamentos",
          description: "Productos farmacéuticos y medicamentos",
          href: "/categories/1",
          image: "/placeholder.svg?height=300&width=300&text=Medicamentos",
          productCount: 0,
          parentId: null,
          level: 0,
          active: true,
        },
        {
          id: "2",
          name: "Vitaminas",
          description: "Vitaminas y suplementos",
          href: "/categories/2",
          image: "/placeholder.svg?height=300&width=300&text=Vitaminas",
          productCount: 0,
          parentId: null,
          level: 0,
          active: true,
        },
      ]
      setCategories(fallbackCategories)
      setCategoryTree(fallbackCategories)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refresh = useCallback(() => {
    loadCategories()
  }, [loadCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return {
    categories,
    categoryTree,
    isLoading,
    error,
    refresh,
  }
}
