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
          <div className="grid lg:grid-cols-2 gap-6">
            {/* 🔷 Slider izquierda */}
            <div className="space-y-4">
              <div
                  className="relative h-80 rounded-2xl overflow-hidden"
                  style={{ backgroundColor: currentSlideData.backgroundColor }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="container px-8 grid md:grid-cols-2 gap-4 items-center h-full">
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        {currentSlideData.brand}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {currentSlideData.title}
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {currentSlideData.subtitle}
                      </p>
                      <Link href={currentSlideData.ctaLink}>
                        <Button className="bg-primary-blue hover:bg-primary-blue/90 text-white px-6 py-2 rounded-md font-medium shadow">
                          {currentSlideData.ctaText}
                        </Button>
                      </Link>
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                      <img
                          src={currentSlideData.image}
                          alt={`${currentSlideData.brand} product`}
                          className="max-w-[220px] h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Flechas */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-md"
                    onClick={goToPrevious}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 w-10 h-10 rounded-full shadow-md"
                    onClick={goToNext}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 h-1">
                  {bannerSlides.map((_, index) => (
                      <div
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={cn(
                              "cursor-pointer rounded-full transition-all duration-300",
                              index === currentSlide
                                  ? "bg-gray-900 w-6 h-1"
                                  : "bg-gray-300 w-2 h-1"
                          )}
                      />
                  ))}
                </div>
              </div>

              {/* Accesos rápidos */}
              <div className="grid md:grid-cols-1 gap-4">
                <Link href="/promotions">
                  <Card className="bg-orange-50 border-orange-100 hover:shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-orange-600 text-xl">🏷️</span>
                        <span className="text-orange-700 font-medium">Promociones</span>
                      </div>
                      <ChevronRight className="text-orange-600 w-4 h-4" />
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/track-order">
                  <Card className="bg-teal-50 border-teal-100 hover:shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="text-teal-600 w-5 h-5" />
                        <span className="text-teal-700 font-medium">¿Dónde está mi pedido?</span>
                      </div>
                      <span className="text-sm text-teal-600 font-medium">Localizar</span>
                    </CardContent>
                  </Card>
                </Link>
                {/*<Link href="/atida-cash">*/}
                {/*  <Card className="bg-green-50 border-green-100 hover:shadow">*/}
                {/*    <CardContent className="p-4 flex items-center justify-between">*/}
                {/*      <div className="flex items-center gap-3">*/}
                {/*        <CreditCard className="text-green-600 w-5 h-5" />*/}
                {/*        <span className="text-green-800 font-medium">Descubre tu Atida Cash</span>*/}
                {/*      </div>*/}
                {/*      <span className="text-sm text-green-600 font-medium">Ver saldo</span>*/}
                {/*    </CardContent>*/}
                {/*  </Card>*/}
                {/*</Link>*/}
              </div>
            </div>

            {/* 🟦 Banners a la derecha */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-teal-100 hover:shadow border-teal-200">
                  <CardContent className="p-6 flex flex-col justify-between aspect-[16/9]">
                    <div>
                      <h3 className="text-teal-800 font-semibold">Consejo</h3>
                      <p className="text-sm text-teal-700">farmacéutico</p>
                    </div>
                    <Link href="/consultation">
                      <Button
                          variant="outline"
                          size="sm"
                          className="border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white"
                      >
                        Consultar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-blue-100 hover:shadow border-blue-200">
                  <CardContent className="p-6 flex flex-col justify-between aspect-[16/9]">
                    <div>
                      <h3 className="text-blue-800 font-semibold">Hasta -50% en</h3>
                      <p className="text-sm text-blue-700">protección solar</p>
                    </div>
                    <Link href="/categories/sun-protection">
                      <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white"
                      >
                        Comprar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-100 hover:shadow border-yellow-200">
                  <CardContent className="p-6 flex flex-col justify-between aspect-[16/9]">
                    <div>
                      <div className="text-xs font-medium text-yellow-800 bg-yellow-200 px-2 py-1 rounded inline-block">
                        BELLA AURORA
                      </div>
                      <h3 className="text-yellow-800 font-semibold">Hasta 35% dto.</h3>
                    </div>
                    <Link href="/brands/bella-aurora">
                      <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white"
                      >
                        Comprar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-orange-100 hover:shadow border-orange-200">
                  <CardContent className="p-6 flex flex-col justify-between aspect-[16/9]">
                    <div>
                      <div className="text-xs font-medium text-orange-800 bg-orange-200 px-2 py-1 rounded inline-block">
                        LA ROCHE POSAY
                      </div>
                      <h3 className="text-orange-800 font-semibold">Hasta 7€ dto.</h3>
                    </div>
                    <Link href="/brands/la-roche-posay">
                      <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-600 text-orange-700 hover:bg-orange-600 hover:text-white"
                      >
                        Comprar
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                <Link href="/atida-cash">
                  <Card className="bg-green-50 border-green-100 hover:shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="text-green-600 w-5 h-5" />
                        <span className="text-green-800 font-medium">Descubre tu Atida Cash</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">Ver saldo</span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
  );
}
