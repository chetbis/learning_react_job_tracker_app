export const getCompanyGradient = (name: string): string => {
  const gradients = [
    "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700",
    "from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700",
    "from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700",
    "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700",
    "from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700",
    "from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700",
    "from-violet-500 to-fuchsia-600 dark:from-violet-600 dark:to-fuchsia-700",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
};

export const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
};
