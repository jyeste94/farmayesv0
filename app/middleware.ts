import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Handle old product URLs and redirect to new format
    if (pathname.startsWith("/product/")) {
        const productId = pathname.split("/product/")[1]
        if (productId && !isNaN(Number(productId))) {
            // Redirect old numeric product URLs to new slug format
            return NextResponse.redirect(new URL(`/producto/${productId}`, request.url))
        }
    }

    // Handle old category URLs and redirect to new format
    if (pathname.startsWith("/categories/")) {
        const categoryId = pathname.split("/categories/")[1]
        if (categoryId && !isNaN(Number(categoryId))) {
            // Redirect old numeric category URLs to new slug format
            return NextResponse.redirect(new URL(`/categoria/${categoryId}`, request.url))
        }
    }

    // Handle product URLs with link_rewrite
    if (pathname.startsWith("/producto/")) {
        const slug = pathname.split("/producto/")[1]
        if (slug) {
            // Allow the request to proceed to the dynamic route
            return NextResponse.next()
        }
    }

    // Handle category URLs with link_rewrite
    if (pathname.startsWith("/categoria/")) {
        const slug = pathname.split("/categoria/")[1]
        if (slug) {
            // Allow the request to proceed to the dynamic route
            return NextResponse.next()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/product/:path*", "/categories/:path*", "/producto/:path*", "/categoria/:path*"],
}
