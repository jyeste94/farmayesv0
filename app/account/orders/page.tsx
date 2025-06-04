"use client"

import { useEffect, useState } from "react"
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePrestashopAuth } from "@/hooks/usePrestashopAuth"
import { api } from "@/lib/api"
import type { Order } from "@/types"
import Link from "next/link"
import { Header } from "@/components/layout/Header"

export default function OrdersPage() {
  const { state: authState } = usePrestashopAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (authState.user) {
        try {
          const userOrders = await api.orders.getByUserId(authState.user.id)
          setOrders(userOrders)
        } catch (error) {
          console.error("Failed to fetch orders:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchOrders()
  }, [authState.user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "processing":
        return <Package className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      default:
        return "outline"
    }
  }

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
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
          <Link href="/account">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Order History</h1>
          <p className="text-gray-600">View and track all your orders</p>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet</p>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Placed on {order.createdAt.toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${order.total.toFixed(2)}</div>
                      <Badge variant={getStatusColor(order.status) as any}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3">Items ({order.items.length})</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-lg">📦</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">{item.productName}</h5>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${item.total.toFixed(2)}</div>
                              <div className="text-sm text-gray-600">${item.price.toFixed(2)} each</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <div className="text-sm text-gray-600">
                            <div>
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                            </div>
                            <div>{order.shippingAddress.address1}</div>
                            {order.shippingAddress.address2 && <div>{order.shippingAddress.address2}</div>}
                            <div>
                              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                              {order.shippingAddress.zipCode}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Order Summary</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span>${order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping:</span>
                              <span>{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span>-${order.discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-medium border-t pt-1">
                              <span>Total:</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tracking Information */}
                    {order.trackingNumber && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Tracking Information</h4>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-gray-600">Tracking Number:</span>{" "}
                            <span className="font-mono">{order.trackingNumber}</span>
                          </div>
                          {order.estimatedDelivery && (
                            <div className="text-sm">
                              <span className="text-gray-600">Estimated Delivery:</span>{" "}
                              {order.estimatedDelivery.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="border-t pt-4 flex gap-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      )}
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm">
                          Track Package
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
