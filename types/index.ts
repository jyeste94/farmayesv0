export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  brand: string
  image: string
  images: string[]
  href: string
  linkRewrite: string
  slug: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  isPrescriptionRequired: boolean
  tags: string[]
  specifications: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  href: string
  linkRewrite: string
  slug: string
  image: string
  productCount: number
  parentId?: string
  level: number
  active: boolean
  children?: Category[]
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedVariant?: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses: Address[]
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  type: "shipping" | "billing"
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface UserPreferences {
  newsletter: boolean
  smsNotifications: boolean
  emailNotifications: boolean
  language: string
  currency: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: PaymentMethod
  trackingNumber?: string
  estimatedDelivery?: Date
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  quantity: number
  price: number
  total: number
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"

export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded"

export interface PaymentMethod {
  type: "card" | "paypal" | "apple_pay" | "google_pay"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
}

export interface Review {
  id: string
  userId: string
  productId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: number
  createdAt: Date
}

export interface FilterState {
  category?: string
  priceRange: [number, number]
  brands: string[]
  rating: number
  inStock: boolean
  prescriptionRequired?: boolean
  sortBy: "relevance" | "price_low" | "price_high" | "rating" | "newest"
  search?: string
}
