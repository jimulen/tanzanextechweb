"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Truck, Headphones, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 500+ Businesses
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
              {t('hero.title')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">
                {t('hero.subtitle')}
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                {t('hero.cta1')}
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl hover:bg-green-600 hover:text-white transition font-semibold"
              >
                {t('hero.cta2')}
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">1yr</div>
                <div className="text-sm text-gray-600">Warranty</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Features */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <Truck className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Free Delivery</h3>
                <p className="text-sm text-gray-600">Across Dar es Salaam</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <Headphones className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Technical Assistance</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <Shield className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">1 Year Warranty</h3>
                <p className="text-sm text-gray-600">On All Products</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <Award className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Certified</h3>
                <p className="text-sm text-gray-600">Quality Products</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
