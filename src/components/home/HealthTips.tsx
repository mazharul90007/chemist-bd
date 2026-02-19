"use client";

import React from "react";
import { MoveRight, Heart, Brain, Wind } from "lucide-react";
import Image from "next/image";

const tips = [
    {
        title: "10 Tips for a Healthier Heart",
        category: "Cardio",
        icon: Heart,
        color: "text-red-500",
        image: "https://images.unsplash.com/photo-1505751172107-16060c41031c?q=80\u0026w=2070\u0026auto=format\u0026fit=crop"
    },
    {
        title: "Mental Wellness in Digital Age",
        category: "Mental Health",
        icon: Brain,
        color: "text-purple-500",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80\u0026w=1920\u0026auto=format\u0026fit=crop"
    },
    {
        title: "Better Sleep, Better Life",
        category: "Lifestyle",
        icon: Wind,
        color: "text-blue-500",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80\u0026w=2060\u0026auto=format\u0026fit=crop"
    }
];

const HealthTips = () => {
    return (
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                        Healthcare <span className="text-emerald-600">Knowledge Hub</span>
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        Stay informed with the latest health tips and medical news from our experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.map((tip) => (
                        <div key={tip.title} className="group cursor-pointer">
                            <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 shadow-lg">
                                <Image
                                    src={tip.image}
                                    alt={tip.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                                    <tip.icon size={14} className={tip.color} />
                                    <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tighter">{tip.category}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-emerald-600 transition-colors">
                                {tip.title}
                            </h3>
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm tracking-tight group-hover:gap-4 transition-all duration-300">
                                Read Article <MoveRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HealthTips;
