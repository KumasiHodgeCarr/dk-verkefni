import type { RedditPost, RedditComment, RedditThread } from "./types";
import { REDDIT_USER_AGENT, REDDIT_CACHE_SECONDS } from "./constants";

// Main entry point — fetches a Reddit post + its comments server-side.
// Called from Server Components (no CORS issues, result is cached via Next.js fetch).
export async function fetchRedditPost(url: string): Promise<RedditThread> {
  const normalised = url.replace(/\/$/, "");
  const jsonUrl = normalised.endsWith(".json") ? normalised : `${normalised}.json`;

  const response = await fetch(jsonUrl, {
    headers: {
      "User-Agent": REDDIT_USER_AGENT,
      "Accept": "application/json, text/html,*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
    },
    next: { revalidate: REDDIT_CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Reddit fetch failed: ${response.status} for ${jsonUrl}`);
  }

  // Reddit returns an array: [0] = post listing, [1] = comments listing
  const [postListing, commentsListing] = await response.json();

  const post = transformPost(postListing.data.children[0].data);
  const comments = transformComments(commentsListing.data.children);

  return { post, comments };
}

// Transforms raw Reddit post data into our clean RedditPost type
function transformPost(raw: Record<string, unknown>): RedditPost {
  // Reddit preview URLs have HTML entities — decode & to &
  const rawPreview = (raw.preview as { images?: { source?: { url?: string } }[] } | undefined)
    ?.images?.[0]?.source?.url;
  const previewUrl = rawPreview?.replace(/&amp;/g, "&");

  return {
    id: raw.id as string,
    title: raw.title as string,
    author: raw.author as string,
    score: raw.score as number,
    numComments: raw.num_comments as number,
    createdUtc: raw.created_utc as number,
    url: raw.url as string,
    previewUrl,
    upvoteRatio: raw.upvote_ratio as number,
    subreddit: raw.subreddit as string,
  };
}

// Recursively transforms Reddit comment children into our RedditComment type.
// Reddit's structure: each comment has a `replies` field that is either:
//   - "" (empty string) when there are no replies (leaf node)
//   - A full Listing object with its own `data.children` array
// We filter out `kind: "more"` stubs (placeholders for collapsed/extra comments).
function transformComments(children: Record<string, unknown>[]): RedditComment[] {
  return children
    .filter((child) => child.kind === "t1") // t1 = comment, skip "more" stubs
    .map((child) => {
      const c = child.data as Record<string, unknown>;

      // Recurse into replies if they exist
      const repliesListing = c.replies as { data?: { children?: Record<string, unknown>[] } } | "";
      const replies =
        repliesListing && repliesListing.data?.children
          ? transformComments(repliesListing.data.children)
          : [];

      return {
        id: c.id as string,
        author: c.author as string,
        body: c.body as string,
        score: c.score as number,
        createdUtc: c.created_utc as number,
        depth: c.depth as number,
        isSubmitter: c.is_submitter as boolean,
        replies,
      };
    });
}
