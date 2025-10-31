"use client";

import { useEffect, useMemo, useRef } from "react";
import { useChatStore } from "../lib/useChatStore";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import { motion } from "framer-motion";

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    <span className="sr-only">Typing</span>
    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
);

export default function ChatDialog() {
  const { messages, addMessage, setTyping, isTyping, emotion, setLoanStage, loanStage } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, isTyping]);

  const handleSend = async (text: string) => {
    // naive intent detection for demo
    const lower = text.toLowerCase();
    setTyping(true);
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await delay(400 + Math.random() * 1000);

    if (lower.includes("kyc")) {
      setLoanStage("kyc");
      addMessage({ role: "bot", content: "To proceed, please share your ID for KYC ✅" });
    } else if (lower.includes("apply") || lower.includes("loan")) {
      addMessage({ role: "bot", content: "Sounds great! Let's check your eligibility next. 🔍" });
      setLoanStage("credit");
    } else if (lower.includes("approve") || lower.includes("sanction")) {
      addMessage({ role: "bot", content: "Initiating sanction generation… 🎉" });
      setLoanStage("sanction");
    } else {
      addMessage({ role: "bot", content: "Got it! Tell me your desired loan amount and tenure." });
    }
    setTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="relative w-full rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-indigo-50/30 dark:from-zinc-900/50 dark:via-transparent dark:to-indigo-950/30 pointer-events-none" />
      
      {/* Header */}
      <div className="relative px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-r from-white/80 to-zinc-50/50 dark:from-zinc-900/80 dark:to-zinc-900/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">PRISM Assistant</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        className="relative max-h-[60vh] min-h-[400px] overflow-y-auto px-6 py-6 space-y-4 bg-gradient-to-b from-zinc-50/30 to-white dark:from-zinc-950/30 dark:to-zinc-900"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-4"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
              Start a conversation to explore loan options
            </p>
          </motion.div>
        )}
        
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex justify-start"
          >
            <div className="rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Section */}
      <div className="relative px-6 py-4 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <InputBar onSend={handleSend} />
      </div>
    </motion.div>
  );
}
