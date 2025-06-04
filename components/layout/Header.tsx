"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Heart, Truck, Shield, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePrestashopAuth } from "@/hooks/usePrestashopAuth"
import { useCart } from "@/hooks/useCart"
import { CartDrawer } from "@/components/cart/CartDrawer"

export function Header() {
  const { state: authState, logout } = usePrestashopAuth()
  const { state: cartState, toggleCart } = useCart()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm text-gray-600 border-b">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Free shipping over $50
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Licensed pharmacy
              </span>
            </div>
            <div className="flex items-center gap-4">
              {authState.isAuthenticated ? (
                <Link href="/account" className="hover:text-blue-600">
                  My Account
                </Link>
              ) : (
                <Link href="/login" className="hover:text-blue-600">
                  Sign In
                </Link>
              )}
              <Link href="/help" className="hover:text-blue-600">
                Help
              </Link>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              PharmaCare+
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for medicines, vitamins, beauty products..."
                  className="pl-10 pr-4 py-3 w-full"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              {authState.isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {authState.user?.firstName} {authState.user?.lastName}
                    </div>
                    <div className="px-2 py-1.5 text-xs text-gray-500">{authState.user?.email}</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/orders">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/addresses">Addresses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/preferences">Preferences</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                <ShoppingCart className="w-5 h-5" />
                {cartState.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-3 border-t">
            <div className="flex items-center gap-8">
              <Link href="/categories/medicines" className="hover:text-blue-600 font-medium">
                Medicines
              </Link>
              <Link href="/categories/vitamins" className="hover:text-blue-600 font-medium">
                Vitamins & Supplements
              </Link>
              <Link href="/categories/beauty" className="hover:text-blue-600 font-medium">
                Beauty & Personal Care
              </Link>
              <Link href="/categories/baby" className="hover:text-blue-600 font-medium">
                Baby & Mother
              </Link>
              <Link href="/categories/wellness" className="hover:text-blue-600 font-medium">
                Health & Wellness
              </Link>
              <Link href="/categories/medical" className="hover:text-blue-600 font-medium">
                Medical Devices
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <CartDrawer />
    </>
  )
}
