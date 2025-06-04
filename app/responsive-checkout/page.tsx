"use client"

import Link from "next/link"
import { ArrowLeft, Lock, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export default function ResponsiveCheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4 md:mb-6 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Back to Cart</span>
          <span className="sm:hidden">Back</span>
        </Button>

        {/* Checkout Progress */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-center mb-3 md:mb-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full text-xs md:text-sm font-medium">
                <Check className="w-3 h-3 md:w-4 md:h-4" />
              </div>
              <div className="w-8 md:w-16 h-1 bg-blue-600"></div>
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-blue-600 text-white rounded-full text-xs md:text-sm font-medium">
                2
              </div>
              <div className="w-8 md:w-16 h-1 bg-gray-300"></div>
              <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-gray-300 text-gray-600 rounded-full text-xs md:text-sm font-medium">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-8 md:gap-16 text-xs md:text-sm">
            <span className="text-blue-600 font-medium font-inter">Cart</span>
            <span className="text-blue-600 font-medium font-inter">Checkout</span>
            <span className="text-gray-500 font-inter">Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg font-montserrat">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm">
                    1
                  </div>
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-xs md:text-sm font-inter">
                      First Name *
                    </Label>
                    <Input id="firstName" placeholder="John" className="text-sm md:text-base" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-xs md:text-sm font-inter">
                      Last Name *
                    </Label>
                    <Input id="lastName" placeholder="Doe" className="text-sm md:text-base" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs md:text-sm font-inter">
                    Email Address *
                  </Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="text-sm md:text-base" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs md:text-sm font-inter">
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="text-sm md:text-base" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="createAccount" />
                  <Label htmlFor="createAccount" className="text-xs md:text-sm font-inter">
                    Create an account for faster checkout
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg font-montserrat">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm">
                    2
                  </div>
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div>
                  <Label htmlFor="address" className="text-xs md:text-sm font-inter">
                    Street Address *
                  </Label>
                  <Input id="address" placeholder="123 Main Street" className="text-sm md:text-base" />
                </div>
                <div>
                  <Label htmlFor="apartment" className="text-xs md:text-sm font-inter">
                    Apartment, suite, etc. (optional)
                  </Label>
                  <Input id="apartment" placeholder="Apt 4B" className="text-sm md:text-base" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="city" className="text-xs md:text-sm font-inter">
                      City *
                    </Label>
                    <Input id="city" placeholder="New York" className="text-sm md:text-base" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-xs md:text-sm font-inter">
                      State *
                    </Label>
                    <Select>
                      <SelectTrigger className="text-sm md:text-base">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-xs md:text-sm font-inter">
                      ZIP Code *
                    </Label>
                    <Input id="zip" placeholder="10001" className="text-sm md:text-base" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg font-montserrat">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm">
                    3
                  </div>
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="standard" className="space-y-3">
                  <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <div>
                        <Label htmlFor="standard" className="font-medium text-xs md:text-sm font-inter">
                          Standard Delivery
                        </Label>
                        <p className="text-xs text-gray-600 font-inter">2-3 business days</p>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium text-xs md:text-sm font-inter">FREE</div>
                  </div>
                  <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <div>
                        <Label htmlFor="express" className="font-medium text-xs md:text-sm font-inter">
                          Express Delivery
                        </Label>
                        <p className="text-xs text-gray-600 font-inter">Next business day</p>
                      </div>
                    </div>
                    <div className="font-medium text-xs md:text-sm font-inter">$9.99</div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg font-montserrat">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm">
                    4
                  </div>
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <RadioGroup defaultValue="card" className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 md:p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                    <Label htmlFor="card" className="font-medium text-xs md:text-sm font-inter">
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-xs md:text-sm font-inter">
                      Card Number *
                    </Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-sm md:text-base" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-xs md:text-sm font-inter">
                        Expiry Date *
                      </Label>
                      <Input id="expiry" placeholder="MM/YY" className="text-sm md:text-base" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-xs md:text-sm font-inter">
                        CVV *
                      </Label>
                      <Input id="cvv" placeholder="123" className="text-sm md:text-base" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-xs md:text-sm font-inter">
                      Name on Card *
                    </Label>
                    <Input id="cardName" placeholder="John Doe" className="text-sm md:text-base" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prescription Upload */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 text-base md:text-lg font-montserrat">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs md:text-sm">
                    !
                  </div>
                  Prescription Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 mb-3 md:mb-4 text-xs md:text-sm font-inter">
                  You have prescription items in your order. Please upload a valid prescription to complete your
                  purchase.
                </p>
                <div className="border-2 border-dashed border-orange-300 rounded-lg p-4 md:p-6 text-center">
                  <div className="text-2xl md:text-4xl mb-2">📄</div>
                  <p className="font-medium mb-2 text-xs md:text-sm font-inter">Upload Prescription</p>
                  <p className="text-xs text-gray-600 mb-3 md:mb-4 font-inter">Drag and drop or click to browse</p>
                  <Button variant="outline" className="border-orange-300 text-orange-700 text-xs md:text-sm">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 md:top-24">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-montserrat">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {[
                    { name: "Ibuprofen 400mg", qty: 2, price: 49.98, image: "💊" },
                    { name: "Vitamin D3 1000 IU", qty: 1, price: 19.99, image: "🌟" },
                    { name: "Face Cream", qty: 1, price: 15.99, image: "✨" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex gap-2 md:gap-3 flex-1">
                        <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-sm md:text-lg">{item.image}</span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium text-xs md:text-sm font-inter truncate">{item.name}</h4>
                          <p className="text-xs text-gray-600 font-inter">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="font-medium text-xs md:text-sm font-inter flex-shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="font-inter">Subtotal</span>
                    <span className="font-inter">$85.96</span>
                  </div>
                  <div className="flex justify-between text-green-600 text-xs md:text-sm">
                    <span className="font-inter">Discount</span>
                    <span className="font-inter">-$5.00</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="font-inter">Shipping</span>
                    <span className="text-green-600 font-inter">FREE</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="font-inter">Tax</span>
                    <span className="font-inter">$6.48</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span className="font-inter">Total</span>
                  <span className="text-blue-600 font-inter">$87.44</span>
                </div>

                {/* Security Info */}
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-gray-50 p-2 md:p-3 rounded-lg">
                  <Lock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="font-inter">Your payment information is secure and encrypted</span>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" className="mt-1" />
                    <Label htmlFor="terms" className="text-xs md:text-sm leading-relaxed font-inter">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="prescription-terms" className="mt-1" />
                    <Label htmlFor="prescription-terms" className="text-xs md:text-sm leading-relaxed font-inter">
                      I confirm that the prescription uploaded is valid and for my personal use
                    </Label>
                  </div>
                </div>

                <Button size="lg" className="w-full text-sm md:text-base py-3">
                  Complete Order
                </Button>

                <p className="text-xs text-gray-600 text-center font-inter">
                  You will receive an order confirmation email after payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
