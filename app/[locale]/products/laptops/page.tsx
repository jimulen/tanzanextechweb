"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

interface Laptop {
  id: number;
  name: string;
  desc: string;
  price: string;
  ram: string;
  storage: string;
  generation: string;
  features: string[];
  image: string;
  sold: boolean;
}

export default function LaptopsPage() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });
  const [showSoldOnly, setShowSoldOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLaptops = async () => {
      try {
        const response = await fetch('/api/laptops');
        const data = await response.json();
        setLaptops(data);
      } catch (error) {
        console.error('Error loading laptops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLaptops();
  }, []);

  // Filter and sort laptops
  const filteredLaptops = laptops
    .filter((laptop: Laptop) => {
      const matchesSearch = laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           laptop.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'all' || laptop.name.toLowerCase().includes(selectedBrand.toLowerCase());
      const matchesPrice = parseInt(laptop.price.replace(/,/g, '')) >= priceRange.min && 
                          parseInt(laptop.price.replace(/,/g, '')) <= priceRange.max;
      const matchesSoldStatus = !showSoldOnly || laptop.sold;
      return matchesSearch && matchesBrand && matchesPrice && matchesSoldStatus;
    })
    .sort((a: Laptop, b: Laptop) => {
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

  const addToCart = (laptop: Laptop) => {
    if (typeof window !== 'undefined' && (window as any).addToCart) {
      (window as any).addToCart({
        id: `laptop-${laptop.id}`,
        name: laptop.name,
        price: parseInt(laptop.price.replace(/,/g, '')),
        quantity: 1,
        image: laptop.image
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading laptops...</p>
        </div>
      </div>
    );
  }

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
            <span className="text-gray-900 font-medium">Laptops</span>
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Laptops</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            High-performance laptops for professionals, developers, and creatives with warranty and support.
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
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search laptops..."
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
              <option value="mac">MacBook</option>
              <option value="hp">HP</option>
              <option value="lenovo">Lenovo</option>
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

            {/* Sold Toggle */}
            <label className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={showSoldOnly}
                onChange={(e) => setShowSoldOnly(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Show Sold Only</span>
            </label>

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
            Showing <span className="font-semibold">{filteredLaptops.length}</span> laptops
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <span className="text-sm">⚙️</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLaptops.map((laptop: Laptop, index: number) => (
            <Link key={laptop.id} href={`/products/laptops/${laptop.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={laptop.image}
                  alt={laptop.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                    <span className="text-sm">❤️</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                    <span className="text-sm">👁️</span>
                  </button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    laptop.sold 
                      ? 'bg-red-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    {laptop.sold ? 'Sold' : 'In Stock'}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {laptop.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {laptop.desc}
                </p>

                {/* Specs */}
                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">RAM:</span>
                    <span className="font-medium">{laptop.ram}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Storage:</span>
                    <span className="font-medium">{laptop.storage}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Processor:</span>
                    <span className="font-medium">{laptop.generation}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">(4.8)</span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      TSh {laptop.price}
                    </p>
                    <p className="text-xs text-gray-500">+ VAT</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(laptop)}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <span className="text-sm">🛒</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredLaptops.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No laptops found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
