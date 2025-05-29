"use client"

import { useEffect, useState } from "react"
import { User, Package, MapPin, Settings, CreditCard, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/lib/api"
import type { Order } from "@/types"
import Link from "next/link"
import { Header } from "@/components/layout/Header"

export default function AccountPage() {
  const { state: authState } = useAuth()
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (authState.user) {
        try {
          const orders = await api.orders.getByUserId(authState.user.id)
          setRecentOrders(orders.slice(0, 3)) // Show only 3 most recent
        } catch (error) {
          console.error("Failed to fetch orders:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchRecentOrders()
  }, [authState.user])

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to access your account</h1>
          <p className="text-gray-600">You need to be logged in to view this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600">
            Welcome back, {authState.user?.firstName}! Manage your account and view your orders.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Menu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/account">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Link href="/account/orders">
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </Button>
                </Link>
                <Link href="/account/addresses">
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Addresses
                  </Button>
                </Link>
                <Link href="/account/payment">
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                </Link>
                <Link href="/account/wishlist">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                </Link>
                <Link href="/account/preferences">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Preferences
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Personal Details</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span> {authState.user?.firstName}{" "}
                        {authState.user?.lastName}
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span> {authState.user?.email}
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span> {authState.user?.phone || "Not provided"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Account Status</h3>
                    <div className="space-y-2">
                      <Badge variant="secondary">Verified Account</Badge>
                      <div className="text-sm text-gray-600">
                        Member since {authState.user?.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Link href="/account/orders">
                  <Button variant="outline" size="sm">
                    View All Orders
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading orders...</div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
                    <Link href="/">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">Order #{order.id}</h4>
                            <p className="text-sm text-gray-600">{order.createdAt.toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${order.total.toFixed(2)}</div>
                            <Badge
                              variant={
                                order.status === "delivered"
                                  ? "default"
                                  : order.status === "shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-medium mb-2">Track Orders</h3>
                  <p className="text-sm text-gray-600 mb-4">Monitor your order status and delivery</p>
                  <Link href="/account/orders">
                    <Button variant="outline" size="sm">
                      Track Orders
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-medium mb-2">Manage Addresses</h3>
                  <p className="text-sm text-gray-600 mb-4">Update your shipping and billing addresses</p>
                  <Link href="/account/addresses">
                    <Button variant="outline" size="sm">
                      Manage Addresses
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h3 className="font-medium mb-2">Wishlist</h3>
                  <p className="text-sm text-gray-600 mb-4">Save items for later purchase</p>
                  <Link href="/account/wishlist">
                    <Button variant="outline" size="sm">
                      View Wishlist
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
