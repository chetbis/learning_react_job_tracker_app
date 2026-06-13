import Link from "next/link";
import { ROUTES } from "../lib/routes";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 border border-dashed border-gray-200 dark:border-zinc-700 rounded-xl text-center">
      <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl" role="img" aria-label="Briefcase">
          💼
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No job applications yet
      </h3>
      <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm">
        Start tracking your career journey by adding your first job application. We&apos;ll help you organize your progress.
      </p>
      <Link
        href={ROUTES.NEW_JOB}
        className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
      >
        Add your first job
      </Link>
    </div>
  );
}
