import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  note?: string;
  category?: string;
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = "molino_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const value = useMemo<CartCtx>(() => {
    const add: CartCtx["add"] = (it) => {
      setItems((prev) => {
        const found = prev.find((p) => p.id === it.id && p.note === it.note);
        if (found) return prev.map((p) => (p === found ? { ...p, qty: p.qty + (it.qty ?? 1) } : p));
        return [...prev, { ...it, qty: it.qty ?? 1 }];
      });
    };
    return {
      items,
      add,
      remove: (id) => setItems((p) => p.filter((i) => i.id !== id)),
      setQty: (id, qty) =>
        setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i)))),
      clear: () => setItems([]),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      count: items.reduce((s, i) => s + i.qty, 0),
      open,
      setOpen,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const WHATSAPP_NUMBER = "34611729769";

export function buildWhatsappMessage(opts: {
  name: string;
  phone?: string;
  mode: "recoger" | "reservar";
  prepMode: "al-llegar" | "antes";
  time: string;
  items: CartItem[];
  total: number;
  notes?: string;
}) {
  const lines: string[] = [];
  lines.push("☕ NUEVA COMANDA DIGITAL · EL MOLINO");
  lines.push("");
  lines.push(`👤 Cliente: ${opts.name}`);
  if (opts.phone) lines.push(`📞 Teléfono: ${opts.phone}`);
  lines.push(`📦 Modalidad: ${opts.mode === "recoger" ? "Recoger en local (Takeaway)" : "Consumir en el local (Mesa)"}`);
  lines.push(`🍳 Preparación: ${opts.prepMode === "al-llegar" ? "Preparar al llegar al local (Garantiza frescura)" : `Preparar con antelación (${opts.time})`}`);
  lines.push("");
  lines.push("📝 DETALLE DE LA COMANDA:");
  opts.items.forEach((i) => {
    const sub = (i.price * i.qty).toFixed(2).replace(".", ",");
    lines.push(`• ${i.qty}x ${i.name}${i.note ? ` — ${i.note}` : ""} (${sub}€)`);
  });
  lines.push("");
  lines.push(`💰 Total estimado a pagar en local: ${opts.total.toFixed(2).replace(".", ",")}€`);
  if (opts.notes) {
    lines.push("");
    lines.push(`📎 Observaciones: ${opts.notes}`);
  }
  lines.push("");
  lines.push("¿Me confirman la comanda, por favor?");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
