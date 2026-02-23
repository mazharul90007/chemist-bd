"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-8 lg:pt-12 bg-white dark:bg-zinc-950">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-150 h-150 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-100 h-100 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Trusted by 10,000+ Customers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight mb-6">
              Your Health,{" "}
              <span className="text-emerald-600">Our Priority.</span> Delivered
              Fast.
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Order medicines, health supplements, and healthcare products from
              the comfort of your home. Genuine products from licensed
              pharmacies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href={"/medicines"}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl px-8 h-14 text-base font-semibold shadow-lg shadow-emerald-500/20 transition-all group cursor-pointer"
                >
                  Shop Medicines
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </Link>
              <Link href={"/blog"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-2xl px-8 h-14 text-base border-zinc-200 dark:border-zinc-800 font-semibold transition-all cursor-pointer"
                >
                  Get Health Advice
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-zinc-900 text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  100% Genuine
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-zinc-900 text-emerald-600">
                  <Clock size={20} />
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-zinc-900 text-emerald-600">
                  <Zap size={20} />
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Flash Discounts
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative z-10 w-full aspect-square md:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={"/assets/images/heroImg.jpg"}
                alt="Healthcare Products"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
