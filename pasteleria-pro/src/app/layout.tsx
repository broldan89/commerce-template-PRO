"use client"; // Vital para que Zustand funcione en el navegador

import { useCartStore } from "@/store/useCartStore";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// Nota: metadata no puede estar en un Client Component.
// Si necesitas SEO, lo ideal es mover el contenido a un 'Navbar' separado,
// pero por ahora vamos a hacer que funcione el diseño.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = useCartStore((state) => state.cart); // Conectamos al almacén

  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-pink-600">SweetMaster SPA</h1>
            <div className="flex gap-4 items-center">
              {/* Ahora el número se actualiza dinámicamente */}
              <span
                className={`cursor-pointer font-medium px-3 py-1 rounded-full border transition-all ${
                  cart.length > 0
                    ? "bg-pink-600 text-white border-pink-600 scale-110"
                    : "bg-pink-50 text-pink-700 border-pink-100"
                }`}
              >
                🛒 Carrito ({cart.length})
              </span>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="border-t mt-20 py-8 text-center text-slate-500">
          <p>© 2026 - Template Ecommerce Profesional</p>
        </footer>
      </body>
    </html>
  );
}
