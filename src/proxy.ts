import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySession } from "@/lib/session";

/**
 * PodLab Media — Proxy (ex-middleware, Next.js 16)
 * Protège la route /admin : toute requête non authentifiée est redirigée
 * vers /admin/login. Le tracker analytics public n'est pas filtré : seules
 * les routes /admin* sont concernées (les routes API se protègent elles-mêmes
 * via requireAdmin).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne concerne que le back-office
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // La page de connexion doit rester accessible
    if (pathname === "/admin/login") return NextResponse.next();

    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await verifySession(token);
    if (!authed) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
