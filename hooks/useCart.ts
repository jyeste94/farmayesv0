"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  isOpen: false,
  itemCount: 0,
  subtotal: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find((item) => item.product.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity,
        }
        newItems = [...state.items, newItem]
      }

      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const subtotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { ...state, items: newItems, itemCount, subtotal }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const subtotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { ...state, items: newItems, itemCount, subtotal }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: id })
      }

      const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const subtotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { ...state, items: newItems, itemCount, subtotal }
    }

    case "CLEAR_CART":
      return { ...state, items: [], itemCount: 0, subtotal: 0 }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "SET_CART_OPEN":
      return { ...state, isOpen: action.payload }

    case "LOAD_CART": {
      const items = action.payload
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return { ...state, items, itemCount, subtotal }
    }

    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart-items")
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: items })
      } catch {
        localStorage.removeItem("cart-items")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const setCartOpen = (open: boolean) => {
    dispatch({ type: "SET_CART_OPEN", payload: open })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
