import mongoose, { Schema, Model } from 'mongoose';

interface IAccessory {
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AccessorySchema = new Schema<IAccessory>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sold: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Accessory: Model<IAccessory> = mongoose.models.Accessory || mongoose.model<IAccessory>('Accessory', AccessorySchema);

export default Accessory;
