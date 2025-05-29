"use client"

import type React from "react"

import { useState, useEffect, useCallback, createContext, useContext } from "react"
import { authAPI } from "@/lib/prestashop-api"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType {
  state: AuthState
  login: (email: string, password: string) => Promise<void>
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEYS = {
  TOKEN: "prestashop_auth_token",
  USER: "prestashop_user_data",
}

export function PrestashopAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
        const userData = localStorage.getItem(STORAGE_KEYS.USER)

        if (token && userData) {
          const user = JSON.parse(userData)

          // Verify token is still valid
          try {
            const profile = await authAPI.getProfile(token)
            setState({
              user: profile,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem(STORAGE_KEYS.TOKEN)
            localStorage.removeItem(STORAGE_KEYS.USER)
            setState({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            })
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Failed to initialize authentication",
        })
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authAPI.login(email, password)

      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

      setState({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }))
      throw error
    }
  }, [])

  const register = useCallback(
    async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await authAPI.register(userData)

        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user))

        setState({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Registration failed",
        }))
        throw error
      }
    },
    [],
  )

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)

      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Logout failed",
      }))
      throw error
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!state.token) return

    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const profile = await authAPI.getProfile(state.token)

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(profile))

      setState((prev) => ({
        ...prev,
        user: profile,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to refresh profile",
      }))
      throw error
    }
  }, [state.token])

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }))
  }, [])

  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    refreshProfile,
    clearError,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function usePrestashopAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("usePrestashopAuth must be used within a PrestashopAuthProvider")
  }
  return context
}
