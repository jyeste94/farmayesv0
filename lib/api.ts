import type { Product, User, Order, Review, Address } from "@/types"

// Simulated API functions - In a real app, these would make HTTP requests

export const api = {
  // Authentication
  auth: {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (555) 123-4567",
        addresses: [],
        preferences: {
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true,
          language: "en",
          currency: "USD",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return { user: mockUser, token: "mock-jwt-token" }
    },

    register: async (userData: Partial<User>): Promise<{ user: User; token: string }> => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        phone: userData.phone,
        addresses: [],
        preferences: {
          newsletter: true,
          smsNotifications: false,
          emailNotifications: true,
          language: "en",
          currency: "USD",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return { user: mockUser, token: "mock-jwt-token" }
    },

    logout: async (): Promise<void> => {
      await new Promise((resolve) => setTimeout(resolve, 500))
    },
  },

  // Products
  products: {
    getAll: async (filters?: any): Promise<Product[]> => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
        id: `product-${i + 1}`,
        name: `Product ${i + 1}`,
        description: `High-quality product description for item ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        originalPrice: Math.floor(Math.random() * 120) + 15,
        category: ["medicines", "vitamins", "beauty", "baby"][Math.floor(Math.random() * 4)],
        brand: ["Brand A", "Brand B", "Brand C"][Math.floor(Math.random() * 3)],
        image: `/placeholder.svg?height=300&width=300&text=Product${i + 1}`,
        images: [
          `/placeholder.svg?height=300&width=300&text=Product${i + 1}`,
          `/placeholder.svg?height=300&width=300&text=Product${i + 1}-2`,
          `/placeholder.svg?height=300&width=300&text=Product${i + 1}-3`,
        ],
        inStock: Math.random() > 0.1,
        stockQuantity: Math.floor(Math.random() * 100),
        rating: Math.floor(Math.random() * 5) + 1,
        reviewCount: Math.floor(Math.random() * 100),
        isPrescriptionRequired: Math.random() > 0.7,
        tags: ["popular", "new", "sale"].filter(() => Math.random() > 0.5),
        specifications: {
          "Active Ingredient": "Sample Ingredient",
          Dosage: "500mg",
          Form: "Tablet",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }))

      return mockProducts
    },

    getById: async (id: string): Promise<Product | null> => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockProduct: Product = {
        id,
        name: `Product ${id}`,
        description: "Detailed product description with benefits and usage instructions.",
        price: 29.99,
        originalPrice: 39.99,
        category: "medicines",
        brand: "PharmaCare",
        image: `/placeholder.svg?height=400&width=400&text=Product${id}`,
        images: [
          `/placeholder.svg?height=400&width=400&text=Product${id}`,
          `/placeholder.svg?height=400&width=400&text=Product${id}-2`,
          `/placeholder.svg?height=400&width=400&text=Product${id}-3`,
        ],
        inStock: true,
        stockQuantity: 50,
        rating: 4.5,
        reviewCount: 24,
        isPrescriptionRequired: false,
        tags: ["popular", "bestseller"],
        specifications: {
          "Active Ingredient": "Ibuprofen",
          Dosage: "400mg",
          Form: "Tablet",
          "Pack Size": "30 tablets",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return mockProduct
    },
  },

  // Orders
  orders: {
    create: async (orderData: any): Promise<Order> => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockOrder: Order = {
        id: `order-${Date.now()}`,
        userId: "1",
        items: orderData.items,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping: orderData.shipping,
        discount: orderData.discount,
        total: orderData.total,
        status: "confirmed",
        paymentStatus: "completed",
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress,
        paymentMethod: orderData.paymentMethod,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return mockOrder
    },

    getByUserId: async (userId: string): Promise<Order[]> => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockOrders: Order[] = [
        {
          id: "order-1",
          userId,
          items: [
            {
              id: "1",
              productId: "product-1",
              productName: "Ibuprofen 400mg",
              productImage: "/placeholder.svg?height=100&width=100&text=Ibuprofen",
              quantity: 2,
              price: 24.99,
              total: 49.98,
            },
          ],
          subtotal: 49.98,
          tax: 4.0,
          shipping: 0,
          discount: 5.0,
          total: 48.98,
          status: "delivered",
          paymentStatus: "completed",
          shippingAddress: {} as Address,
          billingAddress: {} as Address,
          paymentMethod: { type: "card", last4: "4242", brand: "visa" },
          trackingNumber: "TRK123456789",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(),
        },
      ]

      return mockOrders
    },
  },

  // Reviews
  reviews: {
    getByProductId: async (productId: string): Promise<Review[]> => {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const mockReviews: Review[] = Array.from({ length: 5 }, (_, i) => ({
        id: `review-${i + 1}`,
        userId: `user-${i + 1}`,
        productId,
        userName: `User ${i + 1}`,
        rating: Math.floor(Math.random() * 5) + 1,
        title: `Great product ${i + 1}`,
        comment: `This is a detailed review comment for the product. Very satisfied with the quality and delivery.`,
        verified: Math.random() > 0.3,
        helpful: Math.floor(Math.random() * 20),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      }))

      return mockReviews
    },

    create: async (reviewData: Partial<Review>): Promise<Review> => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockReview: Review = {
        id: `review-${Date.now()}`,
        userId: reviewData.userId!,
        productId: reviewData.productId!,
        userName: reviewData.userName!,
        rating: reviewData.rating!,
        title: reviewData.title!,
        comment: reviewData.comment!,
        verified: true,
        helpful: 0,
        createdAt: new Date(),
      }

      return mockReview
    },
  },
}
