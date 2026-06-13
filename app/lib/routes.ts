export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  JOBS: "/jobs",
  NEW_JOB: "/jobs/new",
  VIEW_JOB: "/jobs/[id]",
  EDIT_JOB: "/jobs/[id]/edit"
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

export function getViewJobRoute(id: string | number) {
  return ROUTES.VIEW_JOB.replace("[id]", String(id));
}

export function getEditJobRoute(id: string | number) {
  return ROUTES.EDIT_JOB.replace("[id]", String(id));
}
