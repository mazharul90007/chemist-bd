"use client";

import React from "react";
import { ShoppingBag, Search, Filter, PieChart } from "lucide-react";

const SellerOrdersPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                    Sales <span className="text-emerald-600">Orders</span>
                </h1>
                <p className="text-zinc-500 font-medium">
                    Track orders placed for your medicine listings.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6">
                    <PieChart size={32} className="text-zinc-300" />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
                    Sales Analytics
                </h2>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto mb-8">
                    Your order history and sales performance charts will appear here as soon as you start receiving orders.
                </p>
            </div>
        </div>
    );
};

export default SellerOrdersPage;
