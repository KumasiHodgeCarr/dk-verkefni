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
    <main className=" space-y-2 px-4">
      {/* back */}
      <div className="flex items-center gap-3 ">
        <Link
          href="/"
          className="flex border p-1 items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <span className=" text-muted-foreground">/</span>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
          r/{post.subreddit}
        </span>
      </div>
      {/* Title + author */}
      <h1 className="text-2xl font-bold leading-snug mb-1">{post.title}</h1>
      <p className="text-sm text-muted-foreground ">
        posted by <span className="text-foreground">{post.author}</span>
      </p>

      {/* Stats */}
      <PostStats post={post} />

      {/* Image + comments side by side */}
      <div className="flex flex-col gap-6 items-start ">
        {/* Full width image, fixed height */}
        {post.previewUrl && (
          <div className="relative w-full aspect-video mt-4 rounded-xl overflow-hidden">
            <Image
              src={post.previewUrl}
              alt={post.title}
              fill
              style={{ objectFit: "contain", objectPosition: "center" }}
            />
          </div>
        )}

        {/* Comments in 3 columns with different positions */}
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-4 text-center">
            {comments.length} Comments
          </h2>

          {/* Split comments into 3 parts */}
          {(() => {
            const third = Math.ceil(comments.length / 3);
            const firstCol = comments.slice(0, third);
            const secondCol = comments.slice(third, third * 2);
            const thirdCol = comments.slice(third * 2);

            return (
              <div className="grid grid-cols-3 gap-6">
                {/* Column 1 - Left aligned (START) */}
                <div className="justify-self-start">
                  <CommentTree comments={firstCol} />
                </div>

                {/* Column 2 - Center aligned */}
                <div className="justify-self-center">
                  <CommentTree comments={secondCol} />
                </div>

                {/* Column 3 - Right aligned (END) */}
                <div className="justify-self-end">
                  <CommentTree comments={thirdCol} />
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </main>
  );
}
