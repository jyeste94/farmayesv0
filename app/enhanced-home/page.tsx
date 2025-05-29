import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MainBanner } from "@/components/ui/main-banner"
import { FeaturedCategories } from "@/components/ui/featured-categories"
import { CategoryShowcase } from "@/components/ui/category-showcase"
import { RecommendationEngine } from "@/components/ui/recommendation-engine"
import { StoreBenefits } from "@/components/ui/store-benefits"

export default function EnhancedHomePage() {
  // Main banner slides data
  const bannerSlides = [
    {
      id: "1",
      title: "Your Health, Our Priority",
      subtitle: "Licensed Online Pharmacy",
      description:
        "Get prescription medications and health products delivered to your door with free shipping on orders over $50.",
      ctaPrimary: {
        text: "Shop Now",
        href: "/categories",
      },
      ctaSecondary: {
        text: "Upload Prescription",
        href: "/prescription-upload",
      },
      backgroundColor: "linear-gradient(135deg, #1E6BB8 0%, #20B2AA 100%)",
      textColor: "light" as const,
      badge: {
        text: "Licensed Pharmacy",
        variant: "secondary" as const,
      },
      overlay: false,
    },
    {
      id: "2",
      title: "Save 30% on Vitamins",
      subtitle: "Limited Time Offer",
      description:
        "Boost your immune system with our premium vitamin collection. All major brands included in this special promotion.",
      ctaPrimary: {
        text: "Shop Vitamins",
        href: "/categories/vitamins",
      },
      ctaSecondary: {
        text: "View All Deals",
        href: "/promotions",
      },
      backgroundColor: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
      textColor: "light" as const,
      badge: {
        text: "30% OFF",
        variant: "destructive" as const,
      },
      overlay: false,
    },
    {
      id: "3",
      title: "Free Same-Day Delivery",
      subtitle: "Order by 2 PM",
      description:
        "Get your medications and health products delivered the same day. Available in select metropolitan areas.",
      ctaPrimary: {
        text: "Check Availability",
        href: "/delivery-areas",
      },
      ctaSecondary: {
        text: "Learn More",
        href: "/shipping-info",
      },
      backgroundColor: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      textColor: "light" as const,
      badge: {
        text: "Same Day",
        variant: "default" as const,
      },
      overlay: false,
    },
  ]

  // Featured categories data with enhanced visuals
  const featuredCategories = [
    {
      id: "pain-relief",
      name: "Pain Relief",
      description: "Effective solutions for headaches, muscle pain, and inflammation with fast-acting formulas",
      href: "/categories/pain-relief",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">💊</span>,
      productCount: 150,
      trending: true,
      color: {
        primary: "#EF4444",
        secondary: "#FCA5A5",
        accent: "#FEE2E2",
      },
      stats: {
        avgRating: 4.6,
        totalReviews: 1250,
        newProducts: 12,
      },
    },
    {
      id: "vitamins",
      name: "Vitamins & Supplements",
      description: "Essential nutrients and supplements to support your daily health and wellness goals",
      href: "/categories/vitamins",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">🌟</span>,
      productCount: 200,
      popular: true,
      color: {
        primary: "#F59E0B",
        secondary: "#FCD34D",
        accent: "#FEF3C7",
      },
      stats: {
        avgRating: 4.8,
        totalReviews: 2100,
        newProducts: 8,
      },
    },
    {
      id: "beauty",
      name: "Beauty & Personal Care",
      description: "Premium skincare, cosmetics, and personal care products for your daily routine",
      href: "/categories/beauty",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">✨</span>,
      productCount: 300,
      featured: true,
      color: {
        primary: "#EC4899",
        secondary: "#F9A8D4",
        accent: "#FCE7F3",
      },
      stats: {
        avgRating: 4.5,
        totalReviews: 890,
        newProducts: 25,
      },
    },
    {
      id: "baby-care",
      name: "Baby & Mother Care",
      description: "Safe and gentle products designed specifically for babies and expecting mothers",
      href: "/categories/baby",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">👶</span>,
      productCount: 180,
      color: {
        primary: "#10B981",
        secondary: "#6EE7B7",
        accent: "#D1FAE5",
      },
      stats: {
        avgRating: 4.9,
        totalReviews: 650,
        newProducts: 5,
      },
    },
    {
      id: "first-aid",
      name: "First Aid & Medical",
      description: "Essential medical supplies and first aid products for emergency preparedness",
      href: "/categories/first-aid",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">🏥</span>,
      productCount: 120,
      color: {
        primary: "#1E6BB8",
        secondary: "#60A5FA",
        accent: "#DBEAFE",
      },
      stats: {
        avgRating: 4.7,
        totalReviews: 420,
        newProducts: 3,
      },
    },
    {
      id: "wellness",
      name: "Health & Wellness",
      description: "Holistic health products including herbal remedies and wellness supplements",
      href: "/categories/wellness",
      image: "/placeholder.svg?height=300&width=300",
      icon: <span className="text-2xl">🌿</span>,
      productCount: 250,
      trending: true,
      color: {
        primary: "#20B2AA",
        secondary: "#5EEAD4",
        accent: "#CCFBF1",
      },
      stats: {
        avgRating: 4.4,
        totalReviews: 780,
        newProducts: 15,
      },
    },
  ]

  // Showcase categories for the hero-style section
  const showcaseCategories = [
    {
      id: "prescription",
      name: "Prescription Medications",
      description: "Licensed pharmacy services with expert consultation and fast delivery",
      href: "/categories/prescription",
      image: "/placeholder.svg?height=400&width=600",
      backgroundImage: "/placeholder.svg?height=400&width=600",
      featured: true,
      productCount: 500,
      highlightColor: "#1E6BB8",
      textColor: "light" as const,
      specialOffer: {
        text: "Free Consultation",
        discount: "FREE",
      },
    },
    {
      id: "organic",
      name: "Organic & Natural",
      description: "Pure, organic products for natural health and wellness",
      href: "/categories/organic",
      image: "/placeholder.svg?height=400&width=600",
      backgroundImage: "/placeholder.svg?height=400&width=600",
      featured: true,
      trending: true,
      productCount: 180,
      highlightColor: "#22C55E",
      textColor: "light" as const,
    },
    {
      id: "sports",
      name: "Sports Nutrition",
      description: "Performance supplements for active lifestyles",
      href: "/categories/sports",
      image: "/placeholder.svg?height=300&width=300",
      productCount: 95,
      highlightColor: "#F59E0B",
      textColor: "dark" as const,
    },
    {
      id: "seniors",
      name: "Senior Care",
      description: "Specialized products for senior health needs",
      href: "/categories/seniors",
      image: "/placeholder.svg?height=300&width=300",
      productCount: 120,
      highlightColor: "#8B5CF6",
      textColor: "light" as const,
    },
    {
      id: "mental-health",
      name: "Mental Wellness",
      description: "Support for mental health and stress management",
      href: "/categories/mental-health",
      image: "/placeholder.svg?height=300&width=300",
      productCount: 75,
      highlightColor: "#06B6D4",
      textColor: "light" as const,
    },
    {
      id: "diabetes",
      name: "Diabetes Care",
      description: "Comprehensive diabetes management solutions",
      href: "/categories/diabetes",
      image: "/placeholder.svg?height=300&width=300",
      productCount: 85,
      highlightColor: "#EF4444",
      textColor: "light" as const,
    },
  ]

  // Mock user behavior data for personalized recommendations
  const userBehavior = {
    viewedProducts: ["1", "3", "5"],
    purchaseHistory: ["2", "4"],
    searchHistory: ["pain relief", "vitamins", "baby care"],
    cartItems: ["1"],
    wishlistItems: ["3", "7"],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={3} wishlistCount={2} isLoggedIn={true} userName="John" />

      {/* Main Banner */}
      <MainBanner
        slides={bannerSlides}
        autoPlay={true}
        autoPlayInterval={6000}
        showNavigation={true}
        showDots={true}
        className="mb-8 md:mb-12"
      />

      {/* Store Benefits Section */}
      <StoreBenefits layout="grid" showDetailedInfo={false} className="bg-white" />

      {/* Category Showcase - Hero Style */}
      <CategoryShowcase
        categories={showcaseCategories}
        title="Explore Our Specialties"
        subtitle="Discover specialized health solutions tailored to your unique needs"
        className="bg-white"
      />

      {/* Personalized Product Recommendations */}
      <RecommendationEngine userId="user123" userBehavior={userBehavior} className="bg-gray-50" />

      {/* Featured Categories - Comprehensive Grid */}
      <FeaturedCategories
        categories={featuredCategories}
        title="Shop by Category"
        subtitle="Find the perfect products for your health and wellness journey"
        layout="grid"
        showStats={true}
        showViewAll={true}
        maxItems={6}
        className="bg-white"
      />

      {/* Newsletter Section */}
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
