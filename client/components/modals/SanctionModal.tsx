"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "../../lib/useChatStore";
import { jsPDF } from "jspdf";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SanctionModal({ open, onClose }: Props) {
  const { setLoanStage, addMessage, creditScore } = useChatStore();
  const [downloading, setDownloading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => setCelebrate(true), 300);
  }, [open]);

  if (!open) return null;

  const downloadPDF = () => {
    setDownloading(true);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("PRISM - Instant Loan Sanction Letter", 14, 22);
    doc.setFontSize(12);
    doc.text("Applicant: Demo User", 14, 36);
    doc.text(`Credit Score: ${creditScore ?? "N/A"}`, 14, 44);
    doc.text("Loan Amount: $10,000", 14, 52);
    doc.text("Interest Rate: 8% p.a.", 14, 60);
    doc.text("Tenure: 24 months", 14, 68);
    doc.text("Status: Approved ✅", 14, 84);
    doc.text("This is a simulated document for demo purposes.", 14, 100);
    doc.text("Authorized Signature: ____________", 14, 124);
    doc.save("PRISM_Sanction_Letter.pdf");
    setTimeout(() => setDownloading(false), 500);
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-6 overflow-hidden">
        <div className="text-xl font-semibold">Loan Sanction Approved 🎉</div>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Your loan has been approved. Download your sanction letter below.</p>

        <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="text-sm font-medium mb-2">Preview</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">A PDF will be generated with your loan details.</div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">Close</button>
          <button onClick={downloadPDF} disabled={downloading} className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm disabled:opacity-60">
            {downloading ? "Preparing…" : "Download PDF"}
          </button>
        </div>

        {celebrate && (
          <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                }}
              >
                {i % 3 === 0 ? "🎊" : i % 3 === 1 ? "🎉" : "✨"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


