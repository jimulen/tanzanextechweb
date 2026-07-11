"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Laptop, Monitor, Package, ShoppingCart, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const productCategories = [
    {
      title: "Laptops",
      description: "High-performance laptops for professionals, developers, and creatives",
      icon: <Laptop className="w-12 h-12" />,
      href: "/products/laptops",
      count: "12 Products",
      color: "from-blue-500 to-blue-600",
      features: ["Gaming Laptops", "Business Laptops", "Ultrabooks"]
    },
    {
      title: "Desktops",
      description: "Powerful desktop computers for business and professional use",
      icon: <Monitor className="w-12 h-12" />,
      href: "/products/desktops",
      count: "8 Products",
      color: "from-green-500 to-green-600",
      features: ["Workstations", "All-in-One", "Tower PCs"]
    },
    {
      title: "Accessories",
      description: "Essential computer accessories and peripherals",
      icon: <Package className="w-12 h-12" />,
      href: "/products/accessories",
      count: "24 Products",
      color: "from-purple-500 to-purple-600",
      features: ["Input Devices", "Connectivity", "Storage"]
    }
  ];

  const featuredProducts = [
    {
      name: "Dell XPS 15",
      category: "Laptops",
      price: "3,500,000",
      image: "/products/lap1.jpg",
      badge: "Best Seller"
    },
    {
      name: "HP EliteDesk 800 G6",
      category: "Desktops", 
      price: "1,800,000",
      image: "/products/dek2.jpg",
      badge: "Popular"
    },
    {
      name: "Wireless Mouse",
      category: "Accessories",
      price: "85,000",
      image: "/products/acc1.jpg",
      badge: "Top Rated"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-green-100">Products</span>
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Discover our comprehensive range of computers, laptops, and accessories 
              designed to meet your professional and personal computing needs.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-100">44+</div>
                <div className="text-green-200">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-100">3</div>
                <div className="text-green-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-100">24/7</div>
                <div className="text-green-200">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Product Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Category</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link href={category.href}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer">
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${category.color} p-8 text-white relative overflow-hidden`}>
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                          {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                        <p className="text-white/90">{category.count}</p>
                      </div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold">Browse Products</span>
                        <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Products</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {product.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">TSh {product.price}</p>
                  
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help you find the perfect computer solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#contact">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Contact Our Team
              </button>
            </Link>
            <Link href="#services">
              <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors">
                View Services
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
