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
        <div>
          {/* Image */}
          {post.previewUrl && (
            <div>
              <Image
                src={post.previewUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/*  ? */}
          <div>
            <p>{post.subreddit}</p>
            <h2>{post.title}</h2>
            <div>
              <span>
                <ArrowUp size={12} /> {post.score}
              </span>
              <span>
                <MessageSquare size={12} /> {post.numComments}
              </span>
              <span>
                <Clock size={12} /> u/{post.author}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
