import { ChevronRight, Truck, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ProductCard } from "@/components/ui/product-card"

export default function ResponsiveHomePage() {
  const featuredProducts = [
    {
      id: "1",
      name: "Ibuprofen 400mg Tablets",
      description: "Fast-acting pain relief for headaches and muscle pain",
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviewCount: 127,
      isOnSale: true,
      isPrescriptionRequired: true,
      category: "Pain Relief",
    },
    {
      id: "2",
      name: "Vitamin D3 1000 IU Softgels",
      description: "Essential vitamin for bone health and immune support",
      price: 19.99,
      rating: 4.8,
      reviewCount: 89,
      category: "Vitamins",
    },
    {
      id: "3",
      name: "Moisturizing Face Cream SPF 30",
      description: "Daily moisturizer with sun protection for all skin types",
      price: 15.99,
      rating: 4.2,
      reviewCount: 45,
      category: "Beauty",
    },
    {
      id: "4",
      name: "Baby Gentle Shampoo",
      description: "Tear-free formula for delicate baby hair and scalp",
      price: 12.99,
      rating: 4.7,
      reviewCount: 156,
      category: "Baby Care",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      {/* Hero Section - Responsive */}
      <section className="bg-gradient-to-r from-primary-blue to-secondary-teal text-white">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold mb-3 md:mb-4 lg:mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 lg:mb-8 text-blue-100 leading-relaxed">
                Licensed pharmacy with over 10,000 products for your health and wellness needs
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-white text-primary-blue hover:bg-gray-100 font-medium">
                  Shop Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-blue"
                >
                  Upload Prescription
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white/10 rounded-lg p-6 md:p-8 text-center max-w-sm w-full">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🏥</div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Licensed Pharmacy</h3>
                <p className="text-sm md:text-base text-blue-100">Certified pharmacists available for consultation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 font-montserrat">Fast Delivery</h3>
              <p className="text-sm md:text-base text-gray-600 font-inter">
                Same-day delivery available in select areas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 font-montserrat">Licensed & Safe</h3>
              <p className="text-sm md:text-base text-gray-600 font-inter">
                All products verified by certified pharmacists
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 font-montserrat">24/7 Support</h3>
              <p className="text-sm md:text-base text-gray-600 font-inter">
                Expert consultation available round the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - Responsive Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat">Shop by Category</h2>
            <Button variant="outline" className="self-start sm:self-auto">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
            {[
              { name: "Pain Relief", icon: "💊", count: "150+ products" },
              { name: "Vitamins", icon: "🌟", count: "200+ products" },
              { name: "Skincare", icon: "✨", count: "300+ products" },
              { name: "Baby Care", icon: "👶", count: "180+ products" },
              { name: "First Aid", icon: "🏥", count: "120+ products" },
              { name: "Wellness", icon: "🌿", count: "250+ products" },
            ].map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-3 md:p-6 text-center">
                  <div className="text-2xl md:text-4xl mb-2 md:mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1 text-sm md:text-base font-inter">{category.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600 font-inter">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Responsive Grid */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold font-montserrat">Featured Products</h2>
            <Button variant="outline" className="self-start sm:self-auto">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Responsive */}
      <section className="py-8 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 font-montserrat">Stay Updated</h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base font-inter">
            Get the latest health tips, product updates, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 md:gap-4">
            <Input placeholder="Enter your email" className="flex-1 font-inter" />
            <Button className="bg-primary-blue hover:bg-primary-blue-hover">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
