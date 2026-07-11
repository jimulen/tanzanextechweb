"use client";

import { useState } from "react";
import fs from "fs";
import path from "path";

export default function AdminProducts() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [generation, setGeneration] = useState("");
  const [features, setFeatures] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    // Save image in /public/products
    const imagePath = `/products/${image.name}`;
    const imageFile = new File([image], image.name); // for demo

    // Prepare new product object
    const newProduct = {
      id: Date.now(),
      name,
      desc,
      price,
      ram,
      storage,
      generation,
      features: features.split(",").map(f => f.trim()),
      image: imagePath
    };

    // Here: in real backend, save JSON in DB
    // For demo: append to laptops.json (requires server API)
    alert("Product added! (demo, needs backend integration)");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6 text-green-600">Admin: Add Laptop</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Price (Tsh)" value={price} onChange={e => setPrice(e.target.value)} className="input-field"/>
        <input type="text" placeholder="RAM" value={ram} onChange={e => setRam(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Storage" value={storage} onChange={e => setStorage(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Generation" value={generation} onChange={e => setGeneration(e.target.value)} className="input-field"/>
        <input type="text" placeholder="Features (comma separated)" value={features} onChange={e => setFeatures(e.target.value)} className="input-field"/>
        <input type="file" onChange={e => e.target.files && setImage(e.target.files[0])} className="input-field"/>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Add Product</button>
      </form>
    </div>
  );
}
