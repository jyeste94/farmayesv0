"use client"

import type React from "react"

import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const alertVariants = cva("relative w-full rounded-lg border p-4 font-inter", {
  variants: {
    variant: {
      default: "bg-light-gray text-charcoal border-medium-gray",
      destructive: "bg-red-50 text-red-800 border-red-200",
      success: "bg-green-50 text-green-800 border-green-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
      info: "bg-blue-50 text-blue-800 border-blue-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, dismissible = false, onDismiss, children, ...props }, ref) => {
    const icons = {
      default: Info,
      destructive: AlertCircle,
      success: CheckCircle,
      warning: AlertTriangle,
      info: Info,
    }

    const Icon = icons[variant || "default"]

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            {title && <h5 className="font-medium mb-1">{title}</h5>}
            <div className="text-sm">{children}</div>
          </div>
          {dismissible && onDismiss && (
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={onDismiss}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    )
  },
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
