import Link from "next/link"
import { Search, ShoppingCart, User, Heart, Truck, Shield, Plus, Minus, X, ArrowLeft, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ShoppingCartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Same as other pages */}
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

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Item 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💊</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Ibuprofen 400mg Tablets</h3>
                        <p className="text-gray-600 text-sm">50 tablets pack</p>
                        <Badge variant="secondary" className="mt-1">
                          Prescription Required
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">2</span>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Plus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm text-gray-600 ml-2">Max 3 per order</span>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">$49.98</div>
                        <div className="text-sm text-gray-500">$24.99 each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Item 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌟</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Vitamin D3 1000 IU</h3>
                        <p className="text-gray-600 text-sm">60 softgels</p>
                        <Badge variant="outline" className="mt-1">
                          Over-the-counter
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">1</span>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">$19.99</div>
                        <div className="text-sm text-gray-500 line-through">$24.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cart Item 3 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Moisturizing Face Cream</h3>
                        <p className="text-gray-600 text-sm">50ml tube</p>
                        <Badge variant="outline" className="mt-1">
                          Over-the-counter
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">1</span>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">$15.99</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prescription Upload */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">⚠️</span>
                  </div>
                  <h3 className="font-semibold text-orange-800">Prescription Required</h3>
                </div>
                <p className="text-orange-700 mb-4">
                  You have prescription items in your cart. Please upload your prescription to proceed with checkout.
                </p>
                <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  Upload Prescription
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal (4 items)</span>
                  <span>$85.96</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-$5.00</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>$6.48</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">$87.44</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="flex-1" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>

                <Separator />

                {/* Delivery Options */}
                <div className="space-y-3">
                  <h4 className="font-medium">Delivery Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50 border-blue-200">
                      <div>
                        <div className="font-medium text-sm">Standard Delivery</div>
                        <div className="text-xs text-gray-600">2-3 business days</div>
                      </div>
                      <div className="text-green-600 font-medium">FREE</div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Express Delivery</div>
                        <div className="text-xs text-gray-600">Next business day</div>
                      </div>
                      <div className="font-medium">$9.99</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>

                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Save for Later
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">You might also like</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💊</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Recommended Product {item}</h4>
                      <p className="text-xs text-gray-600 mb-2">Brief description</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600">$12.99</span>
                        <Button size="sm" variant="outline">
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
