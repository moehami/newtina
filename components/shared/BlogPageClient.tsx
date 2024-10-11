/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { extractBlurbAsTinaMarkdownContent } from "../../utils/extractBlurbAsTinaMarkdownContent";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const BlogCard = ({
  title,
  author,
  date,
  body,
  readLength,
  sswPeopleLink,
  blogPostLink,
}: {
  title: string;
  author: string;
  date: string;
  body: TinaMarkdownContent;
  readLength: string;
  sswPeopleLink: string;
  blogPostLink: string;
}) => {

  const blurb = extractBlurbAsTinaMarkdownContent(body, 3); // extract 3 sentences in blurb. this is arbitrary amt.


    console.log('blogPostLink is ' , blogPostLink)
  return (
    <div className="mx-40 p-6 rounded-2xl shadow-2xl bg-stone-700/30 mb-10 text-white border-opacity-15 border-2 border-slate-300">
      <h2 className="text-2xl font-bold mb-2 tracking-wider">{title}</h2>
      <div className="font-light text-sm">
        <span>
          by{" "}
          <Link target="_blank" href={sswPeopleLink} className="underline">
            {author}{" "}
          </Link>
        </span>
        <div>
          <span>{`${new Date(date).getDate()} ${new Date(date).toLocaleString(
            "default",
            { month: "long" }
          )} ${new Date(date).getFullYear()}`}</span>
          <span>{` | ${readLength}`}</span>
        </div>
        <div className="mt-4">
          <TinaMarkdown content={blurb} />
        </div>

        <Link href={`/blog/${blogPostLink}`} className="mt-4 flex items-center font-light">
        <span>READ MORE</span>
          <HiOutlineArrowNarrowRight className="ml-2 transform scale-x-150 scale-y-125" />
        </Link>
      </div>
    </div>
  );
};

interface BlogPageClientProps {
  query: any;
  data: any;
  product: string;
}

export default function BlogPageClient({
  query,
  data,
  product,
}: BlogPageClientProps) {
  const tinaData = useTina({
    query,
    variables: {
      product,
    },
    data,
  });

  console.log('data is, ', data);

  return (
    <div className="lg:pt-30 md:pt-10 mx-auto w-full">
      <h1 className="text-white mb-6 text-2xl font-bold mx-40">Blogs for {product}</h1>
      <div>
        {tinaData.data?.map((blog: any, index: number) => (
          <BlogCard
            key={index}
            title={blog.title}
            author={blog.author}
            date={blog.date}
            body={blog.body}
            readLength={blog.readLength}
            sswPeopleLink={blog.sswPeopleLink}
            blogPostLink={blog._sys.filename}
          />
        ))}
      </div>
    </div>
  );
}
