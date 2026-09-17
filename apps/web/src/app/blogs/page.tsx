import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getBlogs } from "@/lib/api";
import { BlogsExplorerClient } from "./blogs-explorer-client";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] font-sans antialiased text-slate-900 selection:bg-[#0b4eb7] selection:text-white">
      <Navbar />
      <BlogsExplorerClient initialBlogs={blogs} />
      <Footer />
    </div>
  );
}
