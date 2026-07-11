"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import accessoriesData from "../../../../data/accessories.json";

export default function AccessoryDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const accessory = accessoriesData.find(a => a.id === parseInt(params.id));
  
  if (!accessory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products/accessories" className="text-green-600 hover:text-green-700">
            ← Back to Accessories
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = () => {
    if (typeof window !== 'undefined' && (window as any).addToCart) {
      (window as any).addToCart({
        id: `accessory-${accessory.id}`,
        name: accessory.name,
        price: parseInt(accessory.price.replace(/,/g, '')),
        quantity: quantity,
        image: accessory.image
      });
    }
  };

  const images = [accessory.image, "/products/acc2.jpg", "/products/acc3.jpg"]; // Sample additional images

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
            <Link href="/products/accessories" className="hover:text-green-600 transition">Accessories</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{accessory.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link href="/products/accessories" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Accessories
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative h-96 bg-gray-50 rounded-2xl overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={accessory.name}
                fill
                className="object-contain p-8"
              />
              
              {/* Hover Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 w-20 bg-gray-50 rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index ? 'border-green-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${accessory.name} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {accessory.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-4">
                {accessory.desc}
              </p>

              {/* Category and Brand */}
              <div className="flex gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {accessory.category}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {accessory.brand}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.6)</span>
                </div>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">
                    TSh {accessory.price}
                  </span>
                  <span className="text-gray-500">+ VAT</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Free shipping on orders over TSh 1,000,000
                </p>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-50 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-50 transition"
                  >
                    +
                  </button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addToCart}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free Delivery</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">1 Year Warranty</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600">30 Days Return</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {accessory.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compatibility</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  Compatible with most modern laptops and desktop computers. 
                  USB connectivity ensures universal compatibility across devices.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
