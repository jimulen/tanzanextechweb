import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Accessory from '@/models/Accessory';

export async function GET() {
  try {
    await connectDB();
    const accessories = await Accessory.find({}).sort({ createdAt: -1 });
    return NextResponse.json(accessories);
  } catch (error) {
    console.error('Error reading accessories data:', error);
    return NextResponse.json({ error: 'Failed to read accessories data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const newAccessory = await request.json();
    
    // Ensure price is a number
    if (newAccessory.price && typeof newAccessory.price === 'string') {
      newAccessory.price = parseFloat(newAccessory.price);
    }
    
    const accessory = await Accessory.create({
      ...newAccessory,
      sold: false
    });
    
    return NextResponse.json(accessory, { status: 201 });
  } catch (error: any) {
    console.error('Error adding accessory:', error);
    return NextResponse.json({ 
      error: 'Failed to add accessory', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();
    
    const accessory = await Accessory.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!accessory) {
      return NextResponse.json({ error: 'Accessory not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, accessory });
  } catch (error) {
    console.error('Error updating accessories:', error);
    return NextResponse.json({ error: 'Failed to update accessories' }, { status: 500 });
  }
}
