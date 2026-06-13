"use client";

import { useActionState, useState } from "react";
import { login } from "../lib/auth";
import Link from "next/link";
import { ROUTES } from "../lib/routes";

const inputBase =
  "w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-zinc-600";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, null);
  const [formVal, setFormVal] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-8">
        <div className="mb-6 text-center">
          <span className="text-3xl">&#128188;</span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Sign in to continue
          </p>
        </div>

        <form className="flex flex-col gap-4" action={action}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className={inputBase}
              value={formVal.email}
              onChange={(e) =>
                setFormVal({ ...formVal, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className={inputBase}
              value={formVal.password}
              onChange={(e) =>
                setFormVal({ ...formVal, password: e.target.value })
              }
            />
          </div>

          {state?.error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
              <span aria-hidden></span>
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
