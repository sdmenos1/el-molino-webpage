import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useEffect, useState } from "react";

export function CartFab() {
  const { count, total, setOpen } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 450);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Abrir carrito"
      className={`fixed bottom-5 right-5 z-40 group transition-all ${
        animateCart ? "animate-cart-pop" : ""
      }`}
    >
      <div className="glass-panel flex items-center gap-3 rounded-full pl-4 pr-5 py-3 shadow-[0_20px_60px_-20px_rgba(230,184,0,0.5)] transition-transform hover:scale-105">
        <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[var(--gold-soft)] to-[var(--gold-deep)] text-carbon">
          <ShoppingBag size={18} strokeWidth={2.2} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-carbon border border-gold px-1 text-[0.65rem] font-bold text-gold">
              {count}
            </span>
          )}
        </div>
        <div className="hidden sm:block text-left leading-tight">
          <div className="text-[0.62rem] tracking-[0.25em] uppercase text-gold-soft/80">Mi pedido</div>
          <div className="font-serif text-base text-cream">
            {count === 0 ? "Vacío" : `${total.toFixed(2).replace(".", ",")}€`}
          </div>
        </div>
      </div>
    </button>
  );
}
