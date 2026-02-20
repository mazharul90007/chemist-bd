"use client";

import React from "react";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  Edit3,
  ShieldCheck,
  MapPin,
  Phone,
  Info,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProfileData } from "@/hooks/useUser";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const { data: profileResponse, isLoading } = useProfileData();
  const profileData = profileResponse?.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userRole = (session?.user as any)?.role || "CUSTOMER";

  if (!session) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header / Cover Section */}
      <div className="relative group">
        <div className="h-48 md:h-64 bg-linear-to-r from-emerald-600 to-teal-500 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-500/10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
          <div className="absolute bottom-6 left-10 flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white p-1.5 shadow-2xl overflow-hidden group/avatar relative">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    fill
                    className="object-cover rounded-4xl p-1.5"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-50 flex items-center justify-center rounded-4xl">
                    <User size={48} className="text-emerald-500" />
                  </div>
                )}
                <button className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer rounded-4xl">
                  <Camera size={24} />
                </button>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white dark:border-zinc-950 shadow-lg">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="hidden sm:block text-white space-y-1">
              <h1 className="text-3xl font-black tracking-tighter">
                {session.user.name}
              </h1>
              <div className="flex items-center gap-2 opacity-80 font-medium text-sm">
                <Badge className="bg-white/20 border-none text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  {userRole}
                </Badge>
                <span className="w-1 h-1 rounded-full bg-white opacity-50" />
                <p>{session.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Info Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-zinc-900/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-[10rem] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-600/10 p-2.5 rounded-2xl text-emerald-600">
                  <Info size={20} />
                </div>
                <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Personal Information
                </h2>
              </div>
              <Button
                variant="ghost"
                className="rounded-xl h-10 px-4 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 text-[10px] font-black uppercase tracking-widest gap-2 cursor-pointer"
              >
                <Edit3 size={14} />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                    <User size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                      Full Name
                    </label>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      {session.user.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                    <Mail size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                      Email Address
                    </label>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                    <Shield size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                      Account Role
                    </label>
                    <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                      {userRole}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                    <Calendar size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                      Joined Date
                    </label>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      February 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 rounded-[2.5rem] p-8 md:p-10 group">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-blue-600/10 p-2.5 rounded-2xl text-blue-600">
                <MapPin size={20} />
              </div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-zinc-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                    Phone Number
                  </label>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {profileData?.phone || "No phone"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                  <MapPin size={18} className="text-zinc-400" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 block">
                    Default Address
                  </label>
                  <p className="text-sm font-medium text-zinc-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Security Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-zinc-900/5 group h-fit">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-red-600/10 p-2.5 rounded-2xl text-red-600">
                <Lock size={20} />
              </div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                Account Security
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl group/item cursor-pointer">
                <div className="flex items-center gap-3">
                  <Shield size={16} className="text-zinc-400" />
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-900 transition-colors">
                    Change Password
                  </span>
                </div>
                <Edit3
                  size={14}
                  className="text-zinc-300 group-hover/item:text-emerald-600 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl group/item cursor-pointer">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-zinc-400" />
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 group-hover/item:text-zinc-900 transition-colors">
                    2FA Security
                  </span>
                </div>
                <Badge className="bg-emerald-600/10 text-emerald-600 border-none text-[8px] font-black uppercase">
                  Active
                </Badge>
              </div>

              <Button className="w-full rounded-2xl h-12 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border-none font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer">
                Disable Account
              </Button>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[5rem] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-6 text-center">
              <div className="bg-white/20 w-fit mx-auto p-4 rounded-3xl backdrop-blur-md">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 opacity-80">
                  Health Points
                </p>
                <h3 className="text-3xl font-black tracking-tighter">
                  450 <span className="text-sm opacity-60">HP</span>
                </h3>
              </div>
              <p className="text-xs font-medium text-emerald-50 opacity-90 leading-relaxed px-2">
                You are 50 points away from your next discount voucher!
              </p>
              <Button className="w-full bg-white text-emerald-600 hover:bg-emerald-50 rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest cursor-pointer shadow-lg">
                Redeem Rewards
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
