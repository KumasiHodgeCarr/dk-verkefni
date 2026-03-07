import { NextRequest, NextResponse } from "next/server";
import {
  REDDIT_POSTS,
  REDDIT_USER_AGENT,
  type PostSlug,
} from "@/lib/constants";

// Proxy route for client-side Reddit fetches — avoids CORS.
// Usage: GET /api/reddit/countries-bombed-since-1945
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  const postConfig = REDDIT_POSTS[postId as PostSlug];

  if (!postConfig) {
    return NextResponse.json({ error: "Unknown post" }, { status: 404 });
  }

  const response = await fetch(`${postConfig.url}.json`, {
    headers: { "User-Agent": REDDIT_USER_AGENT },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Reddit returned ${response.status}` },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
