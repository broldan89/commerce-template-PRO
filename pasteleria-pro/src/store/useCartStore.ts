import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  clearCart: () => set({ cart: [] }),
}));