import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12">
      {/* HERO SECTION - El "gancho" visual */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden rounded-3xl bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-50">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop"
            alt="Bakery Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center space-y-4 px-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight italic">
            Dulzura Real <span className="text-pink-500">en cada bocado</span>
          </h1>
          <p className="text-lg text-slate-200 max-w-lg mx-auto">
            Pastelería artesanal hecha con amor y entregada directamente en tu
            puerta.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <a
              href="#catalogo"
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-pink-500/30"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Nuestras Creaciones</h2>
            <p className="text-slate-500">Selección especial de temporada</p>
          </div>
          <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full italic">
            {products?.length || 0} Delicias disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECCIÓN INFORMATIVA - Para dar confianza */}
      <section className="bg-white border rounded-3xl p-8 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl mb-2">🚚</div>
          <h3 className="font-bold">Envío Rápido</h3>
          <p className="text-sm text-slate-500">
            Llegamos a toda la ciudad en el día.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🍰</div>
          <h3 className="font-bold">100% Artesanal</h3>
          <p className="text-sm text-slate-500">
            Ingredientes frescos y sin conservantes.
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-bold">Atención Directa</h3>
          <p className="text-sm text-slate-500">
            Pedidos personalizados vía WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
