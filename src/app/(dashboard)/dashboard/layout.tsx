"use client";

import React from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  React.useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
        <p className="text-zinc-500 font-medium animate-pulse">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full overflow-hidden">
        <div className="h-full p-4 md:p-8 lg:p-12 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #34d39944;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
}
