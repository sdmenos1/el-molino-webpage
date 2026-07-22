import { createFileRoute } from "@tanstack/react-router";
import { Clock, Coffee, Info, Star } from "lucide-react";
import imgAmericano from "@/assets/desayunos/wp_media_6_americano.jpeg";
import imgOmelette from "@/assets/desayunos/wp_media_45_desayuno.jpg";
import imgFuerte from "@/assets/desayunos/wp_media_7_fuerte.jpeg";
import imgTostadaTomate from "@/assets/desayunos/wp_media_10_tostada_y_tomate.jpeg";
import imgTostadaJamon from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.48 (3).jpeg";
import imgCroissant from "@/assets/desayunos/wp_media_72_croisant-y-cafe.png";
import imgBolleria from "@/assets/desayunos/wp_media_28_cafe-el-molino.jpeg";
import imgChurros from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.53.55 (1).jpeg";
import imgCafe from "@/assets/desayunos/wp_media_43_cafe-el-molino.jpg";
import { Reveal } from "@/components/Reveal";
import { AddToCartButton } from "@/components/AddToCartButton";

export const Route = createFileRoute("/desayunos")({
  head: () => ({
    meta: [
      { title: "Desayunos · Cafetería El Molino en Fuenlabrada" },
      { name: "description", content: "Empieza el día con nuestros desayunos tradicionales: tostadas con jamón, café recién hecho, churros y desayuno americano. Desde las 07:00 todos los días." },
      { property: "og:title", content: "Desayunos · Cafetería El Molino" },
      { property: "og:description", content: "Desayunos tradicionales y completos desde las 07:00 en Fuenlabrada." },
    ],
  }),
  component: Desayunos,
});

const items = [
  {
    id: "des-americano",
    name: "Americano (Beicon, patata y huevo frito)",
    desc: "Beicon crujiente, patatas fritas y huevo frito.",
    allergens: "Gluten, sulfitos, leche",
    price: 5.50,
    img: imgAmericano,
  },
  {
    id: "des-omelette",
    name: "Omelette (Tortilla de huevo, jamón york, lechuga y tomate)",
    desc: "Tortilla de huevo con jamón york, lechuga y tomate natural.",
    allergens: "Gluten, sulfitos, leche",
    price: 6.00,
    img: imgOmelette,
  },
  {
    id: "des-fuerte",
    name: "Fuerte (2 Huevos fritos, cruasán plancha, café o zumo natural)",
    desc: "2 Huevos fritos, cruasán a la plancha recién hecho, café o zumo natural.",
    allergens: "Gluten, sulfitos, leche",
    price: 7.00,
    img: imgFuerte,
    popular: true,
  },
  {
    id: "des-tost-tomate",
    name: "Tostada y tomate",
    desc: "Tostada artesana con tomate rallado natural y aceite de oliva virgen extra. Extra 0.30 €.",
    allergens: "Gluten, sulfitos, leche",
    price: 3.00,
    img: imgTostadaTomate,
  },
  {
    id: "des-tost-jamon",
    name: "Tostada con jamón",
    desc: "Tostada artesana con tomate rallado natural y jamón ibérico curado.",
    allergens: "Gluten, sulfitos, leche",
    price: 5.00,
    img: imgTostadaJamon,
    popular: true,
  },
  {
    id: "des-croissant",
    name: "Croissant y café",
    desc: "Croissant artesano mantecoso acompañado de café caliente recién molido.",
    allergens: "Gluten, sulfitos, leche",
    price: 3.00,
    img: imgCroissant,
  },
  {
    id: "des-bolleria",
    name: "Bollería y café",
    desc: "Pieza de bollería artesana recién horneada acompañada de café recién molido.",
    allergens: "Gluten, sulfitos, leche",
    price: 3.00,
    img: imgBolleria,
  },
  {
    id: "des-churros-6",
    name: "Ración de churros (6 uds)",
    desc: "Churros tradicionales fritos al momento en aceite limpio, crujientes por fuera.",
    price: 3.50,
    img: imgChurros,
  },
  {
    id: "des-porras-3",
    name: "Ración de porras (3 uds)",
    desc: "Porras esponjosas y doradas preparadas artesanalmente cada mañana.",
    price: 3.90,
    img: imgChurros,
    popular: true,
  },
  {
    id: "des-chocolate",
    name: "Chocolate a la taza",
    desc: "Chocolate denso y aromático elaborado a fuego lento, ideal para mojar.",
    price: 2.80,
    img: imgChurros,
  },
  {
    id: "des-cafe",
    name: "Café de especialidad",
    desc: "Café en grano molido al momento (solo, cortado o con leche).",
    price: 1.60,
    img: imgCafe,
  },
];

function Desayunos() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <img src={imgChurros} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/85 to-background" />
        <div className="relative mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow">Nuestros Desayunos</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-tight">
              Empieza el día <span className="italic gold-text">desde las 07:00</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70 leading-relaxed">
              Café recién molido, tostadas con jamón ibérico de primera, desayuno americano y crujientes porras artesanales.
              Desayunos tradicionales con el sabor y cariño de siempre en Fuenlabrada.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-gold">
              <Clock size={14} /> Pedidos para llevar o consumir desde las 07:00 AM
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img src={imgAmericano} alt="Desayuno Americano en Cafetería El Molino" loading="lazy" className="h-[520px] w-full object-cover" />
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
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="font-serif text-xl group-hover:text-gold transition-colors">{it.name}</h3>
                        <span className="font-serif text-xl gold-text font-bold shrink-0">
                          {it.price.toFixed(2).replace(".", ",")} €
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-cream/70 leading-relaxed mb-3">{it.desc}</p>
                      {it.allergens && (
                        <span className="inline-block text-[0.7rem] text-muted-foreground/70 bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                          ({it.allergens})
                        </span>
                      )}
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
