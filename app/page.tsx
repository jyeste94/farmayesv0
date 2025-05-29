"use client"

import Link from "next/link"
import { Star, ChevronRight, Truck, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/useCart"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/layout/Header"
import type { Product } from "@/types"

// Mock featured products
const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Ibuprofen 400mg",
    description: "Pain relief medication for headaches and muscle pain",
    price: 24.99,
    originalPrice: 29.99,
    category: "medicines",
    brand: "PharmaCare",
    image: "/placeholder.svg?height=300&width=300&text=Ibuprofen",
    images: ["/placeholder.svg?height=300&width=300&text=Ibuprofen"],
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
    name: "Vitamin D3 1000 IU",
    description: "Essential vitamin for bone health and immune support",
    price: 19.99,
    originalPrice: 24.99,
    category: "vitamins",
    brand: "VitaPlus",
    image: "/placeholder.svg?height=300&width=300&text=VitaminD3",
    images: ["/placeholder.svg?height=300&width=300&text=VitaminD3"],
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
  {
    id: "3",
    name: "Moisturizing Face Cream",
    description: "Hydrating cream for all skin types",
    price: 15.99,
    originalPrice: 19.99,
    category: "beauty",
    brand: "SkinCare+",
    image: "/placeholder.svg?height=300&width=300&text=FaceCream",
    images: ["/placeholder.svg?height=300&width=300&text=FaceCream"],
    inStock: true,
    stockQuantity: 75,
    rating: 4.3,
    reviewCount: 89,
    isPrescriptionRequired: false,
    tags: ["new"],
    specifications: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Baby Diaper Cream",
    description: "Gentle protection for sensitive baby skin",
    price: 12.99,
    originalPrice: 16.99,
    category: "baby",
    brand: "BabyCare",
    image: "/placeholder.svg?height=300&width=300&text=BabyCream",
    images: ["/placeholder.svg?height=300&width=300&text=BabyCream"],
    inStock: true,
    stockQuantity: 30,
    rating: 4.7,
    reviewCount: 67,
    isPrescriptionRequired: false,
    tags: ["popular"],
    specifications: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function HomePage() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
              <p className="text-xl mb-6 text-blue-100">
                Licensed pharmacy with over 10,000 products for your health and wellness needs
              </p>
              <div className="flex gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Prescription Upload
                </Button>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-2">Licensed Pharmacy</h3>
              <p className="text-blue-100">Certified pharmacists available for consultation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in select areas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensed & Safe</h3>
              <p className="text-gray-600">All products verified by certified pharmacists</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Expert consultation available round the clock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link href="/categories">
              <Button variant="outline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Pain Relief", icon: "💊", count: "150+ products", href: "/categories/medicines" },
              { name: "Vitamins", icon: "🌟", count: "200+ products", href: "/categories/vitamins" },
              { name: "Skincare", icon: "✨", count: "300+ products", href: "/categories/beauty" },
              { name: "Baby Care", icon: "👶", count: "180+ products", href: "/categories/baby" },
              { name: "First Aid", icon: "🏥", count: "120+ products", href: "/categories/medical" },
              { name: "Wellness", icon: "🌿", count: "250+ products", href: "/categories/wellness" },
            ].map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center cursor-pointer">
                      <span className="text-4xl">📦</span>
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
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-2 hover:text-blue-600 cursor-pointer">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest health tips, product updates, and exclusive offers delivered to your inbox
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PharmaCare+</h3>
              <p className="text-gray-400 mb-4">Your trusted online pharmacy for all health and wellness needs.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
                <div className="w-8 h-8 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/about" className="block hover:text-white">
                  About Us
                </Link>
                <Link href="/contact" className="block hover:text-white">
                  Contact
                </Link>
                <Link href="/faq" className="block hover:text-white">
                  FAQ
                </Link>
                <Link href="/shipping" className="block hover:text-white">
                  Shipping Info
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/categories/medicines" className="block hover:text-white">
                  Medicines
                </Link>
                <Link href="/categories/vitamins" className="block hover:text-white">
                  Vitamins
                </Link>
                <Link href="/categories/beauty" className="block hover:text-white">
                  Beauty
                </Link>
                <Link href="/categories/baby" className="block hover:text-white">
                  Baby Care
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/help" className="block hover:text-white">
                  Help Center
                </Link>
                <Link href="/returns" className="block hover:text-white">
                  Returns
                </Link>
                <Link href="/privacy" className="block hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PharmaCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
