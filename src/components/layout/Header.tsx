import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/desayunos", label: "Desayunos" },
  { to: "/menu", label: "Menú del Día" },
  { to: "/carta", label: "Carta" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count, setOpen: setCartOpen } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 450);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-dark py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full overflow-hidden border border-[color-mix(in_oklab,var(--gold)_55%,transparent)]">
            <img src={logo} alt="Logo El Molino" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight min-w-0">
            <div className="font-serif text-lg text-cream truncate">El Molino</div>
            <div className="text-[0.6rem] tracking-[0.3em] uppercase text-gold-soft/70">
              Cafetería · Fuenlabrada
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-gold" : "text-cream/70 hover:text-gold"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className={`relative grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-all ${
              animateCart ? "animate-cart-pop" : ""
            }`}
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={16} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-carbon">
                {count}
              </span>
            )}
          </button>
          <Link to="/carta" className="btn-gold">Armar pedido</Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden grid h-11 w-11 place-items-center rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] text-gold transition-transform duration-300 ${
            open ? "rotate-90" : ""
          }`}
          aria-label="Abrir menú"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mx-6 mt-3 rounded-2xl glass-panel p-6 animate-menu-slide-down">
          <div className="flex flex-col gap-4">
            {navLinks.map((l, idx) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`text-lg font-serif opacity-0 animate-link-slide-in transition-all duration-300 ${
                  pathname === l.to
                    ? "text-gold font-semibold pl-3 border-l-2 border-gold translate-x-1"
                    : "text-cream/80 hover:text-gold pl-0"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="gold-divider my-2" />
            <Link
              to="/carta"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
              className="btn-gold self-start opacity-0 animate-link-slide-in"
            >
              Armar pedido
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
