import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer"; // Importamos tu nuevo carrito

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SweetMaster | Pastelería Artesanal",
  description: "Pedidos online con entrega inmediata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        {/* HEADER PROFESIONAL */}
        <header className="sticky top-0 z-[80] bg-white/80 backdrop-blur-md border-b">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-pink-600 leading-none">
                SweetMaster
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                Pastelería SPA
              </span>
            </div>

            {/* Aquí vive nuestro botón del carrito con su lógica */}
            <CartDrawer />
          </nav>
        </header>

        {/* CONTENIDO DE LA PÁGINA */}
        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="border-t mt-20 py-8 bg-white">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 SweetMaster - Creado con el Template Ecommerce Pro</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
