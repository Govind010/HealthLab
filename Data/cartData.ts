// Data/cartData.ts
export type CartItem = {
  name: string;
  desc: string;
  price: string; // e.g. "₹250"
  category: string;
};

export const cartData: CartItem[] = [];

// Simple event system for cart updates
type CartListener = () => void;
const cartListeners: CartListener[] = [];

export function subscribeToCart(listener: CartListener) {
  cartListeners.push(listener);
  return () => {
    const index = cartListeners.indexOf(listener);
    if (index > -1) {
      cartListeners.splice(index, 1);
    }
  };
}

function notifyCartChange() {
  cartListeners.forEach((listener) => listener());
}

export function addTestToCart(test: CartItem) {
  const alreadyInCart = cartData.some((item) => item.name === test.name);

  if (alreadyInCart) {
    return { added: false };
  }

  cartData.push(test);
  notifyCartChange();
  return { added: true };
}

export function removeTestFromCart(name: string) {
  const index = cartData.findIndex((item) => item.name === name);
  if (index !== -1) {
    cartData.splice(index, 1);
    notifyCartChange();
  }
}

export function clearCart() {
  cartData.length = 0;
  notifyCartChange();
}