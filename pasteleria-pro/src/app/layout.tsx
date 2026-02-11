// src/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pastelería Gourmet | Template Pro',
  description: 'Los mejores pasteles a un click de distancia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
          <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-pink-600">SweetMaster SPA</h1>
            <div className="flex gap-4 items-center">
              <span className="cursor-pointer">🛒 Carrito (0)</span>
            </div>
          </nav>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t mt-20 py-8 text-center text-slate-500">
          <p>© 2026 - Template Ecommerce Profesional</p>
        </footer>
      </body>
    </html>
  );
}