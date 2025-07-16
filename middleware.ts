import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "./lib/auth"

// Define protected and public routes
const protectedRoutes = ["/dashboard", "/dashboard/profile", "/dashboard/settings"]
const publicRoutes = ["/login", "/signup", "/"]

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value

  // Verify the authentication token
  const isAuthenticated = token ? await verifyAuth(token) : false

  // Get the current path
  const path = req.nextUrl.pathname

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(path)

  // Redirect to login if accessing a protected route without a session
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing a public route with a session
  if (isPublicRoute && isAuthenticated && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
