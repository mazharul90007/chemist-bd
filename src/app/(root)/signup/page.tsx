import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | ChemistBD",
  description:
    "Create an account on ChemistBD to shop for medicines and healthcare products.",
};

const SignUpPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
