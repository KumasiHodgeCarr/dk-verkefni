// "use server";

import type { RedditPost } from "@/lib/types";
import {
  formatScore,
  formatRelativeTime,
  formatUpvoteRatio,
} from "@/lib/format";
interface PostStatsProps {
  post: RedditPost;
}

export function PostStats({ post }: PostStatsProps) {
  const stats = [
    { label: "Score", value: formatScore(post.score) },
    { label: "Upvoted", value: formatUpvoteRatio(post.upvoteRatio) },
    { label: "Comments", value: post.numComments.toLocaleString() },
    { label: "Posted", value: formatRelativeTime(post.createdUtc) },
  ];

  return (
    <div className=" m-2 py-4 w-full">
      <div className="grid grid-cols-4 gap-3 justify-items-center ">
        {stats.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-foreground">{label}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
