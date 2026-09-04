"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Smartphone, Building2, Lock, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) {
      router.push('/cart');
      return;
    }

    fetchOrder();
  }, [orderId, router]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch order');
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmPayment = (method: string) => {
    router.push(`/checkout/confirmation?orderId=${orderId}&method=${method}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/cart')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Information</h1>
          <p className="text-gray-600">Order #{order.orderNumber}</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            TSh {order.totalAmount.toLocaleString()}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* M-Pesa Payment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">M-Pesa</h3>
                <p className="text-sm text-gray-500">Lipa Na M-Pesa</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Account Name</p>
                <p className="font-semibold text-gray-900">Tanzanex Technology</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 text-lg">37221568</p>
                  <button
                    onClick={() => copyToClipboard('37221568', 'mpesa')}
                    className="text-green-600 hover:text-green-700 transition"
                  >
                    {copied === 'mpesa' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700 font-medium mb-2">How to pay:</p>
                <ol className="text-sm text-green-600 space-y-1 list-decimal list-inside">
                  <li>Go to M-Pesa menu on your phone</li>
                  <li>Select "Lipa Na M-Pesa"</li>
                  <li>Choose "Pay Bill"</li>
                  <li>Enter business number: 37221568</li>
                  <li>Enter account: Your Name</li>
                  <li>Enter amount: TSh {order.totalAmount.toLocaleString()}</li>
                  <li>Enter your M-Pesa PIN</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => handleConfirmPayment('mpesa')}
              className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              I've Paid with M-Pesa
            </button>
          </motion.div>

          {/* CRDB Bank Transfer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">CRDB Bank</h3>
                <p className="text-sm text-gray-500">Bank Transfer</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Account Name</p>
                <p className="font-semibold text-gray-900">JIMULEN JOHANSEN</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 text-lg">0152456798200</p>
                  <button
                    onClick={() => copyToClipboard('0152456798200', 'crdb')}
                    className="text-blue-600 hover:text-blue-700 transition"
                  >
                    {copied === 'crdb' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700 font-medium mb-2">How to pay:</p>
                <ol className="text-sm text-blue-600 space-y-1 list-decimal list-inside">
                  <li>Go to CRDB mobile app or branch</li>
                  <li>Select "Transfer" or "Pay Bill"</li>
                  <li>Enter account: 0152456798200</li>
                  <li>Enter amount: TSh {order.totalAmount.toLocaleString()}</li>
                  <li>Use reference: Order #{order.orderNumber}</li>
                  <li>Complete the transfer</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => handleConfirmPayment('crdb')}
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              I've Paid via CRDB
            </button>
          </motion.div>
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-gray-600">
                <span>{item.name} x {item.quantity}</span>
                <span>TSh {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>TSh {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Important Notice</p>
              <p className="text-sm text-yellow-700 mt-1">
                After completing your payment, please click the confirmation button above. 
                We will verify your payment and process your order. You will receive a confirmation email once your payment is verified.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
