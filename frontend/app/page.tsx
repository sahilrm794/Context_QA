"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles } from "lucide-react";
import Background from "@/components/Background";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if (sessionId) router.replace("/chat");
  }, []);

  return (
    <main className="min-h-screen text-white relative">
      <Background />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-20 text-center relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Powered by Advanced RAG Technology</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span className="bg-linear-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Context-aware
          </span>
          <br />
          <span className="bg-linear-to-r from-pink-100 via-blue-100 to-white bg-clip-text text-transparent">
            Document Q&A
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-white/90 mb-10 leading-relaxed">
          ContextQA is a session-based conversational retrieval system that
          enables isolated document ingestion and accurate multi-turn querying
          using modern RAG techniques.
        </p>

        {/* UPLOAD */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => router.push("/upload")}
            className="cursor-pointer group relative inline-flex items-center gap-3
              rounded-2xl px-10 py-5 text-base font-semibold text-white
              bg-white/20 backdrop-blur-xl
              border-2 border-white/30
              shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]
              hover:bg-white/30 hover:border-white/50
              hover:shadow-[0_8px_40px_0_rgba(255,255,255,0.3)]
              hover:scale-105
              transition-all duration-300">
            <Upload className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:rotate-12" />
            Get Started
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Session Isolation"
            description="Each session maintains its own document store and chat context, ensuring clean and independent retrieval pipelines."
          />

          <FeatureCard
            title="Contextual Question Rewriting"
            description="Follow-up questions are rewritten using conversation history to preserve intent across multi-turn interactions."
          />

          <FeatureCard
            title="MMR-based Retrieval"
            description="Maximal Marginal Relevance balances semantic relevance and diversity, reducing redundant context injection."
          />
        </div>
      </section>
    </main>
  );
}


function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="group rounded-2xl glass-strong p-6 text-left
        hover:bg-white/25 hover:border-white/40
        hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]
        hover:scale-105
        transition-all duration-300 cursor-pointer">
      <h3 className="text-xl font-bold mb-3 text-white">
        {title}
      </h3>
      <p className="text-sm text-white/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
