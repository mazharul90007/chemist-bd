"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Fresh Vitamin",
      subtitle: "Supplement for life",
      price: "1500 Tk",
      oldPrice: "1750 Tk",
      productImage: "/assets/images/hero1/multi_vitamin.png",
      bg: "bg-[#f5eadc] dark:bg-zinc-900/50",
      items: [
        { src: "/assets/images/hero1/tomato.png", pos: "top-10 left-10", size: 120 },
        { src: "/assets/images/hero1/lemon.png", pos: "bottom-10 right-20", size: 100 },
        { src: "/assets/images/hero1/cabbage.png", pos: "top-20 right-10", size: 150 },
      ]
    },
    // Adding a second slide for demo purposes (reusing same assets for now)
    {
      title: "Banana Scrub",
      subtitle: "Natural Skin Care",
      price: "1200 Tk",
      oldPrice: "1500 Tk",
      productImage: "/assets/images/hero2/banana_scrub.png",
      bg: "bg-[#fdfde7] dark:bg-zinc-900/50",
      items: [
        { src: "/assets/images/hero2/banana.png", pos: "top-20 left-20", size: 110 },
        { src: "/assets/images/hero2/aloevera.png", pos: "bottom-20 right-10", size: 130 },
      ]
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className={cn("relative h-[500px] lg:h-[600px] overflow-hidden transition-colors duration-700", slide.bg)}>

      {/* Decorative Items */}
      {slide.items.map((item, idx) => (
        <div key={idx} className={cn("absolute z-0 pointer-events-none transition-all duration-1000", item.pos)}>
          <Image
            src={item.src}
            alt="decorative"
            width={item.size}
            height={item.size}
            className="opacity-80 animate-pulse"
          />
        </div>
      ))}

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center h-full py-20">

          {/* Left: Product Image */}
          <div className="relative flex-1 flex justify-center items-center animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="relative">
              <Image
                src={slide.productImage}
                alt={slide.title}
                width={250}
                height={350}
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
                priority
              />

              {/* Price Badge */}
              <div className="absolute top-0 -left-10 w-24 h-24 bg-[#e85a4f] rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                <span className="text-xs line-through opacity-70">{slide.oldPrice}</span>
                <span className="text-xl font-black">{slide.price}</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 mt-10 lg:mt-0 animate-in fade-in slide-in-from-right-10 duration-1000">
            <div className="text-center">
              <h3 className="italic text-zinc-500 text-xl md:text-2xl mb-4 font-serif">{slide.subtitle}</h3>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-zinc-800 dark:text-zinc-100 mb-10 transition-colors">
                {slide.title.split(' ')[0]} <br />
                <span className="text-zinc-900 dark:text-emerald-500">{slide.title.split(' ')[1]}</span>
              </h1>
              <Link href="/medicines">
                <Button
                  className="bg-white dark:bg-emerald-600 hover:bg-zinc-100 dark:hover:bg-emerald-700 text-zinc-900 dark:text-white px-12 h-16 rounded-none font-bold text-sm uppercase tracking-[0.2em] shadow-lg transition-all"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 dark:bg-white/5 hover:bg-white/50 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer z-20 group"
      >
        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-10 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 dark:bg-white/5 hover:bg-white/50 flex items-center justify-center text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer z-20 group"
      >
        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              currentSlide === idx ? "bg-zinc-800 dark:bg-emerald-500 w-8" : "bg-zinc-400 dark:bg-zinc-600"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
