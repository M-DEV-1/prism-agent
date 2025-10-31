"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/useChatStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function KYCModal({ open, onClose }: Props) {
  const { setLoanStage, addMessage } = useChatStore();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = Array.from(e.dataTransfer.files);
    setFiles(f);
  };

  const onVerify = async () => {
    setLoading(true);
    try {
      await fetch("/api/mock-kyc", { method: "POST" });
      setSuccess(true);
      setTimeout(() => {
        addMessage({ role: "bot", content: "✅ KYC Verified!" });
        setLoanStage("credit");
        onClose();
      }, 700);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6">
        <div className="text-xl font-semibold mb-1">KYC Verification</div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Upload your ID proof. Drag and drop supported.</p>

        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 p-8 text-center"
        >
          <div className="text-sm mb-2">Drag & drop files here</div>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])}
          />
          {!!files.length && (
            <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">Selected: {files.map((f) => f.name).join(", ")}</div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">Cancel</button>
          <button
            onClick={onVerify}
            disabled={loading}
            className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify Now"}
          </button>
        </div>

        {success && (
          <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                }}
              >
                🎉
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


