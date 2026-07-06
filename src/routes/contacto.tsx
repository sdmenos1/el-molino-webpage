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

      {/* INFO */}
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {info.map((it, i) => (
              <Reveal key={it.label} delay={i * 0.05}>
                <div className="card-dark p-6 h-full">
                  <it.icon className="text-gold" size={22} strokeWidth={1.5} />
                  <div className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">{it.label}</div>
                  <div className="mt-2 font-serif text-xl">{it.value}</div>
                  <div className="mt-2 text-xs text-muted-foreground">{it.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA + HORARIOS */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border/60 h-full min-h-[440px]">
              <iframe
                title="Ubicación Cafetería El Molino Fuenlabrada"
                src="https://www.google.com/maps?q=Calle%20Francia,%2011,%20Fuenlabrada,%20Madrid&output=embed"
                className="h-full w-full min-h-[440px]"
                style={{ filter: "invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.95)" }}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-dark p-8 h-full">
              <div className="eyebrow">Horarios</div>
              <h2 className="mt-4 font-serif text-3xl">Horario del local</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Te esperamos para desayunar, comer nuestro menú del día o compartir unas raciones por la tarde.
              </p>

              <div className="mt-8 space-y-6">
                {horarios.map(({ Icon, title, hours }) => (
                  <div key={title} className="border-t border-border/50 pt-6 first:border-0 first:pt-0">
                    <div className="flex items-center gap-3">
                      <Icon className="text-gold" size={20} strokeWidth={1.4} />
                      <h3 className="font-serif text-lg">{title}</h3>
                    </div>
                    <dl className="mt-4 space-y-1.5 text-sm">
                      {hours.map((h) => (
                        <div key={h.d} className="flex justify-between border-b border-border/30 py-1.5">
                          <dt className="text-muted-foreground">{h.d}</dt>
                          <dd className="text-cream font-medium">{h.h}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <Clock className="mx-auto text-gold" size={28} strokeWidth={1.4} />
            <h2 className="mt-6 font-serif text-3xl sm:text-4xl">¿Prefieres llamarnos?</h2>
            <p className="mt-4 text-muted-foreground">
              Puedes llamarnos directamente a nuestro teléfono fijo o móvil, o enviarnos un WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <a href="tel:+34916073781" className="font-serif text-3xl sm:text-4xl gold-text hover:opacity-80 transition-opacity">
                91 607 37 81
              </a>
              <a href="tel:+34611729769" className="font-serif text-3xl sm:text-4xl gold-text hover:opacity-80 transition-opacity">
                611 72 97 69
              </a>
            </div>
            <div className="mt-8">
              <a href="https://wa.me/34611729769" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={18} /> Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
