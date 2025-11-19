// Data/cartData.ts
export type CartItem = {
  name: string;
  desc: string;
  price: string; // e.g. "₹250"
  category:string;
};

export const cartData: CartItem[] = [];

export function addTestToCart(test: CartItem) {
  const alreadyInCart = cartData.some((item) => item.name === test.name);

  if (alreadyInCart) {
    return { added: false };
  }

  cartData.push(test);
  return { added: true };
}

export function removeTestFromCart(name: string) {
  const index = cartData.findIndex((item) => item.name === name);
  if (index !== -1) {
    cartData.splice(index, 1);
  }
}

export function clearCart() {
  cartData.length = 0;
}
