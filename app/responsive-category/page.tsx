"use client"

import { Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ProductCard } from "@/components/ui/product-card"
import { Pagination } from "@/components/ui/pagination"

export default function ResponsiveCategoryPage() {
  const breadcrumbItems = [{ label: "Pain Relief" }]

  const products = Array.from({ length: 12 }, (_, index) => ({
    id: `${index + 1}`,
    name: index % 2 === 0 ? "Ibuprofen 400mg Tablets" : "Acetaminophen Extra Strength",
    description: "Fast-acting pain relief for headaches and muscle pain",
    price: Math.random() * 30 + 10,
    originalPrice: index % 3 === 0 ? Math.random() * 10 + 35 : undefined,
    rating: 4 + Math.random(),
    reviewCount: Math.floor(Math.random() * 200) + 20,
    isOnSale: index % 3 === 0,
    isPrescriptionRequired: index % 4 === 0,
    category: "Pain Relief",
  }))

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 md:w-5 md:h-5" />
        <h2 className="text-base md:text-lg font-semibold font-montserrat">Filters</h2>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base font-inter">Price Range</h3>
        <div className="space-y-3">
          <Slider defaultValue={[0, 100]} max={100} step={1} className="w-full" />
          <div className="flex items-center gap-2">
            <Input placeholder="Min" className="text-xs md:text-sm" />
            <span className="text-xs md:text-sm">-</span>
            <Input placeholder="Max" className="text-xs md:text-sm" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Brand */}
      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base font-inter">Brand</h3>
        <div className="space-y-2 md:space-y-3">
          {["Advil", "Tylenol", "Motrin", "Generic", "Aleve"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={brand} />
              <label htmlFor={brand} className="text-xs md:text-sm font-inter flex-1">
                {brand}
              </label>
              <span className="text-xs text-gray-500 ml-auto">(12)</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Type */}
      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base font-inter">Type</h3>
        <div className="space-y-2 md:space-y-3">
          {["Tablets", "Capsules", "Liquid", "Topical", "Patches"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-xs md:text-sm font-inter flex-1">
                {type}
              </label>
              <span className="text-xs text-gray-500 ml-auto">(8)</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Prescription */}
      <div>
        <h3 className="font-medium mb-3 text-sm md:text-base font-inter">Availability</h3>
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="otc" />
            <label htmlFor="otc" className="text-xs md:text-sm font-inter">
              Over-the-counter
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="prescription" />
            <label htmlFor="prescription" className="text-xs md:text-sm font-inter">
              Prescription required
            </label>
          </div>
        </div>
      </div>

      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />
      <Breadcrumb items={breadcrumbItems} />

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 font-montserrat">Pain Relief</h1>
              <p className="text-gray-600 text-sm md:text-base font-inter">
                Find effective solutions for headaches, muscle pain, and inflammation
              </p>
            </div>
            <div className="text-4xl md:text-6xl">💊</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left">Filters</SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4 md:p-6">
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-lg border gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs md:text-sm text-gray-600 font-inter">Showing 1-12 of 156 products</span>
              </div>
              <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-full sm:w-48 text-xs md:text-sm">
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
                <div className="hidden sm:flex border rounded-lg">
                  <Button variant="ghost" size="icon" className="rounded-r-none h-8 w-8 md:h-10 md:w-10">
                    <Grid className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-l-none border-l h-8 w-8 md:h-10 md:w-10">
                    <List className="w-3 h-3 md:w-4 md:h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                  onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination currentPage={1} totalPages={12} onPageChange={(page) => console.log(`Page ${page}`)} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
