import { createFileRoute } from "@tanstack/react-router";
import { Clock, Coffee, Info, Star } from "lucide-react";
import churros from "@/assets/churros.jpg";
import breakfastReal from "@/assets/menu-dia.jpg";
import tortillaReal from "@/assets/tapas.jpg";
import { Reveal } from "@/components/Reveal";
import { AddToCartButton } from "@/components/AddToCartButton";

export const Route = createFileRoute("/desayunos")({
  head: () => ({
    meta: [
      { title: "Desayunos · Cafetería El Molino en Fuenlabrada" },
      { name: "description", content: "Empieza el día con nuestros desayunos tradicionales: tostadas con jamón, café recién hecho y churros crujientes. Desde las 07:00 todos los días." },
      { property: "og:title", content: "Desayunos · Cafetería El Molino" },
      { property: "og:description", content: "Desayunos tradicionales y completos desde las 07:00 en Fuenlabrada." },
    ],
  }),
  component: Desayunos,
});

const items = [
  { id: "des-americano", name: "Desayuno Americano", desc: "Huevo frito, beicon ahumado y crujientes patatas fritas.", price: 5.50, img: breakfastReal },
  { id: "des-omelette", name: "Desayuno Omelette", desc: "Sabrosa tortilla de huevo, jamón york, lechuga fresca y tomate natural.", price: 6.00, img: breakfastReal },
  { id: "des-fuerte", name: "Desayuno Fuerte", desc: "Dos huevos fritos, delicioso cruasán a la plancha, acompañado de café caliente o zumo natural.", price: 7.00, img: breakfastReal, popular: true },
  { id: "des-tost-tomate", name: "Tostada clásica con tomate", desc: "Pan de pueblo recién tostado con tomate rallado natural y aceite de oliva virgen extra.", price: 3.00, img: breakfastReal },
  { id: "des-tost-jamon", name: "Tostada premium con jamón", desc: "Pan de pueblo tostado, tomate natural rallado y jamón ibérico curado con AOVE.", price: 5.00, img: tortillaReal, popular: true },
  { id: "des-croissant", name: "Café con Croissant", desc: "Croissant horneado y café de especialidad recién molido.", price: 3.00, img: breakfastReal },
  { id: "des-bolleria", name: "Café con Bollería", desc: "Pieza de bollería artesanal a elegir con café caliente.", price: 3.00, img: breakfastReal },
  { id: "des-churros-6", name: "Ración de churros (6 uds)", desc: "Churros tradicionales fritos al momento en aceite limpio, crujientes por fuera.", price: 3.50, img: churros },
  { id: "des-porras-3", name: "Ración de porras (3 uds)", desc: "Porras esponjosas y doradas preparadas artesanalmente cada mañana.", price: 3.90, img: churros, popular: true },
  { id: "des-chocolate", name: "Chocolate a la taza", desc: "Chocolate denso y aromático elaborado a fuego lento, ideal para mojar.", price: 2.80, img: churros },
  { id: "des-cafe", name: "Café de especialidad", desc: "Café en grano molido al momento (solo, cortado o con leche).", price: 1.60, img: breakfastReal },
];

function Desayunos() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <img src={churros} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/85 to-background" />
        <div className="relative mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow">Nuestros Desayunos</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-tight">
              Empieza el día <span className="italic gold-text">desde las 07:00</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70 leading-relaxed">
              Café recién molido, tostadas con jamón ibérico de primera y crujientes porras artesanales.
              Desayunos tradicionales con el sabor y cariño de siempre en Fuenlabrada.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-gold">
              <Clock size={14} /> Pedidos para llevar o consumir desde las 07:00 AM
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl">
              <img src={churros} alt="Desayunos en Cafetería El Molino" loading="lazy" className="h-[520px] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CATÁLOGO DE TARJETAS */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl">Carta de Desayunos</h2>
            <div className="hidden sm:block flex-1 mx-8 gold-divider" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Añadir al pedido</span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.04}>
                <article className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-carbon-2/80 hover:border-gold/40 hover:-translate-y-1.5 transition-all duration-400 hover:shadow-gold">
                  {/* Contenedor de Imagen Superior */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-carbon shrink-0">
                    <img
                      src={it.img}
                      alt={it.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {it.popular && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold/90 backdrop-blur px-2.5 py-1 text-[0.6rem] uppercase tracking-wider font-semibold text-carbon">
                        <Star size={10} fill="currentColor" strokeWidth={0} /> Popular
                      </span>
                    )}
                    <div className="absolute bottom-3 right-3 rounded-lg bg-carbon/80 backdrop-blur px-2.5 py-1 text-sm font-semibold text-gold border border-gold/30">
                      {it.price.toFixed(2).replace(".", ",")} €
                    </div>
                  </div>
                  
                  {/* Cuerpo de la Tarjeta */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6 bg-carbon-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream tracking-tight group-hover:text-gold transition-colors">{it.name}</h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed flex-1">{it.desc}</p>
                    
                    {/* Botón de Añadir */}
                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
                      <AddToCartButton
                        item={{ id: it.id, name: it.name, price: it.price, category: "Desayunos" }}
                        variant="chip"
                        label="Añadir al pedido"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 rounded-2xl border border-gold/25 bg-gold/5 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start">
              <Info className="text-gold shrink-0 mt-1" size={22} />
              <div>
                <h3 className="font-serif text-xl">¿Prefieres pedir para llevar (Takeaway)?</h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  Añade tus desayunos y bebidas favoritos al carrito digital y envíanos tu comanda por WhatsApp. 
                  Te la prepararemos para que la recojas bien caliente y sin colas.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
