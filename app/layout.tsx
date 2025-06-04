import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PrestashopAuthProvider } from "@/hooks/usePrestashopAuth"
import { CartProvider } from "@/hooks/useCart"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PharmaCare+ | Your Trusted Online Pharmacy",
  description: "Licensed pharmacy with over 10,000 products for your health and wellness needs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrestashopAuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </PrestashopAuthProvider>
      </body>
    </html>
  )
}
