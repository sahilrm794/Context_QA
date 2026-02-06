"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2, CheckCircle, XCircle, Sparkles } from "lucide-react";
import Background from "@/components/Background";

const UploadPage = () => {
  const router = useRouter();
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    if(sessionId) router.replace("/chat");
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setError(null);
  };

  const handleUpload = async () => {
    if(files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const res = await fetch(`${api_url}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if(!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Upload failed");
      }

      const data = await res.json();
      localStorage.setItem("session_id", data.session_id);
      setSuccess(true);
      setTimeout(() => {router.replace("/chat")}, 800);
    } catch (err: any) {
      setError(err.message || "Something went wrong in handleUpload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-6 text-white relative">
      <Background />

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-linear-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
            Upload Documents
          </h1>
          <p className="text-white/80 text-lg">
            Upload one or more documents to start a new conversational session.
          </p>
        </div>

        {/* Upload Card */}
        <div className="rounded-2xl glass-strong p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          {/* File Picker */}
          <label
            htmlFor="file-upload"
            className="
              flex flex-col items-center justify-center
              rounded-xl border-2 border-dashed border-white/30
              px-6 py-16 text-center
              cursor-pointer
              hover:border-white/60
              hover:bg-white/5
              hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
              transition-all duration-300 group">
            <div className="mb-4 p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
              <Upload className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="font-semibold text-lg text-white mb-2">
              Click to upload or drag & drop
            </p>
            <p className="text-sm text-white/70">
              PDF, DOCX, TXT supported
            </p>

            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm
                    hover:bg-white/15 transition-all duration-200"
                >
                  <div className="p-2 rounded-lg bg-linear-to-br from-purple-400/30 to-pink-400/30">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="truncate text-white font-medium">{file.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Status */}
          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm bg-red-500/20 border border-red-400/30 rounded-lg px-4 py-3">
              <XCircle className="h-4 w-4 text-red-200" />
              <span className="text-red-100">{error}</span>
            </div>
          )}

          {success && (
            <div className="mt-4 flex items-center gap-2 text-sm bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-3">
              <CheckCircle className="h-4 w-4 text-green-200" />
              <span className="text-green-100">Indexing complete. Redirecting…</span>
            </div>
          )}

          {/* Action */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="cursor-pointer group
                inline-flex items-center gap-3
                rounded-xl px-8 py-4 text-base font-semibold
                text-white
                bg-white/20 backdrop-blur-xl
                border-2 border-white/30
                shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]
                hover:bg-white/30 hover:border-white/50
                hover:scale-105
                disabled:opacity-60 disabled:hover:scale-100
                transition-all duration-300">
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Start Chatting
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadPage;
