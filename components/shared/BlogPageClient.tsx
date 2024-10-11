/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

const BlogCard = ({ title, author, date, body }: { title: string; author: string; date: string, body: TinaMarkdownContent }) => {
    return (
      <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md mb-6 text-white">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex justify-between text-sm">
          <span>by {author}</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <TinaMarkdown content={body}></TinaMarkdown>
      </div>
    );
  };

interface BlogPageClientProps {
  query: any;
  data: any;
  product: string;
}

export default function BlogPageClient({ query, data, product }: BlogPageClientProps) {
  const tinaData = useTina({
    query,
    variables: {
      product,
    },
    data,
  });

  return (
    <div className="lg:pt-30 md:pt-10 mx-auto w-full">
      <h1 className="text-white mb-6">Blogs for {product}</h1>
      <div>
        {tinaData.data?.map((blog: any, index: number) => (
          <BlogCard key={index} title={blog.title} author={blog.author} date={blog.date} body={blog.body} />
        ))}
      </div>
    </div>
  );
}
