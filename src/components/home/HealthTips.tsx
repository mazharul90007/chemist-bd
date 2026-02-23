"use client";

import React, { useEffect, useState } from "react";
import { MoveRight, Heart, Brain, Wind, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "@/types/blog.type";
import LinkableButton from "@/app/shared/LinkableButton";

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

const HealthTips = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  if (isLoading) {
    return (
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-4" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-16" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-[2rem]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tighter">
            Healthcare <span className="text-emerald-600">Knowledge Hub</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            Stay informed with the latest health tips and medical news from our
            experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {blogs.map((blog) => {
            const Icon = categoryIcons[blog.category || "Default"] || Activity;
            const colorClass =
              categoryColors[blog.category || "Default"] || "text-emerald-500";

            return (
              <Link
                href={`/blogs/${blog.id}`}
                key={blog.id}
                className="group block"
              >
                <div className="relative h-72 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-zinc-200/50 transition-all duration-500 group-hover:-translate-y-2">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  <div className="absolute top-6 left-6 bg-white/95 dark:bg-zinc-900/95 backdrop-blur shadow-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20">
                    <Icon size={16} className={colorClass} />
                    <span className="text-[10px] font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
                      {blog.category || "General"}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-emerald-600 transition-colors leading-tight tracking-tight">
                  {blog.title}
                </h3>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                  Detailed Article <MoveRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="flex items-end justify-end mt-12">
          <LinkableButton title="View All Articles" link="blogs" />
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
