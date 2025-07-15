import { getAllPosts, getPostBySlug } from "@/lib/sanity/queries/postQueries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Post } from "@/types/postType";
import RichText from "@/components/RichText";

export async function generateStaticParams() {
  const posts: Post[] = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug.current }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post: Post | null = await getPostBySlug(slug, {
    next: { revalidate: 30 }, // or any number of seconds
  });

  if (!post) return notFound();

  return (
    <article className="p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        {new Date(post.publishedAt).toLocaleDateString()} | {post.author?.name}{" "}
        | {post.category?.title}
      </p>

      {post.coverImage?.asset?.url && (
        <Image
          src={post.coverImage.asset.url}
          alt={post.title}
          width={800}
          height={500}
          placeholder="blur"
          blurDataURL={post.coverImage?.asset.metadata?.lqip}
          className="rounded-lg mb-6"
        />
      )}

      {post.body && (
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <RichText value={post.body} />
        </div>
      )}
    </article>
  );
}
