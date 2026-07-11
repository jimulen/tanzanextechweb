"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    desc: string;
    price: number;
    image: string;
    rating?: number;
    inStock?: boolean;
  };
  onAddToCart?: (product: any) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    } else if (typeof window !== 'undefined' && (window as any).addToCart) {
      // Fallback to global cart function
      (window as any).addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Stock Badge */}
        {product.inStock !== false && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            In Stock
          </div>
        )}
        
        {/* Rating */}
        {product.rating && (
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{product.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.desc}
        </p>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-green-600">
              TSh {product.price.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">+ VAT</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors"
            disabled={product.inStock === false}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
