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
    
    // Ensure price is a number
    if (newLaptop.price && typeof newLaptop.price === 'string') {
      newLaptop.price = parseFloat(newLaptop.price);
    }
    
    const laptop = await Laptop.create({
      ...newLaptop,
      sold: false
    });
    
    return NextResponse.json(laptop, { status: 201 });
  } catch (error: any) {
    console.error('Error adding laptop:', error);
    return NextResponse.json({ 
      error: 'Failed to add laptop', 
      details: error.message 
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
