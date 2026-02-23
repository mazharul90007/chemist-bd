"use client";

import React from "react";
import {
    Users,
    Shield,
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    Mail,
    Calendar,
    Zap,
} from "lucide-react";
import { useUpdateUserStatus } from "@/hooks/useAdmin";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface UserListTableProps {
    users: any[];
}

const UserListTable = ({ users }: UserListTableProps) => {
    const { mutate: updateStatus, isPending } = useUpdateUserStatus();

    const handleStatusToggle = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
        updateStatus({ id, status: newStatus });
    };

    if (!users || users.length === 0) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6">
                    <Users size={32} className="text-zinc-300" />
                </div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-2">No Users Found</h3>
                <p className="text-zinc-500 font-medium max-w-xs mx-auto">
                    The system directory is currently empty.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-200/20">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-50 dark:border-zinc-800/50">
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">User Info</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Role</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Joined</th>
                            <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/20">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-zinc-700 group-hover:bg-emerald-500 transition-colors duration-500">
                                            <Users size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-none mb-1.5 uppercase">
                                                {user.name}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                                <Mail size={12} />
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase tracking-wider">
                                        {user.role}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className={cn(
                                        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all",
                                        user.status === "ACTIVE"
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : "bg-rose-50 text-rose-600 border-rose-100"
                                    )}>
                                        {user.status === "ACTIVE" ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                        <Calendar size={12} />
                                        {format(new Date(user.createdAt), "MMM dd, yyyy")}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={isPending}
                                        onClick={() => handleStatusToggle(user.id, user.status)}
                                        className={cn(
                                            "h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all",
                                            user.status === "ACTIVE" ? "text-rose-600 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"
                                        )}
                                    >
                                        <Zap size={14} className="mr-2" />
                                        {user.status === "ACTIVE" ? "Block" : "Activate"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserListTable;
