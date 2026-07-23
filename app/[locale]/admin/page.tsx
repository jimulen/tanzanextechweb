"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AdminAuth from '@/components/AdminAuth';
import { 
  Plus, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  BarChart3,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MessageCircle,
  X
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  desc: string;
  price: string;
  image: string;
  sold: boolean;
  category?: string;
  [key: string]: any;
}

interface DashboardStats {
  totalProducts: number;
  totalSold: number;
  totalRevenue: number;
  activeUsers: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalSold: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    loadProducts();
    loadMessages();
    calculateStats();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const [laptopsRes, desktopsRes, accessoriesRes] = await Promise.all([
        fetch('/api/laptops'),
        fetch('/api/desktops'),
        fetch('/api/accessories')
      ]);

      if (!laptopsRes.ok || !desktopsRes.ok || !accessoriesRes.ok) {
        throw new Error('Failed to fetch products');
      }

      const laptops = await laptopsRes.json();
      const desktops = await desktopsRes.json();
      const accessories = await accessoriesRes.json();

      // Ensure we have arrays
      const laptopsArray = Array.isArray(laptops) ? laptops : [];
      const desktopsArray = Array.isArray(desktops) ? desktops : [];
      const accessoriesArray = Array.isArray(accessories) ? accessories : [];

      const allProducts = [
        ...laptopsArray.map((p: Product) => ({ ...p, category: 'Laptops' })),
        ...desktopsArray.map((p: Product) => ({ ...p, category: 'Desktops' })),
        ...accessoriesArray.map((p: Product) => ({ ...p, category: 'Accessories' }))
      ];

      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      // Set empty array on error to prevent further issues
      setProducts([]);
    }
  };

  const calculateStats = () => {
    // This would normally come from your backend
    setStats({
      totalProducts: products.length,
      totalSold: products.filter(p => p.sold).length,
      totalRevenue: products.filter(p => p.sold).reduce((sum, p) => sum + parseInt(p.price.replace(/,/g, '')), 0),
      activeUsers: 156 // Mock data
    });
  };

  const toggleSoldStatus = async (productId: number, category: string) => {
    try {
      let endpoint = '';
      switch (category) {
        case 'Laptops':
          endpoint = '/api/laptops';
          break;
        case 'Desktops':
          endpoint = '/api/desktops';
          break;
        case 'Accessories':
          endpoint = '/api/accessories';
          break;
      }

      // Get current data
      const response = await fetch(endpoint);
      const data = await response.json();
      
      // Update the sold status
      const updatedData = data.map((product: Product) => 
        product.id === productId ? { ...product, sold: !product.sold } : product
      );

      // Save updated data
      const updateResponse = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!updateResponse.ok) {
        throw new Error('Failed to update product status');
      }
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, sold: !p.sold } : p
      ));
      
      calculateStats();
    } catch (error) {
      console.error('Error updating product status:', error);
      alert('Error updating product status. Please try again.');
    }
  };

  const deleteProduct = async (productId: number, category: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // In a real app, you'd make an API call to delete the product
      console.log(`Delete product ${productId} from ${category}`);
      
      // Update local state
      setProducts(prev => prev.filter(p => p.id !== productId));
      calculateStats();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const formatPrice = (price: string) => {
    return `TSh ${parseInt(price.replace(/,/g, '')).toLocaleString()}`;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminLoginTime');
    window.location.href = '/admin/login';
  };

  const handleReply = async (messageId: string) => {
    if (!replyText.trim()) return;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId,
          reply: replyText
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update the message in local state
        setMessages(messages.map(msg => 
          msg.id === messageId 
            ? { ...msg, status: 'replied', reply: replyText, replyDate: new Date().toISOString() }
            : msg
        ));
        
        // Reset reply form
        setReplyingTo(null);
        setReplyText('');
        
        alert('Reply sent successfully!');
      } else {
        alert(result.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Reply error:', error);
      alert('Failed to send reply');
    }
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                TanzaNexTech
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View Site
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'add-product', label: 'Add Product', icon: Plus },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Products Sold</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSold}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalRevenue.toString())}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">New order received</span>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Product added: Dell XPS 15</span>
                  </div>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Product marked as sold</span>
                  </div>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.image}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.desc}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.sold 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.sold ? 'Sold' : 'Available'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleSoldStatus(product.id, product.category!)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title={product.sold ? 'Mark as Available' : 'Mark as Sold'}
                            >
                              {product.sold ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                            </button>
                            <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button
                              onClick={() => deleteProduct(product.id, product.category!)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add-product' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/products/add/laptop" className="block">
                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Add Laptop</h3>
                      <p className="text-sm text-gray-500 mt-2">Add a new laptop to inventory</p>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/products/add/desktop" className="block">
                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Add Desktop</h3>
                      <p className="text-sm text-gray-500 mt-2">Add a new desktop to inventory</p>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/products/add/accessory" className="block">
                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">Add Accessory</h3>
                      <p className="text-sm text-gray-500 mt-2">Add a new accessory to inventory</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Orders</h2>
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Contact Messages</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {messages.length} Messages
                </span>
              </div>
              
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages received yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{message.name}</h4>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleDateString()} at {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                          {message.status === 'pending' && (
                            <button
                              onClick={() => setReplyingTo(message.id)}
                              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              Reply
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {message.subject && (
                        <div className="mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {message.subject}
                          </span>
                        </div>
                      )}
                      
                      <div className="text-gray-700 bg-gray-50 p-3 rounded">
                        {message.message}
                      </div>
                      
                      {message.reply && (
                        <div className="mt-3 bg-green-50 border border-green-200 p-3 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Admin Reply
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.replyDate!).toLocaleDateString()} at {new Date(message.replyDate!).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="text-gray-700 text-sm">
                            {message.reply}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Reply Form Modal */}
        {replyingTo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reply to Message</h3>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Replying to: <strong>{messages.find(m => m.id === replyingTo)?.name}</strong>
                </p>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setReplyingTo(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReply(replyingTo)}
                  disabled={!replyText.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Store Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input
                        type="text"
                        defaultValue="TanzaNexTech"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="info@tanzanex.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Notification Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">Email notifications for new orders</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-700">Low stock alerts</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </AdminAuth>
  );
}
