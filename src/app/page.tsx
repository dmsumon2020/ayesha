import { getAllPosts } from "@/lib/sanity/queries/postQueries";
import { Post } from "@/types/postType";
import PostCard from "@/components/PostCard";

export default async function HomePage() {
  const posts: Post[] = await getAllPosts({ next: { revalidate: 30 } });

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
