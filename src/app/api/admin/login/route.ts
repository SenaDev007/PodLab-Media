import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  ADMIN_COOKIE,
  resolveCredentials,
  signSession,
  verifySession,
  checkIpLocked,
  trackLoginAttempt,
} from "@/lib/session";

export const dynamic = "force-dynamic";

/** POST /api/admin/login — authentification back-office (verrouillage IP inclus). */
export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

    const lockout = checkIpLocked(ip);
    if (lockout.locked) {
      return NextResponse.json(
        {
          success: false,
          error: `Trop de tentatives échouées. IP bloquée encore ${lockout.remainingMin} minute(s).`,
        },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Adresse e-mail et mot de passe requis." },
        { status: 400 }
      );
    }

    const creds = await resolveCredentials(async (key) => {
      const row = await db.adminSetting.findUnique({ where: { key } });
      return row?.value ?? null;
    });

    const ok =
      email.trim().toLowerCase() === creds.email.toLowerCase() &&
      password === creds.password;

    trackLoginAttempt(ip, ok);

    if (!ok) {
      return NextResponse.json(
        { success: false, error: "Identifiants d'accès invalides." },
        { status: 401 }
      );
    }

    const token = await signSession(creds.email);
    const res = NextResponse.json({ success: true });
    res.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 h
    });
    return res;
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}

/** DELETE /api/admin/login — déconnexion (expire le cookie). */
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}

/** GET /api/admin/login — état de session (utilisé par le hash-route #/admin). */
export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const token = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${ADMIN_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=");
  const authenticated = await verifySession(token);
  return NextResponse.json({ authenticated });
}
