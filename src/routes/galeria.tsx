import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useMemo } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Sparkles, 
  Camera
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

// Importación de assets locales
import realVideo from "@/assets/nuevas-fotos/WhatsApp Video 2026-07-16 at 14.51.56.mp4";
import realImg_1 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.43.42 (8).jpeg";
import realImg_2 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.43.41 (1).jpeg";
import realImg_3 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.43.43.jpeg";
import realImg_4 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.55.44.jpeg";
import realImg_5 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.55.51.jpeg";
import realImg_6 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.50 (6).jpeg";
import realImg_7 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.49 (5).jpeg";
import realImg_8 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.52 (1).jpeg";
import realImg_9 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.47 (3).jpeg";
import realImg_10 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.51.jpeg";
import realImg_11 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.56.28 (3).jpeg";
import realImg_12 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.44.53 (3).jpeg";
import realImg_13 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.48.31.jpeg";
import realImg_14 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.49.21 (2).jpeg";
import realImg_15 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.49.42 (2).jpeg";
import realImg_16 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.49.52 (1).jpeg";
import realImg_17 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.53.55 (1).jpeg";
import realImg_18 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.57.17.jpeg";
import realImg_19 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.57.23.jpeg";
import realImg_20 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.46.34.jpeg";
import realImg_21 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.48 (1).jpeg";
import realImg_22 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.54.21.jpeg";
import realImg_23 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.11 (4).jpeg";
import realImg_24 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.12 (7).jpeg";
import realImg_25 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.13 (2).jpeg";
import realImg_26 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.14 (6).jpeg";
import realImg_27 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.15 (8).jpeg";
import realImg_28 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.16 (3).jpeg";
import realImg_29 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.17.jpeg";
import realImg_30 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.18 (2).jpeg";
import realImg_31 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.48.51.jpeg";
import realImg_32 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.55.28.jpeg";
import realImg_33 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.40.35.jpeg";
import realImg_34 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.52.00.jpeg";
import tortillaReal from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.50 (6).jpeg";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería Multimedia Premium · Cafetería El Molino Fuenlabrada" },
      {
        name: "description",
        content:
          "Explora la galería visual de Cafetería El Molino en Fuenlabrada. Instalaciones, nuestro equipo de trabajo, platos caseros, raciones y vídeos en acción.",
      },
      { property: "og:title", content: "Galería Multimedia · Cafetería El Molino Fuenlabrada" },
      {
        property: "og:description",
        content:
          "Explora en imágenes y vídeo nuestra taberna tradicional: desayunos, raciones, eventos especiales y momentos de nuestros clientes.",
      },
    ],
  }),
  component: GalleryPage,
});

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video";
  category: "local" | "equipo" | "clientes" | "servicios" | "resultados" | "eventos";
  src: string;
  aspectRatio: string;
  author?: string;
  socialPlatform?: string;
}

// Catálogo de imágenes y vídeos optimizados
const mediaItems: MediaItem[] = [
  {
    id: "vid-1",
    title: "Ambiente y Sabor en El Molino",
    description: "Vídeo en directo de nuestra cocina y servicio en el local.",
    type: "video",
    category: "servicios",
    src: realVideo,
    aspectRatio: "aspect-[9/16]",
  },
  {
    id: "img-2",
    title: "Fachada El Molino",
    description: "Nuestra entrada clásica, fundada en 1967 en Fuenlabrada.",
    type: "image",
    category: "local",
    src: realImg_1,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-3",
    title: "Pescado Fresco a la Plancha",
    description: "Lomos de pescado del día cocinados al punto con ajo, perejil y limón.",
    type: "image",
    category: "resultados",
    src: realImg_2,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-4",
    title: "Nuestro Equipo de Cocina",
    description: "Preparando cada plato con el cariño de la cocina casera.",
    type: "image",
    category: "equipo",
    src: realImg_3,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-5",
    title: "Catering y Celebraciones",
    description: "Salón preparado para cumpleaños y eventos privados.",
    type: "image",
    category: "eventos",
    src: realImg_4,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-6",
    title: "Café Bombon Especial",
    description: "Capas de café, leche condensada y chocolate Toblerone.",
    type: "image",
    category: "servicios",
    src: realImg_5,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-7",
    title: "Nuestra Famosa Tortilla",
    description: "Jugosa, dorada por fuera y hecha a diario.",
    type: "image",
    category: "resultados",
    src: realImg_6,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-8",
    title: "Salón y Comedor",
    description: "Mesas acogedoras perfectas para comer nuestro menú casero.",
    type: "image",
    category: "local",
    src: realImg_7,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-9",
    title: "Tardes de Tapas",
    description: "Clientes compartiendo raciones and buenos momentos en El Molino.",
    type: "image",
    category: "clientes",
    src: realImg_8,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-10",
    title: "El Salón de El Molino",
    description: "Interior rústico y acogedor con la barra de madera tradicional.",
    type: "image",
    category: "local",
    src: realImg_9,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-11",
    title: "Noche de Eventos",
    description: "Copas preparadas y buen ambiente para tus celebraciones.",
    type: "image",
    category: "eventos",
    src: realImg_10,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-12",
    title: "Desayuno Tradicional",
    description: "Zumo natural, tostada con tomate y café arábica.",
    type: "image",
    category: "servicios",
    src: realImg_11,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-13",
    title: "Burrata y Tomate",
    description: "Plato fresco y gourmet elaborado con ingredientes de temporada.",
    type: "image",
    category: "resultados",
    src: realImg_12,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-14",
    title: "Miércoles de Paella",
    description: "Platos listos de nuestra paella marinera recién hecha.",
    type: "image",
    category: "resultados",
    src: realImg_13,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-15",
    title: "Ambiente Familiar",
    description: "El rincón del barrio donde todos se sienten en casa.",
    type: "image",
    category: "clientes",
    src: realImg_14,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-16",
    title: "Servicio de Sala",
    description: "Siempre atentos para ofrecerte la mejor atención.",
    type: "image",
    category: "equipo",
    src: realImg_15,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-17",
    title: "Catering y Celebraciones",
    description: "Salón preparado para cumpleaños y eventos privados.",
    type: "image",
    category: "eventos",
    src: realImg_16,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-18",
    title: "Porras Artesanas",
    description: "Hechas en nuestro obrador cada mañana.",
    type: "image",
    category: "servicios",
    src: realImg_17,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-19",
    title: "Lomos a la Plancha",
    description: "Pescado fresco del día con ajito y perejil.",
    type: "image",
    category: "resultados",
    src: realImg_18,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-20",
    title: "Detalles del Local",
    description: "Decoración tradicional en piedra y madera.",
    type: "image",
    category: "local",
    src: realImg_19,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-21",
    title: "Momentos Especiales",
    description: "Risas y cañas compartidas entre amigos.",
    type: "image",
    category: "clientes",
    src: realImg_20,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-22",
    title: "Nuestro Equipo de Cocina",
    description: "Preparando cada plato con el cariño de la cocina casera.",
    type: "image",
    category: "equipo",
    src: realImg_21,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-23",
    title: "Nido de Patata y Huevo Poché",
    description: "Patatas paja crujientes con huevo poché, chives y salsa gourmet.",
    type: "image",
    category: "resultados",
    src: realImg_22,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-24",
    title: "Caña Bien Tirada",
    description: "Cerveza fresquísima servida con la presión perfecta.",
    type: "image",
    category: "servicios",
    src: realImg_23,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-26",
    title: "Nuestra Barra",
    description: "Donde servimos el primer café de la mañana desde las 07:00.",
    type: "image",
    category: "local",
    src: realImg_25,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-27",
    title: "Tardes de Tapas",
    description: "Clientes compartiendo raciones y buenos momentos en El Molino.",
    type: "image",
    category: "clientes",
    src: realImg_26,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-28",
    title: "Servicio de Sala",
    description: "Siempre atentos para ofrecerte la mejor atención.",
    type: "image",
    category: "equipo",
    src: realImg_27,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-29",
    title: "Noche de Eventos",
    description: "Copas preparadas y buen ambiente para tus celebraciones.",
    type: "image",
    category: "eventos",
    src: realImg_28,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-30",
    title: "Fachada El Molino",
    description: "Nuestra fachada clásica, fundada en 1967 en Fuenlabrada.",
    type: "image",
    category: "local",
    src: realImg_29,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-31",
    title: "Pincho de Brie y Jamón",
    description: "Queso brie fundido y jamón serrano con reducción balsámica.",
    type: "image",
    category: "resultados",
    src: realImg_30,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-32",
    title: "Terraza Exterior",
    description: "Disfruta de tus raciones al aire libre en nuestra terraza.",
    type: "image",
    category: "local",
    src: realImg_31,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-33",
    title: "Tapa de Brie y Jamón Serrano",
    description: "Queso brie fundido y melocotón asado con reducción balsámica.",
    type: "image",
    category: "resultados",
    src: realImg_32,
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-34",
    title: "Nuestro Equipo de Cocina",
    description: "Preparando cada plato con el cariño de la cocina casera.",
    type: "image",
    category: "equipo",
    src: realImg_33,
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-35",
    title: "Catering y Celebraciones",
    description: "Salón preparado para cumpleaños y eventos privados.",
    type: "image",
    category: "eventos",
    src: realImg_34,
    aspectRatio: "aspect-[4/3]",
  },
];

// Categorías del sistema de filtros
const categories = [
  { id: "all", label: "Todo" },
  { id: "local", label: "Local" },
  { id: "equipo", label: "Equipo" },
  { id: "clientes", label: "Clientes" },
  { id: "servicios", label: "Servicios" },
  { id: "resultados", label: "Resultados" },
  { id: "eventos", label: "Eventos" },
  { id: "videos", label: "Vídeos" },
] as const;

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Estados para el slider de "Antes y Después"
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const beforeAfterContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingSlider = useRef<boolean>(false);

  // Filtrado de elementos
  const filteredItems = mediaItems.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "videos") return item.type === "video";
    return item.category === activeCategory;
  });

  // Dividir ítems en 4 columnas para el marquee continuo vertical (sube y baja fluido)
  const col1 = useMemo(() => filteredItems.filter((_, i) => i % 4 === 0), [filteredItems]);
  const col2 = useMemo(() => filteredItems.filter((_, i) => i % 4 === 1), [filteredItems]);
  const col3 = useMemo(() => filteredItems.filter((_, i) => i % 4 === 2), [filteredItems]);
  const col4 = useMemo(() => filteredItems.filter((_, i) => i % 4 === 3), [filteredItems]);

  // Lógica del Slider interactivo "Antes y Después"
  const handleBeforeAfterMove = (clientX: number) => {
    if (!beforeAfterContainerRef.current) return;
    const rect = beforeAfterContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleBeforeAfterMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider.current) return;
    handleBeforeAfterMove(e.clientX);
  };

  const handleBeforeAfterTouchMove = (e: React.TouchEvent) => {
    handleBeforeAfterMove(e.touches[0].clientX);
  };

  return (
    <>
      {/* SECCIÓN INTRO */}
      <section className="relative pt-40 pb-12 overflow-hidden select-none">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center">Galería Visual Viva</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight">
              Nuestras fotos <span className="italic gold-text">en movimiento continuo</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70 leading-relaxed">
              Disfruta de la atmósfera real de Cafetería El Molino a través de nuestra cascada visual continua de platos, especialidades y momentos del local.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECCIÓN ANTES & DESPUÉS */}
      <section className="pb-16 select-none">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="card-dark overflow-hidden border border-white/5 shadow-2xl p-6 sm:p-10 grid gap-8 lg:grid-cols-12 items-center">
            {/* Texto explicativo */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-[0.65rem] uppercase tracking-wider font-semibold text-gold">
                <Sparkles size={11} /> Transformación
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
                De los Fogones a la Mesa
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Descubre el mimo detrás de nuestras especialidades culinarias. Elaboramos nuestra famosa tortilla con patatas gallegas seleccionadas, huevos de corral y cebolla pochada lentamente. 
              </p>
            </div>

            {/* Slider interactivo */}
            <div className="lg:col-span-7 flex justify-center">
              <div 
                ref={beforeAfterContainerRef}
                onMouseMove={handleBeforeAfterMouseMove}
                onTouchMove={handleBeforeAfterTouchMove}
                onMouseDown={() => { isDraggingSlider.current = true; }}
                onMouseUp={() => { isDraggingSlider.current = false; }}
                onMouseLeave={() => { isDraggingSlider.current = false; }}
                className="relative h-[320px] sm:h-[380px] w-full max-w-[500px] rounded-2xl overflow-hidden border border-border shadow-inner select-none cursor-ew-resize"
              >
                {/* Imagen Después */}
                <img 
                  src={tortillaReal} 
                  alt="" 
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
                />

                {/* Imagen Antes */}
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80" 
                    alt="" 
                    draggable={false}
                    className="absolute inset-0 h-[320px] sm:h-[380px] w-[500px] max-w-none object-cover pointer-events-none select-none"
                    style={{ width: beforeAfterContainerRef.current?.getBoundingClientRect().width }}
                  />
                </div>

                {/* Línea Divisora */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-gold cursor-ew-resize pointer-events-none flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute grid h-9 w-9 place-items-center rounded-full border border-gold bg-carbon shadow-2xl text-gold-soft pointer-events-auto">
                    <ChevronLeft size={16} className="absolute left-1" />
                    <ChevronRight size={16} className="absolute right-1" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FILTROS DE CATEGORÍA */}
      <section className="pb-8 select-none">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  active
                    ? "bg-gold text-carbon shadow-lg shadow-gold/15"
                    : "bg-carbon-2 border border-border text-cream/70 hover:border-gold-soft hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* CASCADA CONTINUA VERTICAL (MARQUESINA FLUIDA SUBE Y BAJA SIN MAREO) */}
      <section className="pb-32 select-none overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative h-[780px] sm:h-[850px] overflow-hidden gallery-mask rounded-3xl border border-white/5 bg-carbon-2/40 p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 h-full select-none pointer-events-none">
              
              {/* Columna 1 (Sube) */}
              <div className="overflow-hidden relative h-full">
                <div className="flex flex-col gap-4 sm:gap-6 animate-marquee-vertical-up">
                  {[...col1, ...col1].map((item, idx) => (
                    <div key={`c1-${item.id}-${idx}`} className="relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-2 shadow-xl shrink-0">
                      <div className={`${item.aspectRatio} relative overflow-hidden w-full`}>
                        {item.type === "video" ? (
                          <video src={item.src} playsInline autoPlay loop muted className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        ) : (
                          <img src={item.src} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna 2 (Baja - Desaparece abajo y aparece arriba continuamente) */}
              <div className="overflow-hidden relative h-full">
                <div className="flex flex-col gap-4 sm:gap-6 animate-marquee-vertical-down">
                  {[...col2, ...col2].map((item, idx) => (
                    <div key={`c2-${item.id}-${idx}`} className="relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-2 shadow-xl shrink-0">
                      <div className={`${item.aspectRatio} relative overflow-hidden w-full`}>
                        {item.type === "video" ? (
                          <video src={item.src} playsInline autoPlay loop muted className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        ) : (
                          <img src={item.src} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna 3 (Sube continuo) */}
              <div className="hidden md:block overflow-hidden relative h-full">
                <div className="flex flex-col gap-4 sm:gap-6 animate-marquee-vertical-up-fast">
                  {[...col3, ...col3].map((item, idx) => (
                    <div key={`c3-${item.id}-${idx}`} className="relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-2 shadow-xl shrink-0">
                      <div className={`${item.aspectRatio} relative overflow-hidden w-full`}>
                        {item.type === "video" ? (
                          <video src={item.src} playsInline autoPlay loop muted className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        ) : (
                          <img src={item.src} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna 4 (Baja continuo) */}
              <div className="hidden lg:block overflow-hidden relative h-full">
                <div className="flex flex-col gap-4 sm:gap-6 animate-marquee-vertical-down">
                  {[...col4, ...col4].map((item, idx) => (
                    <div key={`c4-${item.id}-${idx}`} className="relative overflow-hidden rounded-2xl border border-white/10 bg-carbon-2 shadow-xl shrink-0">
                      <div className={`${item.aspectRatio} relative overflow-hidden w-full`}>
                        {item.type === "video" ? (
                          <video src={item.src} playsInline autoPlay loop muted className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        ) : (
                          <img src={item.src} alt="" loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FINAL MINIMALISTA & PALETA INTEGRADA */}
      <section className="relative py-16 border-t border-white/5 select-none overflow-hidden">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center tracking-[0.25em] text-gold text-xs uppercase font-semibold mb-4">
              Comunidad & Rincón Visual
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white">
              Comparte tu momento <span className="italic gold-text block sm:inline mt-1 sm:mt-0 font-light">en El Molino</span>
            </h2>

            <p className="mt-6 text-base text-cream/70 max-w-xl mx-auto leading-relaxed">
              Etiquétanos en Instagram con <span className="text-cream font-medium">#ElMolinoFuenla</span> para formar parte de nuestra colección visual diaria.
            </p>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
              <a 
                href="https://wa.me/34611729769" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-gold"
              >
                <MessageCircle size={16} /> Preguntar por Reservas
              </a>

              <Link to="/carta" className="btn-ghost-gold">
                Ver Nuestra Carta
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
