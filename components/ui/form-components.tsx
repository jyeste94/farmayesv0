"use client"

import type React from "react"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Form Field Wrapper
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required = false, error, children, className = "" }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="font-inter font-medium text-charcoal">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-error font-inter">{error}</p>}
    </div>
  )
}

// Custom Input Component
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ className, error, ...props }, ref) => {
  return (
    <Input
      className={cn("font-inter transition-colors", error && "border-error focus:ring-error", className)}
      ref={ref}
      {...props}
    />
  )
})
CustomInput.displayName = "CustomInput"

// Custom Textarea Component
interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const CustomTextarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <Textarea
        className={cn("font-inter transition-colors", error && "border-error focus:ring-error", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
CustomTextarea.displayName = "CustomTextarea"

// Search Input Component
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

export function SearchInput({ onSearch, className = "", ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Input type="search" className={cn("pl-10 pr-4 font-inter", className)} {...props} />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-dark-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  )
}

// Quantity Input Component
interface QuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantityInput({ value, onChange, min = 1, max = 99, className = "" }: QuantityInputProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className={cn("flex items-center border rounded-md", className)}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        className="px-3 py-2 text-dark-gray hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value) || min)}
        min={min}
        max={max}
        className="w-16 text-center border-0 focus:ring-0 font-inter"
      />
      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        className="px-3 py-2 text-dark-gray hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  )
}

// Price Display Component
interface PriceDisplayProps {
  price: number
  originalPrice?: number
  currency?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function PriceDisplay({ price, originalPrice, currency = "$", size = "md", className = "" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  }

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-bold text-primary-blue font-inter", sizeClasses[size])}>
        {currency}
        {price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <span
          className={cn(
            "text-dark-gray line-through font-inter",
            size === "sm" ? "text-xs" : size === "md" ? "text-sm" : size === "lg" ? "text-base" : "text-lg",
          )}
        >
          {currency}
          {originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  )
}
