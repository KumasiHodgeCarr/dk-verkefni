"use client";

// fetching data use client

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, MessageSquare, Clock } from "lucide-react";
import type { RedditPost } from "@/lib/types";
import type { PostSlug } from "@/lib/constants";

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
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/post/${slug}`}>
        <div className="border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors ">
          {/* Image */}
          {post.previewUrl && (
            <div className="relative aspect-video bg-muted">
              <Image
                src={post.previewUrl}
                alt={post.title}
                width={600}
                height={340}
                className="object-cover"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          )}

          {/*  ? */}
          <div className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground">{post.subreddit}</p>
            <h2 className="font-semibold text-sma leading leading-snug group-hover:text-primary transition-colors line-clamp-3">
              {post.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ArrowUp size={12} /> {post.score}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={12} /> {post.numComments}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> u/{post.author}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
