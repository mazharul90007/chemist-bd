"use client";

import React from "react";
import { Users, Search, UserPlus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminUsersPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
                        System <span className="text-emerald-600">Users</span>
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Monitor user activity and manage permissions.
                    </p>
                </div>
                <Button className="rounded-2xl h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 font-bold px-6 cursor-pointer">
                    <UserPlus size={18} className="mr-2" />
                    Invite Admin
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl flex items-center justify-center mb-6">
                    <Shield size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">
                    User Directory
                </h2>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto mb-8">
                    The user management interface will allow you to control access for customers, sellers, and sub-admins.
                </p>
            </div>
        </div>
    );
};

export default AdminUsersPage;
