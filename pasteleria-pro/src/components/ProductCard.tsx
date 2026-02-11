"use client";
import { useCart } from "@/lib/store";

export default function ProductCard({ product }: { product: any }) {
  // Traemos la función addItem de nuestra tienda global
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="h-48 bg-slate-200">
        <img
          src={product.image_url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={() => addItem(product)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 active:scale-95 transition-all"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
