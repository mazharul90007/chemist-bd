import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const LinkableButton = ({ title, link }: { title: string; link: string }) => {
  return (
    <>
      <Link href={`/${link}`}>
        <Button
          variant="outline"
          className="hidden md:flex border hover:border-emerald-500 items-center gap-2 rounded-xl group font-semibold cursor-pointer"
        >
          {title}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Button>
      </Link>
    </>
  );
};

export default LinkableButton;
