// lib/sanity/queries/postQueries.ts
import { client } from "../client"; // Adjust if your file structure is different
import type { Post } from "@/types/postType";

export async function getAllPosts(options = {}): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    isFeatured,
    coverImage {
      asset-> {
        url,
        metadata { lqip }
      }
    },
    category->{
      title,
      description
    },
    author->{
      name,
      image {
        asset-> {
          url,
          metadata { lqip }
        }
      },
      bio
    }
  }`;

  return await client.fetch<Post[]>(query, {}, options);
}

export const getPostBySlug = async (
  slug: string,
  options = {}
): Promise<Post | null> => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    publishedAt,
    body,
    coverImage {
      asset-> {
        url,
        metadata { lqip }
      }
    },
    author->{
      name,
      image {
        asset-> {
          url,
          metadata { lqip }
        }
      }
    },
    category->{ title }
  }`;

  return await client.fetch<Post | null>(query, { slug }, options);
};
