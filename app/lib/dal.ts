import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "./routes";
import { decrypt } from "./session";

async function _verifySession() {
  const cookie = await cookies();

  const session = cookie.get("session");

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  try {
    const result = await decrypt(session.value);
    console.log("Session is valid. User ID:", result.payload.userId);
    return { isAuth: true, userId: result.payload.userId };
  } catch {
    redirect(ROUTES.LOGIN);
  }
}

export const verifySession = cache(_verifySession);
