import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Cart from "@/components/Cart";
import { CartProvider } from '@/contexts/CartContext';
import '../globals.css';

const locales = ['en', 'sw'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar />
            {children}
            <Cart />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

