"use client"

import { ArrowLeft, Star, Heart, Plus, Minus, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"

export default function ResponsiveProductPage() {
  const breadcrumbItems = [{ label: "Pain Relief", href: "/categories/pain-relief" }, { label: "Ibuprofen 400mg" }]

  const relatedProducts = [
    {
      id: "2",
      name: "Acetaminophen 500mg",
      description: "Effective pain and fever relief",
      price: 18.99,
      rating: 4.3,
      reviewCount: 89,
      category: "Pain Relief",
    },
    {
      id: "3",
      name: "Aspirin 325mg",
      description: "Low-dose aspirin for heart health",
      price: 14.99,
      rating: 4.6,
      reviewCount: 156,
      category: "Pain Relief",
    },
    {
      id: "4",
      name: "Naproxen 220mg",
      description: "Long-lasting pain relief",
      price: 22.99,
      rating: 4.4,
      reviewCount: 73,
      category: "Pain Relief",
    },
    {
      id: "5",
      name: "Topical Pain Relief Gel",
      description: "Fast-acting topical pain relief",
      price: 16.99,
      rating: 4.2,
      reviewCount: 94,
      category: "Pain Relief",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />
      <Breadcrumb items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 md:mb-6 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Back to Pain Relief</span>
          <span className="sm:hidden">Back</span>
        </Button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border p-4 md:p-8 flex items-center justify-center">
              <div className="text-6xl md:text-8xl">💊</div>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {[1, 2, 3, 4].map((thumb) => (
                <div
                  key={thumb}
                  className="aspect-square bg-white rounded-lg border p-2 md:p-4 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="text-lg md:text-2xl">💊</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <Badge className="mb-2 md:mb-3">Prescription Required</Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 font-montserrat">
                Ibuprofen 400mg Tablets
              </h1>
              <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base font-inter">
                Fast-acting pain relief for headaches, muscle pain, and inflammation
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm md:text-base text-gray-600 ml-2 font-inter">(127 reviews)</span>
                </div>
                <Badge variant="secondary">In Stock</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="text-2xl md:text-3xl font-bold text-blue-600 font-inter">$12.99</span>
                <span className="text-lg md:text-xl text-gray-500 line-through font-inter">$16.99</span>
                <Badge variant="destructive">25% OFF</Badge>
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3 font-inter">Pack Size</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                  <Button variant="outline" className="h-auto py-3 md:py-4">
                    <div className="text-center">
                      <div className="font-semibold text-sm md:text-base">20 tablets</div>
                      <div className="text-xs md:text-sm text-gray-500">$12.99</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 md:py-4 border-blue-500 bg-blue-50">
                    <div className="text-center">
                      <div className="font-semibold text-sm md:text-base">50 tablets</div>
                      <div className="text-xs md:text-sm text-gray-500">$24.99</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 md:py-4">
                    <div className="text-center">
                      <div className="font-semibold text-sm md:text-base">100 tablets</div>
                      <div className="text-xs md:text-sm text-gray-500">$39.99</div>
                    </div>
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium mb-2 md:mb-3 font-inter">Quantity</label>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                      <Minus className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                    <Input className="w-12 md:w-16 text-center border-0 focus:ring-0 text-sm md:text-base" value="1" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-inter">Max 3 per order</span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3 md:space-y-4">
              <Button size="lg" className="w-full text-sm md:text-base py-3 md:py-4">
                Add to Cart - $12.99
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                <Button variant="outline" size="lg" className="text-sm md:text-base">
                  <Heart className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Add to Wishlist</span>
                  <span className="sm:hidden">Wishlist</span>
                </Button>
                <Button variant="outline" size="lg" className="text-sm md:text-base">
                  Compare
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm md:text-base">Free delivery</div>
                      <div className="text-xs md:text-sm text-gray-600">Order by 2 PM for same-day delivery</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm md:text-base">Prescription required</div>
                      <div className="text-xs md:text-sm text-gray-600">Upload prescription during checkout</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs - Responsive */}
        <div className="mb-8 md:mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 md:mb-6">
              <TabsTrigger value="description" className="text-xs md:text-sm">
                Description
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="text-xs md:text-sm">
                Ingredients
              </TabsTrigger>
              <TabsTrigger value="usage" className="text-xs md:text-sm">
                Usage
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs md:text-sm">
                Reviews (127)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 font-montserrat">Product Description</h3>
                  <div className="prose max-w-none text-sm md:text-base">
                    <p className="mb-3 md:mb-4 font-inter">
                      Ibuprofen 400mg tablets provide effective relief from pain and inflammation. This non-steroidal
                      anti-inflammatory drug (NSAID) is commonly used to treat headaches, muscle pain, arthritis, and
                      other conditions involving pain and inflammation.
                    </p>
                    <p className="mb-3 md:mb-4 font-inter">
                      Each tablet contains 400mg of ibuprofen, providing fast-acting relief that can last up to 8 hours.
                      The tablets are film-coated for easy swallowing and are suitable for adults and children over 12
                      years.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
                    <h3 className="text-lg md:text-xl font-semibold font-montserrat">Customer Reviews</h3>
                    <Button variant="outline" className="self-start md:self-auto">
                      Write a Review
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="text-center md:col-span-1">
                      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4.6</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-gray-600 text-sm md:text-base">Based on 127 reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products - Responsive Grid */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 font-montserrat">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
