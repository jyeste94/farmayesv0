"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ProductCard } from "@/components/ui/product-card"
import { CustomButton, AddToCartButton, SecondaryButton, OutlineButton } from "@/components/ui/custom-button"
import { FormField, CustomInput, SearchInput, QuantityInput, PriceDisplay } from "@/components/ui/form-components"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Rating } from "@/components/ui/rating"
import { LoadingSpinner, LoadingButton } from "@/components/ui/loading-spinner"
import { Alert } from "@/components/ui/alert"
import { Pagination } from "@/components/ui/pagination"

export default function ComponentDemo() {
  const [quantity, setQuantity] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  const breadcrumbItems = [
    { label: "Health & Wellness", href: "/categories/wellness" },
    { label: "Pain Relief", href: "/categories/pain-relief" },
    { label: "Ibuprofen 400mg" },
  ]

  const sampleProducts = [
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
      name: "Vitamin D3 1000 IU",
      description: "Essential vitamin for bone health and immune support",
      price: 19.99,
      rating: 4.8,
      reviewCount: 89,
      category: "Vitamins",
    },
    {
      id: "3",
      name: "Moisturizing Face Cream",
      description: "Gentle daily moisturizer for all skin types",
      price: 15.99,
      rating: 4.2,
      reviewCount: 45,
      isInStock: false,
      category: "Beauty",
    },
  ]

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="font-montserrat text-3xl font-bold text-charcoal mb-4">Component System Demo</h1>
          <p className="font-inter text-dark-gray">
            Comprehensive UI components for the parapharmacy e-commerce platform
          </p>
        </div>

        {/* Breadcrumb Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Breadcrumb Navigation</h2>
          <Breadcrumb items={breadcrumbItems} />
        </section>

        {/* Alert Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Alerts</h2>
          <div className="grid gap-4">
            {showAlert && (
              <Alert variant="warning" title="Prescription Required" dismissible onDismiss={() => setShowAlert(false)}>
                You have prescription items in your cart. Please upload your prescription to proceed.
              </Alert>
            )}
            <Alert variant="success" title="Order Confirmed">
              Your order has been successfully placed and will be processed within 24 hours.
            </Alert>
            <Alert variant="info">Free shipping is available for orders over $50. Add more items to qualify!</Alert>
          </div>
        </section>

        {/* Button Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <CustomButton>Primary Button</CustomButton>
            <SecondaryButton>Secondary Button</SecondaryButton>
            <OutlineButton>Outline Button</OutlineButton>
            <CustomButton variant="success">Success Button</CustomButton>
            <CustomButton variant="warning">Warning Button</CustomButton>
            <CustomButton variant="destructive">Destructive Button</CustomButton>
            <AddToCartButton />
            <LoadingButton loading={loading} onClick={handleLoadingDemo}>
              {loading ? "Processing..." : "Load Demo"}
            </LoadingButton>
          </div>
        </section>

        {/* Form Components Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Form Components</h2>
          <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
            <FormField label="Email Address" required>
              <CustomInput type="email" placeholder="john.doe@example.com" />
            </FormField>
            <FormField label="Search Products">
              <SearchInput placeholder="Search medicines, vitamins..." />
            </FormField>
            <FormField label="Quantity">
              <QuantityInput value={quantity} onChange={setQuantity} max={10} />
            </FormField>
            <FormField label="Price Display">
              <PriceDisplay price={24.99} originalPrice={29.99} size="lg" />
            </FormField>
          </div>
        </section>

        {/* Rating Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Rating Component</h2>
          <div className="flex flex-wrap gap-6 bg-white p-6 rounded-lg">
            <Rating rating={4.5} size="sm" showValue reviewCount={127} />
            <Rating rating={4.8} size="md" showValue reviewCount={89} />
            <Rating rating={4.2} size="lg" showValue reviewCount={45} />
          </div>
        </section>

        {/* Product Cards Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Product Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                onAddToWishlist={() => console.log(`Added ${product.name} to wishlist`)}
              />
            ))}
          </div>
        </section>

        {/* Pagination Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Pagination</h2>
          <div className="bg-white p-6 rounded-lg">
            <Pagination currentPage={currentPage} totalPages={12} onPageChange={setCurrentPage} />
          </div>
        </section>

        {/* Loading Spinner Demo */}
        <section className="space-y-4">
          <h2 className="font-montserrat text-2xl font-bold text-charcoal">Loading States</h2>
          <div className="flex gap-6 bg-white p-6 rounded-lg">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
