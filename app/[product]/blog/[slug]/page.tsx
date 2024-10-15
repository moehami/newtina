import { notFound } from "next/navigation";
import InteractiveBackground from "../../../../components/shared/Background/InteractiveBackground";
import NavBarServer from "../../../../components/shared/NavBarServer";
import FooterServer from "../../../../components/shared/FooterServer";
import client from "../../../../tina/__generated__/client";
import BlogPostClient from "../../../../components/shared/BlogPostClient"; // Import the client component

interface BlogPostProps {
  params: {
    slug: string;
    product: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug, product } = params;

  const data = await getBlogPost(product, slug);
  if (!data) {
    return notFound();
  }

  

  return (
    <div className="flex flex-col min-h-screen">
      <InteractiveBackground />
      <NavBarServer product={product} />

      <div className="flex-grow">
        <BlogPostClient
          title={data.title}
          author={data.author || ""}
          date={data.date || ""}
          body={data.body}
          sswPeopleLink={data.sswPeopleLink || ""}
          readLength={data.readLength || ""}
          filename={data._sys.filename || ""}
        />
      </div>

      <FooterServer product={product} />
    </div>
  );
}

async function getBlogPost(product: string, slug: string) {
  try {
    const res = await client.queries.blogs({
      relativePath: `${product}/${slug}.mdx`,
    });

    const blog = res.data?.blogs;

    if (!blog) {
      return null;
    }

    return blog;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
