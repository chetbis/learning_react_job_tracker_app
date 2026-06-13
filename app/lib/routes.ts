export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  JOBS: "/jobs",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
