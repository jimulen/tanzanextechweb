import mongoose, { Schema, Model } from 'mongoose';

interface IDesktop {
  name: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  graphics: string;
  price: number;
  image: string;
  description: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DesktopSchema = new Schema<IDesktop>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    processor: {
      type: String,
      required: true,
    },
    ram: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    graphics: {
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

const Desktop: Model<IDesktop> = mongoose.models.Desktop || mongoose.model<IDesktop>('Desktop', DesktopSchema);

export default Desktop;
