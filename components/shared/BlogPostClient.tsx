/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"; // Assuming TinaMarkdown is used for rendering markdown content

interface BlogPostClientProps {
  title: string;
  author: string;
  date: string;
  body: TinaMarkdownContent;
  sswPeopleLink?: string;
  readLength: string;
  filename: string;
}

const BreadCrumbs = ({ title }: { title: string }) => {
    return (
      <div className="font-light mb-4 inline-flex items-center">
        <Link href="/blog">BLOG</Link> 
        <span className="mx-2">
          <MdOutlineKeyboardArrowRight size={20} />
        </span>
        <span>{title.toUpperCase()}</span>
      </div>
    );
  };
export default function BlogPostClient({
  title,
  author,
  date,
  body,
  sswPeopleLink,
  readLength,
  
}: BlogPostClientProps) {
  return (
    <>
      <div className="p-4 max-w-3xl mx-auto text-white">
        <BreadCrumbs title={title} />
        <h2 className="text-3xl font-bold mb-2 tracking-wide">{title}</h2>

        <div className="text-sm mb-4">
          <span>
            by{" "}
            {sswPeopleLink ? (
              <Link target="_blank" href={sswPeopleLink} className="underline">
                {author}
              </Link>
            ) : (
              <span>{author}</span>
            )}
          </span>

          <div>
            <span>{`${new Date(date).getDate()} ${new Date(date).toLocaleString(
              "default",
              { month: "long" }
            )} ${new Date(date).getFullYear()}`}</span>
            <span>{` | ${readLength}`}</span>
          </div>
        </div>

        <div className="prose lg:prose-xl">
          <TinaMarkdown content={body} />
        </div>
      </div>
    </>
  );
}
