"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Phone, Mail } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { t } = useLanguage();
  const { openCart, totalItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.products'), href: '#products' },
    { name: t('nav.staff'), href: '#staff' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-green-600 shadow-lg backdrop-blur-lg bg-opacity-95' 
          : 'bg-green-600'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a 
              href="#home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-green-600 font-bold text-xl">T</span>
              </div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Tanzanex Technology
              </h1>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-white font-medium hover:text-green-200 transition-colors relative group py-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </motion.a>
              ))}

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Shopping Cart Button */}
              <button
                onClick={openCart}
                className="relative text-white hover:text-green-200 transition-colors p-2 bg-green-700/50 rounded-lg flex items-center gap-1.5"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Contact Info */}
              <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-green-500">
                <a 
                  href="tel:+255764562577" 
                  className="flex items-center gap-2 text-white hover:text-green-200 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>+255 764 562 577</span>
                </a>
                <a 
                  href="mailto:info@tanzanex.tech" 
                  className="flex items-center gap-2 text-white hover:text-green-200 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden xl:inline">info@tanzanex.tech</span>
                </a>
              </div>
            </div>

            {/* Mobile Actions & Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={openCart}
                className="relative text-white p-2 bg-green-700/50 rounded-lg"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-1"
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-green-700 border-t border-green-500"
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="block text-white font-medium hover:text-green-200 transition-colors py-2"
                  >
                    {item.name}
                  </motion.a>
                ))}

                <div className="pt-4 border-t border-green-600 space-y-3">
                  <a 
                    href="tel:+255764562577" 
                    className="flex items-center gap-2 text-white hover:text-green-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+255 764 562 577</span>
                  </a>
                  <a 
                    href="mailto:info@tanzanex.tech" 
                    className="flex items-center gap-2 text-white hover:text-green-200 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">info@tanzanex.tech</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
