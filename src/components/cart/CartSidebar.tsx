import { X, Minus, Plus, Trash2, MessageCircle, Store, CalendarClock, Clock, Info, Check, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart, buildWhatsappMessage } from "@/lib/cart";

export function CartSidebar() {
  const { open, setOpen, items, setQty, remove, total, clear } = useCart();
  
  // Estado para controlar el modal de finalización (Checkout Modal)
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Campos del formulario
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<"recoger" | "reservar">("reservar");
  const [prepMode, setPrepMode] = useState<"al-llegar" | "antes">("al-llegar");
  // Pre-llenar con hora actual + 30 min
  const getInitialTime = () => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + 30);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [arrivalTime, setArrivalTime] = useState(getInitialTime());
  const [notes, setNotes] = useState("");
  
  // Estado de carga y éxito
  const [isSending, setIsSending] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "";
      setShowCheckout(false); // Reiniciar checkout al cerrar
      setOrderSuccess(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Si se abre el checkout, también bloqueamos scroll
  useEffect(() => {
    if (showCheckout) document.body.style.overflow = "hidden";
  }, [showCheckout]);

  const canSend = items.length > 0 && name.trim().length > 1 && phone.trim().length > 8 && !isSending;

  const send = async () => {
    if (!canSend) return;
    
    setIsSending(true);

    // Calcular hora seleccionada
    let timeLabel = "";
    if (prepMode === "antes") {
      timeLabel = arrivalTime;
    }

    const fallbackUrl = buildWhatsappMessage({ 
      name: name.trim(), 
      phone: phone.trim() || undefined,
      mode, 
      prepMode,
      time: timeLabel, 
      items, 
      total, 
      notes: notes.trim() 
    });

    try {
      const res = await fetch("https://el-molino-bot.fly.dev/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          mode,
          prepMode,
          time: timeLabel,
          items: items.map(it => ({ name: it.name, qty: it.qty, price: it.price })),
          total,
          notes: notes.trim()
        })
      });

      if (res.ok) {
        setOrderSuccess(true);
        clear();
      } else {
        throw new Error("El bot falló al procesar");
      }
    } catch (err) {
      console.warn("Error enviando directo, abriendo WhatsApp:", err);
      // Fallback
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      clear();
      setShowCheckout(false);
      setOpen(false);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Overlay del carrito */}
      <div
        onClick={() => {
          if (!showCheckout) setOpen(false);
        }}
        className={`fixed inset-0 z-50 bg-carbon/70 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden
      />
      
      {/* Panel lateral del Carrito */}
      <aside
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 h-[100dvh] w-full sm:w-[440px] flex flex-col border-l border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-carbon-2 shadow-2xl transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-5">
          <div>
            <div className="text-[0.62rem] tracking-[0.3em] uppercase text-gold">Tu pedido</div>
            <h2 className="font-serif text-2xl mt-1">Comanda El Molino</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar carrito"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-cream hover:border-gold hover:text-gold transition-colors"
          >
            <X size={16} />
          </button>
        </header>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {items.length === 0 && (
            <div className="mt-16 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/30 text-gold">
                <MessageCircle size={22} strokeWidth={1.4} />
              </div>
              <p className="mt-6 font-serif text-xl">Tu pedido está vacío</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                Explora nuestra carta y añade tus platos, desayunos o menús favoritos.
              </p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.id + (it.note ?? "")} className="rounded-xl border border-border/70 bg-carbon/60 p-4">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-serif text-base truncate">{it.name}</div>
                  {it.note && <div className="text-xs text-muted-foreground mt-0.5">{it.note}</div>}
                  {it.category && (
                    <div className="mt-1 text-[0.6rem] tracking-[0.25em] uppercase text-gold/70">{it.category}</div>
                  )}
                </div>
                <div className="text-gold font-medium shrink-0">{(it.price * it.qty).toFixed(2).replace(".", ",")}€</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty(it.id, it.qty - 1)}
                    className="grid h-8 w-8 place-items-center text-cream/80 hover:text-gold"
                    aria-label="Restar"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{it.qty}</span>
                  <button
                    onClick={() => setQty(it.id, it.qty + 1)}
                    className="grid h-8 w-8 place-items-center text-cream/80 hover:text-gold"
                    aria-label="Sumar"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <button
                  onClick={() => remove(it.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={12} /> Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer del Carrito */}
        <div className="border-t border-border/60 bg-carbon px-6 py-5 space-y-4">
          {items.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.62rem] tracking-[0.25em] uppercase text-muted-foreground">Total estimado</div>
                  <div className="font-serif text-3xl gold-text mt-0.5">
                    {total.toFixed(2).replace(".", ",")}€
                  </div>
                </div>
                <button
                  onClick={clear}
                  className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1.5"
                >
                  <Trash2 size={12} /> Vaciar comanda
                </button>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="btn-gold w-full justify-center gap-2 py-3.5 text-sm"
              >
                Proceder al pedido <ArrowRight size={16} />
              </button>
            </>
          )}
          {items.length === 0 && (
            <button onClick={() => setOpen(false)} className="btn-ghost-gold w-full">
              Seguir explorando
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* CHECKOUT MODAL RESPONSIVO (FINALIZACIÓN DEL PEDIDO Y EVITAR DESPERDICIOS) */}
      {/* ========================================================================= */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
          {/* Fondo difuminado modal */}
          <div 
            onClick={() => setShowCheckout(false)} 
            className="fixed inset-0 bg-carbon/90 backdrop-blur-md" 
          />

          {/* Caja del Modal */}
          <div className="relative w-full h-full sm:h-fit sm:max-h-[90vh] sm:max-w-2xl bg-carbon-2 border-0 sm:border border-border/60 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {orderSuccess ? (
              <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center my-auto space-y-6">
                <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles size={40} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-cream">¡Comanda Recibida!</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    Hemos registrado tu pedido en Cafetería El Molino. En unos instantes recibirás un mensaje de confirmación en tu WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOrderSuccess(false);
                    setShowCheckout(false);
                    setOpen(false);
                  }}
                  className="btn-gold px-8 py-3 rounded-lg text-sm flex items-center gap-2"
                >
                  Entendido <Check size={16} />
                </button>
              </div>
            ) : (
              <>
                {/* Header del Modal */}
                <header className="flex items-center justify-between border-b border-border/50 px-6 py-5 shrink-0 bg-carbon">
              <div className="flex items-center gap-2.5">
                <Sparkles className="text-gold" size={20} />
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl">Finaliza tu Comanda</h3>
                  <p className="text-[0.68rem] text-muted-foreground uppercase tracking-widest mt-0.5">Comida casera sin esperas</p>
                </div>
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border/50 text-cream hover:border-gold hover:text-gold transition-colors"
                aria-label="Volver al carrito"
              >
                <X size={16} />
              </button>
            </header>

            {/* Formulario Scrolleable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Alerta de Sin Delivery */}
              <div className="flex gap-3 rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-gold-soft leading-relaxed">
                <Info size={16} className="shrink-0 text-gold mt-0.5" />
                <div>
                  <strong className="text-gold">Consumo en local:</strong> En Cafetería El Molino todo el servicio es para consumir en el propio establecimiento (en barra o mesa). Prepara tu comanda digital y envíala por WhatsApp para reservar tu espacio y agilizar el servicio.
                </div>
              </div>

              {/* Paso 1: Nombre y Teléfono */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[0.62rem] tracking-[0.25em] uppercase text-muted-foreground">Tu Nombre *</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    placeholder="Ej. Adrián Enciso"
                    className="mt-1.5 w-full rounded-lg border border-border bg-carbon px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors"
                  />
                </label>
                 <label className="block">
                  <span className="text-[0.62rem] tracking-[0.25em] uppercase text-muted-foreground">Teléfono móvil *</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    required
                    placeholder="Ej. 600 000 000"
                    className="mt-1.5 w-full rounded-lg border border-border bg-carbon px-3 py-2.5 text-sm outline-none focus:border-gold transition-colors"
                  />
                </label>
              </div>

              {/* Paso 2: Modo de Preparación */}
              <div className="border-t border-border/40 pt-5">
                <span className="text-[0.62rem] tracking-[0.25em] uppercase text-muted-foreground">¿Cuándo empezamos a cocinar?</span>
                
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {/* Opción A: Preparar al llegar */}
                  <button
                    type="button"
                    onClick={() => setPrepMode("al-llegar")}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      prepMode === "al-llegar"
                        ? "border-gold bg-gold/5 text-cream"
                        : "border-border bg-carbon/40 text-muted-foreground hover:border-gold/55 hover:text-cream"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold">🍳 Preparar al llegar</span>
                      {prepMode === "al-llegar" && <Check size={16} className="text-gold" />}
                    </div>
                    <p className="mt-2 text-[0.7rem] text-muted-foreground leading-relaxed">
                      Tu pedido se cocinará al llegar al local para garantizar la frescura y evitar desperdicios.
                    </p>
                  </button>

                  {/* Opción B: Preparar con antelación */}
                  <button
                    type="button"
                    onClick={() => setPrepMode("antes")}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                      prepMode === "antes"
                        ? "border-gold bg-gold/5 text-cream"
                        : "border-border bg-carbon/40 text-muted-foreground hover:border-gold/55 hover:text-cream"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold">⚡ Preparar con antelación</span>
                      {prepMode === "antes" && <Check size={16} className="text-gold" />}
                    </div>
                    <p className="mt-2 text-[0.7rem] text-muted-foreground leading-relaxed">
                      Cocinamos antes de tu llegada para que esté listo cuando entres al local.
                    </p>
                  </button>
                </div>

                {/* Selector de hora si selecciona preparar antes */}
                {prepMode === "antes" && (
                  <div className="mt-4 p-4 rounded-xl border border-border bg-carbon/60 space-y-3 animate-fade-in">
                    <span className="text-[0.62rem] tracking-[0.25em] uppercase text-gold">¿A qué hora vas a llegar al local?</span>
                    
                    <div className="relative">
                      <input
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        type="time"
                        required
                        className="w-full rounded-lg border border-border bg-carbon-2 px-4 py-3 text-sm outline-none focus:border-gold text-cream font-serif text-center text-lg focus:ring-1 focus:ring-gold"
                      />
                    </div>
                    <p className="text-[0.68rem] text-muted-foreground text-center">
                      El local preparará tu comanda para la hora seleccionada.
                    </p>
                  </div>
                )}
              </div>

              {/* Paso 4: Observaciones */}
              <div className="border-t border-border/40 pt-5">
                <label className="block">
                  <span className="text-[0.62rem] tracking-[0.25em] uppercase text-muted-foreground">Observaciones o Notas</span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Alergias alimentarias, intolerancias, mesa preferida, etc."
                    className="mt-1.5 w-full rounded-lg border border-border bg-carbon px-3 py-2 text-xs outline-none focus:border-gold transition-colors resize-none"
                  />
                </label>
              </div>
            </div>

            {/* Pie del Modal con Resumen de Compra */}
            <footer className="border-t border-border/50 p-6 bg-carbon flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-center sm:text-left">
                <div className="text-[0.62rem] uppercase tracking-widest text-muted-foreground">Total estimado a pagar</div>
                <div className="font-serif text-3xl text-gold font-bold mt-0.5">
                  {total.toFixed(2).replace(".", ",")} €
                </div>
              </div>

              <button
                onClick={send}
                disabled={!canSend}
                className="btn-gold w-full sm:w-auto justify-center gap-2 px-8 py-3.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-carbon border-t-transparent rounded-full animate-spin"></span>
                    Enviando...
                  </span>
                ) : (
                  <>
                    <MessageCircle size={18} /> Confirmar Comanda
                  </>
                )}
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
      )}
    </>
  );
}
