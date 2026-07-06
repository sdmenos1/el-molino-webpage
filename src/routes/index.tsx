import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coffee, UtensilsCrossed, Beer, ShoppingBag, MessageCircle, Store, Star, Quote, Sparkles } from "lucide-react";
import heroBar from "@/assets/hero-bar.jpg";
import tapasSpread from "@/assets/tapas-spread.jpg";
import menuDia from "@/assets/menu-dia.jpg";
import raciones from "@/assets/raciones.jpg";
import cervezas from "@/assets/cervezas.jpg";
import churros from "@/assets/churros.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import { Reveal } from "@/components/Reveal";

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

const estaciones = [
  { title: "Desayunos Completos", desc: "Desayunos clásicos, café de especialidad y porras artesanales desde las 07:00 AM.", img: churros, to: "/desayunos" as const, tag: "Desde 07:00" },
  { title: "Menú del Día", desc: "Guisos y platos caseros elaborados a diario por 13,00 €.", img: menuDia, to: "/menu" as const, tag: "13:00 – 16:00" },
  { title: "Tapas y Raciones", desc: "Nuestra tortilla de patatas tradicional, tabla de ibéricos y sartenadas.", img: raciones, to: "/carta" as const, tag: "Todo el día" },
  { title: "La Bodega", desc: "Cervezas bien tiradas y vinos para acompañar.", img: cervezas, to: "/carta" as const, tag: "Recién tirada" },
];

const testimonials = [
  { name: "Marta G.", role: "Vecina del barrio", text: "La tortilla de patatas de El Molino es de otro planeta, ¡tierna y recién hecha! Y el café con tostada de jamón por las mañanas es insuperable." },
  { name: "Javier R.", role: "Habitual", text: "Pedí la tabla de ibéricos y unos huevos rotos por WhatsApp, llegué y tenían la mesa lista. Cero esperas, sabor tradicional excelente." },
  { name: "Lucía P.", role: "Cliente", text: "Materia prima buenísima y un trato cercano que te hace sentir en familia. Los miércoles de paella son imperdibles." },
];

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <img
          src={heroBar}
          alt="Interior cálido de Cafetería El Molino en Fuenlabrada"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/88 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)]" />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 text-center">
          <Reveal delay={0.1}>
            <div className="mx-auto eyebrow justify-center">Fuenlabrada · Calle de Francia, 11</div>
          </Reveal>
          <Reveal delay={0.25} as="h1" className="mt-8 font-serif text-5xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Tradición y sabor casero,{" "}
            <span className="italic gold-text">listos para compartir.</span>
          </Reveal>
          <Reveal delay={0.45} as="p" className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/75">
            Prepara tu comanda online, elige si recoges o si reservas mesa, y confírmala 
            al instante por WhatsApp. Cocina tradicional con el cariño de siempre.
          </Reveal>
          <Reveal delay={0.6} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/carta" className="btn-gold">
              <ShoppingBag size={16} /> Armar mi pedido
            </Link>
            <Link to="/menu" className="btn-ghost-gold">
              Ver Menú del Día <ArrowRight size={14} />
            </Link>
          </Reveal>

          <Reveal delay={0.9} className="mt-24 flex flex-wrap justify-center gap-x-10 gap-y-4 text-xs tracking-[0.3em] uppercase text-cream/45">
            <span>Desayunos</span><span className="text-gold/40">·</span>
            <span>Menú del día</span><span className="text-gold/40">·</span>
            <span>Tapas y Raciones</span><span className="text-gold/40">·</span>
            <span>Cerveza tirada</span>
          </Reveal>
        </div>
      </section>

      {/* CÓMO FUNCIONA — SIN ESPERAS */}
      <section className="relative py-28 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-3xl mx-auto">
            <div className="eyebrow justify-center">Sin esperas, directo a tu mesa</div>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight">
              Queremos que disfrutes,{" "}
              <span className="italic gold-text">no que esperes</span>
            </h2>
            <p className="mt-6 text-cream/70 leading-relaxed">
              Selecciona tus tapas caseras, raciones o desayunos favoritos en la web, 
              envíanos la comanda por WhatsApp y ten tu mesa lista con el pedido listo al llegar — 
              o pásate a recogerlo recién preparado.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", Icon: ShoppingBag, t: "Explora la carta", d: "Añade raciones, menús o desayunos a tu pedido con un solo clic." },
              { n: "02", Icon: Store, t: "Elige la modalidad", d: "Elige si deseas recoger en el local o reservar mesa con tu comida preseleccionada." },
              { n: "03", Icon: MessageCircle, t: "Envía por WhatsApp", d: "Generamos tu mensaje automáticamente y te confirmamos disponibilidad en un minuto." },
            ].map(({ n, Icon, t, d }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="card-dark p-8 h-full">
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold">
                      <Icon size={18} />
                    </div>
                    <div className="font-serif text-4xl gold-text">{n}</div>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESTACIONES DEL MOLINO */}
      <section className="relative py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="eyebrow">Las estaciones de El Molino</div>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl">
                Cuatro momentos, <span className="italic gold-text">una misma casa</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Desde el primer café recién molido a las siete de la mañana, hasta las 
              raciones y ricas raciones para cenar con amigos.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {estaciones.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link to={s.to} className="group block card-dark overflow-hidden h-full">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full border border-gold/40 bg-carbon/70 backdrop-blur px-3 py-1 text-[0.62rem] uppercase tracking-[0.25em] text-gold">
                      {s.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold group-hover:gap-3 transition-all">
                      Explorar categoría <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESENCIA */}
      <section className="relative py-28 bg-coffee-2/30 border-y border-border/50">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img src={tapasSpread} alt="Selección de tapas y raciones en El Molino" className="h-[520px] w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden md:block card-dark p-6 max-w-[240px]">
              <div className="font-serif text-4xl gold-text">Tradición</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Sabor casero</div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="eyebrow">Nuestra esencia</div>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl leading-tight">
              Recetas caseras y el <span className="italic gold-text">trato cercano</span> de siempre
              </h2>
            <p className="mt-6 text-cream/70 leading-relaxed">
              En El Molino apostamos por lo auténtico. Ingredientes frescos comprados en el mercado, 
              platos elaborados con mimo y un ambiente familiar que te hará sentir como en tu propia casa.
            </p>
            <div className="mt-10 gold-divider" />
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <Coffee className="text-gold" size={22} />
                <div className="mt-3 font-serif text-3xl gold-text">07:00 h</div>
                <div className="mt-1 text-sm text-muted-foreground">Café caliente y tostadas</div>
              </div>
              <div>
                <Beer className="text-gold" size={22} />
                <div className="mt-3 font-serif text-3xl gold-text">Lun a Sáb</div>
                <div className="mt-1 text-sm text-muted-foreground">Abiertos de lunes a sábado</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center">Galería</div>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl">Momentos en nuestra <span className="italic gold-text">casa</span></h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-6 gap-3 auto-rows-[160px] sm:auto-rows-[200px]">
            <Reveal className="col-span-6 sm:col-span-4 row-span-2 overflow-hidden rounded-2xl">
              <img src={g1} alt="Barra del local" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.05} className="col-span-3 sm:col-span-2 overflow-hidden rounded-2xl">
              <img src={g3} alt="Croquetas caseras" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.1} className="col-span-3 sm:col-span-2 overflow-hidden rounded-2xl">
              <img src={g5} alt="Paella casera" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.15} className="col-span-6 sm:col-span-3 overflow-hidden rounded-2xl">
              <img src={g2} alt="Terraza al atardecer" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
            <Reveal delay={0.2} className="col-span-6 sm:col-span-3 overflow-hidden rounded-2xl">
              <img src={g4} alt="Ambiente en el bar" loading="lazy" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="relative py-28 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="eyebrow justify-center">Opiniones de Clientes</div>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl">
              Lo que dicen nuestros <span className="italic gold-text">habituales</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="card-dark p-8 h-full">
                  <Quote className="text-gold" size={28} strokeWidth={1.2} />
                  <div className="mt-6 flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="mt-5 text-cream/80 leading-relaxed">"{t.text}"</p>
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <div className="font-serif text-lg">{t.name}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="relative overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--gold)_25%,transparent)]">
            <img src={heroBar} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-carbon via-carbon/90 to-coffee-2/80" />
            <div className="relative px-8 py-20 sm:px-16 sm:py-24 text-center">
              <Sparkles className="mx-auto text-gold" size={28} strokeWidth={1.4} />
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight">
                Haz tu comanda digital y la confirmamos{" "}
                <span className="italic gold-text">al instante</span>
              </h2>
              <p className="mt-6 max-w-xl mx-auto text-cream/70">
                Selecciona tus platos, elige si vienes a comer o si pasas a recogerlos, 
                y nosotros nos encargamos de que todo esté perfecto.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/carta" className="btn-gold"><ShoppingBag size={16} /> Comenzar pedido</Link>
                <Link to="/desayunos" className="btn-ghost-gold">Ver Desayunos</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
