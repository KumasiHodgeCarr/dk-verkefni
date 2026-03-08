/* ```
CommentNode({ comment, depth })
  → renders comment (author, body, score, time)
  → if comment.replies.length > 0:
      → map over replies
      → render <CommentNode> for each, with depth + 1
```; */

"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, ChevronDown, ChevronRight } from "lucide-react";
import type { RedditComment } from "@/lib/types";
import { COMMENT_DEPTH_COLORS } from "@/lib/constants";
import { formatScore, formatRelativeTime } from "@/lib/format";

interface CommentNodeProps {
  comment: RedditComment;
  depth: number;
}

export function CommentNode({ comment, depth }: CommentNodeProps) {
  const [collapsed, setCollapsed] = useState(true);
  const borderColor = COMMENT_DEPTH_COLORS[depth % 4];

  return (
    <div
      className={`border-l-2 ${borderColor} pl-3 my-2`}
      style={{ marginLeft: depth * 12 }}
    >
      {/* Header row click to collapse */}

      <div
        className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
        <span className="font-semibold text-foreground">{comment.author}</span>
        {comment.isSubmitter && (
          <span className="text-blue-400 font-bold">OP</span>
        )}
        <span className="flex items-center gap-1">
          <ArrowUp size={10} /> {formatScore(comment.score)}
        </span>
        <span>{formatRelativeTime(comment.createdUtc)}</span>
      </div>

      {/* body and replies hidden on collape */}
      {!collapsed && (
        <>
          <div className="prose prose-sm prose-invert mt-1 text-sm text-slate-300">
            {/* Reddit comments have bold, italics, [links] so */}
            <ReactMarkdown>{comment.body}</ReactMarkdown>
          </div>

          {/* Recursive Russian nesting doll :)))*/}
          {comment.replies.map((reply) => (
            <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}
