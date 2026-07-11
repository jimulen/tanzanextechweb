import mongoose, { Schema, Model } from 'mongoose';

interface ILaptop {
  name: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  price: number;
  image: string;
  description: string;
  sold: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LaptopSchema = new Schema<ILaptop>(
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
    display: {
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

const Laptop: Model<ILaptop> = mongoose.models.Laptop || mongoose.model<ILaptop>('Laptop', LaptopSchema);

export default Laptop;
