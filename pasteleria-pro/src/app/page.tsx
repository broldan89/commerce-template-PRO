import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";
export default async function Home() {
  // Pedimos los productos a la base de datos
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error de Supabase:", error.message);
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Nuestras Especialidades
        </h1>
        <p className="text-slate-500">Pastelería artesanal recién horneada</p>
      </header>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mensaje si la tabla está vacía */}
      {products?.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          <p className="text-slate-400">
            Aún no hay productos en la vitrina...
          </p>
        </div>
      )}
    </main>
  );
}
