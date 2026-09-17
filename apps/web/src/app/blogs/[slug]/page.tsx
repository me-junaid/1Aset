import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogs, getBlogBySlug } from "@/lib/api";
import BlogDetailClient from "./blog-detail-client";

// Build pre-rendered static HTML for existing blogs at build time
export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((post) => ({ slug: post.slug }));
}

// Generate SEO Metadata dynamically based on database/CMS record
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found | 1ASET",
      description: "The requested investment article could not be found.",
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | 1ASET Insights`;
  const description = post.seo?.metaDescription || post.excerpt;
  const keywords = post.seo?.keywords || post.tags;
  const ogImage = post.seo?.ogImage || post.coverImage;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: ogImage ? [{ url: ogImage, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related published posts
  const allBlogs = await getBlogs();
  const relatedPosts = allBlogs
    .filter((b) => b.slug !== post.slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "1ASET",
      logo: {
        "@type": "ImageObject",
        url: "https://1aset.com/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
