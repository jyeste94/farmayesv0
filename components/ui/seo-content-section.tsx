"use client"

import Link from "next/link"
import { ArrowRight, Shield, Clock, Users, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SEOContentSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="prose prose-lg max-w-none">
          {/* Main Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-charcoal mb-4">
              PharmaCare+: Tu Parafarmacia Online de Confianza
            </h2>
            <p className="text-gray-600 font-inter text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
              La parafarmacia online de confianza que te ha acompañado durante años ahora se llama PharmaCare+. Con un
              catálogo de más de 30,000 productos de las mejores marcas, ofrecemos todo lo que necesitas en parafarmacia
              online de confianza con la comodidad de recibirlo en casa en 24-48 horas.
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-10 md:mb-12">
            <p className="text-gray-700 font-inter text-base md:text-lg leading-relaxed mb-6">
              Atida Mifarma se ha consolidado como el referente en farmacia y parafarmacia online de confianza en España.
              Mantenemos la cercanía y confianza de la farmacia tradicional, pero con la ventaja de estar disponibles
              las 24 horas, los 365 días del año.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-10 md:mb-12">
            <h3 className="text-xl md:text-2xl font-montserrat font-bold text-charcoal mb-6">
              Beneficios de comprar en nuestra parafarmacia online de confianza
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary-blue" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Disponibilidad 24/7</h4>
                  <p className="text-gray-600 font-inter text-sm">
                    Accede a una amplia variedad de productos de parafarmacia online de confianza en cualquier momento y
                    sin salir de casa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-secondary-teal/10 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-secondary-teal" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Envíos rápidos</h4>
                  <p className="text-gray-600 font-inter text-sm">
                    Recibe tu pedido en 24-48 horas en toda España peninsular.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent-orange" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Atención especializada</h4>
                  <p className="text-gray-600 font-inter text-sm">
                    Contamos con farmacéuticos expertos que te asesoran con recomendaciones y consejos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-green/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <h4 className="font-montserrat font-semibold text-charcoal mb-2">Seguridad en la compra</h4>
                  <p className="text-gray-600 font-inter text-sm">
                    Métodos de pago 100% seguros, incluyendo tarjeta, Bizum, PayPal y transferencia.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 font-inter text-base leading-relaxed">
              <strong>Precios competitivos:</strong> ofrecemos descuentos exclusivos y promociones constantes en nuestra
              parafarmacia online de confianza.
            </p>
          </div>

          {/* Best Prices Section */}
          <div className="mb-10 md:mb-12">
            <h3 className="text-xl md:text-2xl font-montserrat font-bold text-charcoal mb-6">
              Tu farmacia online con los mejores precios
            </h3>
            <p className="text-gray-700 font-inter text-base md:text-lg leading-relaxed mb-6">
              En PharmaCare+ trabajamos para que puedas comprar tus productos de farmacia online de confianza al mejor
              precio, sin renunciar a la calidad y la seguridad. Cumplimos con todos los estándares sanitarios y te
              garantizamos productos de farmacia y <strong>parafarmacia online de confianza</strong> con total
              confianza.
            </p>
          </div>

          {/* Reasons to Choose Section */}
          <div className="mb-10 md:mb-12">
            <h3 className="text-xl md:text-2xl font-montserrat font-bold text-charcoal mb-6">
              Razones para elegir nuestra parafarmacia online
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter text-base">
                  <strong>Variedad:</strong> más de 30,000 productos de farmacia y parafarmacia a tu disposición.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter text-base">
                  <strong>Asesoramiento profesional:</strong> farmacéuticos expertos que te ayudan en todo momento.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter text-base">
                  <strong>Facilidad de pedido:</strong> proceso de compra simple, rápido y seguro.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 font-inter text-base">
                  <strong>Ofertas exclusivas:</strong> descuentos, cupones y promociones especiales.
                </p>
              </div>
            </div>
          </div>

          {/* Coupons and Discounts Section */}
          <div className="mb-10 md:mb-12">
            <h3 className="text-xl md:text-2xl font-montserrat font-bold text-charcoal mb-6">
              Cupones y descuentos en tu farmacia online de confianza
            </h3>
            <p className="text-gray-700 font-inter text-base md:text-lg leading-relaxed mb-6">
              En PharmaCare+ puedes disfrutar de cupones de descuento y ofertas en una gran variedad de productos.
              Encuentra promociones 2x1, 3x2 y descuentos especiales en nuestra sección de ofertas de parafarmacia
              online de confianza. Comprar productos de calidad al mejor precio nunca fue tan fácil.
            </p>
          </div>

          {/* Featured Product Section */}
          <div className="bg-white rounded-lg p-6 md:p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-accent-orange" />
              <h3 className="text-lg md:text-xl font-montserrat font-bold text-charcoal">
                Producto estrella para el cuidado diario que te puede interesar
              </h3>
            </div>
            <p className="text-gray-700 font-inter text-base mb-6">
              Descubre nuestra selección de productos destacados, cuidadosamente elegidos por nuestros farmacéuticos
              para ofrecerte lo mejor en salud y bienestar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-primary-blue hover:bg-primary-blue-hover text-white">
                <Link href="/categories/skincare">
                  <Gift className="w-4 h-4 mr-2" />
                  Ver Productos Destacados
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/offers">
                  Ver Todas las Ofertas
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 md:mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-primary-blue mb-2">30,000+</div>
                <div className="text-sm text-gray-600 font-inter">Productos disponibles</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-secondary-teal mb-2">24-48h</div>
                <div className="text-sm text-gray-600 font-inter">Entrega rápida</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-primary-green mb-2">100%</div>
                <div className="text-sm text-gray-600 font-inter">Pago seguro</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-montserrat font-bold text-accent-orange mb-2">24/7</div>
                <div className="text-sm text-gray-600 font-inter">Disponibilidad</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
