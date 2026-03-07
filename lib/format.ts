// Format a number compactly: 12400 → "12.4k", 890 → "890"
export function formatScore(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// Format a Unix timestamp (seconds) as relative time: "2d ago", "5h ago"
export function formatRelativeTime(utcSeconds: number): string {
  const diffMs = Date.now() - utcSeconds * 1000;
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}mo ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

// Format upvote ratio as percentage: 0.97 → "97%"
export function formatUpvoteRatio(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}
