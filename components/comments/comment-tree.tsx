import type { RedditComment } from "@/lib/types";
import { CommentNode } from "./comment-node";

interface CommentTreeProps {
  comments: RedditComment[];
}

export function CommentTree({ comments }: CommentTreeProps) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-4">{comments.length} Comments</h2>
      <div className="space-y-1">
        {comments.map((comment) => (
          <CommentNode key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    </section>
  );
}
