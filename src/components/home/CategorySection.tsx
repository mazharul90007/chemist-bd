"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Pill,
    Baby,
    HeartPulse,
    Dna,
    Activity,
    Sparkles
} from "lucide-react";
import Link from "next/link";

const categories = [
    { name: "Prescription", icon: Pill, color: "bg-blue-100 text-blue-600", count: "1,200+ Products" },
    { name: "Baby Care", icon: Baby, color: "bg-pink-100 text-pink-600", count: "450+ Products" },
    { name: "Personal Care", icon: Sparkles, color: "bg-purple-100 text-purple-600", count: "800+ Products" },
    { name: "Nutrition", icon: Activity, color: "bg-green-100 text-green-600", count: "320+ Products" },
    { name: "Devices", icon: HeartPulse, color: "bg-orange-100 text-orange-600", count: "150+ Products" },
    { name: "Wellness", icon: Dna, color: "bg-teal-100 text-teal-600", count: "210+ Products" },
];

const CategorySection = () => {
    return (
        <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                            Browse by <span className="text-emerald-600">Category</span>
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Find exactly what you need by browsing our wide range of healthcare categories.
                        </p>
                    </div>
                    <Button variant="ghost" className="text-emerald-600 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 font-bold">
                        View All Categories
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.name.toLowerCase()}`}
                            className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-950 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1 mb-2 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-200"
                        >
                            <div className={`p-4 rounded-2xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                                <category.icon size={28} />
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-center mb-1">{category.name}</h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500">{category.count}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
