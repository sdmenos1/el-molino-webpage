import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, MessageCircle, Coffee, Beer } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y Ubicación · Cafetería El Molino Fuenlabrada" },
      { name: "description", content: "Encuéntranos en Fuenlabrada en Calle de Francia 11. Dirección, teléfono, horarios y WhatsApp directo para pedidos y comandas." },
      { property: "og:title", content: "Contacto · Cafetería El Molino Fuenlabrada" },
      { property: "og:description", content: "Ubicación, horarios reales y WhatsApp directo para reservas." },
    ],
  }),
  component: Contact,
});

const info = [
  { icon: MapPin, label: "Dirección", value: "Calle de Francia, 11", sub: "28943 Fuenlabrada, Madrid" },
  { icon: Phone, label: "Teléfono fijo", value: "91 607 37 81", sub: "Para dudas y consultas" },
  { icon: MessageCircle, label: "WhatsApp de pedidos", value: "611 72 97 69", sub: "Comanda digital directa" },
];

const horarios = [
  {
    Icon: Clock,
    title: "Horario de Apertura",
    hours: [
      { d: "Lunes a Viernes", h: "07:00 – 22:00 h" },
      { d: "Sábados", h: "08:00 – 21:00 h" },
      { d: "Domingos", h: "Cerrado por descanso" },
    ],
  },
];

function Contact() {
  return (
    <>
      <section className="relative pt-40 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center">Contacto & Ubicación</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight">
              Ven, pide o <span className="italic gold-text">visítanos</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70">
              Estamos en el corazón de Fuenlabrada. Prepara tu comanda digital en la web 
              y envíala directamente por WhatsApp para comer aquí o recoger en local.
            </p>
          </Reveal>
        </div>
      </section>

      {/* INFO CARDS - Minimalist Architecture */}
      <section className="pb-16 select-none">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {info.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.05}>
                <div className="group flex flex-col justify-between p-7 rounded-2xl border border-white/5 bg-carbon-2/60 h-full hover:border-gold/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-gold">{it.label}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold border border-gold/20">
                      <it.icon size={14} />
                    </span>
                  </div>
                  <div>
                    <div className="font-serif text-2xl text-cream font-normal group-hover:text-gold transition-colors">{it.value}</div>
                    <div className="mt-2 text-xs text-cream/65 leading-relaxed">{it.sub}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA + HORARIOS */}
      <section className="py-12 select-none">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/5 h-full min-h-[460px] bg-carbon-2">
              <iframe
                title="Ubicación Cafetería El Molino Fuenlabrada"
                src="https://www.google.com/maps?q=Calle%20Francia,%2011,%20Fuenlabrada,%20Madrid&output=embed"
                className="h-full w-full min-h-[460px]"
                style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.95)" }}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-8 rounded-2xl border border-white/5 bg-carbon-2/60 h-full flex flex-col justify-between">
              <div>
                <div className="eyebrow tracking-[0.25em] text-gold text-xs uppercase font-semibold mb-3">Horarios</div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">Horario del local</h2>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed">
                  Te esperamos para desayunar desde las 07:00 AM, comer nuestro menú del día casero o compartir unas raciones por la tarde.
                </p>

                <div className="mt-8 space-y-6">
                  {horarios.map(({ Icon, title, hours }) => (
                    <div key={title} className="border-t border-white/10 pt-6 first:border-0 first:pt-0">
                      <div className="flex items-center gap-3">
                        <Icon className="text-gold" size={18} strokeWidth={1.5} />
                        <h3 className="font-serif text-lg text-cream font-normal">{title}</h3>
                      </div>
                      <dl className="mt-4 space-y-2 text-sm">
                        {hours.map((h) => (
                          <div key={h.d} className="flex justify-between border-b border-white/5 py-2">
                            <dt className="text-cream/70 text-xs">{h.d}</dt>
                            <dd className="text-cream font-medium text-xs">{h.h}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA TELEFÓNICO MINIMALISTA */}
      <section className="py-16 border-t border-white/5 select-none">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center tracking-[0.25em] text-gold text-xs uppercase font-semibold mb-4">
              Atención Directa
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">¿Prefieres llamarnos?</h2>
            <p className="mt-4 text-cream/70 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Atendemos tus dudas, encargos o pedidos especiales directamente por teléfono o WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
              <a href="tel:+34916073781" className="font-serif text-2xl sm:text-3xl text-gold hover:text-gold-soft transition-colors">
                91 607 37 81
              </a>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a href="tel:+34611729769" className="font-serif text-2xl sm:text-3xl text-gold hover:text-gold-soft transition-colors">
                611 72 97 69
              </a>
            </div>
            <div className="mt-10">
              <a href="https://wa.me/34611729769" target="_blank" rel="noopener noreferrer" className="btn-gold">
                <MessageCircle size={16} /> Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
