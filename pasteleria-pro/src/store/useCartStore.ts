import { create } from 'zustand';

// Definimos exactamente qué es un producto para que no haya errores de tipo
interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
}

interface CartState {
  cart: Product[];
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isOpen: false,
  // Al agregar, también abrimos el carrito automáticamente para dar feedback
  addToCart: (product) => 
    set((state) => ({ 
      cart: [...state.cart, product],
      isOpen: true 
    })),
  // Filtramos por ID para quitar el producto correcto
  removeFromCart: (id) => 
    set((state) => ({ 
      cart: state.cart.filter((item) => item.id !== id) 
    })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ cart: [] }),
}));