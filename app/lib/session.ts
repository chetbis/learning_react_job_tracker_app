import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  throw new Error("SECRET_KEY environment variable is not set.");
}

const encodedKey = new TextEncoder().encode(secretKey);

export function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setExpirationTime("2d")
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(encodedKey);
}

export function decrypt(token: string) {
  return jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
  const payload = { userId, exp: Math.floor(expiresAt.getTime() / 1000) };
  const token = await encrypt(payload);
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
