'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="pt-16 min-h-screen bg-gradient-to-b from-byteDarker to-deepPetrolDarker"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </motion.main>
      </AnimatePresence>
    </>
  );
} 