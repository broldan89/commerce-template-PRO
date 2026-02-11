"use client";
import { useCart } from "@/lib/store";

export default function CartCounter() {
  const items = useCart((state) => state.items);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-bold">
      🛒 {count}
    </div>
  );
}
