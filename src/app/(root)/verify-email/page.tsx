"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage(
          "Verification token is missing. Please check your email link.",
        );
        return;
      }

      try {
        const { error } = await authClient.verifyEmail({
          query: {
            token: token,
          },
        });

        if (error) {
          setStatus("error");
          setMessage(
            error.message || "Something went wrong during verification.",
          );
          toast.error(error.message || "Verification failed");
        } else {
          setStatus("success");
          setMessage("Your email has been successfully verified.");
          toast.success("Account verified successfully!");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 text-center animate-in fade-in zoom-in duration-500">
        {/* Icon State */}
        <div className="flex justify-center mb-8">
          {status === "loading" && (
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl flex items-center justify-center">
              <RefreshCw className="text-emerald-600 animate-spin" size={40} />
            </div>
          )}
          {status === "success" && (
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl flex items-center justify-center animate-bounce">
              <CheckCircle2 className="text-emerald-600" size={40} />
            </div>
          )}
          {status === "error" && (
            <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/10 rounded-3xl flex items-center justify-center">
              <XCircle className="text-rose-600" size={40} />
            </div>
          )}
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tighter">
          {status === "loading" && "Verifying Account"}
          {status === "success" && "Congratulations!"}
          {status === "error" && "Verification Failed"}
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-10 leading-relaxed">
          {status === "loading" &&
            "We are currently validating your verification token. This will only take a moment."}
          {status === "success" && message}
          {status === "error" && message}
        </p>

        {/* Actions */}
        <div className="space-y-4">
          {status === "success" && (
            <Button
              onClick={() => router.push("/")}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all group"
            >
              Go to Home
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          )}

          {status === "error" && (
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full h-14 rounded-2xl font-black uppercase tracking-widest border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-all"
            >
              Back to Home
            </Button>
          )}

          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest pt-4">
            <ShieldCheck size={14} className="text-emerald-600" />
            Secure Verification by ChemistBD
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
          <RefreshCw className="text-emerald-600 animate-spin" size={32} />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;
