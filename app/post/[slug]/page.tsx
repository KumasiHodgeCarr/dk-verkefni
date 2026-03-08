import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS, type PostSlug } from "@/lib/constants";
import { PostStats } from "@/components/posts/post-stats";
import { CommentTree } from "@/components/comments/comment-tree";
interface Props {
  params: Promise<{ slug: string }>; // Next.js 15: params is a Promise
}

// async wait for response
export default async function PostPage({ params }: Props) {
  const { slug } = await params; //hold up wait for response

  if (!(slug in REDDIT_POSTS)) notFound(); // unknown slug 404

  const postSlug = slug as PostSlug;
  const { post, comments } = await fetchRedditPost(REDDIT_POSTS[postSlug].url);

  return (
    <main>
      <div className="flex items-center gap-3 ">
        <Link
          href="/"
          className="flex border m-2 p-2 items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <span className=" text-muted-foreground">/</span>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
          r/{post.subreddit}
        </span>
      </div>

      <h1 className="mx-2 text-2xl font-bold leading-snug mb-1">
        {post.title}
      </h1>
      <p className="mx-2 text-sm text-muted-foreground mb-2">
        posted by
        <span className="text-foreground mx-1">{post.author}</span>
      </p>

      <PostStats post={post} />

      {post.previewUrl && (
        <Image
          src={post.previewUrl}
          alt={post.title}
          width={896}
          height={504}
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <CommentTree comments={comments} />
    </main>
  );
}
