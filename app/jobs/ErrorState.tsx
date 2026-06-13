"use client";

export default function ErrorState({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 rounded-xl text-center">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl text-red-600 dark:text-red-400" role="img" aria-label="Error">
          ⚠️
        </span>
      </div>
      <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">
        Failed to load applications
      </h3>
      <p className="text-red-700 dark:text-red-500/80 max-w-md">
        {error}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 text-sm font-medium text-red-700 dark:text-red-400 hover:underline"
      >
        Try refreshing the page
      </button>
    </div>
  );
}
