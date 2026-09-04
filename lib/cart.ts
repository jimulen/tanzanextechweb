export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const addToCart = (item: CartItem) => {
  if (typeof window === 'undefined') return;

  const cart = getCart();
  const existingItemIndex = cart.findIndex(i => i.id === item.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Trigger cart update event
  window.dispatchEvent(new Event('cart-updated'));
};

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

export const removeFromCart = (id: string) => {
  if (typeof window === 'undefined') return;

  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  window.dispatchEvent(new Event('cart-updated'));
};

export const updateCartQuantity = (id: string, quantity: number) => {
  if (typeof window === 'undefined') return;

  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.id === id ? { ...item, quantity } : item
  );
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  window.dispatchEvent(new Event('cart-updated'));
};

export const clearCart = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cart-updated'));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};
