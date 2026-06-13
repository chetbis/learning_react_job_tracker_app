import { JWTPayload, JWTVerifyResult } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";
import { ROUTES } from "./app/lib/routes";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/jobs');  

  const sessionCookie = request.cookies.get('session');
  let session: JWTVerifyResult<JWTPayload> | null = null; 

  try {
    session = await decrypt(sessionCookie?.value ?? '');
  } catch { }

  if (isProtectedRoute && !session ) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (path === ROUTES.LOGIN && session) {
    return NextResponse.redirect(new URL(ROUTES.JOBS, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
};
