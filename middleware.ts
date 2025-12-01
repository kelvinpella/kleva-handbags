import { type NextRequest } from "next/server"
import { updateSession } from "./lib/supabase/middleware"

export const proxy = async (request: NextRequest) => {
  return await updateSession(request)
}

// Backwards-compatible export: some Next.js versions still expect a named
// `middleware` export. Export it here as an alias to `proxy` so both the
// new `proxy` convention and older `middleware` consumers work.
export const middleware = proxy

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}