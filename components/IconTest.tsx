"use client";

import { Package, Monitor, Mouse } from 'lucide-react';

export default function IconTest() {
  return (
    <div className="p-8 bg-white border-2 border-gray-300 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Icon Test</h3>
      <div className="flex gap-4">
        <div className="p-4 bg-blue-500 text-white rounded">
          <Package className="w-8 h-8" />
        </div>
        <div className="p-4 bg-green-500 text-white rounded">
          <Monitor className="w-8 h-8" />
        </div>
        <div className="p-4 bg-purple-500 text-white rounded">
          <Mouse className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
