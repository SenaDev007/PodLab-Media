import { ADMIN_COOKIE, verifySession } from "@/lib/session";

/**
 * Garde d'administration pour les routes API Node.
 * Retourne true si la requête porte un cookie de session admin valide.
 * Usage : `if (!(await requireAdmin(request))) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });`
 */
export async function requireAdmin(request: Request): Promise<boolean> {
  const cookie = request.headers.get("cookie") ?? "";
  const token = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=");
  return verifySession(token);
}
