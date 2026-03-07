import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS } from "@/lib/constants";

export default async function HomePage() {
  // Fetch all posts in parallel step by step promise.all run at same time
  const [thread1, thread2] = await Promise.all([
    fetchRedditPost(REDDIT_POSTS["countries-bombed-since-1945"].url),
    fetchRedditPost(REDDIT_POSTS["us-attacks-21st-century"].url),
  ]);

  const posts = [
    { thread: thread1, slug: "countries-bombed-since-1945" },
    { thread: thread2, slug: "us-attacks-21st-century" },
  ];

  return (
    <main>
      <h1 className="">Conflict Lens</h1>

      <div>
        {posts.map(({ thread, slug }) => (
          <div key={slug} className="">
            <p>{thread.post.subreddit}</p>
            <h2> {thread.post.title}</h2>
            <p>
              {thread.post.score} ~ {thread.post.numComments} Comments
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
