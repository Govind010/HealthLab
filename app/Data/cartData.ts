// Data/cartData.ts
export type CartItem = {
  name: string;
};

// this will hold the names of tests added to the cart
export const cartData: CartItem[] = [];

/**
 * Add a test by name.
 * Returns:
 *  - { added: true }   if it was added
 *  - { added: false }  if it was already present
 */
export function addTestToCart(name: string) {
  const alreadyInCart = cartData.some((item) => item.name === name);

  if (alreadyInCart) {
    return { added: false };
  }

  cartData.push({ name });
  return { added: true };
}

/**
 * Remove a test from the cart by name.
 */
export function removeTestFromCart(name: string) {
  const index = cartData.findIndex((item) => item.name === name);
  if (index !== -1) {
    cartData.splice(index, 1);
  }
}

/**
 * Clear the cart.
 */
export function clearCart() {
  cartData.splice(0, cartData.length);
}
