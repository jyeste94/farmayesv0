"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Package, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BannerSlide {
  id: string
  title: string
  subtitle?: string
  brand: string
  discount: string
  image: string
  ctaText: string
  ctaLink: string
  backgroundColor: string
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "¡Hasta -40%!",
    subtitle: "Activa la vitalidad de tu piel",
    brand: "Neutrogena",
    discount: "40%",
    image: "/placeholder.svg?height=300&width=500&text=Neutrogena+Products",
    ctaText: "Comprar",
    ctaLink: "/brands/neutrogena",
    backgroundColor: "#f8f9fa",
  },
  {
    id: "2",
    title: "¡Hasta -35%!",
    subtitle: "Cuidado facial premium",
    brand: "L'Oréal",
    discount: "35%",
    image: "/placeholder.svg?height=300&width=500&text=LOreal+Products",
    ctaText: "Comprar",
    ctaLink: "/brands/loreal",
    backgroundColor: "#fff5f5",
  },
  {
    id: "3",
    title: "¡Hasta -50%!",
    subtitle: "Protección solar avanzada",
    brand: "Vichy",
    discount: "50%",
    image: "/placeholder.svg?height=300&width=500&text=Vichy+Products",
    ctaText: "Comprar",
    ctaLink: "/brands/vichy",
    backgroundColor: "#f0f9ff",
  },
]

export function PromotionalBannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const currentSlideData = bannerSlides[currentSlide]

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Slider + Service Links */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Promotional Slider */}
            <div
              className="relative h-80 rounded-2xl overflow-hidden"
              style={{ backgroundColor: currentSlideData.backgroundColor }}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-8 grid md:grid-cols-2 gap-8 items-center h-full">
                  {/* Content */}
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {currentSlideData.brand}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                      {currentSlideData.title}
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">{currentSlideData.subtitle}</p>
                    <Link href={currentSlideData.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium"
                      >
                        {currentSlideData.ctaText}
                      </Button>
                    </Link>
                  </div>

                  {/* Product Image */}
                  <div className="hidden md:flex justify-center items-center">
                    <div className="relative">
                      <img
                        src={currentSlideData.image || "/placeholder.svg"}
                        alt={`${currentSlideData.brand} products`}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-md"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-md"
                onClick={goToNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  {bannerSlides.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        index === currentSlide ? "bg-gray-900 w-6" : "bg-gray-400",
                      )}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Service Links Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Promotions Link */}
              <Link href="/promotions">
                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-orange-50 border-orange-100">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-lg">🏷️</span>
                      </div>
                      <span className="font-medium text-orange-700">Promociones</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </CardContent>
                </Card>
              </Link>

              {/* Track Order Link */}
              <Link href="/track-order">
                <Card className="hover:shadow-md transition-shadow cursor-pointer bg-teal-50 border-teal-100">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                        <Package className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium text-teal-700">¿Dónde está mi pedido?</span>
                    </div>
                    <span className="text-sm text-teal-600 font-medium">Localizar</span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Right Column - Brand Banners Grid */}
          <div className="space-y-4">
            {/* Top Row */}
            <div className="grid grid-cols-1 gap-4">
              {/* Pharmaceutical Advice */}
              <Card className="bg-gradient-to-r from-teal-100 to-teal-50 border-teal-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-teal-800">Consejo</h3>
                      <p className="text-sm text-teal-700">farmacéutico</p>
                      <Link href="/consultation">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white"
                        >
                          Consultar
                        </Button>
                      </Link>
                    </div>
                    <div className="w-16 h-16 bg-teal-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👩‍⚕️</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sun Protection */}
              <Card className="bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-blue-800">Hasta -50% en</h3>
                      <p className="text-sm text-blue-700">protección solar</p>
                      <Link href="/categories/sun-protection">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"
                        >
                          Comprar
                        </Button>
                      </Link>
                    </div>
                    <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">☀️</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 gap-4">
              {/* Bella Aurora */}
              <Card className="bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-yellow-800 bg-yellow-200 px-2 py-1 rounded inline-block">
                        BELLA AURORA
                      </div>
                      <h3 className="font-semibold text-yellow-800">Hasta 35% dto.</h3>
                      <Link href="/brands/bella-aurora">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white"
                        >
                          Comprar
                        </Button>
                      </Link>
                    </div>
                    <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* La Roche Posay */}
              <Card className="bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-orange-800 bg-orange-200 px-2 py-1 rounded inline-block">
                        LA ROCHE POSAY
                      </div>
                      <h3 className="font-semibold text-orange-800">Hasta 7€ dto.</h3>
                      <Link href="/brands/la-roche-posay">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white"
                        >
                          Comprar
                        </Button>
                      </Link>
                    </div>
                    <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🧴</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Atida Cash Banner */}
            <Card className="bg-gradient-to-r from-green-100 to-green-50 border-green-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-green-800">Descubre tu Atida Cash</span>
                  </div>
                  <Link href="/atida-cash">
                    <span className="text-sm text-green-600 font-medium hover:underline">Ver saldo</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
