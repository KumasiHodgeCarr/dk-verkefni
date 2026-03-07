// Reddit post — fields mapped from snake_case API to camelCase
export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  numComments: number;
  createdUtc: number;   // Unix timestamp in seconds
  url: string;          // Direct image/content URL
  previewUrl?: string;  // Optional — not all posts have valid thumbnails ?
  upvoteRatio: number;  // 0.0–1.0
  subreddit: string;
}

// Reddit comment — self-referential to support infinite nesting!
export interface RedditComment {
  id: string;
  author: string;
  body: string;         // Raw markdown text
  score: number;
  createdUtc: number;
  depth: number;        // 0 = top-level, increments per nesting level
  isSubmitter: boolean; // True if commenter is the post author (OP)
  replies: RedditComment[]; // Recursive — empty array at leaf nodes
}

// Combined fetch result returned by lib/reddit.ts
export interface RedditThread {
  post: RedditPost;
  comments: RedditComment[];
}
