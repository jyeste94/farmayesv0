"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BannerSlide {
  id: string
  title: string
  subtitle?: string
  description: string
  ctaPrimary: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  backgroundImage?: string
  backgroundColor?: string
  textColor?: "light" | "dark"
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  overlay?: boolean
}

interface MainBannerProps {
  slides: BannerSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  showDots?: boolean
  className?: string
}

export function MainBanner({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  className = "",
}: MainBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isPlaying || isHovered || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, isHovered, slides.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (slides.length === 0) return null

  const currentSlideData = slides[currentSlide]

  return (
    <div
      className={cn("relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: currentSlideData.backgroundImage ? `url(${currentSlideData.backgroundImage})` : undefined,
          backgroundColor: currentSlideData.backgroundColor || "#1E6BB8",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        {currentSlideData.overlay && <div className="absolute inset-0 bg-black/40 transition-opacity duration-700" />}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl lg:max-w-3xl">
            <div
              className={cn(
                "space-y-4 md:space-y-6 transition-all duration-700 transform",
                currentSlideData.textColor === "dark" ? "text-charcoal" : "text-white",
              )}
            >
              {/* Badge */}
              {currentSlideData.badge && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  <Badge variant={currentSlideData.badge.variant || "default"} className="text-xs sm:text-sm px-3 py-1">
                    {currentSlideData.badge.text}
                  </Badge>
                </div>
              )}

              {/* Subtitle */}
              {currentSlideData.subtitle && (
                <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                  <p className="text-sm sm:text-base md:text-lg font-inter font-medium opacity-90">
                    {currentSlideData.subtitle}
                  </p>
                </div>
              )}

              {/* Title */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold leading-tight">
                  {currentSlideData.title}
                </h1>
              </div>

              {/* Description */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-inter opacity-90 max-w-xl">
                  {currentSlideData.description}
                </p>
              </div>

              {/* CTAs */}
              <div
                className="animate-fade-in-up flex flex-col sm:flex-row gap-3 md:gap-4"
                style={{ animationDelay: "0.6s" }}
              >
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "font-medium text-sm md:text-base px-6 md:px-8 py-3 md:py-4",
                    currentSlideData.textColor === "dark"
                      ? "bg-primary-blue text-white hover:bg-primary-blue-hover"
                      : "bg-white text-primary-blue hover:bg-gray-100",
                  )}
                >
                  <Link href={currentSlideData.ctaPrimary.href}>{currentSlideData.ctaPrimary.text}</Link>
                </Button>

                {currentSlideData.ctaSecondary && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className={cn(
                      "font-medium text-sm md:text-base px-6 md:px-8 py-3 md:py-4",
                      currentSlideData.textColor === "dark"
                        ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-primary-blue",
                    )}
                  >
                    <Link href={currentSlideData.ctaSecondary.href}>{currentSlideData.ctaSecondary.text}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {showNavigation && slides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-10 h-10 md:w-12 md:h-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-10 h-10 md:w-12 md:h-12"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </>
      )}

      {/* Play/Pause Control */}
      {autoPlay && slides.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-8 h-8 md:w-10 md:h-10"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
        </Button>
      )}

      {/* Dots Indicator */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75",
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs md:text-sm font-inter">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      )}
    </div>
  )
}
