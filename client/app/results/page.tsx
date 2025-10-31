"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import ScenarioCard from "../../components/ScenarioCard";
import ChatSimulationModal from "../../components/ChatSimulationModal";
import { scenarios, Scenario } from "../../lib/scenarios";

export default function ResultsPage() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const scrollToGrid = () => {
    document.getElementById("scenarios-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black overflow-hidden">
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-[#1A1A2E] dark:text-white mb-4"
          >
            {Array.from("Real Conversations with AI Agents").map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-[#1A1A2E]/70 dark:text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            Explore  customer conversations handled by PRISM's AI agents across diverse loan scenarios
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToGrid}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Dive In
          </motion.button>
        </div>
      </section>

      {/* Scenarios Grid */}
      <section id="scenarios-grid" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, idx) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              index={idx}
              onClick={() => setSelectedScenario(scenario)}
            />
          ))}
        </div>
      </section>

      {/* Chat Simulation Modal */}
      <ChatSimulationModal
        open={!!selectedScenario}
        scenario={selectedScenario}
        onClose={() => setSelectedScenario(null)}
      />
    </div>
  );
}
