import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { POSTS, isInternal, type InternalPost, type Block } from "@/lib/writing";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <a
        key={match.index}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 decoration-border transition hover:decoration-foreground"
      >
        {match[1]}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = POSTS.filter(isInternal).find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found — Tony Kwok" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData as { post: InternalPost };
    const title = `${post.title} — Tony Kwok`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  errorComponent: PostError,
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card text-xs font-semibold">
              TK
            </span>
            <span className="text-foreground/90">Tony Kwok</span>
          </Link>
          <Link
            to="/"
            hash="writing"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to writing
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">{children}</main>
    </div>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData() as { post: InternalPost };
  return (
    <Shell>
      <article>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {post.date}
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          {post.body.map((block: Block, i: number) =>
            typeof block === "string" ? (
              <p key={i}>{renderInline(block)}</p>
            ) : (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-muted-foreground">
                {block.list.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            ),
          )}
        </div>
      </article>
    </Shell>
  );
}

function PostNotFound() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold tracking-tight">Post not found</h1>
      <p className="mt-3 text-muted-foreground">
        This post doesn't exist or has moved.
      </p>
    </Shell>
  );
}

function PostError() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">Please try again later.</p>
    </Shell>
  );
}
