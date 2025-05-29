import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { StoreBenefits } from "@/components/ui/store-benefits"
import { DetailedBenefits } from "@/components/ui/detailed-benefits"

export default function StoreBenefitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      {/* Store Benefits Overview */}
      <div className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat text-charcoal mb-4">
              Why Shop With PharmaCare+
            </h1>
            <p className="text-gray-600 font-inter text-base md:text-lg max-w-3xl mx-auto">
              Discover the benefits of shopping at our licensed online pharmacy. From fast shipping to personalized
              customer service, we're committed to providing you with the best experience.
            </p>
          </div>
        </div>
      </div>

      {/* Store Benefits Grid */}
      <StoreBenefits layout="cards" showDetailedInfo={true} className="bg-gray-50" />

      {/* Detailed Benefits Tabs */}
      <DetailedBenefits className="bg-white" />

      <Footer />
    </div>
  )
}
