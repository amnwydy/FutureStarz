import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // This middleware runs on the server, but our auth is client-side
  // We'll let the client-side components handle authentication
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
