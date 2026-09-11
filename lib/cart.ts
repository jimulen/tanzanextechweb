// Helper functions for cart management compatible with localStorage
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToCart = (item: CartItem): void => {
  const currentCart = getCart();
  const existingIndex = currentCart.findIndex((i) => i.id === item.id);
  
  if (existingIndex > -1) {
    currentCart[existingIndex].quantity += item.quantity || 1;
  } else {
    currentCart.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }
  
  saveCart(currentCart);
};

export const removeFromCart = (id: string): void => {
  const currentCart = getCart();
  const updatedCart = currentCart.filter((item) => item.id !== id);
  saveCart(updatedCart);
};

export const updateCartQuantity = (id: string, quantity: number): void => {
  const currentCart = getCart();
  const updatedCart = currentCart
    .map((item) => (item.id === id ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  saveCart(updatedCart);
};

export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cart');
};

export const getCartTotal = (): number => {
  const currentCart = getCart();
  return currentCart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = (): number => {
  const currentCart = getCart();
  return currentCart.reduce((total, item) => total + item.quantity, 0);
};
