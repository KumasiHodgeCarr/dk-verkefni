"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, MessageSquare, Clock } from "lucide-react";
import type { RedditPost } from "@/lib/types";
import type { PostSlug } from "@/lib/constants";
import { formatScore, formatRelativeTime } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";

interface PostCardProps {
  post: RedditPost;
  slug: PostSlug;
  index: number;
}

export function PostCard({ post, slug, index }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link href={`/post/${slug}`} className="group block h-full">
        {" "}
        {/* ← Makes link full height */}
        <Card className="overflow-hidden border-border bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-lg h-full flex flex-col">
          {" "}
          {/* ← Card full height + flex column */}
          {/* Image */}
          {post.previewUrl && (
            <div className="relative w-full aspect-video overflow-hidden bg-muted shrink-0">
              {" "}
              {/* ← Add aspect-video and flex-shrink-0 */}
              <Image
                src={post.previewUrl}
                alt={post.title}
                fill
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          )}
          <CardContent className="space-y-3 p-4 md:p-5">
            {/* Subreddit tag */}
            <span className="inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              {post.subreddit}
            </span>

            {/* Title */}
            <h2 className="line-clamp-2 text-balance text-base font-semibold leading-snug text-card-foreground transition-colors group-hover:text-foreground md:text-lg">
              {post.title}
            </h2>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground md:gap-4 md:text-sm">
              <span className="flex items-center gap-1.5">
                <ArrowUp className="size-3.5 md:size-4" />
                <span>{formatScore(post.score)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="size-3.5 md:size-4" />
                <span>{post.numComments}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 md:size-4" />
                <span>{formatRelativeTime(post.createdUtc)}</span>
              </span>
              <span className="text-primary group-hover:underline">View →</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
