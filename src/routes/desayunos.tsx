import { createFileRoute } from "@tanstack/react-router";
import { Clock, Coffee, Info, Star } from "lucide-react";
import churros from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.53.55 (1).jpeg";
import breakfastReal from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.56.28 (3).jpeg";
import tortillaReal from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.50 (6).jpeg";
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
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl">Carta de Desayunos</h2>
            <div className="hidden sm:block flex-1 mx-8 gold-divider" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Añadir al pedido</span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.04}>
                <article className="card-dark overflow-hidden group border border-border/60 hover:border-gold/50 transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {it.popular && (
                      <span className="absolute top-4 left-4 bg-gold text-carbon text-[0.65rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif text-xl group-hover:text-gold transition-colors">{it.name}</h3>
                        <span className="font-serif text-xl gold-text font-bold shrink-0">
                          {it.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>
                    </div>

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
        </div>
      </section>
    </>
  );
}
