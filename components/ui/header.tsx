"use client"

import Link from "next/link"
import { useState } from "react"
import { Search, ShoppingCart, User, Heart, Menu, Truck, Shield, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface HeaderProps {
  cartItemCount?: number
  wishlistCount?: number
  isLoggedIn?: boolean
  userName?: string
}

export function Header({ cartItemCount = 0, wishlistCount = 0, isLoggedIn = false, userName }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const navigationItems = [
    { name: "Medicines", href: "/categories/medicines" },
    { name: "Vitamins & Supplements", href: "/categories/vitamins" },
    { name: "Beauty & Personal Care", href: "/categories/beauty" },
    { name: "Baby & Mother", href: "/categories/baby" },
    { name: "Health & Wellness", href: "/categories/wellness" },
    { name: "Medical Devices", href: "/categories/medical" },
  ]

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto">
        {/* Top Bar - Hidden on mobile */}
        {/*<div className="hidden lg:flex items-center justify-between py-2 text-xs xl:text-sm text-dark-gray border-b px-4">*/}
        {/*  <div className="flex items-center gap-4 xl:gap-6">*/}
        {/*    <span className="flex items-center gap-2">*/}
        {/*      <Truck className="w-3 h-3 xl:w-4 xl:h-4 text-success" />*/}
        {/*      <span className="hidden xl:inline">Free shipping over $50</span>*/}
        {/*      <span className="xl:hidden">Free shipping $50+</span>*/}
        {/*    </span>*/}
        {/*    <span className="flex items-center gap-2">*/}
        {/*      <Shield className="w-3 h-3 xl:w-4 xl:h-4 text-primary-blue" />*/}
        {/*      <span className="hidden xl:inline">Licensed pharmacy</span>*/}
        {/*      <span className="xl:hidden">Licensed</span>*/}
        {/*    </span>*/}
        {/*  </div>*/}
        {/*  <div className="flex items-center gap-4 xl:gap-6">*/}
        {/*    <Link href="/account" className="hover:text-primary-blue transition-colors">*/}
        {/*      My Account*/}
        {/*    </Link>*/}
        {/*    <Link href="/help" className="hover:text-primary-blue transition-colors">*/}
        {/*      <span className="hidden xl:inline">Help & Support</span>*/}
        {/*      <span className="xl:hidden">Help</span>*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Main Header */}
        <div className="flex items-center justify-between py-3 md:py-4 px-4">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-left font-montserrat font-bold text-lg">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex-1 py-4">
                <div className="space-y-1 px-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-2 font-inter font-medium text-charcoal hover:text-primary-blue hover:bg-light-gray rounded-md transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t px-4">
                  <div className="space-y-3">
                    <Link href="/account" className="block py-2 px-2 text-dark-gray hover:text-primary-blue">
                      My Account
                    </Link>
                    <Link href="/help" className="block py-2 px-2 text-dark-gray hover:text-primary-blue">
                      Help & Support
                    </Link>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-montserrat font-bold text-primary-blue">
            <span className="hidden sm:inline">PharmaYes</span>
            <span className="sm:hidden">PY</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-6 xl:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-gray w-4 h-4 xl:w-5 xl:h-5" />
              <Input
                placeholder="Search medicines, vitamins, beauty..."
                className={`pl-9 xl:pl-10 pr-4 py-2 xl:py-3 w-full font-inter text-sm xl:text-base transition-all ${
                  isSearchFocused ? "ring-2 ring-primary-blue border-primary-blue" : ""
                }`}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem>
                      <span className="font-medium">Hello, {userName}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>My Orders</DropdownMenuItem>
                    <DropdownMenuItem>Prescriptions</DropdownMenuItem>
                    <DropdownMenuItem>Account Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                    <DropdownMenuItem>Create Account</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full p-0 flex items-center justify-center text-xs bg-secondary-teal">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary-blue">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-4 pb-4 border-t bg-light-gray">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-gray w-4 h-4" />
              <Input
                placeholder="Search medicines, vitamins..."
                className="pl-10 pr-10 py-3 w-full font-inter"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block py-3 border-t px-4">
          <div className="flex items-center gap-6 xl:gap-8 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-inter font-medium text-charcoal hover:text-primary-blue transition-colors whitespace-nowrap text-sm xl:text-base"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
