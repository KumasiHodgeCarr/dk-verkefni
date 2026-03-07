// The two Reddit posts this app is built around.
// Slug is used as the URL param in /post/[slug].
// Append ".json" to the URL to get Reddit's JSON API response.
export const REDDIT_POSTS = {
  "countries-bombed-since-1945": {
    url: "https://www.reddit.com/r/MapPorn/comments/whzefi/countries_that_have_been_bombed_by_the_united",
    label: "Since 1945",
    subreddit: "MapPorn",
    description: "Every country the United States has bombed since the end of WWII",
  },
  "us-attacks-21st-century": {
    url: "https://www.reddit.com/r/coolguides/comments/1rjr2j6/a_cool_guide_of_every_country_the_us_has_attacked",
    label: "21st Century",
    subreddit: "coolguides",
    description: "Every country the US has attacked in the 21st century, by president",
  },
} as const;

// Derive the slug type from the keys — used for type-safe routing
export type PostSlug = keyof typeof REDDIT_POSTS;

// Depth-based border colors for the recursive comment tree.
// Cycles every 4 levels: depth % 4 gives the index.
export const COMMENT_DEPTH_COLORS = [
  "border-blue-500",
  "border-purple-500",
  "border-green-500",
  "border-amber-500",
] as const;

// Reddit fetch config
export const REDDIT_USER_AGENT = "dk-verkefni:1.0";
export const REDDIT_CACHE_SECONDS = 300; // 5 minutes
