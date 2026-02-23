"use client";

import React, { useEffect, useState } from "react";
import { MoveRight, Heart, Brain, Wind, Activity, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "@/types/blog.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryIcons: Record<string, any> = {
  Cardio: Heart,
  "Mental Health": Brain,
  Lifestyle: Wind,
  Default: Activity,
};

const categoryColors: Record<string, string> = {
  Cardio: "text-red-500",
  "Mental Health": "text-purple-500",
  Lifestyle: "text-blue-500",
  Default: "text-emerald-500",
};

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/assets/json/dummy-blog.json");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-112.5 bg-zinc-200 dark:bg-zinc-800 rounded-[2.5rem]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-12 pb-24">
      <div className="container mx-auto px-4">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tighter">
              The <span className="text-emerald-600">Knowledge</span> Hub
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
              Explore our comprehensive collection of healthcare articles,
              wellness tips, and medical insights from top professionals.
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-600 transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-14 w-full pl-12 pr-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:border-emerald-500 transition-all font-bold text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredBlogs.map((blog) => {
              const Icon =
                categoryIcons[blog.category || "Default"] || Activity;
              const colorClass =
                categoryColors[blog.category || "Default"] ||
                "text-emerald-500";

              return (
                <Link
                  href={`/blogs/${blog.id}`}
                  key={blog.id}
                  className="group block"
                >
                  <div className="relative h-80 rounded-[3rem] overflow-hidden mb-8 shadow-2xl shadow-zinc-200/50 dark:shadow-none transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-emerald-200/20">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <div className="absolute top-6 left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20">
                      <Icon size={16} className={colorClass} />
                      <span className="text-[10px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
                        {blog.category || "General"}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-emerald-600 transition-colors leading-tight tracking-tight">
                    {blog.title}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 font-medium mb-6 leading-relaxed">
                    {blog.details}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                    Full Reading <MoveRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="min-h-100 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] flex items-center justify-center mb-8">
              <Search size={40} className="text-zinc-300" />
            </div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
              No Articles Found
            </h3>
            <p className="text-zinc-500 font-medium">
              Try adjusting your search terms to find what you are looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
