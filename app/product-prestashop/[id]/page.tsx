"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/ui/footer"
import { usePrestashopProduct } from "@/hooks/usePrestashopProduct"
import { usePrestashopCart } from "@/hooks/usePrestashopCart"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PrestashopProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { product, isLoading, error, clearError } = usePrestashopProduct(productId)
  const { addItem } = usePrestashopCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (!product) return

    try {
      await addItem(product, quantity)
      toast({
        title: "Producto añadido",
        description: `${product.name} (${quantity}) ha sido añadido al carrito.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito.",
        variant: "destructive",
      })
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product?.stockQuantity || 1, quantity + delta))
    setQuantity(newQuantity)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-lg">Cargando producto...</span>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Error al cargar el producto</p>
              <p className="text-sm">{error || "Producto no encontrado"}</p>
            </div>
            <div className="space-x-4">
              <Button onClick={clearError} variant="outline">
                Reintentar
              </Button>
              <Link href="/products-prestashop">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Productos
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Productos", href: "/products-prestashop" },
            { label: product.name },
          ]}
          className="mb-6"
        />

        {/* Back Button */}
        <Link href="/products-prestashop">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Productos
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.brand && <Badge variant="outline">{product.brand}</Badge>}
                {!product.inStock && <Badge variant="destructive">Agotado</Badge>}
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge variant="secondary">Oferta</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    <Badge variant="destructive" className="text-xs">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-4 text-sm">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>En stock ({product.stockQuantity} disponibles)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>Agotado</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium">Cantidad:</label>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAddToCart} className="flex-1" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Añadir al Carrito
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Benefits */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Envío gratis en pedidos +$50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Garantía de calidad</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas ({product.reviewCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    {/* Add more detailed description here */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {Object.entries(product.specifications || {}).length > 0 ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span className="text-gray-600">{value as string}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No hay especificaciones disponibles.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600">Las reseñas se cargarán desde PrestaShop próximamente.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
