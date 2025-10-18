// promptvault-frontend/src/components/landing/Hero.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const Hero = () => {
  const FADE_UP = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-gray-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse opacity-20 blur-3xl"></div>
        <div className="absolute inset-20 bg-gradient-to-l from-cyan-400 to-indigo-600 rounded-full animate-pulse opacity-20 blur-3xl animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
        >
          The Operating System for AI Prompting
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400"
        >
          PromptVault provides the tools for engineers and teams to discover, create, and collaborate on high-quality prompts.
        </motion.p>
        
        <motion.div
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors w-full sm:w-auto">
            Get Started
          </Link>
          <Link href="/prompts" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors w-full sm:w-auto">
            Explore
          </Link>
        </motion.div>
      </div>
    </section>
  );
};