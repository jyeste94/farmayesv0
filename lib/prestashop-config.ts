// PrestaShop Configuration and Utilities
export const PRESTASHOP_CONFIG = {
  BASE_URL: "https://pharmayes.joseyeste.com",
  API_KEY: "CKER67RSTRD6FF1DS25I6NR2KH17I135",
  API_VERSION: "1.0",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  CACHE_DURATION: 60 * 60 * 1000, // 1 hour
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
}

// Image URL helpers
export const getImageUrl = (imagePath?: string, fallbackText?: string): string => {
  if (!imagePath) {
    return `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(fallbackText || "Producto")}`
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath
  }

  // If it's a relative path, prepend the base URL
  if (imagePath.startsWith("/")) {
    return `${PRESTASHOP_CONFIG.BASE_URL}${imagePath}`
  }

  // Otherwise, construct the full URL
  return `${PRESTASHOP_CONFIG.BASE_URL}/img/${imagePath}`
}

// Price formatting
export const formatPrice = (price: number, currency = "USD"): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price)
}

// Stock status helpers
export const getStockStatus = (
  quantity: number,
): {
  status: "in-stock" | "low-stock" | "out-of-stock"
  message: string
  color: string
} => {
  if (quantity === 0) {
    return {
      status: "out-of-stock",
      message: "Agotado",
      color: "text-red-600",
    }
  } else if (quantity <= 5) {
    return {
      status: "low-stock",
      message: `Últimas ${quantity} unidades`,
      color: "text-orange-600",
    }
  } else {
    return {
      status: "in-stock",
      message: "En stock",
      color: "text-green-600",
    }
  }
}

// Category color mapping
export const getCategoryColor = (
  categoryId: string,
): {
  primary: string
  secondary: string
  accent: string
} => {
  const colors = [
    { primary: "#3b82f6", secondary: "#60a5fa", accent: "#2563eb" }, // Blue
    { primary: "#f59e0b", secondary: "#fbbf24", accent: "#d97706" }, // Amber
    { primary: "#ec4899", secondary: "#f472b6", accent: "#db2777" }, // Pink
    { primary: "#8b5cf6", secondary: "#a78bfa", accent: "#7c3aed" }, // Violet
    { primary: "#ef4444", secondary: "#f87171", accent: "#dc2626" }, // Red
    { primary: "#10b981", secondary: "#34d399", accent: "#059669" }, // Emerald
    { primary: "#06b6d4", secondary: "#67e8f9", accent: "#0891b2" }, // Cyan
    { primary: "#84cc16", secondary: "#a3e635", accent: "#65a30d" }, // Lime
  ]

  const hash = categoryId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  return colors[Math.abs(hash) % colors.length]
}

// Error messages in Spanish
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Error de conexión. Verifica tu conexión a internet.",
  API_ERROR: "Error del servidor. Inténtalo de nuevo más tarde.",
  NOT_FOUND: "Recurso no encontrado.",
  UNAUTHORIZED: "No autorizado. Verifica tus credenciales.",
  TIMEOUT: "La solicitud tardó demasiado. Inténtalo de nuevo.",
  UNKNOWN: "Error desconocido. Contacta al soporte técnico.",
}

// Logging utility
export const logError = (error: any, context?: string) => {
  const timestamp = new Date().toISOString()
  const errorInfo = {
    timestamp,
    context,
    message: error.message || error,
    stack: error.stack,
    url: typeof window !== "undefined" ? window.location.href : "server",
  }

  console.error("PrestaShop Error:", errorInfo)

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === "production") {
    // Send to logging service
    // Example: sendToLoggingService(errorInfo)
  }
}

// Data validation helpers
export const validateProduct = (product: any): boolean => {
  return !!(product && product.id && product.name && typeof product.price === "number" && product.price >= 0)
}

export const validateCategory = (category: any): boolean => {
  return !!(category && category.id && category.name)
}

// URL helpers
export const buildProductUrl = (productId: string): string => {
  return `/product-prestashop/${productId}`
}

export const buildCategoryUrl = (categoryId: string): string => {
  return `/categories/${categoryId}`
}

// Search helpers
export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().replace(/[<>]/g, "").substring(0, 100)
}

// Performance monitoring
export const measurePerformance = async (operation: () => Promise<any>, operationName: string): Promise<any> => {
  const startTime = performance.now()

  try {
    const result = await operation()
    const endTime = performance.now()
    const duration = endTime - startTime

    console.log(`${operationName} completed in ${duration.toFixed(2)}ms`)

    // Log slow operations
    if (duration > 2000) {
      console.warn(`Slow operation detected: ${operationName} took ${duration.toFixed(2)}ms`)
    }

    return result
  } catch (error) {
    const endTime = performance.now()
    const duration = endTime - startTime

    console.error(`${operationName} failed after ${duration.toFixed(2)}ms:`, error)
    throw error
  }
}
