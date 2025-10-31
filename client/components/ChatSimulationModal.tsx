"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { Scenario, ScenarioMessage } from "../lib/scenarios";
import MessageBubble from "./MessageBubble";
import { ChatMessage } from "../lib/useChatStore";

type Props = {
  open: boolean;
  scenario: Scenario | null;
  onClose: () => void;
};

export default function ChatSimulationModal({ open, scenario, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open && scenario) {
      setIsAnimating(true);
      const scenarioMessages: ChatMessage[] = scenario.chatHistory.map((msg, idx) => ({
        id: `msg_${idx}`,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp ?? Date.now() - (scenario.chatHistory.length - idx) * 30000,
      }));
      
      setMessages([]);
      scenarioMessages.forEach((msg, idx) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, msg]);
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
          if (idx === scenarioMessages.length - 1) {
            setIsAnimating(false);
          }
        }, idx * 200);
      });
    } else {
      setMessages([]);
    }
  }, [open, scenario]);

  if (!open || !scenario) return null;

  const handleReplay = () => {
    setMessages([]);
    if (scenario) {
      setIsAnimating(true);
      const scenarioMessages: ChatMessage[] = scenario.chatHistory.map((msg, idx) => ({
        id: `msg_${idx}_${Date.now()}`,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp ?? Date.now() - (scenario.chatHistory.length - idx) * 30000,
      }));
      
      scenarioMessages.forEach((msg, idx) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, msg]);
          scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
          if (idx === scenarioMessages.length - 1) {
            setIsAnimating(false);
          }
        }, idx * 200);
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl h-[90vh] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{scenario.title}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{scenario.desc}</p>
            </div>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
            role="log"
            aria-live="polite"
          >
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            {isAnimating && (
              <div className="flex items-center gap-1 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-500 to-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Sim
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Back to Scenarios
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

