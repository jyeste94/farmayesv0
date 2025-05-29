import Link from "next/link"
import { Search, ShoppingCart, User, Heart, Star, ChevronRight, Truck, Shield, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

export default function CategoryListingPage() {
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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Pain Relief</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pain Relief</h1>
              <p className="text-gray-600">Find effective solutions for headaches, muscle pain, and inflammation</p>
            </div>
            <div className="text-6xl">💊</div>
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
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
                    <div className="flex items-center gap-2">
                      <Input placeholder="Min" className="text-sm" />
                      <span>-</span>
                      <Input placeholder="Max" className="text-sm" />
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Brand */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-3">
                    {["Advil", "Tylenol", "Motrin", "Generic", "Aleve"].map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm">
                          {brand}
                        </label>
                        <span className="text-xs text-gray-500 ml-auto">(12)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Type */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Type</h3>
                  <div className="space-y-3">
                    {["Tablets", "Capsules", "Liquid", "Topical", "Patches"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm">
                          {type}
                        </label>
                        <span className="text-xs text-gray-500 ml-auto">(8)</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Prescription */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="otc" />
                      <label htmlFor="otc" className="text-sm">
                        Over-the-counter
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prescription" />
                      <label htmlFor="prescription" className="text-sm">
                        Prescription required
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Showing 1-24 of 156 products</span>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Customer Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <CardContent className="p-4">
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <span className="text-4xl">💊</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      {index % 3 === 0 && <Badge className="absolute top-2 left-2 bg-red-500">25% OFF</Badge>}
                      {index % 4 === 0 && (
                        <Badge variant="secondary" className="absolute bottom-2 left-2">
                          Prescription Required
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">(24)</span>
                    </div>

                    <h3 className="font-semibold mb-2 line-clamp-2">
                      {index % 2 === 0 ? "Ibuprofen 400mg Tablets" : "Acetaminophen Extra Strength"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Fast-acting pain relief for headaches and muscle pain
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-blue-600">${(Math.random() * 30 + 10).toFixed(2)}</span>
                        {index % 3 === 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            ${(Math.random() * 10 + 35).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Badge variant={index % 4 === 0 ? "secondary" : "outline"}>
                        {index % 4 === 0 ? "Rx" : "OTC"}
                      </Badge>
                    </div>

                    <Button className="w-full">Add to Cart</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12 gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-blue-600 text-white">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">4</Button>
              <span className="px-2">...</span>
              <Button variant="outline">12</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
