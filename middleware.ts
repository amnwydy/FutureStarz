import { type NextRequest, NextResponse } from "next/server"

// Define protected and public routes
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/signup", "/"]

export async function middleware(req: NextRequest) {
  // Get the current path
  const path = req.nextUrl.pathname

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // For protected routes, we'll let the client-side handle authentication
  // since we're using localStorage
  if (isProtectedRoute) {
    // Let it through - client-side will handle redirect if needed
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
