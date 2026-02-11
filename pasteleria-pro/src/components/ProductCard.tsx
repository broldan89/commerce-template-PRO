"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group border rounded-2xl p-4 bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Imagen del producto */}
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded-xl bg-slate-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300">
            🍰
          </div>
        )}
      </div>

      {/* Información */}
      <div className="flex-grow">
        <h3 className="font-bold text-slate-800 text-lg mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {product.description || "Pastelería artesanal hecha con amor."}
        </p>
      </div>

      {/* Precio y Botón */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t">
        <span className="text-xl font-bold text-slate-900">
          ${product.price.toLocaleString()}
        </span>
        <button
          onClick={() => addToCart(product)}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 active:scale-95 transition-all shadow-sm"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
