"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { User } from "@/types"
import { api } from "@/lib/api"

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User | null }
  | { type: "LOGOUT" }

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }
    default:
      return state
  }
}

const AuthContext = createContext<{
  state: AuthState
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => Promise<void>
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({ type: "SET_USER", payload: user })
      } catch {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
        dispatch({ type: "SET_LOADING", payload: false })
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const { user, token } = await api.auth.login(email, password)
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-data", JSON.stringify(user))
      dispatch({ type: "SET_USER", payload: user })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const register = async (userData: Partial<User>) => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      const { user, token } = await api.auth.register(userData)
      localStorage.setItem("auth-token", token)
      localStorage.setItem("user-data", JSON.stringify(user))
      dispatch({ type: "SET_USER", payload: user })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true })
    try {
      await api.auth.logout()
      localStorage.removeItem("auth-token")
      localStorage.removeItem("user-data")
      dispatch({ type: "LOGOUT" })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  return <AuthContext.Provider value={{ state, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
