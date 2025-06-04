"use client"

import { ArrowLeft, Plus, Minus, X, Lock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export default function ResponsiveCartPage() {
  const cartItems = [
    {
      id: "1",
      name: "Ibuprofen 400mg Tablets",
      description: "50 tablets pack",
      price: 24.99,
      quantity: 2,
      isPrescriptionRequired: true,
      image: "💊",
    },
    {
      id: "2",
      name: "Vitamin D3 1000 IU",
      description: "60 softgels",
      price: 19.99,
      originalPrice: 24.99,
      quantity: 1,
      isPrescriptionRequired: false,
      image: "🌟",
    },
    {
      id: "3",
      name: "Moisturizing Face Cream",
      description: "50ml tube",
      price: 15.99,
      quantity: 1,
      isPrescriptionRequired: false,
      image: "✨",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 md:mb-6 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Continue Shopping</span>
          <span className="sm:hidden">Continue</span>
        </Button>

        {/* Page Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 font-montserrat">Shopping Cart</h1>
          <p className="text-gray-600 text-sm md:text-base font-inter">Review your items before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                      <span className="text-2xl md:text-3xl">{item.image}</span>
                    </div>

                    <div className="flex-1 space-y-3 md:space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-center sm:text-left">
                          <h3 className="font-semibold text-base md:text-lg font-inter">{item.name}</h3>
                          <p className="text-gray-600 text-sm md:text-base font-inter">{item.description}</p>
                          {item.isPrescriptionRequired && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Prescription Required
                            </Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 h-8 w-8">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm md:text-base">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          {item.isPrescriptionRequired && (
                            <span className="text-xs md:text-sm text-gray-600 font-inter">Max 3 per order</span>
                          )}
                        </div>

                        <div className="text-center sm:text-right">
                          <div className="text-lg md:text-xl font-bold text-blue-600 font-inter">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs md:text-sm text-gray-500 font-inter">
                            ${item.price.toFixed(2)} each
                            {item.originalPrice && (
                              <span className="line-through ml-1">${item.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Prescription Upload */}
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3 mb-3 md:mb-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-sm md:text-base">⚠️</span>
                  </div>
                  <h3 className="font-semibold text-orange-800 text-sm md:text-base font-montserrat">
                    Prescription Required
                  </h3>
                </div>
                <p className="text-orange-700 mb-3 md:mb-4 text-xs md:text-sm font-inter">
                  You have prescription items in your cart. Please upload your prescription to proceed with checkout.
                </p>
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 text-xs md:text-sm"
                >
                  Upload Prescription
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 md:top-24">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-montserrat">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="font-inter">Subtotal (4 items)</span>
                  <span className="font-inter">$85.96</span>
                </div>

                <div className="flex justify-between text-green-600 text-sm md:text-base">
                  <span className="font-inter">Discount</span>
                  <span className="font-inter">-$5.00</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <span className="font-inter">Shipping</span>
                  <span className="text-green-600 font-inter">FREE</span>
                </div>

                <div className="flex justify-between text-xs md:text-sm text-gray-600">
                  <span className="font-inter">Tax</span>
                  <span className="font-inter">$6.48</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg md:text-xl font-bold">
                  <span className="font-inter">Total</span>
                  <span className="text-blue-600 font-inter">$87.44</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium font-inter">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="flex-1 text-xs md:text-sm" />
                    <Button variant="outline" className="text-xs md:text-sm px-3">
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Delivery Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm md:text-base font-inter">Delivery Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 md:p-3 border rounded-lg bg-blue-50 border-blue-200">
                      <div>
                        <div className="font-medium text-xs md:text-sm font-inter">Standard Delivery</div>
                        <div className="text-xs text-gray-600 font-inter">2-3 business days</div>
                      </div>
                      <div className="text-green-600 font-medium text-xs md:text-sm font-inter">FREE</div>
                    </div>
                    <div className="flex items-center justify-between p-2 md:p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-xs md:text-sm font-inter">Express Delivery</div>
                        <div className="text-xs text-gray-600 font-inter">Next business day</div>
                      </div>
                      <div className="font-medium text-xs md:text-sm font-inter">$9.99</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                  <Lock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-inter">Secure checkout with SSL encryption</span>
                </div>

                <Button size="lg" className="w-full text-sm md:text-base py-3">
                  Proceed to Checkout
                </Button>

                <Button variant="outline" size="lg" className="w-full text-sm md:text-base py-3">
                  <Heart className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Save for Later
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Products - Hidden on mobile */}
            <Card className="mt-6 hidden md:block">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-montserrat">You might also like</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg md:text-xl">💊</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-xs md:text-sm font-inter">Recommended Product {item}</h4>
                      <p className="text-xs text-gray-600 mb-2 font-inter">Brief description</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-blue-600 text-xs md:text-sm font-inter">$12.99</span>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
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

      <Footer />
    </div>
  )
}
