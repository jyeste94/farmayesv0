"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Star,
  ChevronRight,
  Package,
  Heart,
  Sparkles,
  Baby,
  AmbulanceIcon as FirstAid,
  Leaf,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MainBanner } from "@/components/ui/main-banner"
import { PromotionalBannerSection } from "@/components/ui/promotional-banner-section"
import { FeaturedCategories } from "@/components/ui/featured-categories"
import { ProductCarousel } from "@/components/ui/product-carousel"
import { StoreBenefits } from "@/components/ui/store-benefits"
import { SEOContentSection } from "@/components/ui/seo-content-section"
import { usePrestashopProducts, usePrestashopFeaturedProducts } from "@/hooks/usePrestashopProducts"
import { usePrestashopCategories } from "@/hooks/usePrestashopCategories"
import { usePrestashopCart } from "@/hooks/usePrestashopCart"
import type { Product } from "@/types"
import { PrestashopDataProvider } from "@/components/prestashop/PrestashopDataProvider"
import { PrestashopErrorBoundary } from "@/components/prestashop/PrestashopErrorBoundary"
import { PrestashopStatus } from "@/components/prestashop/PrestashopStatus"

// Banner slides con datos reales de la farmacia
const bannerSlides = [
  {
    id: "1",
    title: "Tu Salud, Nuestra Prioridad",
    subtitle: "Farmacia Autorizada",
    description: "Farmacia autorizada con más de 10,000 productos para tus necesidades de salud y bienestar",
    ctaPrimary: {
      text: "Comprar Ahora",
      href: "/products-prestashop",
    },
    ctaSecondary: {
      text: "Subir Receta",
      href: "/prescription",
    },
    backgroundColor: "#1E6BB8",
    textColor: "light" as const,
    badge: {
      text: "Farmacia de Confianza",
      variant: "default" as const,
    },
    overlay: true,
  },
  {
    id: "2",
    title: "Hasta 50% de Descuento",
    subtitle: "Ofertas de Verano",
    description: "Ahorra en vitaminas, suplementos y productos de bienestar este verano",
    ctaPrimary: {
      text: "Ver Ofertas",
      href: "/products-prestashop?sortBy=price&sortOrder=asc",
    },
    backgroundColor: "#059669",
    textColor: "light" as const,
    badge: {
      text: "Tiempo Limitado",
      variant: "destructive" as const,
    },
    overlay: true,
  },
  {
    id: "3",
    title: "Consulta Experta",
    subtitle: "Soporte Farmacéutico 24/7",
    description: "Obtén consejos profesionales de farmacéuticos certificados en cualquier momento",
    ctaPrimary: {
      text: "Consultar Ahora",
      href: "/consultation",
    },
    backgroundColor: "#7C3AED",
    textColor: "light" as const,
    badge: {
      text: "Servicio Gratuito",
      variant: "secondary" as const,
    },
    overlay: true,
  },
]

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { addItem } = usePrestashopCart()
  const { toast } = useToast()

  // Fetch real data from PrestaShop
  const {
    categories,
    categoryTree,
    isLoading: categoriesLoading,
    error: categoriesError,
    refresh: refreshCategories,
  } = usePrestashopCategories()

  const {
    products: featuredProducts,
    isLoading: featuredLoading,
    error: featuredError,
    refresh: refreshFeatured,
  } = usePrestashopFeaturedProducts(8)

  const {
    products: allProducts,
    isLoading: productsLoading,
    error: productsError,
    refresh: refreshProducts,
  } = usePrestashopProducts({ limit: 12 })

  const {
    products: discountedProducts,
    isLoading: discountedLoading,
    error: discountedError,
    refresh: refreshDiscounted,
  } = usePrestashopProducts({
    limit: 8,
    sortBy: "price",
    sortOrder: "asc",
  })

  // Transform categories for FeaturedCategories component
  const transformedCategories = categories.map((category, index) => {
    const colors = [
      { primary: "#3b82f6", secondary: "#60a5fa", accent: "#2563eb" },
      { primary: "#f59e0b", secondary: "#fbbf24", accent: "#d97706" },
      { primary: "#ec4899", secondary: "#f472b6", accent: "#db2777" },
      { primary: "#8b5cf6", secondary: "#a78bfa", accent: "#7c3aed" },
      { primary: "#ef4444", secondary: "#f87171", accent: "#dc2626" },
      { primary: "#10b981", secondary: "#34d399", accent: "#059669" },
    ]

    const icons = [Package, Sparkles, Heart, Baby, FirstAid, Leaf]
    const IconComponent = icons[index % icons.length]

    return {
      id: category.id,
      name: category.name,
      description: category.description || `Productos de ${category.name.toLowerCase()}`,
      href: `/categories/${category.id}`,
      image: category.image || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(category.name)}`,
      icon: <IconComponent className="w-6 h-6" />,
      productCount: category.productCount,
      trending: index < 2,
      popular: index === 1,
      featured: index === 2,
      color: colors[index % colors.length],
      stats: {
        avgRating: 4.5 + Math.random() * 0.5,
        totalReviews: Math.floor(Math.random() * 500) + 100,
        newProducts: Math.floor(Math.random() * 30) + 5,
      },
    }
  })

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product)
      toast({
        title: "Añadido al carrito",
        description: `${product.name} ha sido añadido a tu carrito.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito.",
        variant: "destructive",
      })
    }
  }

  const handleRefreshData = () => {
    refreshCategories()
    refreshFeatured()
    refreshProducts()
    refreshDiscounted()
    setRefreshKey((prev) => prev + 1)
    toast({
      title: "Datos actualizados",
      description: "Los productos y categorías han sido actualizados desde PrestaShop.",
    })
  }

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshCategories()
        refreshFeatured()
        refreshProducts()
        refreshDiscounted()
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [refreshCategories, refreshFeatured, refreshProducts, refreshDiscounted])

  // Error handling component
  const ErrorDisplay = ({ error, onRetry, title }: { error: string; onRetry: () => void; title: string }) => (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Error cargando {title}: {error}
        </span>
        <Button onClick={onRetry} variant="outline" size="sm">
          Reintentar
        </Button>
      </AlertDescription>
    </Alert>
  )

  return (
    <PrestashopDataProvider>
      <div className="min-h-screen bg-white">
        <Header />

        <main>
          {/* Refresh Button for Admin */}
          <div className="container mx-auto px-4 pt-4">
            <Button onClick={handleRefreshData} variant="outline" size="sm" className="mb-4">
              Actualizar Datos desde PrestaShop
            </Button>
          </div>

          {/* Main Banner */}
          <MainBanner
            slides={bannerSlides}
            autoPlay={true}
            autoPlayInterval={5000}
            showNavigation={true}
            showDots={true}
          />

          <PromotionalBannerSection />

          {/* Categories Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              {categoriesError && (
                <ErrorDisplay error={categoriesError} onRetry={refreshCategories} title="categorías" />
              )}

              {categoriesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                  <span className="ml-3 text-lg">Cargando categorías desde PrestaShop...</span>
                </div>
              ) : transformedCategories.length > 0 ? (
                <FeaturedCategories
                  categories={transformedCategories}
                  title="Compra por Categoría"
                  subtitle="Descubre nuestra amplia gama de productos para el cuidado de la salud y el bienestar"
                  layout="grid"
                  showStats={true}
                  showViewAll={true}
                />
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay categorías disponibles</h3>
                  <p className="text-gray-500 mb-4">Las categorías se cargarán desde PrestaShop</p>
                  <Button onClick={refreshCategories} variant="outline">
                    Recargar Categorías
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Featured Products Section */}
          <PrestashopErrorBoundary>
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold">Productos Destacados</h2>
                  <Link href="/products-prestashop">
                    <Button variant="outline">
                      Ver Todos <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                {featuredError && (
                  <ErrorDisplay error={featuredError} onRetry={refreshFeatured} title="productos destacados" />
                )}

                {featuredLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <LoadingSpinner size="lg" />
                    <span className="ml-3 text-lg">Cargando productos destacados...</span>
                  </div>
                ) : featuredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.slice(0, 4).map((product) => (
                      <Card key={product.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <Link href={`/product-prestashop/${product.id}`}>
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center cursor-pointer overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg?height=300&width=300&text=Producto"}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=300&width=300&text=Producto"
                                }}
                              />
                            </div>
                          </Link>
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({product.reviewCount})</span>
                          </div>
                          <Link href={`/product-prestashop/${product.id}`}>
                            <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ${product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {product.inStock ? (
                              <span className="text-xs text-green-600 font-medium">En Stock</span>
                            ) : (
                              <span className="text-xs text-red-600 font-medium">Agotado</span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            {product.inStock ? "Añadir al Carrito" : "Agotado"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay productos destacados</h3>
                    <p className="text-gray-500 mb-4">Los productos se cargarán desde PrestaShop</p>
                    <Button onClick={refreshFeatured} variant="outline">
                      Recargar Productos
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </PrestashopErrorBoundary>

          {/* Product Carousels with Real Data */}
          {allProducts.length > 0 && (
            <ProductCarousel
              products={allProducts}
              title="Productos Recomendados"
              subtitle="Seleccionados desde nuestro catálogo PrestaShop"
              type="recommended"
              autoPlay={true}
              showQuickActions={true}
              onAddToCart={handleAddToCart}
              className="py-8"
            />
          )}

          {discountedProducts.length > 0 && (
            <ProductCarousel
              products={discountedProducts}
              title="Ofertas Especiales"
              subtitle="Los mejores precios de nuestro catálogo"
              type="bestselling"
              autoPlay={true}
              showQuickActions={true}
              onAddToCart={handleAddToCart}
              className="py-8 bg-gray-50"
            />
          )}

          {/* Loading states for carousels */}
          {(productsLoading || discountedLoading) && (
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-center py-12">
                  <LoadingSpinner size="lg" />
                  <span className="ml-3 text-lg">Cargando más productos...</span>
                </div>
              </div>
            </section>
          )}

          {/* Error states for carousels */}
          {productsError && (
            <section className="py-8">
              <div className="container mx-auto px-4">
                <ErrorDisplay error={productsError} onRetry={refreshProducts} title="productos recomendados" />
              </div>
            </section>
          )}

          {discountedError && (
            <section className="py-8 bg-gray-50">
              <div className="container mx-auto px-4">
                <ErrorDisplay error={discountedError} onRetry={refreshDiscounted} title="ofertas especiales" />
              </div>
            </section>
          )}

          <StoreBenefits />
          <SEOContentSection />
        </main>

        <Footer />
      </div>
      <PrestashopStatus />
    </PrestashopDataProvider>
  )
}
