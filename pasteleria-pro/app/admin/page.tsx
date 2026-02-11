// src/app/admin/page.tsx
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <Link
          href="/admin/nuevo"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700"
        >
          <Plus size={18} /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Producto</th>
              <th className="p-4 font-semibold">Precio</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-0 hover:bg-slate-50/50"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url}
                      className="w-10 h-10 rounded-md object-cover"
                      alt=""
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${product.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {product.active ? "Activo" : "Pausado"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-3 text-slate-400">
                    <button className="hover:text-blue-600">
                      <Edit size={18} />
                    </button>
                    <button className="hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
