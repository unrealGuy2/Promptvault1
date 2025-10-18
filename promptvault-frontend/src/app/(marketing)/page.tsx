// promptvault-frontend/src/app/(marketing)/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hero } from '@/components/landing/Hero';

export default function LandingPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* "Why PromptVault?" Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold">Why PromptVault?</motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-lg text-gray-500">A unified platform for all your prompting needs.</motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold">Version Control</h3>
              <p className="mt-2 text-gray-600">Fork prompts, track changes, and manage versions with ease.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="mt-2 text-gray-600">Work together in shared vaults to build and refine prompts as a team.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold">Community Insights</h3>
              <p className="mt-2 text-gray-600">Discover what works from a community of top prompt engineers.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold">Seamless Integration</h3>
              <p className="mt-2 text-gray-600">Use our API to pull your perfected prompts into any application.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Example Use Cases / Showcase Section - NEW */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold">Unlock Creativity and Efficiency</motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-lg text-gray-500">From code generation to marketing copy, find the perfect starting point.</motion.p>
          </motion.div>

          {/* Example Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div variants={itemVariants} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="font-semibold text-lg">Code Generation Assistant</h4>
               <p className="text-sm text-gray-600 mt-1">Generate boilerplate code, explain complex algorithms, or refactor existing functions.</p>
               <div className="mt-3 flex flex-wrap gap-2">
                 <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">python</span>
                 <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">javascript</span>
                 <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">refactor</span>
               </div>
            </motion.div>
            {/* Card 2 */}
             <motion.div variants={itemVariants} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="font-semibold text-lg">Marketing Copywriter</h4>
               <p className="text-sm text-gray-600 mt-1">Craft compelling headlines, social media posts, email campaigns, and product descriptions.</p>
               <div className="mt-3 flex flex-wrap gap-2">
                 <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">copywriting</span>
                 <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">marketing</span>
                 <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">social media</span>
               </div>
            </motion.div>
            {/* Card 3 */}
             <motion.div variants={itemVariants} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
               <h4 className="font-semibold text-lg">Creative Story Starter</h4>
               <p className="text-sm text-gray-600 mt-1">Generate unique characters, plot twists, and engaging dialogue for your next story.</p>
               <div className="mt-3 flex flex-wrap gap-2">
                 <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">creative writing</span>
                 <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">storytelling</span>
                 <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">fiction</span>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action Section - NEW */}
      <section className="text-center py-20 md:py-32 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Ready to Elevate Your Prompts?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.1 }}
            variants={itemVariants}
            className="mt-4 max-w-xl mx-auto text-lg text-indigo-100"
          >
            Join PromptVault today and start building, sharing, and discovering prompts like never before.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
            variants={itemVariants}
            className="mt-8 flex justify-center"
          >
            <Link href="/signup" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Sign Up - It's Free!
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}