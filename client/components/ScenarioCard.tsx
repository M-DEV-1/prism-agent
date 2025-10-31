"use client";

import { motion } from "framer-motion";
import { Shield, DollarSign, TrendingUp, Zap, Scale, PartyPopper, ChevronRight } from "lucide-react";
import { Scenario } from "../lib/scenarios";
import { cn } from "../lib/utils";

const iconMap: Record<string, typeof Shield> = {
  Shield,
  DollarSign,
  TrendingUp,
  Zap,
  Scale,
  PartyPopper,
};

type Props = {
  scenario: Scenario;
  index: number;
  onClick: () => void;
};

export default function ScenarioCard({ scenario, index, onClick }: Props) {
  const Icon = iconMap[scenario.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.05, y: -8 }}
      className={cn(
        "h-64 w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800",
        "cursor-pointer overflow-hidden group transition-all duration-300",
        "hover:shadow-xl hover:ring-2 hover:ring-teal-200 dark:hover:ring-teal-800"
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${scenario.title} scenario`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <Icon
              className="h-12 w-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 group-hover:rotate-12 transition-transform duration-300"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            {scenario.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
            {scenario.desc}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-sm text-teal-500 font-medium flex items-center gap-2">
            Simulate Chat
            <ChevronRight className="h-4 w-4 animate-pulse" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

