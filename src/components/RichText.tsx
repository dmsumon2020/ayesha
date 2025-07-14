// src/components/RichText.tsx

import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

export default function RichText({ value }: { value: PortableTextBlock[] }) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }) => {
        const imageUrl = value?.asset?.url;
        if (!imageUrl) return null;
        return (
          <Image
            src={imageUrl}
            alt={value.alt || "Image"}
            width={800}
            height={500}
            className="rounded-md my-4"
          />
        );
      },
    },
    marks: {
      link: ({ children, value }) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      ),
    },
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>
      ),
      normal: ({ children }) => <p className="mb-4">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{children}</li>,
    },
  };

  return <PortableText value={value} components={components} />;
}
