import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, ShoppingBag, Store } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-0 border-t border-[color-mix(in_oklab,var(--gold)_18%,transparent)] bg-carbon-2/60">
      {/* Cómo funciona strip - Minimalist Architecture */}
      <div className="border-b border-white/5 bg-carbon-2/40 select-none">
        <div className="mx-auto max-w-7xl px-6 py-12 grid gap-6 sm:grid-cols-3">
          {[
            { n: "01", Icon: ShoppingBag, t: "Explora la carta", d: "Añade raciones, menús o desayunos a tu comanda en la web." },
            { n: "02", Icon: Store, t: "Elige modalidad", d: "Para tomar en local con mesa reservada o recoger recién hecho (Takeaway)." },
            { n: "03", Icon: MessageCircle, t: "Envía por WhatsApp", d: "Te confirmamos disponibilidad y tiempo estimado al momento." },
          ].map(({ n, Icon, t, d }) => (
            <div key={n} className="group flex flex-col p-6 rounded-2xl border border-white/5 bg-carbon/50 hover:border-gold/30 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <span className="font-serif text-3xl gold-text font-normal opacity-80 group-hover:opacity-100 transition-opacity">{n}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold border border-gold/20">
                  <Icon size={14} />
                </span>
              </div>
              <h4 className="font-serif text-lg font-normal text-cream group-hover:text-gold transition-colors">{t}</h4>
              <p className="mt-2 text-xs text-cream/65 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full overflow-hidden border border-[color-mix(in_oklab,var(--gold)_55%,transparent)]">
              <img src={logo} alt="Logo El Molino" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="font-serif text-xl">Cafetería El Molino</div>
              <div className="text-[0.66rem] tracking-[0.3em] uppercase text-gold-soft/70">
                Desayunos & Tapas · Fuenlabrada
              </div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Desayunos y café desde las 7:00, tapas y nuestra tortilla de patatas premiada Nº1 por la tarde.
            Un rincón en Fuenlabrada donde la tradición se saborea con cariño.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border text-gold-soft hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-border text-gold-soft hover:border-gold hover:text-gold transition-colors">
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4">Visítanos</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><MapPin size={16} className="shrink-0 mt-0.5 text-gold" /> Calle Francia, 11, Fuenlabrada</li>
            <li className="flex gap-3"><Phone size={16} className="shrink-0 mt-0.5 text-gold" /> 91 607 37 81 / 611 72 97 69</li>
            <li className="flex gap-3"><Clock size={16} className="shrink-0 mt-0.5 text-gold" /> Lun-Vie 07:00-22:00 · Sáb 08:00-21:00</li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Explorar</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/desayunos" className="text-muted-foreground hover:text-gold transition-colors">Desayunos Tradicionales</Link></li>
            <li><Link to="/menu" className="text-muted-foreground hover:text-gold transition-colors">Menú del Día</Link></li>
            <li><Link to="/carta" className="text-muted-foreground hover:text-gold transition-colors">Carta de Raciones</Link></li>
            <li><Link to="/galeria" className="text-muted-foreground hover:text-gold transition-colors">Galería Multimedia</Link></li>
            <li><Link to="/contacto" className="text-muted-foreground hover:text-gold transition-colors">Contacto & Ubicación</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cafetería El Molino. Todos los derechos reservados.</span>
          <span className="tracking-widest uppercase text-[0.65rem]">Hecho con cariño en Fuenlabrada</span>
        </div>
      </div>
    </footer>
  );
}
