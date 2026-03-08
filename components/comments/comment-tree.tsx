import type { RedditComment } from "@/lib/types";
import { CommentNode } from "./comment-node";

interface CommentTreeProps {
  comments: RedditComment[];
}

export function CommentTree({ comments }: CommentTreeProps) {
  return (
    <section className="">
      <div className="">
        {comments.map((comment) => (
          <CommentNode key={comment.id} comment={comment} depth={0} />
        ))}
      </div>
    </section>
  );
}
