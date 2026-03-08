import { fetchRedditPost } from "@/lib/reddit";
import { REDDIT_POSTS, type PostSlug } from "@/lib/constants";
import { PostCard } from "@/components/posts/post-card";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GiUsaFlag } from "react-icons/gi";

export default async function HomePage() {
  const slugs: PostSlug[] = [
    "countries-bombed-since-1945",
    "us-attacks-21st-century",
  ];

  const threads = await Promise.all(
    slugs.map((slug) => fetchRedditPost(REDDIT_POSTS[slug].url)),
  );

  const posts = slugs.map((slug, index) => ({
    thread: threads[index],
    slug: slug,
  }));

  return (
    <main className="space-y-8 md:space-y-10 px-4">
      {/* Hero Section */}
      {/* Hero Section with subtle background */}
      <section className="relative py-4 space-y-4 text-center md:space-y-6 m-0 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-background shadow-lg md:size-16">
          <GiUsaFlag className="size-7 md:size-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl bg-linear-to-r from-foreground to-foreground/70 bg-clip-text">
            Conflict Lens
          </h1>
          <p className="mx-auto max-w-md text-pretty text-muted-foreground md:text-lg">
            Exploring US military interventions through the lens of Reddit
            discussions and community insights.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="space-y-4">
        <div className="flex flex-col  items-start justify-between">
          <h2 className="text-lg font-semibold md:text-xl ">Featured Posts</h2>
          <span className="text-sm text-muted-foreground">
            {posts.length} discussions
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {posts.map(({ thread, slug }, index) => (
            <PostCard key={slug} post={thread.post} slug={slug} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Card */}
      <section>
        <Link href="/innsyni" className="group block">
          <Card className="overflow-hidden border-border bg-linear-to-br from-card to-accent/30 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center md:flex-row md:justify-between md:p-8 md:text-left">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                  <Sparkles className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Want deeper analysis?
                  </p>
                  <p className="text-base font-semibold md:text-lg">
                    Compare both posts with AI Insights
                  </p>
                </div>
              </div>
              <Button
                variant="default"
                className="gap-2 transition-all group-hover:bg-foreground group-hover:text-background"
              >
                Explore Insights
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Data sourced from Reddit. Built for educational purposes.
        </p>
      </footer>
    </main>
  );
}
