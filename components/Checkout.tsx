"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Truck, Shield, Check } from 'lucide-react';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout({ isOpen, onClose, items }: { 
  isOpen: boolean; 
  onClose: () => void;
  items: CheckoutItem[];
}) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card'
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500000 ? 0 : 25000;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment:', { formData, items, total });
    setStep(4); // Success step
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-green-600 text-white">
            <h2 className="text-2xl font-bold">Secure Checkout</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-green-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex h-[calc(90vh-88px)]">
            {/* Progress Steps */}
            <div className="w-64 bg-gray-50 p-6 border-r">
              <div className="space-y-4">
                {[
                  { id: 1, name: 'Cart Review', icon: <Truck className="w-4 h-4" /> },
                  { id: 2, name: 'Shipping', icon: <Truck className="w-4 h-4" /> },
                  { id: 3, name: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 4, name: 'Confirmation', icon: <Check className="w-4 h-4" /> },
                ].map((stepItem) => (
                  <div
                    key={stepItem.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                      step >= stepItem.id ? 'bg-green-100 text-green-700' : 'text-gray-500'
                    }`}
                    onClick={() => stepItem.id < 4 && setStep(stepItem.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepItem.id ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}>
                      {stepItem.icon}
                    </div>
                    <span className="font-medium">{stepItem.name}</span>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-8 p-4 bg-white rounded-lg">
                <h3 className="font-bold mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>TSh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'FREE' : `TSh ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%):</span>
                    <span>TSh {tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 font-bold flex justify-between">
                    <span>Total:</span>
                    <span className="text-green-600">TSh {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-xl font-bold mb-6">Review Your Order</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-green-600 font-bold">
                            TSh {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Proceed to Shipping
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-xl font-bold mb-6">Shipping Information</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h3 className="text-xl font-bold mb-6">Payment Method</h3>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600"
                      />
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mobile"
                        checked={formData.paymentMethod === 'mobile'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600"
                      />
                      <Smartphone className="w-5 h-5" />
                      <div>
                        <div className="font-semibold">Mobile Money</div>
                        <div className="text-sm text-gray-600">M-Pesa, Tigo Pesa, Airtel Money</div>
                      </div>
                    </label>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formData.paymentMethod === 'card' ? (
                      <>
                        <input
                          type="text"
                          placeholder="Card Number"
                          required
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            required
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    ) : (
                      <input
                        type="text"
                        placeholder="Mobile Money Number"
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    )}

                    <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <div className="font-semibold mb-1">Secure Payment</div>
                        <div>Your payment information is encrypted and secure. We never store your card details.</div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Complete Purchase - TSh {total.toLocaleString()}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Order Confirmed!</h3>
                  <p className="text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been received and will be processed shortly.
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
                    <p className="text-sm text-gray-600 mb-2">Order Number:</p>
                    <p className="font-bold text-lg mb-4">#TNX{Date.now()}</p>
                    <p className="text-sm text-gray-600">
                      You will receive an email confirmation shortly with your order details.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
