"use client";

import Navbar from "../components/Navbar";
import ChatDialog from "../components/ChatDialog";
import KYCModal from "../components/modals/KYCModal";
import CreditPanel from "../components/panels/CreditPanel";
import SanctionModal from "../components/modals/SanctionModal";
import { useChatStore } from "../lib/useChatStore";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { loanStage, setLoanStage, messages, addMessage, setTyping } = useChatStore();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;
    
    addMessage({ role: "user", content: text });
    setInputValue("");
    
    // Handle bot response
    setTyping(true);
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await delay(400 + Math.random() * 1000);

    const lower = text.toLowerCase();
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
  
  const hasMessages = messages.length > 0;

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Ambient background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 mb-6"
            >
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                AI-Powered Loan Assistant
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-100 dark:to-white bg-clip-text text-transparent">
                Get your loan approved
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                in minutes, not days
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Experience the future of lending with our conversational AI. Get instant approvals, personalized rates, and 24/7 support.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-16"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Instant Approval</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Best Rates</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Chat Input Box or Chat Dialog */}
          {hasMessages ? (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-4xl mx-auto"
            >
              <ChatDialog />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-3xl mx-auto"
            >
              <div className="relative w-full rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-indigo-50/30 dark:from-zinc-900/50 dark:via-transparent dark:to-indigo-950/30 pointer-events-none" />
                
                <div className="relative px-6 py-8">
                  <div className="flex items-center gap-3 w-full p-3 rounded-2xl bg-zinc-50/80 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-indigo-400/20 focus-within:border-indigo-300 dark:focus-within:border-indigo-700 transition-all duration-200">
                    <input
                      ref={inputRef}
                      type="text"
                      aria-label="Start a conversation"
                      placeholder="Ask about loan options, rates, or eligibility..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      className="flex-1 bg-transparent outline-none text-base md:text-lg px-2 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:font-light"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={`
                        h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm
                        ${inputValue.trim()
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 cursor-pointer"
                          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                        }
                      `}
                      aria-label="Send message"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </div>
                  
                  {/* Helper text */}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-4">
                    Press Enter to send • Start by asking about loan options, rates, or eligibility
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="relative py-16 px-4 md:px-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Get approved in minutes with our AI-powered instant processing"
              },
              {
                icon: "🤖",
                title: "AI-Driven",
                desc: "Intelligent conversations that understand your unique needs"
              },
              {
                icon: "🔒",
                title: "Secure & Trusted",
                desc: "Bank-level encryption keeps your data safe and confidential"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50 hover:bg-white/80 dark:hover:bg-zinc-900/80 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <KYCModal open={loanStage === "kyc"} onClose={() => setLoanStage("idle")} />
      <CreditPanel open={loanStage === "credit"} onClose={() => setLoanStage("idle")} />
      <SanctionModal open={loanStage === "sanction"} onClose={() => setLoanStage("approved")} />
    </div>
  );
}
