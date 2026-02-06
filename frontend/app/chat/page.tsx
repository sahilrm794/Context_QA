"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import Background from "@/components/Background";

const Chat = () => {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const formatAssistantContent = (content: string) => {
    return content
      .replace(/\\\(/g, "$")
      .replace(/\\\)/g, "$")
      .replace(/\(([^()]*\\bmod[^()]*)\)/g, (_match, expr) => `$${expr}$`);
  };

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sid = localStorage.getItem("session_id");
    if(!sid) {
      router.push("/");
      return;
    }
    setSessionId(sid);
  }, [router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim() || !sessionId || loading) return;

    const userMessage = message.trim();
    setMessage("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setLoading(true);

    try {
      const res = await fetch(`${api_url}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage,
        }),
      });

      if(!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Chat failed");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            err.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="h-[calc(100vh-5rem)] text-white overflow-hidden relative">
    <Background />

    <div className="mx-auto flex h-full max-w-4xl flex-col relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-strong px-6 py-4 font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <span className="bg-linear-to-r from-white to-purple-100 bg-clip-text text-transparent">ContextQA ChatBot</span>
      </header>

      {/* Messages (SCROLLABLE) */}
      <div
        className="
          flex-1 overflow-y-auto px-6 py-6 space-y-6
          scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
        "
      >
        {messages.length === 0 && (
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white/80">
              <Sparkles className="h-4 w-4" />
              Ask a question about your uploaded documents
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end gap-3 animate-[slideIn_0.3s_ease-out] ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
            style={{
              animation: `slideIn 0.3s ease-out ${idx * 0.05}s backwards`
            }}
          >
            {/* Assistant Icon */}
            {msg.role === "assistant" && (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[linear-gradient(135deg,#f093fb_0%,#f5576c_100%)] text-white rounded-br-md shadow-[0_8px_24px_rgba(240,147,251,0.3)]"
                  : "glass-strong text-white rounded-bl-md shadow-[0_8px_24px_rgba(255,255,255,0.1)] border-2 border-white/20"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noreferrer" className="text-blue-200 hover:text-blue-100 underline" />
                      ),
                    }}
                  >
                    {formatAssistantContent(msg.content)}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>

            {/* User Icon */}
            {msg.role === "user" && (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] shadow-lg border border-white/20">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-3 animate-pulse">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="rounded-2xl glass-strong px-5 py-4 shadow-[0_8px_24px_rgba(255,255,255,0.1)] border-2 border-white/20">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input (STICKY) */}
      <div className="sticky bottom-0 glass-strong px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a question..."
            className="
              flex-1 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/50
              bg-white/10 border-2 border-white/20
              focus:outline-none focus:border-white/40 focus:bg-white/15
              focus:shadow-[0_0_20px_rgba(255,255,255,0.2)]
              transition-all duration-300
            "
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="cursor-pointer group
              flex h-12 w-12 items-center justify-center
              rounded-xl bg-white/20 backdrop-blur-xl text-white
              border-2 border-white/30
              hover:bg-white/30 hover:scale-110 hover:rotate-12
              disabled:opacity-60 disabled:hover:scale-100 disabled:hover:rotate-0
              transition-all duration-300 shadow-lg">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </main>
);

};

export default Chat;
