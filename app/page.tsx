import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS } from "@/lib/constants";

export default async function HomePage() {
  // Fetch all posts in parallel step by step promise.all run at same time
  const [thread1, thread2] = await Promise.all([
    fetchRedditPost(REDDIT_POSTS["countries-bombed-since-1945"].url),
    fetchRedditPost(REDDIT_POSTS["us-attacks-21st-century"].url),
  ]);
}
