"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/useChatStore";
import { motion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreditPanel({ open, onClose }: Props) {
  const { creditScore, eligible, setCreditResult, addMessage, setLoanStage } = useChatStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (creditScore) return;
    const run = async () => {
      setLoading(true);
      const res = await fetch("/api/mock-credit");
      const data = await res.json();
      setCreditResult(data.score, data.eligible);
      setLoading(false);
    };
    run();
  }, [open, creditScore, setCreditResult]);

  if (!open) return null;

  const color = !creditScore
    ? "text-zinc-500"
    : creditScore < 600
    ? "text-red-500"
    : creditScore < 700
    ? "text-yellow-500"
    : "text-emerald-500";

  const proceed = () => {
    if (eligible) {
      addMessage({ role: "bot", content: "You are eligible! Generating sanction letter…" });
      setLoanStage("sanction");
    } else {
      addMessage({ role: "bot", content: "We can help improve your score. Let's explore options." });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl p-6"
        role="dialog"
        aria-modal="true"
      >
        <div className="text-lg font-semibold">Credit Evaluation</div>
        <div className="mt-6 grid place-items-center">
          <div className="relative h-48 w-48 rounded-full grid place-items-center">
            <svg viewBox="0 0 36 36" className="h-48 w-48 -rotate-90">
              <path
                d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              <motion.path
                d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: ((creditScore ?? 650) - 500) / 350 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className={`absolute text-4xl font-bold ${color}`}>
              {loading ? "…" : creditScore ?? "—"}
            </div>
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {loading ? "Fetching score..." : eligible ? "Eligible ✅" : "Might need improvement"}
          </div>
        </div>

        <ul className="mt-6 space-y-2 text-sm">
          <li>• KYC verified</li>
          <li>• Income stability: simulated</li>
          <li>• Credit utilization: simulated</li>
        </ul>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">Close</button>
          <button onClick={proceed} className="px-5 py-2 rounded-full bg-indigo-500 text-white text-sm">Proceed</button>
        </div>
      </motion.div>
    </div>
  );
}


