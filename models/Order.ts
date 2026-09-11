import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderItem {
  productId?: mongoose.Types.ObjectId | string;
  itemType?: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface IOrder {
  orderNumber: string;
  customer: ICustomer;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      default: () => `TNX-${Date.now()}`,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    items: [
      {
        productId: { type: Schema.Types.Mixed },
        itemType: { type: String },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'mpesa',
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
