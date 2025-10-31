"use client";

import { Plus, Settings, List } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { useChatStore } from "../lib/useChatStore";
import SettingsModal from "./modals/SettingsModal";
import Link from "next/link";

export default function Navbar() {
  const reset = useChatStore((s) => s.reset);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg">
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent select-none hover:opacity-80 transition-opacity cursor-pointer">
          PRISM
        </Link>
        <div className="ml-2 flex items-center gap-2">
          <Link
            aria-label="Results"
            href="/results"
            className="h-9 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:-translate-y-0.5 transition shadow-sm flex items-center gap-2"
          >
            <List className="h-4 w-4" />
            Results
          </Link>
          <button
            aria-label="New chat"
            onClick={reset}
            className="h-9 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:-translate-y-0.5 transition shadow-sm flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
          <button
            aria-label="Settings"
            onClick={() => setOpen(true)}
            className="h-9 px-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:-translate-y-0.5 transition shadow-sm flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <ThemeToggle />
        </div>
      </div>
      <SettingsModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}


