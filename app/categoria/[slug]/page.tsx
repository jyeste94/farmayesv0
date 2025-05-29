"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ChevronRight, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { categoriesAPI, productsAPI, extractIdFromUrl } from "@/lib/prestashop-api"
import type { Product } from "@/types"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { ProductCard } from "@/components/ui/product-card"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string
    const [category, setCategory] = useState<any>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [sortBy, setSortBy] = useState("name")
    const [priceRange, setPriceRange] = useState([0, 100])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                setIsLoading(true)
                setError(null)

                // Try to get category by slug first
                let categoryData: any
                try {
                    categoryData = await categoriesAPI.getCategoryBySlug(slug)
                } catch (slugError) {
                    // If slug fails, try to extract ID and get by ID
                    const id = extractIdFromUrl(`/${slug}`)
                    if (id && id !== slug) {
                        categoryData = await categoriesAPI.getCategory(id)
                    } else {
                        throw slugError
                    }
                }

                setCategory(categoryData)

                // Fetch products for this category
                const productsResponse = await productsAPI.getProducts({
                    category: categoryData.id,
                    page: currentPage,
                    limit: 12,
                    sortBy: sortBy,
                    sortOrder: "asc",
                })

                setProducts(productsResponse.products)
                setTotalPages(productsResponse.totalPages)
            } catch (error) {
                console.error("Failed to fetch category or products:", error)
                setError("No se pudo cargar la categoría")
            } finally {
                setIsLoading(false)
            }
        }

        if (slug) {
            fetchCategoryAndProducts()
        }
    }, [slug, currentPage, sortBy])

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy)
        setCurrentPage(1) // Reset to first page when sorting changes
    }

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando categoría...</p>
                </div>
            </div>
        )
    }

    if (error || !category) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
                    <p className="text-gray-600 mb-6">{error || "La categoría que buscas no existe."}</p>
                    <Link href="/">
                        <Button>Volver al inicio</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/categorias" className="hover:text-blue-600">
                            Categorías
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-900">{category.name}</span>
                    </div>
                </div>
            </div>

            {/* Category Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                            <p className="text-gray-600">
                                {category.description || `Encuentra los mejores productos en ${category.name}`}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">{category.productCount} productos disponibles</p>
                        </div>
                        <div className="text-6xl">
                            {category.name.toLowerCase().includes("medicamento")
                                ? "💊"
                                : category.name.toLowerCase().includes("vitamina")
                                    ? "🌿"
                                    : category.name.toLowerCase().includes("belleza")
                                        ? "💄"
                                        : category.name.toLowerCase().includes("bebé")
                                            ? "👶"
                                            : "📦"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter className="w-5 h-5" />
                                    <h2 className="text-lg font-semibold">Filtros</h2>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Rango de precio</h3>
                                    <div className="space-y-3">
                                        <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} className="w-full" />
                                        <div className="flex items-center gap-2">
                                            <Input
                                                placeholder="Mín"
                                                className="text-sm"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            />
                                            <span>-</span>
                                            <Input
                                                placeholder="Máx"
                                                className="text-sm"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* Brand */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Marca</h3>
                                    <div className="space-y-3">
                                        {["Genérico", "Bayer", "Pfizer", "Johnson & Johnson", "Roche"].map((brand) => (
                                            <div key={brand} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={brand}
                                                    checked={selectedBrands.includes(brand)}
                                                    onCheckedChange={() => handleBrandToggle(brand)}
                                                />
                                                <label htmlFor={brand} className="text-sm">
                                                    {brand}
                                                </label>
                                                <span className="text-xs text-gray-500 ml-auto">({Math.floor(Math.random() * 20) + 1})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* Type */}
                                <div className="mb-6">
                                    <h3 className="font-medium mb-3">Tipo</h3>
                                    <div className="space-y-3">
                                        {["Tabletas", "Cápsulas", "Líquido", "Tópico", "Parches"].map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox id={type} />
                                                <label htmlFor={type} className="text-sm">
                                                    {type}
                                                </label>
                                                <span className="text-xs text-gray-500 ml-auto">({Math.floor(Math.random() * 15) + 1})</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full">Aplicar filtros</Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border">
                            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Mostrando {(currentPage - 1) * 12 + 1}-{Math.min(currentPage * 12, products.length)} de{" "}
                    {products.length} productos
                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Select value={sortBy} onValueChange={handleSortChange}>
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Ordenar por" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="name">Nombre</SelectItem>
                                        <SelectItem value="price">Precio: Menor a mayor</SelectItem>
                                        <SelectItem value="price_desc">Precio: Mayor a menor</SelectItem>
                                        <SelectItem value="rating">Valoración</SelectItem>
                                        <SelectItem value="newest">Más recientes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex border rounded-lg">
                                    <Button variant="ghost" size="icon" className="rounded-r-none">
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-l-none border-l">
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {products.length === 0 ? (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-semibold mb-2">No hay productos en esta categoría</h3>
                                <p className="text-gray-600 mb-6">Intenta ajustar los filtros o explora otras categorías.</p>
                                <Link href="/">
                                    <Button>Explorar todas las categorías</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            price={product.price}
                                            originalPrice={product.originalPrice}
                                            rating={product.rating}
                                            reviewCount={product.reviewCount}
                                            imageUrl={product.image}
                                            imageAlt={product.name}
                                            isOnSale={!!product.originalPrice && product.originalPrice > product.price}
                                            isPrescriptionRequired={product.isPrescriptionRequired}
                                            isInStock={product.inStock}
                                            category={product.category}
                                            onAddToCart={() => {
                                                // Handle add to cart
                                                console.log("Add to cart:", product.id)
                                            }}
                                            onAddToWishlist={() => {
                                                // Handle add to wishlist
                                                console.log("Add to wishlist:", product.id)
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center mt-12 gap-2">
                                        <Button
                                            variant="outline"
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Anterior
                                        </Button>
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            const page = i + 1
                                            return (
                                                <Button
                                                    key={page}
                                                    variant={currentPage === page ? "default" : "outline"}
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        })}
                                        {totalPages > 5 && (
                                            <>
                                                <span className="px-2">...</span>
                                                <Button variant="outline" onClick={() => setCurrentPage(totalPages)}>
                                                    {totalPages}
                                                </Button>
                                            </>
                                        )}
                                        <Button
                                            variant="outline"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Siguiente
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
