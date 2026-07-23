import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Laptop from '@/models/Laptop';

export async function GET() {
  try {
    await connectDB();
    const laptops = await Laptop.find({}).sort({ createdAt: -1 });
    return NextResponse.json(laptops);
  } catch (error) {
    console.error('Error reading laptops data:', error);
    return NextResponse.json({ error: 'Failed to read laptops data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const newLaptop = await request.json();
    
    console.log('Received laptop data:', newLaptop);
    
    // Map form fields to schema fields
    const laptopData = {
      name: newLaptop.name,
      brand: newLaptop.brand || 'Generic',
      processor: newLaptop.generation || newLaptop.processor || 'Intel Core i5',
      ram: newLaptop.ram,
      storage: newLaptop.storage,
      display: newLaptop.display || '15.6" FHD',
      graphics: newLaptop.graphics || 'Integrated',
      price: typeof newLaptop.price === 'string' ? parseFloat(newLaptop.price.replace(/,/g, '')) : newLaptop.price,
      image: newLaptop.image,
      description: newLaptop.desc || newLaptop.description,
      sold: false
    };
    
    console.log('Mapped laptop data:', laptopData);
    
    const laptop = await Laptop.create(laptopData);
    
    return NextResponse.json(laptop, { status: 201 });
  } catch (error: any) {
    console.error('Error adding laptop:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
    return NextResponse.json({ 
      error: 'Failed to add laptop', 
      details: error.message,
      validationErrors: error.errors
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();
    
    const laptop = await Laptop.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!laptop) {
      return NextResponse.json({ error: 'Laptop not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, laptop });
  } catch (error) {
    console.error('Error updating laptops:', error);
    return NextResponse.json({ error: 'Failed to update laptops' }, { status: 500 });
  }
}
