"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft, Plus, Minus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/useCart"
import { productsAPI, extractIdFromUrl } from "@/lib/prestashop-api"
import type { Product, Review } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/Header"
import { useToast } from "@/hooks/use-toast"

export default function ProductPage() {
    const params = useParams()
    const slug = params.slug as string
    const [product, setProduct] = useState<Product | null>(null)
    const [reviews, setReviews] = useState<Review[]>([])
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { addItem } = useCart()
    const { toast } = useToast()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true)
                setError(null)

                // Try to get product by slug first
                let productData: Product
                try {
                    productData = await productsAPI.getProductBySlug(slug)
                } catch (slugError) {
                    // If slug fails, try to extract ID and get by ID
                    const id = extractIdFromUrl(`/${slug}`)
                    if (id && id !== slug) {
                        productData = await productsAPI.getProduct(id)
                    } else {
                        throw slugError
                    }
                }

                setProduct(productData)

                // Mock reviews for now - replace with actual API call when available
                const mockReviews: Review[] = [
                    {
                        id: "1",
                        userId: "user1",
                        productId: productData.id,
                        userName: "María García",
                        rating: 5,
                        title: "Excelente producto",
                        comment: "Muy efectivo y de buena calidad. Lo recomiendo totalmente.",
                        verified: true,
                        helpful: 12,
                        createdAt: new Date("2024-01-15"),
                    },
                    {
                        id: "2",
                        userId: "user2",
                        productId: productData.id,
                        userName: "Carlos López",
                        rating: 4,
                        title: "Buen producto",
                        comment: "Cumple con lo esperado, entrega rápida.",
                        verified: true,
                        helpful: 8,
                        createdAt: new Date("2024-01-10"),
                    },
                ]
                setReviews(mockReviews)
            } catch (error) {
                console.error("Failed to fetch product:", error)
                setError("No se pudo cargar el producto")
                // Don't call notFound() immediately, let user see error message
            } finally {
                setIsLoading(false)
            }
        }

        if (slug) {
            fetchProduct()
        }
    }, [slug])

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity)
            toast({
                title: "Añadido al carrito",
                description: `${product.name} ha sido añadido a tu carrito.`,
            })
        }
    }

    const handleShare = async () => {
        if (navigator.share && product) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                })
            } catch (error) {
                // Fallback to clipboard
                navigator.clipboard.writeText(window.location.href)
                toast({
                    title: "Enlace copiado",
                    description: "El enlace del producto ha sido copiado al portapapeles.",
                })
            }
        } else if (product) {
            navigator.clipboard.writeText(window.location.href)
            toast({
                title: "Enlace copiado",
                description: "El enlace del producto ha sido copiado al portapapeles.",
            })
        }
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando producto...</p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                    <p className="text-gray-600 mb-6">{error || "El producto que buscas no existe."}</p>
                    <Link href="/">
                        <Button>Volver al inicio</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const averageRating =
        reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <Link href="/">
                        <Button variant="ghost">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver a productos
                        </Button>
                    </Link>
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartir
                    </Button>
                </div>

                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-blue-600">
                        Inicio
                    </Link>
                    <span>/</span>
                    <Link href="/productos" className="hover:text-blue-600">
                        Productos
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-lg overflow-hidden border">
                            <Image
                                src={product.images[selectedImage] || product.image}
                                alt={product.name}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                            selectedImage === index ? "border-blue-600" : "border-gray-200"
                                        }`}
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.name} ${index + 1}`}
                                            width={80}
                                            height={80}
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
                                <Badge variant="secondary">{product.category}</Badge>
                                {product.isPrescriptionRequired && (
                                    <Badge variant="outline" className="border-orange-300 text-orange-700">
                                        Requiere receta
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
                                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} reseñas)
                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</div>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.inStock ? (
                                <>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-green-700 font-medium">En stock ({product.stockQuantity} disponibles)</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-red-700 font-medium">Agotado</span>
                                </>
                            )}
                        </div>

                        {/* Quantity and Add to Cart */}
                        {product.inStock && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium">Cantidad:</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                                            disabled={quantity >= product.stockQuantity}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        Añadir al carrito
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3">
                                <Truck className="w-5 h-5 text-blue-600" />
                                <div>
                                    <div className="font-medium">Envío gratis</div>
                                    <div className="text-sm text-gray-600">En pedidos superiores a $50</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-green-600" />
                                <div>
                                    <div className="font-medium">Farmacia licenciada</div>
                                    <div className="text-sm text-gray-600">Productos verificados</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-16">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Descripción</TabsTrigger>
                            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                            <TabsTrigger value="reviews">Reseñas ({reviews.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Descripción del producto</h3>
                                    <div className="prose max-w-none">
                                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                                        <p className="text-gray-600 leading-relaxed mt-4">
                                            Este producto de alta calidad está fabricado según los más altos estándares y es adecuado para uso
                                            diario. Consulte con un profesional de la salud antes de usar si tiene alguna condición médica.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="specifications" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Especificaciones</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-2 border-b">
                                                <span className="font-medium">{key}:</span>
                                                <span className="text-gray-600">{value}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">ID del producto:</span>
                                            <span className="text-gray-600">{product.id}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span className="font-medium">Marca:</span>
                                            <span className="text-gray-600">{product.brand || "Genérico"}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Reseñas de clientes</CardTitle>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
                                            <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
                                        </div>
                                        <span className="text-gray-600">Basado en {reviews.length} reseñas</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {reviews.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-600">¡Aún no hay reseñas! Sé el primero en reseñar este producto.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="border-b pb-6 last:border-b-0">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium">{review.userName}</span>
                                                                {review.verified && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        Compra verificada
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                                                        </div>
                                                        <span className="text-sm text-gray-600">{review.createdAt.toLocaleDateString()}</span>
                                                    </div>
                                                    <h4 className="font-medium mb-2">{review.title}</h4>
                                                    <p className="text-gray-600 mb-3">{review.comment}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <button className="hover:text-gray-700">Útil ({review.helpful})</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
