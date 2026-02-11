"use client";
import { useCart } from "@/lib/store";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, total } = useCart();

  const handleWhatsAppOrder = () => {
    // 1. Obtenemos el teléfono del .env
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

    // 2. Construimos el mensaje PRIMERO
    let message = "¡Hola! Quisiera hacer un pedido:%0A%0A";

    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} ($${item.price * item.quantity})%0A`;
    });

    message += `%0A*Total: $${total()}*%0A%0A¿Me confirman disponibilidad?`;

    // 3. Ejecutamos la apertura de WhatsApp al FINAL
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    } else {
      console.error(
        "No se encontró el número de WhatsApp en las variables de entorno",
      );
      alert("Error en la configuración: No hay número de destino.");
    }
  };

  return (
    <>
      {/* Botón Flotante / Contador */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors"
      >
        <ShoppingCart size={24} />
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Overlay y Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Tu Pedido</h2>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-center text-slate-500 mt-10">
                  El carrito está vacío
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-4 border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>${total()}</span>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  Confirmar por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
