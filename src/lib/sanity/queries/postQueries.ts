import { client } from "../client"; // Update path if needed

export async function getAllPosts(options = {}) {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->name,
    "category": category->title,
    coverImage {
      asset->{
        url
      }
    }
  }`;

  return await client.fetch(query, {}, options);
}
export const getPostBySlug = async (slug: string, options = {}) => {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      publishedAt,
      body,
      coverImage {
        asset-> {
          url
        }
      },
      author->{
        name,
        image {
          asset-> {
            url
          }
        }
      },
      category->{ title }
    }`,
    { slug },
    options
  );
};
