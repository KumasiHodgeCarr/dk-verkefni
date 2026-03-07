import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS, type PostSlug } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>; // Next.js 15: params is a Promise
}

// async wait for response
export default async function PostPage({ params }: Props) {
  const { slug } = await params; //hold up wait for response

  if (!(slug in REDDIT_POSTS)) notFound(); // unknown slug 404

  const postSlug = slug as PostSlug;
  const { post } = await fetchRedditPost(REDDIT_POSTS[postSlug].url);

  return (
    <main>
      <Link href="/">Back</Link>
      <p>r/{post.subreddit}</p>
      <h1>{post.title}</h1>
      <p>u/ {post.author}</p>

      {post.previewUrl && (
        <Image
          src={post.previewUrl}
          alt={post.title}
          width={896}
          height={504}
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </main>
  );
}
