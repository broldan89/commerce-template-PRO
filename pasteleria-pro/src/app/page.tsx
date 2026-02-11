// src/app/page.tsx
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  // Consultamos los productos de la tabla que creamos en el SQL Editor
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true);

  if (error) return <div>Error cargando productos</div>;

  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nuestras Especialidades
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Hechas a mano con ingredientes premium.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-slate-500">
            Aún no hay pasteles en el catálogo. ¡Añade algunos en Supabase!
          </p>
        )}
      </div>
    </section>
  );
}
