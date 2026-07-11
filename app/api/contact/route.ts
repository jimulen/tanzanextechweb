import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

// Gmail email sending function
async function sendReplyEmail(toEmail: string, customerName: string, reply: string, subject: string) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ Email credentials not configured. Using simulation mode.');
      console.log('📧 EMAIL DETAILS (SIMULATION):');
      console.log('To:', toEmail);
      console.log('Customer:', customerName);
      console.log('Subject:', `Re: ${subject}`);
      console.log('Reply:', reply);
      console.log('---');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Email simulated successfully' };
    }

    // Real Gmail SMTP sending
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">TanzaNexTech</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your Technology Partner</p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin: 0 0 10px 0;">Dear ${customerName},</h2>
          <p style="color: #6b7280; margin: 0 0 20px 0;">Thank you for contacting TanzaNexTech. Here is our response to your inquiry:</p>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #10b981; border-radius: 5px;">
            <p style="color: #1f2937; margin: 0; line-height: 1.6;">${reply}</p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 10px;">
          <p style="color: #6b7280; margin: 0 0 10px 0;">Best regards,</p>
          <p style="color: #1f2937; margin: 0 0 5px 0; font-weight: bold;">TanzaNexTech Team</p>
          <p style="color: #6b7280; margin: 5px 0;">📞 +255 764 562 577</p>
          <p style="color: #6b7280; margin: 5px 0;">📧 info@tanzanex.tech</p>
          <p style="color: #6b7280; margin: 5px 0;">📍 Magomeni Kanisani, Dar es Salaam, Tanzania</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"TanzaNexTech" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `Re: ${subject}`,
      html: emailContent,
    };

    const result = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to: ${toEmail}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    
    return { success: true, message: 'Email sent successfully', messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, subject, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create new message
    const newMessage = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'pending'
    });

    console.log('New contact message received:', newMessage);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        id: newMessage._id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { messageId, reply } = body;
    
    if (!messageId || !reply) {
      return NextResponse.json(
        { error: 'Message ID and reply are required' },
        { status: 400 }
      );
    }

    // Find and update message
    const message = await ContactMessage.findById(messageId);
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    // Update message with reply
    message.status = 'replied';
    message.reply = reply;
    message.replyDate = new Date();
    await message.save();

    // Send reply email to customer
    try {
      const emailResult = await sendReplyEmail(
        message.email,
        message.name,
        reply,
        message.subject
      );
      
      if (emailResult.success) {
        console.log('Reply email sent to:', message.email);
      } else {
        console.error('Failed to send reply email:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Email service error:', emailError);
    }

    console.log('Message replied:', message);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Reply sent successfully',
        updatedMessage: message
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error replying to message:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    // Return all messages (for admin viewing)
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(
      { messages },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
