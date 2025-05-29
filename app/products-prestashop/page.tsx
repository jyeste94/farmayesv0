"use client"

import { Suspense } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/ui/footer"
import { PrestashopProductGrid } from "@/components/prestashop/PrestashopProductGrid"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function PrestashopProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Productos PrestaShop</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos desde PrestaShop</h1>
          <p className="text-gray-600">
            Explora nuestro catálogo completo de productos de salud y bienestar, integrado directamente desde nuestro
            sistema PrestaShop.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <span className="ml-3 text-lg">Cargando productos...</span>
            </div>
          }
        >
          <PrestashopProductGrid showPagination={true} />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
