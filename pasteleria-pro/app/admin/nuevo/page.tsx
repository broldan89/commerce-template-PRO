// src/app/admin/nuevo/page.tsx
"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NuevoProducto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      description: formData.get("description"),
      image_url: formData.get("image_url"), // Por ahora un link, luego haremos upload
      active: true,
    };

    const { error } = await supabase.from("products").insert([productData]);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Agregar Nuevo Pastel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nombre del producto
          </label>
          <input
            name="name"
            required
            className="w-full p-2 border rounded-lg"
            placeholder="Ej: Torta Red Velvet"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            name="price"
            type="number"
            required
            className="w-full p-2 border rounded-lg"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            URL de la Imagen
          </label>
          <input
            name="image_url"
            className="w-full p-2 border rounded-lg"
            placeholder="https://..."
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Publicar Producto"}
        </button>
      </form>
    </div>
  );
}
