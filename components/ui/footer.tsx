import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white">PharmaCare+</h3>
            <p className="text-gray-300 font-inter text-sm md:text-base leading-relaxed">
              Your trusted online pharmacy for all health and wellness needs. Licensed, certified, and committed to your
              well-being.
            </p>
            <div className="flex gap-3 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-700 w-8 h-8 md:w-10 md:h-10"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-700 w-8 h-8 md:w-10 md:h-10"
              >
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-700 w-8 h-8 md:w-10 md:h-10"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-700 w-8 h-8 md:w-10 md:h-10"
              >
                <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-white text-base md:text-lg">Quick Links</h4>
            <div className="space-y-2 md:space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Shipping Info", href: "/shipping" },
                { name: "Returns", href: "/returns" },
                { name: "Track Order", href: "/track" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors font-inter text-sm md:text-base"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-montserrat font-semibold text-white text-base md:text-lg">Categories</h4>
            <div className="space-y-2 md:space-y-3">
              {[
                { name: "Medicines", href: "/categories/medicines" },
                { name: "Vitamins", href: "/categories/vitamins" },
                { name: "Beauty", href: "/categories/beauty" },
                { name: "Baby Care", href: "/categories/baby" },
                { name: "Wellness", href: "/categories/wellness" },
                { name: "Medical Devices", href: "/categories/medical" },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block text-gray-300 hover:text-white transition-colors font-inter text-sm md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h4 className="font-montserrat font-semibold text-white text-base md:text-lg">Contact Us</h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary-teal flex-shrink-0" />
                <span className="text-gray-300 font-inter text-sm md:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary-teal flex-shrink-0" />
                <span className="text-gray-300 font-inter text-sm md:text-base break-all">support@pharmacare.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-teal mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 font-inter text-sm md:text-base">
                  123 Health Street
                  <br />
                  Medical District, NY 10001
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="font-montserrat font-medium text-white mb-3 text-sm md:text-base">Newsletter</h5>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 font-inter text-sm flex-1"
                />
                <Button className="bg-primary-blue hover:bg-primary-blue-hover text-white text-sm px-4 py-2 sm:px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 font-inter text-xs md:text-sm text-center md:text-left">
              © {currentYear} PharmaCare+. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white transition-colors font-inter text-xs md:text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white transition-colors font-inter text-xs md:text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-300 hover:text-white transition-colors font-inter text-xs md:text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
