import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Beer, Star, AlertCircle } from "lucide-react";
import raciones from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.54.21.jpeg";
import tapas from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.52 (1).jpeg";
import g3 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.44.53 (3).jpeg";
import g5 from "@/assets/nuevas-fotos/WhatsApp Image 2026-07-16 at 14.41.50 (6).jpeg";
import { Reveal } from "@/components/Reveal";
import { AddToCartButton } from "@/components/AddToCartButton";

export const Route = createFileRoute("/carta")({
  head: () => ({
    meta: [
      { title: "Carta Completa · Cafetería El Molino Fuenlabrada" },
      { name: "description", content: "Explora nuestra carta: raciones ibéricas, sartenadas de huevos rotos, especialidades como oreja y lacón, tostas variadas y hamburguesas. Haz tu comanda online." },
      { property: "og:title", content: "Carta Completa · Cafetería El Molino" },
      { property: "og:description", content: "Descubre todas nuestras tapas, raciones, especialidades, tostas y hamburguesas." },
    ],
  }),
  component: CartaPage,
});

type Category = "all" | "ibericos" | "sartenadas" | "especialidades" | "tostas" | "hamburguesas";

type Item = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: Category;
  allergens?: string;
  popular?: boolean;
};

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Todo" },
  { key: "ibericos", label: "Ibéricos & Ensaladas" },
  { key: "sartenadas", label: "Sartenadas" },
  { key: "especialidades", label: "Especialidades" },
  { key: "tostas", label: "Nuestras Tostas" },
  { key: "hamburguesas", label: "Hamburguesas & Sándwiches" },
];

const items: Item[] = [
  // Ibéricos & Ensaladas
  { id: "r-tortilla-elmolino", name: "Tortilla de Patatas Tradicional", desc: "Nuestra especialidad casera. Recién hecha, extremadamente jugosa y con cebolla pochada.", price: 9.0, img: raciones, category: "ibericos", allergens: "Huevo", popular: true },
  { id: "ib-tabla", name: "Tabla de Ibéricos con pan Tumaca", desc: "Gran tabla de jamón ibérico y queso seleccionados acompañados de pan de hogaza tostado.", price: 18.0, img: tapas, category: "ibericos", allergens: "Gluten, sulfitos, leche", popular: true },
  { id: "ib-surtido", name: "Surtido de Ibéricos", desc: "Selección de jamón, queso, lomo, chorizo y salchichón.", price: 9.0, img: tapas, category: "ibericos", allergens: "Gluten, sulfitos, leche" },
  { id: "ib-ensalada-piquillo", name: "Ensalada de tiras de pimiento piquillo", desc: "Tiras de pimiento de piquillo con ventresca de atún y reducción de vinagre de Módena.", price: 12.5, img: tapas, category: "ibericos", allergens: "Sulfitos, pescado, gluten", popular: true },
  { id: "ib-jamon", name: "Ración de Jamón Ibérico con pan Tumaca", desc: "Jamón ibérico cortado fino al momento servido con pan crujiente untado con tomate y AOVE.", price: 16.0, img: g3, category: "ibericos", allergens: "Leche, sulfitos" },
  { id: "ib-queso", name: "Ración de queso curado Manchego", desc: "Excelente queso curado manchego de oveja en cuñas.", price: 16.0, img: raciones, category: "ibericos", allergens: "Gluten, sulfitos, leche" },
  { id: "ib-gambon", name: "Gambón a la plancha (12 unidades)", desc: "Docena de gambones grandes cocinados a la plancha con sal gorda y ajo-perejil.", price: 16.0, img: raciones, category: "ibericos", allergens: "Crustáceos, sulfitos, pescado", popular: true },

  // Sartenadas
  { id: "sar-jamon", name: "Sartenada (Huevos rotos) con jamón", desc: "Patatas fritas caseras cubiertas con huevos fritos rotos y lascas de jamón ibérico.", price: 12.0, img: g5, category: "sartenadas", allergens: "Gluten, huevos, sulfitos", popular: true },
  { id: "sar-chistorra", name: "Sartenada (Huevos rotos) con chistorra", desc: "Patatas caseras con huevos camperos fritos rotos y chistorra de Navarra a la sartén.", price: 12.0, img: g5, category: "sartenadas", allergens: "Gluten, huevos, sulfitos" },
  { id: "sar-solomillo", name: "Sartenada con solomillo a la pimienta", desc: "Huevos rotos sobre cama de patatas fritas acompañados de solomillo tierno en salsa pimienta.", price: 12.0, img: g5, category: "sartenadas", allergens: "Gluten, huevos, sulfitos, leche" },

  // Especialidades
  { id: "esp-lacon-vera", name: "Lacón a la plancha con pimentón", desc: "Lacón a la plancha sazonado con pimentón de La Vera, sal rosa del Himalaya y aceite boletus.", price: 12.0, img: raciones, category: "especialidades", allergens: "Gluten, sulfitos" },
  { id: "esp-lacon-gallega", name: "Lacón a la Gallega", desc: "Finas rodajas de lacón cocido con patata, pimentón dulce/picante y AOVE.", price: 12.0, img: raciones, category: "especialidades", allergens: "Gluten, sulfitos" },
  { id: "esp-oreja", name: "Crujiente de oreja a la plancha", desc: "Oreja de cerdo a la plancha con salsa de tomate picante, aceite de cebollino y pétalos de sal negra.", price: 12.0, img: g3, category: "especialidades", allergens: "Gluten, sulfitos", popular: true },
  { id: "esp-papas-tomatetrufa", name: "Papas confitadas picantes con trufa", desc: "Patatas confitadas en aceite a dos temperaturas con salsa de tomate picante y aroma de trufa blanca.", price: 8.5, img: raciones, category: "especialidades", allergens: "Gluten, sulfitos" },
  { id: "esp-papas-ajotrufa", name: "Papas confitadas con ajo y trufa", desc: "Patatas confitadas a dos temperaturas con mayonesa suave de ajo y aroma de trufa blanca.", price: 8.0, img: raciones, category: "especialidades", allergens: "Gluten, sulfitos" },
  { id: "esp-bravas", name: "Patata Brava tradicional", desc: "Patatas fritas caseras con salsa brava de la casa picante.", price: 8.0, img: raciones, category: "especialidades", allergens: "Gluten, sulfitos, leche" },
  { id: "esp-calamares", name: "Calamares a la Andaluza con Alioli", desc: "Anillas de calamar tiernas rebozadas al estilo andaluz acompañadas de salsa alioli.", price: 12.0, img: g5, category: "especialidades", allergens: "Gluten, sulfitos, pescado", popular: true },

  // Nuestras Tostas
  { id: "tos-salmon", name: "Tosta de Salmón ahumado", desc: "Salmón ahumado premium sobre base untada en queso o tomate rallado.", price: 9.0, img: tapas, category: "tostas", allergens: "Gluten, mostaza, sulfito, sésamo, soja" },
  { id: "tos-delmar", name: "Tosta del Mar (Gulas y Gambas)", desc: "Salteado de gulas al ajillo con gambas jugosas sobre tosta de pan.", price: 9.0, img: tapas, category: "tostas", allergens: "Gluten, pescado, crustáceos, moluscos, sulfitos", popular: true },
  { id: "tos-lacon", name: "Tosta de Lacón plancha con tomate", desc: "Lacón a la plancha con tomate rallado o queso fundido.", price: 9.0, img: tapas, category: "tostas", allergens: "Gluten, sulfitos, leche" },
  { id: "tos-tortilla", name: "Tosta de tortilla francesa y jamón", desc: "Tortilla francesa jugosa de un huevo y finas lonchas de jamón ibérico.", price: 9.0, img: tapas, category: "tostas", allergens: "Gluten, huevo, sulfitos" },
  { id: "tos-piquillo", name: "Tosta de pimientos con ventresca", desc: "Pimientos asados de piquillo con ventresca de atún en aceite.", price: 9.0, img: tapas, category: "tostas", allergens: "Gluten, sulfitos, pescado" },

  // Hamburguesas & Sándwiches
  { id: "h-normal", name: "Hamburguesa Normal + patatas", desc: "Hamburguesa clásica de carne de vacuno con lechuga, tomate y guarnición de patatas fritas.", price: 6.0, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, frutos secos, sésamo" },
  { id: "h-especial", name: "Hamburguesa Especial + patatas", desc: "Pan premium, carne de vacuno, lechuga, tomate, huevo frito, beicon crujiente, queso fundido y patatas.", price: 8.0, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, huevos, leche, frutos secos, sésamo", popular: true },
  { id: "h-buey", name: "Hamburguesa de Buey + patatas", desc: "Exquisita carne de buey a la parrilla con queso de cabra, lechuga, tomate fresco y patatas.", price: 9.5, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, frutos secos, sésamo, leche", popular: true },
  { id: "san-mixto", name: "Sándwich Mixto clásico", desc: "Sándwich de jamón york y queso fundido en pan de molde tostado con mantequilla.", price: 3.0, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, huevo, leche, soja" },
  { id: "san-mixto-huevo", name: "Sándwich Mixto con huevo y beicon", desc: "Jamón york, queso fundido, huevo frito y tiras de beicon en pan tostado.", price: 5.0, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, huevo, leche, soja" },
  { id: "san-elmolino", name: "Sándwich Especial El Molino", desc: "Pechuga de pollo a la plancha, lechuga, tomate fresco, guacamole suave, beicon y queso fundido.", price: 7.0, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, soja, leche, apio", popular: true },
  { id: "san-vegetal", name: "Sándwich Vegetal tradicional", desc: "Lechuga, tomate, mayonesa casera, atún en conserva y huevo cocido laminado.", price: 4.5, img: tapas, category: "hamburguesas", allergens: "Gluten, sulfitos, soja, leche, apio" },
];

const bebidaPredeterminada = { id: "b-doble", name: "Doble de cerveza bien tirada", price: 2.50, category: "La Bodega" };

function CartaPage() {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(it => it.category === activeTab);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <img src={raciones} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/85 to-background" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center">Nuestra Carta</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-tight">
              Tapas y raciones para <span className="italic gold-text">compartir</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70">
              Platos de cocina casera española elaborados a partir de productos frescos.
              Prepara tu comanda online, añádela al pedido y confírmala por WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SELECTOR DE CATEGORÍAS (TABS) */}
      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-start sm:justify-center overflow-x-auto pb-4 scrollbar-none border-b border-border/40 gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === cat.key
                    ? "bg-gold text-carbon shadow-lg shadow-gold/25 scale-105"
                    : "bg-carbon-2 text-cream/70 border border-border/40 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TARJETAS DE PRODUCTOS */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.02}>
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
                    
                    {/* Alérgenos */}
                    {it.allergens && (
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-gold-soft/80 bg-gold/5 border border-gold/15 px-2.5 py-1 rounded-lg">
                        <AlertCircle size={12} className="shrink-0 mt-0.5" />
                        <span>Alérgenos: {it.allergens}</span>
                      </div>
                    )}

                    <p className="mt-3.5 text-sm text-muted-foreground leading-relaxed flex-1">{it.desc}</p>
                    
                    {/* Botones de acción */}
                    <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
                      <AddToCartButton
                        item={{ id: it.id, name: it.name, price: it.price, category: categories.find(c => c.key === it.category)?.label || "Carta" }}
                        variant="chip"
                        label="Añadir al pedido"
                      />
                      <AddToCartButton
                        item={bebidaPredeterminada}
                        variant="chip"
                        label="+ Cerveza (2,50 €)"
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
