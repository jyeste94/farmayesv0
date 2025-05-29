"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Truck,
  RotateCcw,
  HeadphonesIcon,
  Shield,
  Clock,
  CreditCard,
  Gift,
  Award,
  ChevronRight,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface BenefitItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  link?: {
    text: string
    href: string
  }
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
}

interface StoreBenefitsProps {
  title?: string
  subtitle?: string
  layout?: "grid" | "carousel" | "tabs" | "cards"
  showDetailedInfo?: boolean
  className?: string
  animateOnScroll?: boolean
}

export function StoreBenefits({
  title = "Why Shop With Us",
  subtitle = "Discover the benefits of shopping at PharmaCare+",
  layout = "grid",
  showDetailedInfo = false,
  className = "",
  animateOnScroll = true,
}: StoreBenefitsProps) {
  const [activeTab, setActiveTab] = useState("shipping")
  const [isVisible, setIsVisible] = useState(!animateOnScroll)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Core benefits that will be displayed in all layouts
  const coreBenefits: BenefitItem[] = [
    {
      id: "shipping",
      title: "Fast & Free Shipping",
      description: "Free shipping on orders over $50. Same-day delivery available in select areas.",
      icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-blue-100 text-blue-600",
      link: {
        text: "Shipping Details",
        href: "/shipping",
      },
      badge: {
        text: "Free",
        variant: "default",
      },
    },
    {
      id: "returns",
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days of purchase. No questions asked.",
      icon: <RotateCcw className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-green-100 text-green-600",
      link: {
        text: "Return Policy",
        href: "/returns",
      },
    },
    {
      id: "support",
      title: "24/7 Customer Support",
      description: "Our team of experts is available around the clock to assist you.",
      icon: <HeadphonesIcon className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-purple-100 text-purple-600",
      link: {
        text: "Contact Us",
        href: "/contact",
      },
      badge: {
        text: "24/7",
        variant: "secondary",
      },
    },
  ]

  // Additional benefits for more detailed displays
  const additionalBenefits: BenefitItem[] = [
    {
      id: "secure",
      title: "Secure Payments",
      description: "All transactions are encrypted and secure. We accept all major credit cards and digital wallets.",
      icon: <Shield className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-yellow-100 text-yellow-600",
      link: {
        text: "Payment Options",
        href: "/payment-options",
      },
    },
    {
      id: "prescription",
      title: "Prescription Services",
      description: "Upload your prescription online and get medications delivered to your doorstep.",
      icon: <CreditCard className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-red-100 text-red-600",
      link: {
        text: "Upload Prescription",
        href: "/prescription-upload",
      },
    },
    {
      id: "rewards",
      title: "Loyalty Rewards",
      description: "Earn points with every purchase and redeem them for discounts on future orders.",
      icon: <Gift className="w-6 h-6 md:w-8 md:h-8" />,
      color: "bg-pink-100 text-pink-600",
      link: {
        text: "Join Rewards Program",
        href: "/rewards",
      },
      badge: {
        text: "Earn Points",
        variant: "outline",
      },
    },
  ]

  // Combine benefits based on whether detailed info is shown
  const benefits = showDetailedInfo ? [...coreBenefits, ...additionalBenefits] : coreBenefits

  // Detailed information for each benefit category
  const detailedInfo = {
    shipping: {
      title: "Shipping Information",
      items: [
        {
          title: "Free Standard Shipping",
          description: "Orders over $50 qualify for free standard shipping (3-5 business days).",
          icon: <Truck />,
        },
        {
          title: "Express Shipping",
          description: "Get your order in 1-2 business days for a flat rate of $9.99.",
          icon: <Clock />,
        },
        {
          title: "Same-Day Delivery",
          description: "Available in select metro areas when ordered before 2 PM. $14.99 fee applies.",
          icon: <MapPin />,
        },
      ],
    },
    returns: {
      title: "Return Policy",
      items: [
        {
          title: "30-Day Returns",
          description: "Return any unused item within 30 days of delivery for a full refund.",
          icon: <Calendar />,
        },
        {
          title: "Easy Process",
          description: "Initiate returns online through your account or contact customer service.",
          icon: <RotateCcw />,
        },
        {
          title: "Free Return Shipping",
          description: "We cover return shipping costs for all eligible returns.",
          icon: <Truck />,
        },
      ],
    },
    support: {
      title: "Customer Service",
      items: [
        {
          title: "24/7 Phone Support",
          description: "Call us anytime at 1-800-PHARMA-CARE for immediate assistance.",
          icon: <Phone />,
        },
        {
          title: "Email Support",
          description: "Email support@pharmacare.com for non-urgent inquiries. We respond within 24 hours.",
          icon: <Mail />,
        },
        {
          title: "Live Chat",
          description: "Chat with our pharmacists and support team directly from our website or mobile app.",
          icon: <MessageCircle />,
        },
      ],
    },
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!animateOnScroll) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [animateOnScroll])

  return (
    <section ref={sectionRef} className={cn("py-8 md:py-12 lg:py-16 bg-white", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className={cn(
              "text-2xl md:text-3xl font-bold font-montserrat text-charcoal mb-3 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "text-gray-600 font-inter text-sm md:text-base max-w-2xl mx-auto transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Benefits Display - Grid Layout */}
        {layout === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard key={benefit.id} benefit={benefit} index={index} isVisible={isVisible} />
            ))}
          </div>
        )}

        {/* Benefits Display - Cards Layout */}
        {layout === "cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit.id}
                className={cn(
                  "overflow-hidden transition-all duration-700 border-t-4 hover:shadow-lg",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  `border-t-${benefit.color.split(" ")[1]}`,
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-3 rounded-full", benefit.color)}>{benefit.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg font-montserrat">{benefit.title}</h3>
                        {benefit.badge && <Badge variant={benefit.badge.variant}>{benefit.badge.text}</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 font-inter">{benefit.description}</p>
                      {benefit.link && (
                        <Link
                          href={benefit.link.href}
                          className="text-primary-blue hover:text-primary-blue-hover font-medium text-sm inline-flex items-center"
                        >
                          {benefit.link.text}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Benefits Display - Tabs Layout with Detailed Information */}
        {layout === "tabs" && (
          <Tabs defaultValue="shipping" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl">
                <TabsTrigger value="shipping" className="flex items-center gap-2">
                  <Truck className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Shipping</span>
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Returns</span>
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center gap-2">
                  <HeadphonesIcon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Support</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(detailedInfo).map(([key, info]) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="bg-gray-50 rounded-lg p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold font-montserrat text-charcoal mb-6">{info.title}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {info.items.map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          "bg-white rounded-lg p-5 shadow-sm transition-all duration-500",
                          activeTab === key ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                        )}
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={cn("p-2 rounded-full", coreBenefits.find((b) => b.id === key)?.color)}>
                            {item.icon}
                          </div>
                          <h4 className="font-semibold font-montserrat">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 text-sm font-inter">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button asChild>
                      <Link href={`/${key}`}>
                        Learn More About Our {info.title}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Benefits Display - Carousel Layout */}
        {layout === "carousel" && (
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  className={cn(
                    "flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3 snap-center transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          "p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4",
                          benefit.color,
                        )}
                      >
                        {benefit.icon}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg font-montserrat">{benefit.title}</h3>
                        {benefit.badge && <Badge variant={benefit.badge.variant}>{benefit.badge.text}</Badge>}
                      </div>
                      <p className="text-gray-600 text-sm mb-4 font-inter">{benefit.description}</p>
                      {benefit.link && (
                        <Link
                          href={benefit.link.href}
                          className="text-primary-blue hover:text-primary-blue-hover font-medium text-sm inline-flex items-center"
                        >
                          {benefit.link.text}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={cn("w-2 h-2 rounded-full transition-all", index === 0 ? "bg-primary-blue" : "bg-gray-300")}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div
          className={cn(
            "flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-12 md:mt-16 pt-8 border-t transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <div className="flex items-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Licensed Pharmacy</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Truck className="w-5 h-5" />
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  benefit: BenefitItem
  index: number
  isVisible: boolean
}

function BenefitCard({ benefit, index, isVisible }: BenefitCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={cn("w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4", benefit.color)}
      >
        {benefit.icon}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg md:text-xl font-semibold font-montserrat">{benefit.title}</h3>
          {benefit.badge && <Badge variant={benefit.badge.variant}>{benefit.badge.text}</Badge>}
        </div>
        <p className="text-gray-600 text-sm md:text-base font-inter max-w-xs mx-auto">{benefit.description}</p>
        {benefit.link && (
          <div className="pt-3">
            <Button asChild variant="outline" size="sm">
              <Link href={benefit.link.href}>
                {benefit.link.text}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
