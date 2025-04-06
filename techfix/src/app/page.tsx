'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Pricing from '@/components/sections/Pricing';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-bit rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-petrol rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent rounded-full blur-3xl"
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/4 right-1/4 w-16 h-16 bg-bit rounded-full opacity-20 blur-xl z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed bottom-1/3 left-1/4 w-24 h-24 bg-petrol rounded-full opacity-20 blur-xl z-10 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/2 right-1/3 w-12 h-12 bg-accent rounded-full opacity-20 blur-xl z-10 pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Pricing />
        <Contact />
      </div>
    </div>
  );
} 