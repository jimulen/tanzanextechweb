# TanzaNexTech Website

A modern Next.js website for TanzaNexTech, a technology company in Tanzania.

## Tech Stack

- **Framework**: Next.js 16.1.2 with App Router
- **Database**: MongoDB with Mongoose
- **Styling**: TailwindCSS
- **UI Components**: Headless UI, Heroicons, Lucide React
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Email**: Nodemailer
- **Payments**: Stripe (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Vercel account (for deployment)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tanzanex?retryWrites=true&w=majority
NEXT_PUBLIC_ADMIN_USERNAME=your_admin_username
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Database Setup

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Get your connection string
6. Add your IP to the whitelist (0.0.0.0/0 for Vercel)
7. Copy the connection string to your `.env.local`

### Email Setup (Optional)

For contact form replies:

1. Enable 2FA on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2FA → App Passwords
   - Generate a new app password
3. Use the app password in `EMAIL_PASS`

## Deployment

### Deploy to Vercel

1. **Push code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jimulen/tanzanextechweb.git
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NEXT_PUBLIC_ADMIN_USERNAME`: Admin username
     - `NEXT_PUBLIC_ADMIN_PASSWORD`: Admin password
     - `EMAIL_USER`: Your email (for contact replies)
     - `EMAIL_PASS`: Your email app password
   - Click "Deploy"

3. **Configure custom domain** (optional):
   - In Vercel project settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Environment Variables for Vercel

Required environment variables:
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_ADMIN_USERNAME` - Admin login username
- `NEXT_PUBLIC_ADMIN_PASSWORD` - Admin login password
- `EMAIL_USER` - Email for contact form replies (optional)
- `EMAIL_PASS` - Email app password (optional)

## Admin Access

- URL: `https://your-domain.com/admin/login`
- Default credentials (change in production):
  - Username: `tanzanex`
  - Password: `Tech2024!`

## Project Structure

```
tanzanextech/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form API
│   │   ├── laptops/       # Laptops API
│   │   ├── desktops/      # Desktops API
│   │   └── accessories/   # Accessories API
│   └── page.tsx           # Home page
├── components/            # React components
├── lib/                   # Utility functions
│   └── mongodb.ts         # MongoDB connection
├── models/                # Mongoose models
│   ├── ContactMessage.ts
│   ├── Laptop.ts
│   ├── Desktop.ts
│   └── Accessory.ts
├── public/                # Static assets
└── data/                  # JSON data (legacy)
```

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact messages (admin)
- `PUT /api/contact` - Reply to contact message
- `GET /api/laptops` - Get all laptops
- `POST /api/laptops` - Add new laptop (admin)
- `PUT /api/laptops` - Update laptop (admin)
- `GET /api/desktops` - Get all desktops
- `POST /api/desktops` - Add new desktop (admin)
- `PUT /api/desktops` - Update desktop (admin)
- `GET /api/accessories` - Get all accessories
- `POST /api/accessories` - Add new accessory (admin)
- `PUT /api/accessories` - Update accessory (admin)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
