import { getAllPosts } from "@/lib/sanity/queries/postQueries";
import { Post } from "@/types/postType";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const posts: Post[] = await getAllPosts({ next: { revalidate: 30 } });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-md shadow-md overflow-hidden flex flex-col"
          >
            {post.coverImage?.asset?.url && (
              <Image
                src={post.coverImage.asset.url}
                alt={post.title}
                width={800}
                height={500}
                className="w-full aspect-[16/10] object-cover"
              />
            )}

            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm text-gray-500 mb-1">
                {post.category?.title}
              </div>

              <Link href={`/posts/${post.slug.current}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>

              <div className="text-sm text-gray-500 mt-1 mb-2">
                {new Date(post.publishedAt).toLocaleDateString()} |{" "}
                {post.author?.name}
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>

              <Link
                href={`/posts/${post.slug.current}`}
                className="mt-auto inline-block text-sm text-blue-500 hover:underline"
              >
                Continue reading →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
