"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { ShoppingCart, Filter, Search, Star, Heart, Eye, Monitor } from 'lucide-react';
import desktopsData from "../../../../data/desktops.json";

interface Desktop {
  id: number;
  name: string;
  desc: string;
  price: string;
  ram: string;
  storage: string;
  processor: string;
  graphics: string;
  features: string[];
  image: string;
}

export default function DesktopsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  // Filter and sort desktops
  const filteredDesktops = desktopsData
    .filter(desktop => {
      const matchesSearch = desktop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           desktop.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || desktop.name.toLowerCase().includes(selectedBrand.toLowerCase());
      const matchesPrice = parseInt(desktop.price.replace(/,/g, '')) >= priceRange.min && 
                          parseInt(desktop.price.replace(/,/g, '')) <= priceRange.max;
      return matchesSearch && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (desktop: Desktop) => {
    if (typeof window !== 'undefined' && (window as any).addToCart) {
      (window as any).addToCart({
        id: `desktop-${desktop.id}`,
        name: desktop.name,
        price: parseInt(desktop.price.replace(/,/g, '')),
        quantity: 1,
        image: desktop.image
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition">Home</Link>
            <span>/</span>
            <Link href="#products" className="hover:text-green-600 transition">Products</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Desktops</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Monitor className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Desktops</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            High-performance desktop computers for business, creative work, and professional computing needs.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search desktops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Brands</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="lenovo">Lenovo</option>
              <option value="apple">Apple</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000000 })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredDesktops.length}</span> desktops
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDesktops.map((desktop, index) => (
            <motion.div
              key={desktop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={desktop.image}
                  alt={desktop.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {desktop.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {desktop.desc}
                </p>

                {/* Specs */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Processor:</span>
                    <span className="font-medium">{desktop.processor}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">RAM:</span>
                    <span className="font-medium">{desktop.ram}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Storage:</span>
                    <span className="font-medium">{desktop.storage}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Graphics:</span>
                    <span className="font-medium">{desktop.graphics}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {desktop.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {desktop.features.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{desktop.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">(4.7)</span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      TSh {desktop.price}
                    </p>
                    <p className="text-xs text-gray-500">+ VAT</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(desktop)}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDesktops.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No desktops found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}