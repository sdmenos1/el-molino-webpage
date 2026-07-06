import { createFileRoute } from "@tanstack/react-router";
import { Clock, Utensils, HelpCircle, ShoppingBag, Info, Check, Plus, Trash2, Settings } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import menuDia from "@/assets/menu-dia.jpg";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menú del Día casero · Cafetería El Molino Fuenlabrada" },
      { name: "description", content: "Pizarra digital con nuestro menú casero del día. Elige primer plato, segundo y postre por 13,00 €. Paella casera los miércoles." },
      { property: "og:title", content: "Menú del Día · Cafetería El Molino" },
      { property: "og:description", content: "Menú casero diario por 13,00 € con postres artesanales." },
    ],
  }),
  component: MenuDia,
});

const defaultPrimeros = [
  { id: "p-gas", name: "Gazpacho Andaluz", desc: "Sopa fría tradicional elaborada con hortalizas frescas y aceite de oliva." },
  { id: "p-las", name: "Lasaña casera de atún", desc: "Capas de pasta rellenas de atún premium, sofrito casero y bechamel gratinada." },
  { id: "p-ens", name: "Ensalada mixta El Molino", desc: "Lechuga crujiente, tomate, atún, huevo cocido, aceitunas y cebolla." },
  { id: "p-cre", name: "Crema de verduras de temporada", desc: "Receta suave y reconfortante preparada diariamente con verduras frescas." },
];

const defaultSegundos = [
  { id: "s-mag", name: "Magro a la jardinera", desc: "Carne de cerdo tierna estofada a fuego lento con verduras en salsa." },
  { id: "s-esc", name: "Escalope de pollo crujiente", desc: "Filete de pollo empanado y frito, crujiente, servido con patatas fritas." },
  { id: "s-mer", name: "Merluza a la plancha", desc: "Lomo de merluza fresca a la plancha con ajo, perejil y guarnición de ensalada." },
  { id: "s-sec", name: "Secreto ibérico con patatas", desc: "Jugoso corte de secreto ibérico cocinado a la plancha con escamas de sal." },
];

const defaultPostres = [
  { id: "d-fla", name: "Flan casero tradicional" },
  { id: "d-tar", name: "Tarta de queso El Molino" },
  { id: "d-pud", name: "Pudín casero caramelizado" },
  { id: "d-mou", name: "Mousse de chocolate suave" },
  { id: "d-tor", name: "Tortitas con nata o sirope" },
  { id: "d-caf", name: "Café solo, cortado o con leche" },
];

const faqs = [
  { q: "¿En qué días y horarios está disponible?", a: "De lunes a viernes, en servicio de comidas de 13:00 a 16:00 h." },
  { q: "¿Qué incluye exactamente el precio de 13,00 €?", a: "Un primer plato, un segundo plato, pan, postre casero (o café) y bebida (agua, vino con casera, cerveza o refresco)." },
  { q: "¿Tienen opciones especiales algunos días?", a: "Sí, todos los miércoles preparamos de forma especial nuestra famosa paella casera con ingredientes seleccionados." },
  { q: "¿Se puede encargar para llevar?", a: "Por supuesto. Puedes diseñar tu combinación preferida de primero, segundo y postre desde aquí, añadirla al pedido y recogerla recién hecha." },
];

function MenuDia() {
  const { add, setOpen } = useCart();

  // Estados dinámicos cargados en el cliente
  const [price, setPrice] = useState(13.0);
  const [primeros, setPrimeros] = useState(defaultPrimeros);
  const [segundos, setSegundos] = useState(defaultSegundos);
  const [postres, setPostres] = useState(defaultPostres);

  // Estados de plato seleccionados por el cliente
  const [pr, setPr] = useState<string>("");
  const [se, setSe] = useState<string>("");
  const [po, setPo] = useState<string>("");

  // Estado de administración
  const [isAdmin, setIsAdmin] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newFirstDesc, setNewFirstDesc] = useState("");
  const [newSecondName, setNewSecondName] = useState("");
  const [newSecondDesc, setNewSecondDesc] = useState("");
  const [newPostreName, setNewPostreName] = useState("");

  // Efecto cliente para cargar desde localStorage
  useEffect(() => {
    setIsAdmin(window.location.search.includes("admin=true"));

    const savedPrice = localStorage.getItem("molino_menu_price");
    if (savedPrice) setPrice(parseFloat(savedPrice));

    const savedFirsts = localStorage.getItem("molino_menu_firsts");
    if (savedFirsts) {
      const parsed = JSON.parse(savedFirsts);
      setPrimeros(parsed);
      if (parsed.length > 0) setPr(parsed[0].id);
    } else {
      setPr(defaultPrimeros[0].id);
    }

    const savedSeconds = localStorage.getItem("molino_menu_seconds");
    if (savedSeconds) {
      const parsed = JSON.parse(savedSeconds);
      setSegundos(parsed);
      if (parsed.length > 0) setSe(parsed[0].id);
    } else {
      setSe(defaultSegundos[0].id);
    }

    const savedPostres = localStorage.getItem("molino_menu_postres");
    if (savedPostres) {
      const parsed = JSON.parse(savedPostres);
      setPostres(parsed);
      if (parsed.length > 0) setPo(parsed[0].id);
    } else {
      setPo(defaultPostres[0].id);
    }
  }, []);

  const label = useMemo(() => {
    const p = primeros.find((x) => x.id === pr)?.name ?? "";
    const s = segundos.find((x) => x.id === se)?.name ?? "";
    const d = postres.find((x) => x.id === po)?.name ?? "";
    return `Primero: ${p} · Segundo: ${s} · Postre/Café: ${d}`;
  }, [pr, se, po, primeros, segundos, postres]);

  const addMenu = () => {
    if (!pr || !se || !po) return;
    add({
      id: `menu-${pr}-${se}-${po}`,
      name: "Menú del Día",
      price: price,
      note: label,
      category: "Menú del día",
    });
    setOpen(true);
  };

  // Funciones de administración
  const handleSavePrice = (val: string) => {
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) {
      setPrice(parsed);
      localStorage.setItem("molino_menu_price", parsed.toString());
    }
  };

  const handleAddFirst = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim()) return;
    const newItems = [...primeros, { id: `p-${Date.now()}`, name: newFirstName.trim(), desc: newFirstDesc.trim() }];
    setPrimeros(newItems);
    localStorage.setItem("molino_menu_firsts", JSON.stringify(newItems));
    setNewFirstName("");
    setNewFirstDesc("");
    if (!pr && newItems.length > 0) setPr(newItems[0].id);
  };

  const handleRemoveFirst = (id: string) => {
    const newItems = primeros.filter((x) => x.id !== id);
    setPrimeros(newItems);
    localStorage.setItem("molino_menu_firsts", JSON.stringify(newItems));
    if (pr === id) setPr(newItems.length > 0 ? newItems[0].id : "");
  };

  const handleAddSecond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecondName.trim()) return;
    const newItems = [...segundos, { id: `s-${Date.now()}`, name: newSecondName.trim(), desc: newSecondDesc.trim() }];
    setSegundos(newItems);
    localStorage.setItem("molino_menu_seconds", JSON.stringify(newItems));
    setNewSecondName("");
    setNewSecondDesc("");
    if (!se && newItems.length > 0) setSe(newItems[0].id);
  };

  const handleRemoveSecond = (id: string) => {
    const newItems = segundos.filter((x) => x.id !== id);
    setSegundos(newItems);
    localStorage.setItem("molino_menu_seconds", JSON.stringify(newItems));
    if (se === id) setSe(newItems.length > 0 ? newItems[0].id : "");
  };

  const handleAddPostre = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostreName.trim()) return;
    const newItems = [...postres, { id: `d-${Date.now()}`, name: newPostreName.trim() }];
    setPostres(newItems);
    localStorage.setItem("molino_menu_postres", JSON.stringify(newItems));
    setNewPostreName("");
    if (!po && newItems.length > 0) setPo(newItems[0].id);
  };

  const handleRemovePostre = (id: string) => {
    const newItems = postres.filter((x) => x.id !== id);
    setPostres(newItems);
    localStorage.setItem("molino_menu_postres", JSON.stringify(newItems));
    if (po === id) setPo(newItems.length > 0 ? newItems[0].id : "");
  };

  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_12%,transparent),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="eyebrow">Menú del Día</div>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl leading-tight">
              Comida casera <span className="italic gold-text">lista para disfrutar</span>
            </h1>
            <p className="mt-6 text-lg text-cream/70 leading-relaxed">
              Elige tu combinación favorita de primero, segundo y postre casero. 
              Añádelo a tu pedido y ven a comer con nosotros o encárgalo para llevar a casa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground">
                <Clock size={14} className="text-gold" /> Lun–Vie · 13:00–16:00
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-muted-foreground">
                <Utensils size={14} className="text-gold" /> Pan, bebida y postre/café incluidos
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <img src={menuDia} alt="Menú del día" loading="lazy" className="h-[520px] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:right-10 bg-gold text-carbon p-6 rounded-2xl shadow-gold max-w-[200px] text-center border-4 border-carbon">
                <div className="text-[0.65rem] uppercase tracking-widest font-semibold opacity-75">Menú Completo</div>
                <div className="font-serif text-4xl font-bold mt-1">
                  {price.toFixed(2).replace(".", ",")}€
                </div>
                <div className="text-[0.6rem] uppercase tracking-wider mt-1.5 leading-tight opacity-75">Pan, bebida y postre incluidos</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PANEL DE ADMINISTRACIÓN INACTIVO (SÓLO ACCESIBLE CON ?admin=true) */}
      {isAdmin && (
        <section className="mx-auto max-w-7xl px-6 mb-12">
          <div className="rounded-2xl border-2 border-dashed border-gold/40 bg-gold/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b border-gold/25 pb-4 mb-6">
              <Settings className="text-gold animate-spin-slow" size={24} />
              <div>
                <h2 className="font-serif text-2xl text-gold">Panel Interno: Gestión de Menú del Día</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Los cambios se guardan localmente para pruebas de administración.</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* EDITAR PRIMEROS */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-cream border-b border-border pb-2">1. Primeros Platos</h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {primeros.map((x) => (
                    <li key={x.id} className="flex justify-between items-center gap-2 text-xs bg-carbon p-2 rounded">
                      <span className="truncate font-medium">{x.name}</span>
                      <button onClick={() => handleRemoveFirst(x.id)} className="text-destructive hover:scale-105 transition-transform" aria-label="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddFirst} className="grid gap-2 pt-2">
                  <input
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    type="text"
                    placeholder="Nuevo primero..."
                    className="w-full rounded bg-carbon px-2.5 py-1.5 text-xs outline-none border border-border"
                  />
                  <input
                    value={newFirstDesc}
                    onChange={(e) => setNewFirstDesc(e.target.value)}
                    type="text"
                    placeholder="Descripción..."
                    className="w-full rounded bg-carbon px-2.5 py-1.5 text-xs outline-none border border-border"
                  />
                  <button type="submit" className="btn-gold justify-center py-1.5 text-xs">
                    <Plus size={12} /> Agregar Primero
                  </button>
                </form>
              </div>

              {/* EDITAR SEGUNDOS */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-cream border-b border-border pb-2">2. Segundos Platos</h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {segundos.map((x) => (
                    <li key={x.id} className="flex justify-between items-center gap-2 text-xs bg-carbon p-2 rounded">
                      <span className="truncate font-medium">{x.name}</span>
                      <button onClick={() => handleRemoveSecond(x.id)} className="text-destructive hover:scale-105 transition-transform" aria-label="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddSecond} className="grid gap-2 pt-2">
                  <input
                    value={newSecondName}
                    onChange={(e) => setNewSecondName(e.target.value)}
                    type="text"
                    placeholder="Nuevo segundo..."
                    className="w-full rounded bg-carbon px-2.5 py-1.5 text-xs outline-none border border-border"
                  />
                  <input
                    value={newSecondDesc}
                    onChange={(e) => setNewSecondDesc(e.target.value)}
                    type="text"
                    placeholder="Descripción..."
                    className="w-full rounded bg-carbon px-2.5 py-1.5 text-xs outline-none border border-border"
                  />
                  <button type="submit" className="btn-gold justify-center py-1.5 text-xs">
                    <Plus size={12} /> Agregar Segundo
                  </button>
                </form>
              </div>

              {/* EDITAR POSTRES Y PRECIO */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-cream border-b border-border pb-2">3. Postres y Precio</h3>
                
                {/* PRECIO */}
                <div className="flex items-center gap-3 bg-carbon p-3 rounded">
                  <label className="text-xs text-muted-foreground whitespace-nowrap">Precio (€):</label>
                  <input
                    value={price}
                    onChange={(e) => handleSavePrice(e.target.value)}
                    type="number"
                    step="0.1"
                    className="w-20 rounded bg-carbon-2 px-2.5 py-1 text-xs text-gold font-bold outline-none border border-border"
                  />
                </div>

                <ul className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {postres.map((x) => (
                    <li key={x.id} className="flex justify-between items-center gap-2 text-xs bg-carbon p-2 rounded">
                      <span className="truncate font-medium">{x.name}</span>
                      <button onClick={() => handleRemovePostre(x.id)} className="text-destructive hover:scale-105 transition-transform" aria-label="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleAddPostre} className="grid gap-2 pt-2">
                  <input
                    value={newPostreName}
                    onChange={(e) => setNewPostreName(e.target.value)}
                    type="text"
                    placeholder="Nuevo postre..."
                    className="w-full rounded bg-carbon px-2.5 py-1.5 text-xs outline-none border border-border"
                  />
                  <button type="submit" className="btn-gold justify-center py-1.5 text-xs">
                    <Plus size={12} /> Agregar Postre
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PIZARRA CONSTRUIBLE */}
      <section className="py-20 bg-carbon-2/40">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* PRIMEROS */}
            <div>
              <h2 className="font-serif text-2xl mb-5 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold text-sm font-semibold border border-gold/30">1</span>
                Elige tu Primer Plato
              </h2>
              {primeros.length === 0 ? (
                <p className="text-xs text-muted-foreground">No hay primeros platos disponibles.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {primeros.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setPr(it.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        pr === it.id
                          ? "border-gold bg-gold/5 text-cream"
                          : "border-border/60 bg-carbon-2/30 text-cream/70 hover:border-border hover:bg-carbon-2/60"
                      }`}
                    >
                      <div className="font-serif text-lg flex items-center justify-between">
                        {it.name}
                        {pr === it.id && <Check size={16} className="text-gold" />}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SEGUNDOS */}
            <div>
              <h2 className="font-serif text-2xl mb-5 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold text-sm font-semibold border border-gold/30">2</span>
                Elige tu Segundo Plato
              </h2>
              {segundos.length === 0 ? (
                <p className="text-xs text-muted-foreground">No hay segundos platos disponibles.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {segundos.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setSe(it.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                        se === it.id
                          ? "border-gold bg-gold/5 text-cream"
                          : "border-border/60 bg-carbon-2/30 text-cream/70 hover:border-border hover:bg-carbon-2/60"
                      }`}
                    >
                      <div className="font-serif text-lg flex items-center justify-between">
                        {it.name}
                        {se === it.id && <Check size={16} className="text-gold" />}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* POSTRES */}
            <div>
              <h2 className="font-serif text-2xl mb-5 flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold text-sm font-semibold border border-gold/30">3</span>
                Elige Postre o Café
              </h2>
              {postres.length === 0 ? (
                <p className="text-xs text-muted-foreground">No hay postres disponibles.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-3">
                  {postres.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setPo(it.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                        po === it.id
                          ? "border-gold bg-gold/5 text-cream"
                          : "border-border/60 bg-carbon-2/30 text-cream/70 hover:border-border hover:bg-carbon-2/60"
                      }`}
                    >
                      <span className="font-serif text-sm leading-tight">{it.name}</span>
                      {po === it.id && <Check size={14} className="text-gold shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RESUMEN COMANDA */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="card-dark p-6 border border-gold/30 bg-carbon-2/80 shadow-gold">
              <h3 className="font-serif text-xl border-b border-border/80 pb-4">Tu Menú Configurado</h3>
              
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex justify-between gap-3">
                  <span className="text-muted-foreground">1º Plato:</span>
                  <span className="font-medium text-right">
                    {primeros.find((x) => x.id === pr)?.name || "Ninguno"}
                  </span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-muted-foreground">2º Plato:</span>
                  <span className="font-medium text-right">
                    {segundos.find((x) => x.id === se)?.name || "Ninguno"}
                  </span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-muted-foreground">Postre/Café:</span>
                  <span className="font-medium text-right">
                    {postres.find((x) => x.id === po)?.name || "Ninguno"}
                  </span>
                </li>
                <li className="flex justify-between gap-3 pt-4 border-t border-border/80">
                  <span className="text-muted-foreground">Pan y Bebida:</span>
                  <span className="font-medium text-gold">Incluidos</span>
                </li>
              </ul>

              <div className="mt-8 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total menú:</span>
                <span className="font-serif text-3xl text-gold font-bold">
                  {price.toFixed(2).replace(".", ",")} €
                </span>
              </div>

              <button
                onClick={addMenu}
                disabled={!pr || !se || !po}
                className="mt-6 w-full btn-gold justify-center gap-2 py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} /> Añadir Menú al Pedido
              </button>

              <div className="mt-4 flex items-start gap-2 text-[0.7rem] text-muted-foreground leading-relaxed">
                <Info size={14} className="shrink-0 mt-0.5 text-gold/60" />
                <span>La comanda digital se confirmará instantáneamente vía WhatsApp al enviar tu carrito final.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <div className="eyebrow justify-center">Preguntas Frecuentes</div>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Detalles del Menú del Día</h2>
        </Reveal>

        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05} className="card-dark p-6">
              <h3 className="font-serif text-lg flex items-start gap-3">
                <HelpCircle size={18} className="text-gold shrink-0 mt-1" />
                {faq.q}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground pl-7 leading-relaxed">{faq.a}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
