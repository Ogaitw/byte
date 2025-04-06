'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Serviços', href: '/servicos' },
  { name: 'Preços', href: '/precos' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-byteDarker/95 backdrop-blur-sm' : 'bg-transparent'
    } border-b border-petrolDark/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <Image
                src="https://cdn.discordapp.com/attachments/964178483813187694/1358423764068466789/ChatGPT_Image_5_de_abr._de_2025_22_04_44.png?ex=67f3ca37&is=67f278b7&hm=c46fd99858804bd14ace01d09b6599ada0ad7e72d590274215939ff7eed8d487&"
                alt="TechFix Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-white">Bit&Byte</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-bit transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="bg-bit text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Área Administrativa
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/80 hover:text-bit"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-byteDarker border-b border-petrolDark"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-white/80 hover:text-bit transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin/login"
                className="block px-3 py-2 text-white/80 hover:text-bit transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Área Administrativa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 