"use client";

import { motion } from "framer-motion";
import { ChatMessage } from "../lib/useChatStore";
import { cn } from "../lib/utils";
import Image from "next/image";

type Props = {
  message: ChatMessage;
};

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={cn(
        "w-full flex items-end gap-3", 
        isUser ? "justify-end" : "justify-start"
      )}
      role="listitem"
      aria-live="polite"
    >
      {!isUser && (
        <div className="shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white font-bold">
          P
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm",
          isUser
            ? "bg-indigo-500 text-white rounded-br-md"
            : "bg-gradient-to-br from-white/80 to-white/60 dark:from-zinc-800/80 dark:to-zinc-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 text-zinc-900 dark:text-zinc-100 rounded-bl-md"
        )}
      >
        <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />')
        }} />
      </div>

      {isUser && (
        <div className="shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-medium">
          U
        </div>
      )}
    </motion.div>
  );
}

export default MessageBubble;


