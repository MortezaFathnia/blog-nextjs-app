import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/posts", "/"]
const authRoutes = ["/login"]
const publicRoutes = ["/about", "/"]
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  const pathname = request.nextUrl.pathname

  const isLoginPage = pathname.startsWith('/login')


  const sensitiveRoutes = ['/posts']
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isLoginPage) {
    if (token) {
      return NextResponse.redirect(new URL('/posts', request.url))
    }

    return NextResponse.next()
  }

  if (!token && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/posts', request.url))
  }
}

export const config = {
  matcher: ['/', '/login','/register', '/posts/:path']
}