"use client"

import { useState, useCallback, useEffect } from "react"
import { productsAPI, getCachedData, setCachedData } from "@/lib/prestashop-api"
import type { Product } from "@/types"

export function usePrestashopProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProduct = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const cacheKey = `prestashop-product-${id}`
      const cached = getCachedData<Product>(cacheKey)
      if (cached) {
        setProduct(cached)
        setIsLoading(false)
        return
      }

      const fetched = await productsAPI.getProduct(id)
      setProduct(fetched)
      setCachedData(cacheKey, fetched)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar producto"
      setError(errorMessage)
      console.error("Error loading product:", err)

      const fallback: Product = {
        id,
        name: "Producto de Ejemplo",
        description: "Producto de ejemplo mientras se conecta con PrestaShop",
        price: 0,
        category: "",
        brand: "",
        image: "/placeholder.svg?height=300&width=300&text=Producto",
        images: ["/placeholder.svg?height=300&width=300&text=Producto"],
        href: `/product/${id}`,
        linkRewrite: "",
        slug: "",
        inStock: true,
        stockQuantity: 1,
        rating: 4.5,
        reviewCount: 0,
        isPrescriptionRequired: false,
        tags: [],
        specifications: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setProduct(fallback)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  const clearError = () => setError(null)

  return { product, isLoading, error, refresh: loadProduct, clearError }
}
