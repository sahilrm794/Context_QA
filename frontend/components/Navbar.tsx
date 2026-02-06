"use client";

import Link from "next/link";
import { Upload } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleUploadClick = () => {
    localStorage.removeItem("session_id");
    router.push("/upload");
  };

  return (
    <nav className="relative sticky top-0 z-50 h-20 glass-strong shadow-[0_10px_40px_-15px_rgba(31,38,135,0.5)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.75 bg-linear-to-r from-transparent via-white/50 to-transparent blur-sm"
      />
      <div className="container mx-auto relative grid h-full grid-cols-[1fr_auto_1fr] items-center px-4">
        {/* LOGO */}
        <Link
          href="/"
          className="
            col-start-2 flex items-center justify-center gap-1
            text-center font-extrabold tracking-tight
            text-2xl md:text-4xl
            hover:scale-105 transition-transform duration-300">
          <span className="bg-linear-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Context
          </span>
          <span className="text-white">QA</span>
        </Link>
        {pathname === "/chat" && (
          <button
            onClick={handleUploadClick}
            className="cursor-pointer justify-self-end
              group relative inline-flex items-center gap-2
              rounded-xl px-6 py-3 text-sm font-semibold
              text-white
              bg-white/20 backdrop-blur-xl
              border-2 border-white/30
              shadow-[0_4px_16px_0_rgba(255,255,255,0.2)]
              hover:bg-white/30 hover:border-white/50
              hover:shadow-[0_4px_20px_0_rgba(255,255,255,0.3)]
              hover:scale-105
              transition-all duration-300">
            <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:rotate-12" />
            Upload New Documents
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
