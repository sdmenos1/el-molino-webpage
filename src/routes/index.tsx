import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, UtensilsCrossed, Beer, ShoppingBag, MessageCircle, Store, Star, Quote, Sparkles, ChefHat, Utensils } from "lucide-react";
import heroBar from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.13 (2).jpeg";
import heroVideo from "@/assets/nuevas-fotos/2026-07-19_23-21-35_Lumina_1.mp4";
import slideImg1 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.40.35.jpeg";
import slideImg2 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.48 (3).jpeg";
import slideImg3 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.51 (1).jpeg";
import slideImg4 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.49 (4).jpeg";
import tapasSpread from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.52 (1).jpeg";
import menuDia from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.48.31.jpeg";
import raciones from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.54.21.jpeg";
import cervezas from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.11 (4).jpeg";
import churros from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.53.55 (1).jpeg";
import g1 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.43.42 (8).jpeg";
import g2 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.43.41 (1).jpeg";
import g3 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.44.53 (3).jpeg";
import g4 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.55.51.jpeg";
import g5 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.50 (6).jpeg";
import { Reveal } from "@/components/Reveal";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cafetería El Molino · Desayunos, Tapas y Menú en Fuenlabrada" },
      {
        name: "description",
        content:
          "La tortilla de patatas tradicional de El Molino. Desayunos desde las 07:00, paella los miércoles y tapas tradicionales. Pide por WhatsApp.",
      },
    ],
  }),
  component: Index,
});

const slides = [
  {
    img: heroBar,
    title: "Tradición y sabor casero,",
    highlight: "listos para compartir.",
    subtitle: "Desayunos desde las 07:00, menús caseros y tapas tradicionales en Fuenlabrada.",
  },
  {
    img: churros,
    title: "Desayunos Completos",
    highlight: "con porras artesanas.",
    subtitle: "Comienza el día con café recién molido y nuestras crujientes porras artesanas.",
  },
  {
    img: raciones,
    title: "Tapas y Raciones",
    highlight: "nuestra tortilla Nº1.",
    subtitle: "El sabor de siempre elaborado diariamente con ingredientes frescos seleccionados.",
  },
];

const fallbackSlides = [slideImg1, slideImg2, slideImg3, slideImg4];

const experiencias = [
  {
    id: "exp-desayunos",
    title: "Desayunos Tradicionales",
    desc: "Café de especialidad recién molido, tostadas crujientes con jamón ibérico de primera y porras artesanales preparadas cada mañana desde las 07:00 AM.",
    img: churros,
  },
  {
    id: "exp-menu",
    title: "Menú del Día Casero",
    desc: "Guisos caseros y platos tradicionales elaborados a diario. 4 primeros platos, 4 segundos y postre casero o café incluidos por solo 13,00 €.",
    img: menuDia,
  },
  {
    id: "exp-tapas",
    title: "Tapas & Raciones",
    desc: "Nuestra famosa tortilla de patatas jugosa con cebolla, croquetas de jamón cremosas y sartenadas con huevos rotos listas para disfrutar.",
    img: raciones,
  },
];

const galleryItems = [g1, g2, g3, g4, g5, tapasSpread];

function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const [activeExp, setActiveExp] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Mantener congelado el fotograma inicial del premio durante 2.5 segundos
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Rotación automática de frases del Hero cada 5.5 segundos
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(slideTimer);
  }, []);

  // Animación GSAP de entrada inicial
  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-text",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.15 }
      );
    },
    { scope: slideRef }
  );

  // Animación GSAP suave al cambiar entre frases del Hero
  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-text-dynamic",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    },
    { dependencies: [activeSlide], scope: slideRef }
  );

  // Animación de paralaje de columnas en galería
  useGSAP(
    () => {
      gsap.fromTo(
        ".gallery-col-left",
        { y: 60 },
        {
          y: -80,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".gallery-col-center",
        { y: -60 },
        {
          y: 60,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".gallery-col-right",
        { y: 70 },
        {
          y: -70,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: galleryRef }
  );

  return (
    <>
      {/* HERO SLIDER WITH VIDEO & FALLBACK BACKGROUND */}
      <section ref={slideRef} className="relative min-h-screen flex items-center overflow-hidden bg-carbon text-cream">
        {/* Background Video with Watermark Crop */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            ref={videoRef}
            src={heroVideo}
            muted
            playsInline
            onEnded={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
                setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                  }
                }, 2500);
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              top: "0",
              left: "0",
              objectFit: "cover",
              position: "absolute",
              transform: "translate3d(0,0,0)",
              willChange: "transform"
            }}
          />
          {/* Dual Overlay: Dark vertical gradient + subtle radial vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-carbon/95 via-carbon/75 to-carbon z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-carbon/80 via-carbon/40 to-carbon/90 z-20 pointer-events-none" />
        </div>

        <div className="relative z-30 mx-auto max-w-6xl px-6 pt-32 pb-24 w-full text-center">
          <div className="hero-text mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-carbon-2/70 backdrop-blur-md border border-white/15 shadow-2xl">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold-soft text-xs uppercase tracking-[0.25em] font-semibold">
              Fuenlabrada · Calle de Francia, 11
            </span>
          </div>

          <h1 className="hero-text hero-text-dynamic font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white mb-8 max-w-5xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            {slides[activeSlide].title}{" "}
            <span className="gold-text-luminous block mt-2 font-light">
              {slides[activeSlide].highlight}
            </span>
          </h1>

          <p className="hero-text hero-text-dynamic text-lg sm:text-xl text-cream/95 max-w-2xl leading-relaxed mb-10 mx-auto font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {slides[activeSlide].subtitle}
          </p>

          <div className="hero-text flex flex-wrap justify-center gap-4">
            <Link to="/carta" className="btn-gold shadow-gold">
              <ShoppingBag size={16} /> Armar mi pedido
            </Link>
            <Link to="/menu" className="btn-ghost-gold backdrop-blur-sm">
              Ver Menú del Día <ArrowRight size={14} />
            </Link>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 right-6 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === activeSlide ? "w-8 bg-gold" : "w-2.5 bg-cream/35 hover:bg-cream/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Schedule overlay info */}
          <div className="absolute bottom-12 left-6 z-20 hidden md:block text-xs uppercase tracking-[0.2em] text-cream/60 font-medium">
            <span>Lunes a Sábado · Desde las 07:00h</span>
            <span className="mx-3 text-gold">·</span>
            <span>Comanda rápida por WhatsApp</span>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA — SIN ESPERAS (ASYMMETRIC OVERLAY SECTION) */}
      <section className="relative py-32 border-b border-border/50 overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-center">
          {/* Overlapping images layout */}
          <div className="relative order-2 lg:order-1 h-[480px] sm:h-[580px] w-full flex items-center justify-center">
            <Reveal className="absolute left-0 top-0 w-3/4 aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-2xl z-10">
              <img
                src={tapasSpread}
                alt="Tapas variadas en El Molino"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Reveal>
            <Reveal
              delay={0.25}
              className="absolute right-0 bottom-0 w-3/5 aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-2xl z-20"
            >
              <img
                src={raciones}
                alt="Raciones crujientes caseras"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Reveal>
            <div className="absolute bottom-8 left-8 bg-carbon-2 text-cream p-6 rounded-2xl shadow-gold max-w-[200px] border border-gold/30 z-30 hidden sm:block">
              <div className="font-serif text-3xl gold-text font-bold">100%</div>
              <div className="text-[0.6rem] uppercase tracking-widest text-cream/70 mt-1">Sabor Tradicional</div>
            </div>
          </div>

          {/* Copywriting details */}
          <div className="order-1 lg:order-2 space-y-6">
            <Reveal>
              <div className="eyebrow">Sin esperas, directo a tu mesa</div>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight text-cream">
                Queremos que disfrutes, <span className="italic gold-text font-light">no que esperes</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Selecciona tus tapas caseras, raciones o desayunos favoritos en la web, envíanos la comanda por WhatsApp 
                y ten tu mesa lista con el pedido listo al llegar — o pásate a recogerlo recién preparado (Takeaway).
              </p>
              <p className="text-sm text-muted-foreground/60 leading-relaxed mt-4">
                Elaboramos artesanalmente cada plato en nuestros fogones respetando los tiempos y recetas tradicionales 
                que nos hacen el sitio favorito del barrio.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="pt-6 flex gap-4">
              <Link to="/carta" className="btn-gold">
                Armar mi Pedido
              </Link>
              <Link to="/desayunos" className="btn-ghost-gold">
                Ver Desayunos
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCIAS ABRASSAME CAROUSEL SECTION */}
      <section className="relative py-32 border-b border-gold/10 bg-carbon/50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-20">
            <div className="eyebrow justify-center">Las estaciones de El Molino</div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight">
              Cuatro momentos, <span className="italic gold-text font-light">una misma casa</span>
            </h2>
            <p className="mt-4 text-cream/70">
              Desde el primer café recién molido a las siete de la mañana, hasta las raciones calientes para cenar con amigos.
            </p>
          </Reveal>

          {/* Interactive experience slider */}
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-4">
              {experiencias.map((exp, idx) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveExp(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    idx === activeExp
                      ? "border-gold bg-gold/5 text-white"
                      : "border-white/10 bg-transparent text-cream/60 hover:border-white/35 hover:text-white"
                  }`}
                >
                  <span className={`font-serif text-3xl font-bold ${idx === activeExp ? "gold-text" : "text-cream/35"}`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-cream">{exp.title}</h3>
                    {idx === activeExp && <p className="mt-2 text-xs text-cream/70 leading-relaxed">{exp.desc}</p>}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Display Image */}
            <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              {experiencias.map((exp, idx) => (
                <div
                  key={exp.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    idx === activeExp ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <img src={exp.img} alt={exp.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/80 px-3 py-1 text-[0.65rem] uppercase tracking-wider font-semibold text-carbon">
                      <Sparkles size={10} /> Tradicional
                    </span>
                    <h4 className="mt-2 font-serif text-2xl text-white">{exp.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLIP CARDS SECTION (3D CARDS FOR NAVIGATION) */}
      <section className="relative py-32 border-b border-border/50 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <div className="eyebrow justify-center">Especialidades locales</div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Elige qué te apetece</h2>
          </Reveal>

          {/* Cards container */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1: DESAYUNOS */}
            <Reveal delay={0.05} className="group h-[450px] perspective-1000">
              <div className="relative h-full w-full rounded-2xl transform-style-3d group-hover:rotate-y-180 transition-transform duration-700 shadow-xl border border-border">
                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden overflow-hidden">
                  <img
                    src={churros}
                    alt="Desayunos El Molino"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-soft font-semibold">Desde las 07:00</span>
                    <h3 className="font-serif text-4xl text-white tracking-wide">DESAYUNOS</h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-white/80 justify-center">
                      Ver tostadas y churros <ArrowRight size={12} className="rotate-90 group-hover:rotate-0 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden rotate-y-180 bg-carbon-2 text-cream flex flex-col justify-between p-8 text-center border border-gold/30">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Hecho al momento</span>
                    <h3 className="font-serif text-3xl text-white">Desayunos</h3>
                    <p className="text-xs text-cream/70 leading-relaxed">
                      Elige entre café recién molido arábica, porras y churros crujientes de obrador propio y tostadas clásicas con tomate e ibéricos.
                    </p>
                  </div>
                  <Link to="/desayunos" className="btn-gold justify-center w-full">
                    Ver Desayunos
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Card 2: MENÚ DEL DÍA */}
            <Reveal delay={0.15} className="group h-[450px] perspective-1000">
              <div className="relative h-full w-full rounded-2xl transform-style-3d group-hover:rotate-y-180 transition-transform duration-700 shadow-xl border border-border">
                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden overflow-hidden">
                  <img
                    src={menuDia}
                    alt="Menús El Molino"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-soft font-semibold">Comida de Mercado</span>
                    <h3 className="font-serif text-4xl text-white tracking-wide">MENÚ DEL DÍA</h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-white/80 justify-center">
                      Ver pizarra diaria <ArrowRight size={12} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden rotate-y-180 bg-carbon-2 text-cream flex flex-col justify-between p-8 text-center border border-gold/30">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">De Lunes a Sábado</span>
                    <h3 className="font-serif text-3xl text-white">Menú Casero</h3>
                    <p className="text-xs text-cream/70 leading-relaxed">
                      Consulta nuestra pizarra diaria: 4 primeros platos, 4 segundos y postre casero o café incluidos por solo 13,00 €. Todo casero.
                    </p>
                  </div>
                  <Link to="/menu" className="btn-gold justify-center w-full">
                    Ver Menú del Día
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Card 3: LA CARTA */}
            <Reveal delay={0.25} className="group h-[450px] perspective-1000">
              <div className="relative h-full w-full rounded-2xl transform-style-3d group-hover:rotate-y-180 transition-transform duration-700 shadow-xl border border-border">
                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden overflow-hidden">
                  <img
                    src={raciones}
                    alt="Carta Raciones"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-center">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-soft font-semibold">Tapas, raciones y más</span>
                    <h3 className="font-serif text-4xl text-white tracking-wide">LA CARTA</h3>
                    <div className="inline-flex items-center gap-1.5 text-xs text-white/80 justify-center">
                      Ver carta completa <ArrowRight size={12} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 h-full w-full rounded-2xl backface-hidden rotate-y-180 bg-carbon-2 text-cream flex flex-col justify-between p-8 text-center border border-gold/30">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold">Todo el día</span>
                    <h3 className="font-serif text-3xl text-white">Nuestra Carta</h3>
                    <p className="text-xs text-cream/70 leading-relaxed font-light">
                      Nuestra tortilla de patatas Nº1, sartenadas ricas, tostas crujientes, ensaladas, croquetas caseras y hamburguesas listas para encargar.
                    </p>
                  </div>
                  <Link to="/carta" className="btn-gold justify-center w-full">
                    Ver Carta
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NUESTRAS CARACTERÍSTICAS (ICONS SECTION) */}
      <section className="relative py-32 bg-carbon-2/40 text-cream border-b border-gold/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-3 text-center">
            {/* ITEM 1 */}
            <Reveal delay={0.05} className="flex flex-col items-center p-6 bg-carbon-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold mb-6">
                <ChefHat size={26} strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border border-dashed border-gold/20 animate-spin-slow" />
              </div>
              <h4 className="font-serif text-2xl text-white font-bold mb-3">Cocina de siempre</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recetas tradicionales preparadas con mimo por cocineros especializados en el sabor casero de toda la vida.
              </p>
            </Reveal>

            {/* ITEM 2 */}
            <Reveal delay={0.15} className="flex flex-col items-center p-6 bg-carbon-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold mb-6">
                <Utensils size={26} strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border border-dashed border-gold/20 animate-spin-slow" />
              </div>
              <h4 className="font-serif text-2xl text-white font-bold mb-3">Trato familiar</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Servicio amable, rápido y cercano que te hará sentir como en casa desde el primer momento.
              </p>
            </Reveal>

            {/* ITEM 3 */}
            <Reveal delay={0.25} className="flex flex-col items-center p-6 bg-carbon-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold/35 bg-gold/10 text-gold mb-6">
                <Coffee size={26} strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border border-dashed border-gold/20 animate-spin-slow" />
              </div>
              <h4 className="font-serif text-2xl text-white font-bold mb-3">Café de calidad</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Café en grano premium recién molido para garantizar la mejor taza y sabor en tus desayunos.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MASONRY GALLERY */}
      <section className="relative py-32 bg-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow justify-center">Galería de Sabores</div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Directo de nuestro fogón</h2>
          </Reveal>

          <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start select-none pointer-events-none">
            {/* Column Left - moves up */}
            <div className="gallery-col-left flex flex-col gap-6 md:gap-8">
              <Reveal className="overflow-hidden rounded-2xl aspect-[4/5] border border-border shadow-lg animate-float-subtle">
                <img
                  src={g1}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
              <Reveal delay={0.1} className="overflow-hidden rounded-2xl aspect-square border border-border shadow-lg animate-float-subtle-reverse">
                <img
                  src={g4}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
            </div>

            {/* Column Center - moves down */}
            <div className="gallery-col-center flex flex-col gap-6 md:gap-8">
              <Reveal delay={0.05} className="overflow-hidden rounded-2xl aspect-square border border-border shadow-lg animate-ken-burns">
                <img
                  src={g2}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
              <Reveal delay={0.15} className="overflow-hidden rounded-2xl aspect-[3/4] border border-border shadow-lg animate-float-subtle">
                <img
                  src={g5}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
            </div>

            {/* Column Right - moves up */}
            <div className="gallery-col-right flex flex-col gap-6 md:gap-8">
              <Reveal delay={0.1} className="overflow-hidden rounded-2xl aspect-[3/4] border border-border shadow-lg animate-float-subtle-reverse">
                <img
                  src={g3}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
              <Reveal delay={0.2} className="overflow-hidden rounded-2xl aspect-[4/3] border border-border shadow-lg animate-ken-burns">
                <img
                  src={tapasSpread}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000 select-none pointer-events-none"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICIAS / RECETAS (BLOG SECTION) */}
      <section className="relative py-32 bg-carbon-2/30 text-cream overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow justify-center">Novedades</div>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl font-bold">El Secreto de la Cocina</h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {/* Secreto Tortilla */}
            <Reveal className="flex flex-col h-full bg-carbon-2 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img
                  src={raciones}
                  alt="Tortilla de patatas casera"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-gold px-2.5 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider text-carbon">
                  Nuestra Receta
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-bold mb-3 hover:text-gold transition-colors text-cream">
                  EL SECRETO DE NUESTRA TORTILLA
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  Papas seleccionadas fritas lentamente, huevos camperos frescos y el pochado sutil de la cebolla caramelizada antes de cuajarla al punto jugoso.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground/60">Por Cocina</span>
                  <Link to="/carta" className="text-gold font-bold inline-flex items-center gap-1 hover:text-gold-soft transition-colors">
                    Ver Carta <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Churros y porras */}
            <Reveal delay={0.1} className="flex flex-col h-full bg-carbon-2 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img
                  src={churros}
                  alt="Churros y porras artesanas"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-gold px-2.5 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider text-carbon">
                  Obrador
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-bold mb-3 hover:text-gold transition-colors text-cream">
                  PORRAS CRUJIENTES A DIARIO
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  Batido de masa templada a mano y fritura precisa en aceite limpio a temperatura constante para conseguir que queden crujientes y ligeras.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground/60">Por Churrero</span>
                  <Link to="/desayunos" className="text-gold font-bold inline-flex items-center gap-1 hover:text-gold-soft transition-colors">
                    Ver desayunos <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Paella Trucos */}
            <Reveal delay={0.2} className="flex flex-col h-full bg-carbon-2 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img
                  src={menuDia}
                  alt="Paella casera los miércoles"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-gold px-2.5 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider text-carbon">
                  Platos Especiales
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-bold mb-3 hover:text-gold transition-colors text-cream">
                  LOS MIÉRCOLES SON DE PAELLA
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  Nuestra estrella del menú del día entre semana: paella marinera con sofrito concentrado cocinado lentamente y caldo de pescado concentrado.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground/60">Por Cocina</span>
                  <Link to="/menu" className="text-gold font-bold inline-flex items-center gap-1 hover:text-gold-soft transition-colors">
                    Ver Menú del Día <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION MINIMALISTA */}
      <section className="relative py-16 border-t border-white/5 select-none overflow-hidden bg-carbon-2/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center tracking-[0.25em] text-gold text-xs uppercase font-semibold mb-4">
              Experiencia Sin Esperas
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white max-w-3xl mx-auto">
              Comanda digital directa <span className="italic gold-text block sm:inline mt-1 sm:mt-0 font-light">al instante</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-cream/70 text-sm sm:text-base leading-relaxed">
              Selecciona tus platos en la web, envíanos tu comanda por WhatsApp y te tendremos todo listo para disfrutar en el local o llevar en Fuenlabrada.
            </p>
            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
              <Link to="/carta" className="btn-gold">
                Armar mi Pedido
              </Link>
              <Link to="/menu" className="btn-ghost-gold">
                Ver Menú del Día
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
