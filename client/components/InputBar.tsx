"use client";

import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../lib/useChatStore";
import { Send, Mic, MicOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

type Props = {
  onSend?: (text: string) => void;
};

export function InputBar({ onSend }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addMessage, setTyping, voice, setVoice } = useChatStore();

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    addMessage({ role: "user", content: text });
    setValue("");
    onSend?.(text);
  };

  const toggleMic = () => {
    setVoice({ enabled: !voice.enabled, stt: !voice.stt });
  };

  useEffect(() => {
    const el = inputRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
    el?.addEventListener("keydown", onKey as any);
    return () => el?.removeEventListener("keydown", onKey as any);
  }, [value]);

  return (
    <div className="w-full flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-indigo-400/20 transition-all duration-200">
      <input
        ref={inputRef}
        aria-label="Type your message"
        placeholder="Type your message..."
        className="flex-1 bg-transparent outline-none text-sm px-4 py-2.5 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        aria-label={voice.enabled ? "Disable voice input" : "Enable voice input"}
        onClick={toggleMic}
        className={cn(
          "h-9 w-9 grid place-items-center rounded-xl transition-all duration-200 shadow-sm hover:scale-105",
          voice.enabled 
            ? "bg-emerald-500 text-white shadow-emerald-500/50" 
            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600"
        )}
      >
        {voice.enabled ? (
          <Mic className="h-4 w-4 animate-pulse" />
        ) : (
          <MicOff className="h-4 w-4" />
        )}
      </button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Send message"
        onClick={handleSend}
        disabled={!value.trim()}
        className={cn(
          "h-9 px-5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-all duration-200",
          value.trim()
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50"
            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
        )}
      >
        <Send className="h-4 w-4" />
        <span className="hidden sm:inline">Send</span>
      </motion.button>
    </div>
  );
}

export default InputBar;
