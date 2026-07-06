import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";

type Props = {
  item: Omit<CartItem, "qty">;
  label?: string;
  className?: string;
  variant?: "solid" | "ghost" | "chip";
};

export function AddToCartButton({ item, label = "Añadir al pedido", className = "", variant = "solid" }: Props) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  const onClick = () => {
    add(item);
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  };

  const base = {
    solid: "btn-gold",
    ghost: "btn-ghost-gold",
    chip:
      "inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.15em] text-gold hover:bg-gold/15 transition-colors",
  }[variant];

  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {done ? <Check size={14} /> : <Plus size={14} />}
      {done ? "Añadido" : label}
    </button>
  );
}
