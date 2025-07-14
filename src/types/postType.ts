// src/types/postType.ts

import { PortableTextBlock } from "next-sanity";

export interface ImageAsset {
  asset: {
    url: string;
  };
  alt?: string;
}

export interface Author {
  name: string;
  image?: ImageAsset;
  bio?: string;
}

export interface Category {
  title: string;
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  isFeatured?: boolean;
  author?: Author;
  category?: Category;
  coverImage?: ImageAsset;
  body?: PortableTextBlock[];
}
