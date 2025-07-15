import { Post } from "@/types/postType";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white overflow-hidden flex flex-col text-center">
      <div className="post-thumb">
        {post.coverImage && (
          <Link href={`/posts/${post.slug.current}`}>
            <Image
              src={urlFor(post.coverImage)
                .width(800)
                .height(500)
                .fit("crop")
                .auto("format")
                .url()}
              alt={post.title}
              width={800}
              height={500}
              className="w-full aspect-[16/10] object-cover"
              placeholder="blur"
              blurDataURL={post.coverImage?.asset?.metadata?.lqip}
            />
          </Link>
        )}
      </div>

      <div className="pt-8 pb-14 flex flex-col flex-grow">
        <div className="text-sm text-theme-ascent">
          <span className="text-in text-post-meta italic">In</span>
          <span className="meta-sep inline-block px-1"></span>
          {post.category?.title}
        </div>

        <Link href={`/posts/${post.slug.current}`}>
          <h2 className="text-2xl font-normal text-deep-black my-5 transition-all duration-250 ease-in-out hover:opacity-50">
            {post.title}
          </h2>
        </Link>

        <div className="text-sm mb-8">
          <span className="text-post-meta">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="meta-sep inline-block px-1 align-middle">·</span>

          <span> {post.author?.name}</span>
        </div>

        <p className="mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="mt-auto flex justify-center">
          <Link
            href={`/posts/${post.slug.current}`}
            className="text-sm text-[#777] border border-solid border-neutral-200 p-[11px] transition-all duration-250 ease-in-out hover:bg-deep-black hover:text-white"
          >
            Continue reading →
          </Link>
        </div>
      </div>
    </article>
  );
}
