"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, ChevronDown, ChevronRight } from "lucide-react";
import type { RedditComment } from "@/lib/types";
import { formatScore, formatRelativeTime } from "@/lib/format";

interface CommentNodeProps {
  comment: RedditComment;
  depth: number;
}

export function CommentNode({ comment, depth }: CommentNodeProps) {
  const [collapsed, setCollapsed] = useState(true);

  // Use your pre-defined comment classes for depth > 5
  const depthClass =
    depth <= 4
      ? `comment-${depth + 1}` // Uses your .comment-1, .comment-2, etc.
      : "comment-5"; // Max depth uses comment-5

  return (
    <div
      // Combine theme classes with conditional styling
      className={`${depthClass} my-2 hover:bg-muted/30 transition-colors rounded-r`}
      style={{ marginLeft: depth * 12 }}
    >
      {/* Header row - click to collapse */}
      <div
        className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground py-1"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="size-3 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-3 text-muted-foreground" />
        )}

        {/* Author with theme colors */}
        <span className="font-semibold text-foreground">{comment.author}</span>

        {/* OP badge using your primary color with opacity */}
        {comment.isSubmitter && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            OP
          </span>
        )}

        {/* Score with theme colors */}
        <span className="flex items-center gap-1 text-muted-foreground">
          <ArrowUp className="size-3 text-primary/70" />
          {formatScore(comment.score)}
        </span>

        {/* Time with theme colors */}
        <span className="text-muted-foreground/70">
          {formatRelativeTime(comment.createdUtc)}
        </span>
      </div>

      {/* Body and replies - hidden when collapsed */}
      {!collapsed && (
        <>
          {/* Comment body with theme-aware prose */}
          <div className="prose prose-sm prose-invert mt-2 text-foreground/90 max-w-none">
            <ReactMarkdown
              components={{
                // Style links with your primary color
                a: ({ ...props }) => (
                  <a className="text-primary hover:underline" {...props} />
                ),
                // Style blockquotes with your muted color
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-2 border-muted pl-3 italic text-muted-foreground"
                    {...props}
                  />
                ),
              }}
            >
              {comment.body}
            </ReactMarkdown>
          </div>

          {/* Recursive replies - using your depth classes */}
          {comment.replies.length > 0 && (
            <div className="mt-2 space-y-2">
              {comment.replies.map((reply) => (
                <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
