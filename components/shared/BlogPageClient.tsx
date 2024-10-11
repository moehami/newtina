/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTina } from 'tinacms/dist/react';

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

  console.log(data);

  return (
    <div className="lg:pt-30 md:pt-10 mx-auto w-full">
      <h1 className="text-white">Blogs for {product}</h1>
      <ul>
        {tinaData.data?.map((blog: any, index: number) => (
          <li key={index} className="text-white">
            {blog._sys.filename}
          </li>
        ))}
      </ul>
    </div>
  );
}
