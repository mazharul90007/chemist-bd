"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  MoveLeft,
  Calendar,
  User,
  Share2,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IBlog } from "@/types/blog.type";
import Link from "next/link";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const response = await fetch("/assets/json/dummy-blog.json");
        const data: IBlog[] = await response.json();
        const foundBlog = data.find((b) => b.id === id);
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-4">
          Article Not Found
        </h1>
        <Button
          onClick={() => router.push("/")}
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest"
        >
          Back to Knowledge Hub
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white dark:from-zinc-950 via-black/20 to-transparent" />

        <div className="absolute top-8 left-8">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-none shadow-2xl flex items-center justify-center hover:bg-white transition-all hover:scale-110"
          >
            <MoveLeft size={24} className="text-emerald-600" />
          </Button>
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Article Header Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 mb-12">
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
                {blog.category || "Healthcare"}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <Calendar size={14} className="text-emerald-600" />
                {blog.date || "Feb 23, 2026"}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                <User size={14} className="text-emerald-600" />
                By ChemistBD Experts
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-zinc-50 mb-8 leading-[1.1] tracking-tighter">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4 pt-8 border-t border-zinc-50 dark:border-zinc-800/50">
              <Button
                variant="ghost"
                className="h-12 w-12 rounded-xl text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Bookmark size={20} />
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-12 rounded-xl text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Share2 size={20} />
              </Button>
            </div>
          </div>

          {/* Article Full Details */}
          <div className="prose prose-zinc prose-invert max-w-none px-4 md:px-0">
            <div className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-[1.8] font-medium whitespace-pre-line space-y-6">
              {/* Splitting text by double new lines for better structure if needed */}
              {blog.details}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
            <Link href={"/blogs"}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 h-14 text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all group cursor-pointer"
              >
                More Articles
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
