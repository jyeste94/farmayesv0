"use client"

import { useState, useEffect, useCallback } from "react"
import { productsAPI, getCachedData, setCachedData } from "@/lib/prestashop-api"

interface ProductsParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  priceMin?: number
  priceMax?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export function usePrestashopProducts(params: ProductsParams = {}) {
  const [products, setProducts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Create cache key based on params
      const cacheKey = `prestashop-products-${JSON.stringify(params)}`
      const cachedData = getCachedData<any>(cacheKey)

      if (cachedData) {
        setProducts(cachedData.products)
        setTotal(cachedData.total)
        setTotalPages(cachedData.totalPages)
        setIsLoading(false)
        return
      }

      // Fetch from API
      const result = await productsAPI.getProducts(params)

      // Fallback data if API fails
      if (!result || !result.products || result.products.length === 0) {
        const fallbackProducts = [
          {
            id: "1",
            name: "Ibuprofeno 400mg",
            description: "Medicamento para el alivio del dolor y la inflamación",
            price: 19.99,
            originalPrice: 24.99,
            category: "1",
            brand: "PharmaCare",
            image: "/placeholder.svg?height=300&width=300&text=Ibuprofeno",
            images: ["/placeholder.svg?height=300&width=300&text=Ibuprofeno"],
            href: "/product/1",
            inStock: true,
            stockQuantity: 50,
            rating: 4.5,
            reviewCount: 24,
            isPrescriptionRequired: false,
            tags: ["popular"],
            specifications: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            name: "Vitamina D3 1000 UI",
            description: "Vitamina esencial para la salud ósea y el sistema inmunológico",
            price: 16.99,
            originalPrice: 21.99,
            category: "2",
            brand: "VitaPlus",
            image: "/placeholder.svg?height=300&width=300&text=VitaminaD3",
            images: ["/placeholder.svg?height=300&width=300&text=VitaminaD3"],
            href: "/product/2",
            inStock: true,
            stockQuantity: 100,
            rating: 4.8,
            reviewCount: 156,
            isPrescriptionRequired: false,
            tags: ["bestseller"],
            specifications: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]

        setProducts(fallbackProducts)
        setTotal(fallbackProducts.length)
        setTotalPages(1)
        setIsLoading(false)
        return
      }

      setProducts(result.products)
      setTotal(result.total)
      setTotalPages(result.totalPages)

      // Cache the data
      setCachedData(cacheKey, result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar productos"
      setError(errorMessage)
      console.error("Error loading products:", err)

      // Set fallback products on error
      const fallbackProducts = [
        {
          id: "1",
          name: "Producto de Ejemplo",
          description: "Producto de ejemplo mientras se conecta con PrestaShop",
          price: 19.99,
          category: "1",
          brand: "Ejemplo",
          image: "/placeholder.svg?height=300&width=300&text=Producto",
          images: ["/placeholder.svg?height=300&width=300&text=Producto"],
          href: "/product/1",
          inStock: true,
          stockQuantity: 10,
          rating: 4.5,
          reviewCount: 5,
          isPrescriptionRequired: false,
          tags: ["ejemplo"],
          specifications: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      setProducts(fallbackProducts)
      setTotal(1)
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [params])

  const refresh = useCallback(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    total,
    totalPages,
    isLoading,
    error,
    refresh,
  }
}

export function usePrestashopFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFeaturedProducts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Check cache first
      const cacheKey = `prestashop-featured-${limit}`
      const cachedData = getCachedData<any[]>(cacheKey)

      if (cachedData) {
        setProducts(cachedData)
        setIsLoading(false)
        return
      }

      // Fetch from API
      const fetchedProducts = await productsAPI.getFeaturedProducts(limit)

      // Fallback data if API fails
      if (!fetchedProducts || fetchedProducts.length === 0) {
        const fallbackProducts = [
          {
            id: "1",
            name: "Paracetamol 500mg",
            description: "Analgésico y antipirético para el alivio del dolor y la fiebre",
            price: 8.99,
            originalPrice: 12.99,
            category: "1",
            brand: "PharmaCare",
            image: "/placeholder.svg?height=300&width=300&text=Paracetamol",
            images: ["/placeholder.svg?height=300&width=300&text=Paracetamol"],
            href: "/product/1",
            inStock: true,
            stockQuantity: 80,
            rating: 4.6,
            reviewCount: 142,
            isPrescriptionRequired: false,
            tags: ["destacado"],
            specifications: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            name: "Vitamina C 1000mg",
            description: "Suplemento de vitamina C para fortalecer el sistema inmunológico",
            price: 16.99,
            originalPrice: 21.99,
            category: "2",
            brand: "VitaPlus",
            image: "/placeholder.svg?height=300&width=300&text=VitaminaC",
            images: ["/placeholder.svg?height=300&width=300&text=VitaminaC"],
            href: "/product/2",
            inStock: true,
            stockQuantity: 120,
            rating: 4.7,
            reviewCount: 98,
            isPrescriptionRequired: false,
            tags: ["destacado", "immune"],
            specifications: {},
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]

        setProducts(fallbackProducts)
        setIsLoading(false)
        return
      }

      setProducts(fetchedProducts)

      // Cache the data
      setCachedData(cacheKey, fetchedProducts)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar productos destacados"
      setError(errorMessage)
      console.error("Error loading featured products:", err)

      // Set fallback products on error
      const fallbackProducts = [
        {
          id: "1",
          name: "Producto Destacado",
          description: "Producto destacado de ejemplo",
          price: 19.99,
          category: "1",
          brand: "Ejemplo",
          image: "/placeholder.svg?height=300&width=300&text=Destacado",
          images: ["/placeholder.svg?height=300&width=300&text=Destacado"],
          href: "/product/1",
          inStock: true,
          stockQuantity: 10,
          rating: 4.5,
          reviewCount: 5,
          isPrescriptionRequired: false,
          tags: ["destacado"],
          specifications: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
      setProducts(fallbackProducts)
    } finally {
      setIsLoading(false)
    }
  }, [limit])

  const refresh = useCallback(() => {
    loadFeaturedProducts()
  }, [loadFeaturedProducts])

  useEffect(() => {
    loadFeaturedProducts()
  }, [loadFeaturedProducts])

  return {
    products,
    isLoading,
    error,
    refresh,
  }
}
