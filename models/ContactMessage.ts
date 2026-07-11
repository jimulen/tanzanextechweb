import mongoose, { Schema, Model } from 'mongoose';

interface IContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'replied';
  reply?: string;
  replyDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'replied'],
      default: 'pending',
    },
    reply: {
      type: String,
    },
    replyDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const ContactMessage: Model<IContactMessage> =
  mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);

export default ContactMessage;
