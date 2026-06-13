export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string>= {
    "Applied": "bg-blue-100 text-blue-800",
    "Interviewing": "bg-yellow-100 text-yellow-800",
    "Offer": "bg-green-100 text-green-800",
    "Accepted": "bg-green-100 text-green-800",
    "Rejected": "bg-red-100 text-red-800",
    "Declined": "bg-gray-100 text-gray-800",
    "Withdrawn": "bg-purple-100 text-purple-800",
    "New": "bg-gray-100 text-gray-800",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>
  )
}
