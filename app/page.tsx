import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS, type PostSlug } from "@/lib/constants";
import { PostCard } from "@/components/posts/post-card";
import Link from "next/link";
import { CommentTree } from "@/components/comments/comment-tree";

export default async function HomePage() {
  // Define slugs with their correct types
  const slugs: PostSlug[] = [
    "countries-bombed-since-1945",
    "us-attacks-21st-century",
  ];

  // Fetch all posts in parallel
  const threads = await Promise.all(
    slugs.map((slug) => fetchRedditPost(REDDIT_POSTS[slug].url)),
  );

  // Zip slugs and threads together
  const posts = slugs.map((slug, index) => ({
    thread: threads[index],
    slug: slug, // Now TypeScript knows this is PostSlug!
  }));

  //  comments

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 ">Conflict Lens</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(({ thread, slug }, index) => (
          <PostCard key={slug} post={thread.post} slug={slug} index={index} />
        ))}
      </div>
      <div className="mt-8 ">
        <Link href="/innsyni">
          <div className="border border-border rounded-xl p-6 text bg-center">
            <p className="text-sm text-muted-foreground mb-1">
              Want deeper analysis?
            </p>{" "}
            <p></p>
            <p className="font-semibold">
              Compare both posts with AI Insights →
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}
