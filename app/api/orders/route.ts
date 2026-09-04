import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Laptop from '@/models/Laptop';
import Desktop from '@/models/Desktop';
import Accessory from '@/models/Accessory';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { customer, items, totalAmount, paymentMethod, notes } = body;

    // Validate required fields
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer information and items are required' },
        { status: 400 }
      );
    }

    // Validate customer information
    if (!customer.name || !customer.email || !customer.phone || !customer.address || !customer.city) {
      return NextResponse.json(
        { error: 'All customer fields are required' },
        { status: 400 }
      );
    }

    // Process items and get product details
    const processedItems = [];
    for (const item of items) {
      let product;
      const itemType = item.id.startsWith('laptop-') ? 'Laptop' :
                       item.id.startsWith('desktop-') ? 'Desktop' : 'Accessory';
      const productId = item.id.split('-')[1];

      if (itemType === 'Laptop') {
        product = await Laptop.findById(productId);
      } else if (itemType === 'Desktop') {
        product = await Desktop.findById(productId);
      } else {
        product = await Accessory.findById(productId);
      }

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.name}` },
          { status: 404 }
        );
      }

      processedItems.push({
        productId: product._id,
        itemType,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });
    }

    // Create order
    const order = await Order.create({
      customer,
      items: processedItems,
      totalAmount,
      paymentMethod: paymentMethod || 'stripe',
      notes,
      status: 'pending'
    });

    console.log('Order created:', order.orderNumber);

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}
