"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  ram?: string;
  storage?: string;
  generation?: string;
  processor?: string;
  graphics?: string;
  category?: string;
  brand?: string;
  features: string[];
  image: string;
  sold: boolean;
}

export default function Products() {
  const { t } = useLanguage();
  const [laptops, setLaptops] = useState<Product[]>([]);
  const [desktops, setDesktops] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [laptopsRes, desktopsRes, accessoriesRes] = await Promise.all([
          fetch('/api/laptops'),
          fetch('/api/desktops'),
          fetch('/api/accessories')
        ]);

        const laptopsData = await laptopsRes.json();
        const desktopsData = await desktopsRes.json();
        const accessoriesData = await accessoriesRes.json();

        setLaptops(Array.isArray(laptopsData) ? laptopsData : []);
        setDesktops(Array.isArray(desktopsData) ? desktopsData : []);
        setAccessories(Array.isArray(accessoriesData) ? accessoriesData : []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categoryData = [
    {
      id: 'laptops',
      name: t('products.laptops'),
      desc: 'High-performance laptops for business, development, and gaming',
      icon: <span className="text-3xl">💻</span>,
      products: laptops,
      href: '/products/laptops',
      color: 'from-blue-500 to-blue-600',
      stats: { count: laptops.length, available: laptops.filter(p => !p.sold).length }
    },
    {
      id: 'desktops',
      name: t('products.desktops'),
      desc: 'Reliable desktop computers for office and professional use',
      icon: <span className="text-3xl">🖥️</span>,
      products: desktops,
      href: '/products/desktops',
      color: 'from-green-500 to-green-600',
      stats: { count: desktops.length, available: desktops.filter(p => !p.sold).length }
    },
    {
      id: 'accessories',
      name: t('products.accessories'),
      desc: 'Keyboards, mice, hubs, and essential computer accessories',
      icon: <span className="text-3xl">🎧</span>,
      products: accessories,
      href: '/products/accessories',
      color: 'from-purple-500 to-purple-600',
      stats: { count: accessories.length, available: accessories.filter(p => !p.sold).length }
    }
  ];

  if (loading) {
    return (
      <section id="products" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('products.title')} <span className="text-green-600">Premium</span> {t('products.title').split(' ')[1] || 'Products'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Live Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-12 shadow-lg border border-gray-100"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">
                {laptops.length + desktops.length + accessories.length}
              </div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {laptops.filter(p => !p.sold).length + desktops.filter(p => !p.sold).length + accessories.filter(p => !p.sold).length}
              </div>
              <div className="text-sm text-gray-600">Available Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">2yr</div>
              <div className="text-sm text-gray-600">Warranty</div>
            </div>
          </div>
        </motion.div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={category.href} className="block">
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-white h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  {/* Icon and Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-white bg-opacity-30 rounded-xl p-4 flex items-center justify-center shadow-lg">
                      {category.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{category.stats.count}</div>
                      <div className="text-sm opacity-80">Products</div>
                    </div>
                  </div>

                  {/* Category Info */}
                  <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                  <p className="text-white text-opacity-90 mb-6">{category.desc}</p>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {category.stats.available} available
                    </span>
                    <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">Browse</span>
                      <div className="w-4 h-4 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                        <span className="text-xs">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Products Grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
              View All <span>→</span>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Show latest products from each category */}
            {laptops.slice(0, 2).map((laptop, index) => (
              <motion.div
                key={`laptop-${laptop.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Link href={`/products/laptops/${laptop.id}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={laptop.image}
                        alt={laptop.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          laptop.sold 
                            ? 'bg-red-600 text-white' 
                            : 'bg-green-600 text-white'
                        }`}>
                          {laptop.sold ? 'Sold' : 'In Stock'}
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
                          <span className="text-sm">👁️</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{laptop.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{laptop.desc}</p>
                      
                      {/* Specs */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{laptop.ram}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{laptop.storage}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">TSh {laptop.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {desktops.slice(0, 1).map((desktop, index) => (
              <motion.div
                key={`desktop-${desktop.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link href={`/products/desktops/${desktop.id}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={desktop.image}
                        alt={desktop.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          desktop.sold 
                            ? 'bg-red-600 text-white' 
                            : 'bg-green-600 text-white'
                        }`}>
                          {desktop.sold ? 'Sold' : 'In Stock'}
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
                          <span className="text-sm">👁️</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{desktop.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{desktop.desc}</p>
                      
                      {/* Specs */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{desktop.ram}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{desktop.storage}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">TSh {desktop.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm text-gray-600">4.6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {accessories.slice(0, 1).map((accessory, index) => (
              <motion.div
                key={`accessory-${accessory.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Link href={`/products/accessories/${accessory.id}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-50">
                      <Image
                        src={accessory.image}
                        alt={accessory.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          accessory.sold 
                            ? 'bg-red-600 text-white' 
                            : 'bg-green-600 text-white'
                        }`}>
                          {accessory.sold ? 'Sold' : 'In Stock'}
                        </span>
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
                          <span className="text-sm">👁️</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">{accessory.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{accessory.desc}</p>
                      
                      {/* Category */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{accessory.category}</span>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{accessory.brand}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">TSh {accessory.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm text-gray-600">4.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            We source and supply custom IT solutions based on your specific requirements. 
            Contact our team for personalized assistance.
          </p>
          <Link
            href="#contact"
            className="inline-block bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition"
          >
            Get Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
