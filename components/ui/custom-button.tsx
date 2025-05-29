import type React from "react"
import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-inter transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-blue text-white hover:bg-primary-blue-hover",
        destructive: "bg-error text-white hover:bg-red-600",
        outline: "border border-primary-blue text-primary-blue hover:bg-light-gray",
        secondary: "bg-secondary-teal text-white hover:bg-secondary-teal-hover",
        ghost: "hover:bg-light-gray hover:text-charcoal",
        link: "text-primary-blue underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-green-600",
        warning: "bg-warning text-white hover:bg-yellow-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props} />
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton, buttonVariants }

// Specialized Button Components
export function AddToCartButton({ children = "Add to Cart", className = "", ...props }: CustomButtonProps) {
  return (
    <CustomButton variant="default" className={cn("uppercase tracking-wide", className)} {...props}>
      {children}
    </CustomButton>
  )
}

export function SecondaryButton({ children, className = "", ...props }: CustomButtonProps) {
  return (
    <CustomButton variant="secondary" className={className} {...props}>
      {children}
    </CustomButton>
  )
}

export function OutlineButton({ children, className = "", ...props }: CustomButtonProps) {
  return (
    <CustomButton variant="outline" className={className} {...props}>
      {children}
    </CustomButton>
  )
}

export function LinkButton({ children, className = "", ...props }: CustomButtonProps) {
  return (
    <CustomButton variant="link" className={className} {...props}>
      {children}
    </CustomButton>
  )
}
