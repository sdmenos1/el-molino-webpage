import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Coffee, Info, Maximize2, Sparkles, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import imgAmericano from "@/assets/desayunos/wp_media_6_americano.jpeg";
import imgOmelette from "@/assets/desayunos/wp_media_45_desayuno.jpg";
import imgFuerte from "@/assets/desayunos/wp_media_7_fuerte.jpeg";
import imgTostadaTomate from "@/assets/desayunos/wp_media_10_tostada_y_tomate.jpeg";
import imgTostadaJamon from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.48 (3).jpeg";
import imgCroissant from "@/assets/desayunos/wp_media_72_croisant-y-cafe.png";
import imgBolleria from "@/assets/desayunos/wp_media_28_cafe-el-molino.jpeg";
import imgChurros from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.53.55 (1).jpeg";
import imgCafe from "@/assets/desayunos/wp_media_43_cafe-el-molino.jpg";

import flyer1 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53.jpeg";
import flyer2 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53 (2).jpeg";
import flyer3 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53 (3).jpeg";
import flyer4 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53 (4).jpeg";
import flyer5 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53 (5).jpeg";
import flyer6 from "@/assets/desayuno-flyers/WhatsApp Image 2026-07-16 at 14.44.53 (6).jpeg";

import { Reveal } from "@/components/Reveal";
import { AddToCartButton } from "@/components/AddToCartButton";
import { SafeImage } from "@/components/SafeImage";

export const Route = createFileRoute("/desayunos")({
  head: () => ({
    meta: [
      { title: "Desayunos · Carteles y Ofertas en Cafetería El Molino Fuenlabrada" },
      { name: "description", content: "Empieza el día con nuestros desayunos tradicionales y promociones especiales: tostadas con jamón, café recién hecho, churros y desayuno americano. Desde las 07:00 todos los días." },
      { property: "og:title", content: "Desayunos · Carteles y Ofertas en Cafetería El Molino" },
      { property: "og:description", content: "Desayunos tradicionales y carteles promocionales desde las 07:00 en Fuenlabrada." },
    ],
  }),
  component: Desayunos,
});

const flyers = [
  { img: flyer1, title: "Oferta Desayunos #1" },
  { img: flyer2, title: "Oferta Desayunos #2" },
  { img: flyer3, title: "Oferta Desayunos #3" },
  { img: flyer4, title: "Oferta Desayunos #4" },
  { img: flyer5, title: "Oferta Desayunos #5" },
  { img: flyer6, title: "Oferta Desayunos #6" },
];

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
  const [selectedFlyer, setSelectedFlyer] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop para el carrusel de flyers cada 3.2 segundos
  useEffect(() => {
    const flyerTimer = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: 260, behavior: "smooth" });
        }
      }
    }, 3200);

    return () => clearInterval(flyerTimer);
  }, []);

  const scrollCarousel = (dir: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = dir === "left" ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const topItems = items.slice(0, 6);
  const bottomItems = items.slice(6);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <SafeImage src={imgChurros} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
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
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-sm text-gold">
                <Clock size={14} /> Pedidos para llevar o consumir desde las 07:00 AM
              </div>
              <a
                href="#flyers"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/40 text-gold hover:bg-gold/20 text-xs font-medium transition-all backdrop-blur-md shadow-lg"
              >
                <Sparkles size={13} /> Ver Carteles Informativos
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <SafeImage src={imgAmericano} alt="Desayuno Americano en Cafetería El Molino" loading="lazy" className="h-[460px] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CARTA DE DESAYUNOS - PRIMERA PARTE */}
      <section className="pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl">Carta de Desayunos</h2>
            <div className="hidden sm:block flex-1 mx-8 gold-divider" />
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Añadir al pedido</span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topItems.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.04}>
                <article className="card-dark overflow-hidden group border border-border/60 hover:border-gold/50 transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <SafeImage
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

      {/* SECCIÓN INTERMEDIA: MARQUEE INFINITO FLUIDO COMPACTO */}
      <section id="flyers" className="py-4 my-4 bg-carbon-2/60 border-y border-border/40 overflow-hidden relative">
        <div className="animate-marquee-horizontal gap-5 px-3">
          {[...flyers, ...flyers].map((fl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedFlyer(fl.img)}
              className="relative w-40 sm:w-48 md:w-52 shrink-0 rounded-xl overflow-hidden border border-white/15 bg-carbon cursor-pointer shadow-lg transition-transform duration-300 hover:scale-105 group"
            >
              <SafeImage
                src={fl.img}
                alt={fl.title}
                loading="lazy"
                className="w-full max-h-48 sm:max-h-56 object-contain rounded-xl"
              />
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] rounded-xl">
                <div className="h-9 w-9 rounded-full bg-carbon/90 border border-gold/60 flex items-center justify-center text-gold shadow-xl">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARTA DE DESAYUNOS - SEGUNDA PARTE */}
      <section className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bottomItems.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.04}>
                <article className="card-dark overflow-hidden group border border-border/60 hover:border-gold/50 transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <SafeImage
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

      {/* LIGHTBOX MODAL FULLSCREEN */}
      {selectedFlyer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-lg p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedFlyer(null)}
        >
          <button
            onClick={() => setSelectedFlyer(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Cerrar vista amplia"
          >
            <X size={26} />
          </button>
          <SafeImage
            src={selectedFlyer}
            alt="Flyer promocional"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
