import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Desktop from '@/models/Desktop';

export async function GET() {
  try {
    await connectDB();
    const desktops = await Desktop.find({}).sort({ createdAt: -1 });
    return NextResponse.json(desktops);
  } catch (error) {
    console.error('Error reading desktops data:', error);
    return NextResponse.json({ error: 'Failed to read desktops data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const newDesktop = await request.json();
    
    // Map form fields to schema fields
    const desktopData = {
      name: newDesktop.name,
      brand: newDesktop.brand || 'Generic',
      processor: newDesktop.processor || 'Intel Core i5',
      ram: newDesktop.ram,
      storage: newDesktop.storage,
      graphics: newDesktop.graphics || 'Integrated',
      price: typeof newDesktop.price === 'string' ? parseFloat(newDesktop.price.replace(/,/g, '')) : newDesktop.price,
      image: newDesktop.image,
      description: newDesktop.desc || newDesktop.description,
      sold: false
    };
    
    const desktop = await Desktop.create(desktopData);
    
    return NextResponse.json(desktop, { status: 201 });
  } catch (error: any) {
    console.error('Error adding desktop:', error);
    return NextResponse.json({ 
      error: 'Failed to add desktop', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();
    
    const desktop = await Desktop.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!desktop) {
      return NextResponse.json({ error: 'Desktop not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, desktop });
  } catch (error) {
    console.error('Error updating desktops:', error);
    return NextResponse.json({ error: 'Failed to update desktops' }, { status: 500 });
  }
}
