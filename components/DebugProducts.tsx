"use client";

import { useState, useEffect } from 'react';

export default function DebugProducts() {
  const [laptops, setLaptops] = useState<any[]>([]);
  const [desktops, setDesktops] = useState<any[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const laptopsRes = await fetch('/api/laptops');
        const desktopsRes = await fetch('/api/desktops');
        
        const laptopsData = await laptopsRes.json();
        const desktopsData = await desktopsRes.json();
        
        console.log('Laptops data:', laptopsData);
        console.log('Desktops data:', desktopsData);
        
        setLaptops(laptopsData);
        setDesktops(desktopsData);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="p-8 bg-yellow-100 border-2 border-yellow-300 rounded-lg mb-8">
      <h3 className="text-lg font-bold mb-4">Debug: Product Data</h3>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="font-bold mb-2">Laptops (First 2):</h4>
          {laptops.slice(0, 2).map((laptop, i) => (
            <div key={i} className="bg-white p-2 rounded mb-2 text-sm">
              <div><strong>Name:</strong> {laptop.name}</div>
              <div><strong>Price:</strong> TSh {laptop.price}</div>
              <div><strong>RAM:</strong> {laptop.ram}</div>
            </div>
          ))}
        </div>
        
        <div>
          <h4 className="font-bold mb-2">Desktops (First 1):</h4>
          {desktops.slice(0, 1).map((desktop, i) => (
            <div key={i} className="bg-white p-2 rounded mb-2 text-sm">
              <div><strong>Name:</strong> {desktop.name}</div>
              <div><strong>Price:</strong> TSh {desktop.price}</div>
              <div><strong>RAM:</strong> {desktop.ram}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
