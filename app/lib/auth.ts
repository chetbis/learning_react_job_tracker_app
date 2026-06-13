"use server";

import { z } from "zod";
import { prisma } from "./db";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { ROUTES } from "./routes";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {

    return {
      error: "Invalid email or password",
    };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      error: "Invalid email or password"
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordValid) {
    return {
      errors: "Invalid email or password",
    };
  }

  await createSession(user.id.toString());
  redirect(ROUTES.JOBS);
}

export async function logout() {
  await deleteSession();
  redirect(ROUTES.LOGIN);
}
