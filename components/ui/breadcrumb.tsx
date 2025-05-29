import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={cn("bg-white border-b", className)}>
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm font-inter">
          <li>
            <Link href="/" className="flex items-center text-dark-gray hover:text-primary-blue transition-colors">
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-medium-gray" />
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="text-dark-gray hover:text-primary-blue transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
