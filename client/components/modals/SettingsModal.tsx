"use client";

import { useEffect } from "react";
import { useChatStore } from "../../lib/useChatStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SettingsModal({ open, onClose }: Props) {
  const { voice, setVoice } = useChatStore();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6">
        <div className="text-lg font-semibold mb-4">Settings</div>
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm">Enable Voice (TTS)</span>
            <input
              type="checkbox"
              checked={voice.tts}
              onChange={(e) => setVoice({ tts: e.target.checked })}
            />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm">Enable Voice Input (STT)</span>
            <input
              type="checkbox"
              checked={voice.stt}
              onChange={(e) => setVoice({ stt: e.target.checked, enabled: e.target.checked })}
            />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm">Speech Rate</span>
            <input
              type="range"
              min={0.7}
              max={1.3}
              step={0.05}
              value={voice.rate}
              onChange={(e) => setVoice({ rate: Number(e.target.value) })}
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-indigo-500 text-white text-sm">Close</button>
        </div>
      </div>
    </div>
  );
}


