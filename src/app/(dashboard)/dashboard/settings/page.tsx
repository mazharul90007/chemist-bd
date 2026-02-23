"use client";

import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Text Content */}
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-zinc-50 mb-6 tracking-tighter uppercase italic">
          Settings <span className="text-emerald-600">Lab</span>
        </h1>

        <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 rounded-full mb-8">
          <Construction className="text-amber-600" size={18} />
          <span className="text-xs font-black text-amber-600 uppercase tracking-[0.2em]">
            Under Construction
          </span>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-lg mx-auto mb-12">
          We are currently engineering a next-level customization experience for
          your dashboard. Stay tuned for advanced preferences, theme engines,
          and more.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => router.back()}
            className="py-6 px-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-3 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Go Back
          </Button>

          <div className="py-5 px-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
            <span className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.3em]">
              Version 2.0 Incoming
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
