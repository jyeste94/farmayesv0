"use client"

import { usePrestashopProducts } from "@/hooks/usePrestashopProducts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"

interface PrestashopProductGridProps {
  category?: string
  limit?: number
  columns?: 2 | 3 | 4
  showPagination?: boolean
}

export function PrestashopProductGrid({
  category,
  limit = 12,
  columns = 3,
  showPagination = false,
}: PrestashopProductGridProps) {
  const { products, isLoading, error, refresh, total, totalPages } = usePrestashopProducts({
    category,
    limit,
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square relative bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          <Button variant="link" onClick={refresh} className="p-0 h-auto font-normal">
            <RefreshCw className="h-3 w-3 mr-1" />
            Intentar de nuevo
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!products.length) {
    return (
      <Alert>
        <AlertTitle>No hay productos</AlertTitle>
        <AlertDescription>
          No se encontraron productos en esta categoría.
          <Button variant="link" onClick={refresh} className="p-0 h-auto font-normal">
            <RefreshCw className="h-3 w-3 mr-1" />
            Actualizar
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <div
        className={`grid grid-cols-1 ${
          columns === 2
            ? "md:grid-cols-2"
            : columns === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-4"
        } gap-4`}
      >
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link href={product.href}>
              <div className="aspect-square relative bg-gray-50">
                <Image
                  src={product.image || "/placeholder.svg?height=300&width=300&text=Producto"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Oferta
                  </div>
                )}
              </div>
            </Link>
            <CardContent className="p-4">
              <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="font-bold text-lg">{product.price.toFixed(2)}€</p>
                  {product.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}€</p>
                  )}
                </div>
                <Button size="sm">Añadir</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <Button variant="outline" disabled>
              Anterior
            </Button>
            <Button variant="outline" disabled>
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
