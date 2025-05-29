// PrestaShop API Integration
const PRESTASHOP_BASE_URL = "https://pharmayes.joseyeste.com"
const API_KEY = "CKER67RSTRD6FF1DS25I6NR2KH17I135"

// Error handling
export class PrestaShopError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = "PrestaShopError"
  }
}

// URL utilities for link_rewrite handling
export const sanitizeLinkRewrite = (linkRewrite: string): string => {
  if (!linkRewrite) return ""

  return linkRewrite
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-_]/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
}

export const encodeLinkRewrite = (linkRewrite: string): string => {
  return encodeURIComponent(sanitizeLinkRewrite(linkRewrite))
}

export const buildProductUrl = (id: string, linkRewrite?: string): string => {
  if (linkRewrite) {
    const sanitized = sanitizeLinkRewrite(linkRewrite)
    return `/producto/${sanitized}-${id}`
  }
  return `/producto/${id}`
}

export const buildCategoryUrl = (id: string, linkRewrite?: string): string => {
  if (linkRewrite) {
    const sanitized = sanitizeLinkRewrite(linkRewrite)
    return `/categoria/${sanitized}-${id}`
  }
  return `/categoria/${id}`
}

export const extractIdFromUrl = (url: string): string => {
  // Extract ID from URLs like "/producto/ibuprofen-400mg-123" or "/categoria/medicamentos-456"
  const match = url.match(/-(\d+)$/)
  return match ? match[1] : url
}

// API Headers
const getHeaders = (token?: string) => ({
  Authorization: `Basic ${btoa(`${API_KEY}:`)}`,
  "Content-Type": "application/json",
  Accept: "application/json",
  "User-Agent": "PharmaCare-NextJS/1.0",
  ...(token && { "X-Auth-Token": token }),
})

// Retry mechanism
const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
)
: Promise<T> =>
{
  try {
    return await fn()
  } catch (error) {
    if (retries > 0 && error instanceof PrestaShopError && error.status !== 401) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return retryRequest(fn, retries - 1, delay * 2)
    }
    throw error
  }
}

// Base API request function
const apiRequest = async <T>(endpoint: string, queryParams = ''): Promise<T> => {
  const url = `/api/prestashop/${endpoint}${queryParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.statusText}\n${errorText}`);
  }

  return await response.json();
};


// Transform PrestaShop product to our format
const transformProduct = (psProduct: any): any => {

  const linkRewrite = psProduct.link_rewrite || psProduct.name?.toLowerCase().replace(/\s+/g, "-") || ""
  const imageUrls = psProduct.associations?.images?.map((img: { id: number }) =>
      `${PRESTASHOP_BASE_URL}/api/images/products/${psProduct.id}/${img.id}`
  ) || [];
  const image =
      psProduct.cover?.large?.url ||
      imageUrls?.[0] ||
      "/placeholder.svg?height=300&width=300&text=Product";


  return {
    id: psProduct.id?.toString() || "",
    name: psProduct.name || "",
    description: psProduct.description_short || psProduct.description || "",
    price: Number.parseFloat(psProduct.price || "0"),
    originalPrice: psProduct.price_without_reduction ? Number.parseFloat(psProduct.price_without_reduction) : undefined,
    category: psProduct.id_category_default?.toString() || "",
    brand: psProduct.manufacturer_name || "",
    image: image,
    images: imageUrls?.map((img: any) => img.large?.url || img.url) || [],
    href: buildProductUrl(psProduct.id?.toString() || "", linkRewrite),
    linkRewrite: linkRewrite,
    slug: sanitizeLinkRewrite(linkRewrite),
    inStock: psProduct.quantity > 0,
    stockQuantity: Number.parseInt(psProduct.quantity || "0"),
    rating: Number.parseFloat(psProduct.rating || "4.5"),
    reviewCount: Number.parseInt(psProduct.nb_comments || "0"),
    isPrescriptionRequired: psProduct.is_prescription_required || false,
    tags: psProduct.tags || [],
    specifications: psProduct.features || {},
    createdAt: new Date(psProduct.date_add || Date.now()),
    updatedAt: new Date(psProduct.date_upd || Date.now()),
  }
}

// Transform PrestaShop category to our format
const transformCategory = (psCategory: any): any => {
  const linkRewrite = psCategory.link_rewrite || psCategory.name?.toLowerCase().replace(/\s+/g, "-") || ""


  return {
    id: psCategory.id?.toString() || "",
    name: psCategory.name || "",
    description: psCategory.description || "",
    href: buildCategoryUrl(psCategory.id?.toString() || "", linkRewrite),
    linkRewrite: linkRewrite,
    slug: sanitizeLinkRewrite(linkRewrite),
    image: psCategory.image || "/placeholder.svg?height=300&width=300&text=Category",
    productCount: Number.parseInt(psCategory.nb_products_recursive || "0"),
    parentId: psCategory.id_parent?.toString(),
    level: Number.parseInt(psCategory.level_depth || "0"),
    active: psCategory.active === "1",
  }
}

// Products API
export const productsAPI = {
  // Get all products with filters
  getProducts: async (
    params: {
      page?: number
      limit?: number
      category?: string
      search?: string
      priceMin?: number
      priceMax?: number
      sortBy?: string
      sortOrder?: "asc" | "desc"
    } = {},
  ) => {
    const { page = 1, limit = 20, category, search, priceMin, priceMax, sortBy = "name", sortOrder = "asc" } = params

    let endpoint = `products?output_format=JSON&display=full&limit=${limit}&page=${page}`

    if (category) {
      endpoint += `&filter[id_category_default]=${category}`
    }

    if (search) {
      endpoint += `&filter[name]=[${search}]%`
    }

    if (priceMin !== undefined) {
      endpoint += `&filter[price]=[${priceMin},]`
    }

    if (priceMax !== undefined) {
      endpoint += `&filter[price]=[,${priceMax}]`
    }

    endpoint += `&sort=[${sortBy}_${sortOrder}]`

    return retryRequest(async () => {
      const data = await apiRequest<any>(endpoint)
      const products = Array.isArray(data.products) ? data.products : [data.products].filter(Boolean)

      return {
        products: products.map(transformProduct),
        total: Number.parseInt(data.total || products.length.toString()),
        page,
        limit,
        totalPages: Math.ceil(Number.parseInt(data.total || products.length.toString()) / limit),
      }
    })
  },

  // Get single product
  getProduct: async (id: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(`products/${id}?output_format=JSON&display=full`)
      return transformProduct(data.products[0])
    })
  },

  // Get product by slug (link_rewrite)
  getProductBySlug: async (slug: string) => {
    return retryRequest(async () => {
      // First try to extract ID from slug
      const id = extractIdFromUrl(`/${slug}`)
      if (id && id !== slug) {
        return await productsAPI.getProduct(id)
      }

      // If no ID found, search by link_rewrite
      const data = await apiRequest<any>(`products?output_format=JSON&display=full&filter[link_rewrite]=${slug}`)
      const products = Array.isArray(data.products) ? data.products : [data.products].filter(Boolean)

      if (products.length > 0) {
        return transformProduct(products[0])
      }

      throw new PrestaShopError("Product not found", 404)
    })
  },


  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(`products?output_format=JSON&display=full&limit=${limit}&filter[active]=1`)
      const products = Array.isArray(data.products) ? data.products : [data.products].filter(Boolean)

      return products.map(transformProduct)
    })
  },

  // Search products
  searchProducts: async (query: string, limit = 20) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(`search?output_format=JSON&query=${encodeURIComponent(query)}&limit=${limit}`)
      const products = Array.isArray(data.products) ? data.products : [data.products].filter(Boolean)

      return products.map(transformProduct)
    })
  },
}

// Categories API
export const categoriesAPI = {
  // Get all categories
  getCategories: async (parentId?: string) => {
    return retryRequest(async () => {
      let endpoint = "categories?output_format=JSON&display=full"

      if (parentId) {
        endpoint += `&filter[id_parent]=${parentId}`
      }

      const data = await apiRequest<any>(endpoint)
      const categories = Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean)

      return categories.map(transformCategory)
    })
  },

  // Get single category
  getCategory: async (id: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(`categories/${id}?output_format=JSON&display=full`)
      return transformCategory(data.category)
    })
  },

  // Get category by slug (link_rewrite)
  getCategoryBySlug: async (slug: string) => {
    return retryRequest(async () => {
      // First try to extract ID from slug
      const id = extractIdFromUrl(`/${slug}`)
      if (id && id !== slug) {
        return await categoriesAPI.getCategory(id)
      }

      // If no ID found, search by link_rewrite
      const data = await apiRequest<any>(`categories?output_format=JSON&display=full&filter[link_rewrite]=${slug}`)
      const categories = Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean)

      if (categories.length > 0) {
        return transformCategory(categories[0])
      }

      throw new PrestaShopError("Category not found", 404)
    })
  },

  // Get category tree
  getCategoryTree: async () => {
    return retryRequest(async () => {
      const data = await apiRequest<any>("categories?output_format=JSON&display=full")
      const categories = Array.isArray(data.categories) ? data.categories : [data.categories].filter(Boolean)

      const transformedCategories = categories.map(transformCategory)

      // Build tree structure
      const categoryMap = new Map()
      const rootCategories: any[] = []

      transformedCategories.forEach((cat: { id: any }) => {
        categoryMap.set(cat.id, { ...cat, children: [] })
      })

      transformedCategories.forEach((cat: { parentId: any; id: any }) => {
        if (cat.parentId && categoryMap.has(cat.parentId)) {
          categoryMap.get(cat.parentId).children.push(categoryMap.get(cat.id))
        } else {
          rootCategories.push(categoryMap.get(cat.id))
        }
      })

      return rootCategories
    })
  },
}

// Authentication API
export const authAPI = {
  // Login user
  login: async (email: string, password: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>("customers?output_format=JSON&display=full", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      })

      return {
        user: {
          id: data.customer.id,
          email: data.customer.email,
          firstName: data.customer.firstname,
          lastName: data.customer.lastname,
        },
        token: data.token || "mock-token",
      }
    })
  },

  // Register user
  register: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>("customers?output_format=JSON", {
        method: "POST",
        body: JSON.stringify({
          firstname: userData.firstName,
          lastname: userData.lastName,
          email: userData.email,
          passwd: userData.password,
        }),
      })

      return {
        user: {
          id: data.customer.id,
          email: data.customer.email,
          firstName: data.customer.firstname,
          lastName: data.customer.lastname,
        },
        token: data.token || "mock-token",
      }
    })
  },

  // Get user profile
  getProfile: async (token: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>("customers/me?output_format=JSON&display=full", {}, token)

      return {
        id: data.customer.id,
        email: data.customer.email,
        firstName: data.customer.firstname,
        lastName: data.customer.lastname,
      }
    })
  },
}

// Cart API
export const cartAPI = {
  // Get cart
  getCart: async (cartId?: string, token?: string) => {
    return retryRequest(async () => {
      const endpoint = cartId
        ? `carts/${cartId}?output_format=JSON&display=full`
        : "carts?output_format=JSON&display=full"
      const data = await apiRequest<any>(endpoint, {}, token)

      return {
        id: data.cart.id,
        items:
          data.cart.associations?.cart_rows?.map((item: any) => ({
            id: item.id_product,
            quantity: Number.parseInt(item.quantity),
            price: Number.parseFloat(item.price || "0"),
          })) || [],
        total: Number.parseFloat(data.cart.total_products || "0"),
        totalWithTax: Number.parseFloat(data.cart.total_products_wt || "0"),
      }
    })
  },

  // Add item to cart
  addToCart: async (cartId: string, productId: string, quantity: number, token?: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(
        `carts/${cartId}?output_format=JSON`,
        {
          method: "PUT",
          body: JSON.stringify({
            associations: {
              cart_rows: [
                {
                  id_product: productId,
                  quantity: quantity.toString(),
                },
              ],
            },
          }),
        },
        token,
      )

      return data
    })
  },

  // Update cart item
  updateCartItem: async (cartId: string, productId: string, quantity: number, token?: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(
        `carts/${cartId}?output_format=JSON`,
        {
          method: "PUT",
          body: JSON.stringify({
            associations: {
              cart_rows: [
                {
                  id_product: productId,
                  quantity: quantity.toString(),
                },
              ],
            },
          }),
        },
        token,
      )

      return data
    })
  },

  // Remove item from cart
  removeFromCart: async (cartId: string, productId: string, token?: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(
        `carts/${cartId}?output_format=JSON`,
        {
          method: "PUT",
          body: JSON.stringify({
            associations: {
              cart_rows: [
                {
                  id_product: productId,
                  quantity: "0",
                },
              ],
            },
          }),
        },
        token,
      )

      return data
    })
  },
}

// Orders API
export const ordersAPI = {
  // Get user orders
  getOrders: async (customerId: string, token: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(
        `orders?output_format=JSON&display=full&filter[id_customer]=${customerId}`,
        {},
        token,
      )
      const orders = Array.isArray(data.orders) ? data.orders : [data.orders].filter(Boolean)

      return orders.map((order: any) => ({
        id: order.id,
        reference: order.reference,
        date: new Date(order.date_add),
        status: order.current_state,
        total: Number.parseFloat(order.total_paid || "0"),
        items:
          order.associations?.order_rows?.map((item: any) => ({
            id: item.id_product,
            name: item.product_name,
            quantity: Number.parseInt(item.product_quantity),
            price: Number.parseFloat(item.unit_price_tax_incl || "0"),
          })) || [],
      }))
    })
  },

  // Get single order
  getOrder: async (orderId: string, token: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(`orders/${orderId}?output_format=JSON&display=full`, {}, token)

      return {
        id: data.order.id,
        reference: data.order.reference,
        date: new Date(data.order.date_add),
        status: data.order.current_state,
        total: Number.parseFloat(data.order.total_paid || "0"),
        items:
          data.order.associations?.order_rows?.map((item: any) => ({
            id: item.id_product,
            name: item.product_name,
            quantity: Number.parseInt(item.product_quantity),
            price: Number.parseFloat(item.unit_price_tax_incl || "0"),
          })) || [],
      }
    })
  },

  // Create order
  createOrder: async (orderData: any, token: string) => {
    return retryRequest(async () => {
      const data = await apiRequest<any>(
        "orders?output_format=JSON",
        {
          method: "POST",
          body: JSON.stringify(orderData),
        },
        token,
      )

      return data
    })
  },
}

// Cache management
const cache = new Map()
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

export const setCachedData = <T>(key: string, data: T): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

export const clearCache = (pattern?: string): void => {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key)
      }
    }
  } else {
    cache.clear()
  }
}
