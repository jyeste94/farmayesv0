import { Suspense } from "react"
import Link from "next/link"
import { Search, ShoppingCart, User, Heart, ChevronRight, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProductGrid } from "@/components/ui/product-grid"

export default function ProductListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Free shipping over $50
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Licensed pharmacy
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/account" className="hover:text-blue-600">
                My Account
              </Link>
              <Link href="/help" className="hover:text-blue-600">
                Help
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PharmaCare+
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for medicines, vitamins, beauty products..."
                  className="pl-10 pr-4 py-3 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">All Products</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">All Products</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of healthcare products, from prescription medications to vitamins and wellness
              supplements. All products are sourced from trusted manufacturers and verified for quality and safety.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ProductGrid loading={true} />}>
          <ProductGrid />
        </Suspense>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Licensed & Verified</h3>
              <p className="text-sm text-gray-600">All products verified by licensed pharmacists</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast & Free Shipping</h3>
              <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Customer Care</h3>
              <p className="text-sm text-gray-600">24/7 support from healthcare professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
