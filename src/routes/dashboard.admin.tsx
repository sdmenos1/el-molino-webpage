import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  RefreshCw, CheckCircle2, Clock, Play, Search, 
  Settings, Save, AlertTriangle, Phone, Calendar, 
  Coffee, ChevronRight, Check, Trash2, ArrowLeft 
} from "lucide-react";

export const Route = createFileRoute("/dashboard/admin")({
  component: DashboardAdminComponent,
});

interface Order {
  id: number;
  date: string;
  hour: string;
  name: string;
  phone: string;
  prepMode: string;
  items: string;
  total: number;
  notes: string;
  status: string;
}

function DashboardAdminComponent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"todos" | "pendientes" | "completados">("todos");
  
  // Google Apps Script URL
  const [scriptUrl, setScriptUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [tempUrl, setTempUrl] = useState("");
  
  // Auto-refresh countdown
  const [countdown, setCountdown] = useState(15);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const DEFAULT_URL = "https://script.google.com/macros/s/AKfycbwZdhWD09PzWd2vVwMLxsRTl8KEyVMy6Na_2NvIN83Wd0-PtXrGtiHvpiyB1uBRu94I/exec";

  // Cargar URL guardada
  useEffect(() => {
    const savedUrl = localStorage.getItem("el_molino_apps_script_url") || DEFAULT_URL;
    setScriptUrl(savedUrl);
    setTempUrl(savedUrl);
    if (!localStorage.getItem("el_molino_apps_script_url") && !DEFAULT_URL) {
      setShowSettings(true);
    }
  }, []);

  // Cargar datos al iniciar y cuando cambia la URL
  useEffect(() => {
    if (scriptUrl) {
      fetchOrders();
    }
  }, [scriptUrl]);

  // Auto-refresh timer
  useEffect(() => {
    if (!scriptUrl || showSettings) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchOrders();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [scriptUrl, showSettings]);

  const fetchOrders = async () => {
    if (!scriptUrl) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(scriptUrl);
      if (!response.ok) throw new Error("Error de conexión");
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        throw new Error("Formato de datos no válido");
      }
    } catch (err: any) {
      console.error(err);
      setError("No se pudieron cargar los pedidos. Comprueba la URL de Google Apps Script.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem("el_molino_apps_script_url", tempUrl.trim());
    setScriptUrl(tempUrl.trim());
    setShowSettings(false);
    setCountdown(15);
  };

  const handleUpdateStatus = async (rowId: number, currentStatus: string) => {
    if (!scriptUrl) return;
    setUpdatingId(rowId);
    
    // Determinar siguiente estado
    const nextStatus = currentStatus.includes("✅") || currentStatus.includes("Completado")
      ? "Confirmado ✅"
      : "Completado ✅";

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Requerido para Apps Script redirects
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          row: rowId,
          status: nextStatus
        })
      });

      // Actualizar localmente de forma optimista
      setOrders(prev => prev.map(o => o.id === rowId ? { ...o, status: nextStatus } : o));
      
      // Esperar un momento y refrescar para sincronía
      setTimeout(fetchOrders, 1500);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtrado y búsqueda
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) || 
                          o.items.toLowerCase().includes(search.toLowerCase()) ||
                          o.phone.includes(search);
    
    const isCompleted = o.status.includes("✅") || o.status.includes("Completado");
    
    if (filterStatus === "pendientes") return matchesSearch && !isCompleted;
    if (filterStatus === "completados") return matchesSearch && isCompleted;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-cream font-sans p-4 sm:p-8">
      {/* Header del Dashboard */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/40 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold/15 text-gold rounded-xl flex items-center justify-center">
            <Coffee size={24} />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl">Panel de Control</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">Cafetería El Molino · Gestión de Comandas</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {!showSettings && scriptUrl && (
            <div className="text-xs text-muted-foreground mr-2 bg-carbon/50 border border-border/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
              Autorefresh en {countdown}s
            </div>
          )}

          <button
            onClick={() => { fetchOrders(); setCountdown(15); }}
            disabled={isLoading || !scriptUrl}
            className="btn-ghost-gold p-2.5 rounded-lg"
            title="Refrescar pedidos"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2.5 rounded-lg border transition-all ${
              showSettings ? "bg-gold text-carbon border-gold" : "border-border hover:border-gold text-cream"
            }`}
            title="Configuración"
          >
            <Settings className="h-4 w-4" />
          </button>

          <a href="/" className="btn-ghost-gold px-4 py-2.5 text-xs flex items-center gap-1">
            <ArrowLeft size={14} /> Ir a la Web
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Modal/Sección de Configuración */}
        {showSettings && (
          <div className="bg-carbon-2 border border-border/60 rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-xl animate-fade-in">
            <div className="flex items-center gap-2 text-gold font-serif text-lg mb-3">
              <Settings size={20} />
              <h4>Configuración del Conector de Google Sheets</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Para ver los pedidos aquí, pega la <strong>URL de la aplicación web</strong> que copiaste al publicar tu script de Google Apps Script. Esto guardará el enlace de forma local en este navegador.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                type="text"
                placeholder="https://script.google.com/macros/s/..."
                className="flex-1 rounded-lg border border-border bg-carbon px-4 py-2.5 text-sm outline-none focus:border-gold transition-colors text-cream"
              />
              <button
                onClick={handleSaveSettings}
                className="btn-gold justify-center gap-2 px-6 py-2.5 text-sm shrink-0"
              >
                <Save size={16} /> Guardar
              </button>
            </div>
          </div>
        )}

        {/* Buscador y Filtros */}
        {!showSettings && (
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 bg-carbon/20 p-4 rounded-xl border border-border/30">
            {/* Buscador */}
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cliente, platos, teléfono..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-carbon-2 text-sm outline-none focus:border-gold transition-all"
              />
            </div>

            {/* Filtro de estado */}
            <div className="flex bg-carbon-2 border border-border/50 rounded-lg p-1 w-full md:w-auto shrink-0">
              {(["todos", "pendientes", "completados"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                    filterStatus === status
                      ? "bg-gold text-carbon font-bold"
                      : "text-muted-foreground hover:text-cream"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Errores */}
        {error && !showSettings && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center max-w-xl mx-auto my-8 space-y-3 animate-fade-in">
            <AlertTriangle className="text-destructive mx-auto" size={32} />
            <p className="text-sm text-destructive-foreground">{error}</p>
            <button onClick={() => setShowSettings(true)} className="btn-ghost-gold text-xs px-4 py-2">
              Configurar URL
            </button>
          </div>
        )}

        {/* Lista de Pedidos */}
        {!showSettings && !error && (
          <>
            {isLoading && orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="animate-spin text-gold" size={32} />
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Cargando comandas digitales...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-carbon/25 border border-border/30 rounded-2xl p-12 text-center max-w-md mx-auto my-8 space-y-3">
                <Coffee className="text-muted-foreground mx-auto opacity-40" size={40} />
                <h5 className="font-serif text-lg text-cream">No hay comandas</h5>
                <p className="text-xs text-muted-foreground">No se encontraron pedidos con el filtro actual o la tabla está vacía.</p>
              </div>
            ) : (
              /* Vista Responsive: Grid en móviles, Tabla en escritorios */
              <div className="space-y-6">
                {/* 1. Vista de Tarjetas (Móvil) */}
                <div className="grid gap-4 md:hidden">
                  {filteredOrders.map((order) => {
                    const isCompleted = order.status.includes("✅") || order.status.includes("Completado");
                    return (
                      <div 
                        key={order.id} 
                        className={`bg-carbon-2 border rounded-xl p-5 space-y-4 relative overflow-hidden transition-all ${
                          isCompleted ? "border-success/30 bg-success/2" : "border-border/60 hover:border-gold/60"
                        }`}
                      >
                        {/* Cabecera Tarjeta */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-serif text-lg text-cream">{order.name}</h4>
                            <div className="flex items-center gap-1 text-[0.7rem] text-muted-foreground mt-0.5">
                              <Calendar size={10} /> {order.date} · {order.hour}
                            </div>
                          </div>

                          <button
                            onClick={() => handleUpdateStatus(order.id, order.status)}
                            disabled={updatingId === order.id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                              isCompleted 
                                ? "bg-success/20 text-success-foreground border border-success/30" 
                                : "bg-gold text-carbon border border-gold hover:opacity-90"
                            }`}
                          >
                            {updatingId === order.id ? (
                              <RefreshCw size={12} className="animate-spin" />
                            ) : isCompleted ? (
                              <CheckCircle2 size={12} />
                            ) : (
                              <Play size={10} />
                            )}
                            {isCompleted ? "Listo" : "Preparar"}
                          </button>
                        </div>

                        {/* Teléfono y Método */}
                        <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-border/30 py-3 my-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone size={12} className="text-gold-soft" />
                            <span>{order.phone || "—"}</span>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-0.5 rounded text-[0.62rem] font-bold uppercase tracking-wider ${
                              order.prepMode.includes("antelación")
                                ? "bg-gold/15 text-gold border border-gold/30"
                                : "bg-muted/15 text-muted-foreground border border-border/40"
                            }`}>
                              {order.prepMode}
                            </span>
                          </div>
                        </div>

                        {/* Platos / Items */}
                        <div className="space-y-1">
                          <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground block">Platos</span>
                          <div className="text-xs text-cream/90 leading-relaxed font-mono whitespace-pre-line bg-carbon/40 p-2.5 rounded-lg border border-border/20">
                            {order.items.split(" | ").map((item, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>• {item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Notas */}
                        {order.notes && order.notes !== "—" && (
                          <div className="bg-gold/5 border border-gold/20 rounded-lg p-2.5 text-xs text-gold-soft flex gap-2">
                            <AlertTriangle size={14} className="shrink-0 text-gold mt-0.5" />
                            <div>{order.notes}</div>
                          </div>
                        )}

                        {/* Pie Tarjeta */}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[0.62rem] uppercase tracking-widest text-muted-foreground">Total estimado</span>
                          <span className="font-serif text-xl font-bold text-gold">{order.total.toFixed(2).replace(".", ",")} €</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 2. Vista de Tabla (Escritorio) */}
                <div className="hidden md:block overflow-hidden border border-border/50 rounded-2xl bg-carbon-2 shadow-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-carbon border-b border-border/50 text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                        <th className="px-6 py-4.5">Fecha / Hora</th>
                        <th className="px-6 py-4.5">Cliente</th>
                        <th className="px-6 py-4.5">Preparación</th>
                        <th className="px-6 py-4.5">Platos</th>
                        <th className="px-6 py-4.5 text-right">Total</th>
                        <th className="px-6 py-4.5">Observaciones</th>
                        <th className="px-6 py-4.5 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30 text-xs">
                      {filteredOrders.map((order) => {
                        const isCompleted = order.status.includes("✅") || order.status.includes("Completado");
                        return (
                          <tr 
                            key={order.id}
                            className={`hover:bg-carbon/20 transition-colors ${
                              isCompleted ? "bg-success/2 opacity-75" : ""
                            }`}
                          >
                            <td className="px-6 py-5 shrink-0">
                              <div className="font-semibold">{order.hour}</div>
                              <div className="text-[0.68rem] text-muted-foreground mt-0.5">{order.date}</div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="font-serif text-sm font-semibold text-cream">{order.name}</div>
                              <div className="flex items-center gap-1 text-[0.68rem] text-muted-foreground mt-1">
                                <Phone size={10} className="text-gold-soft" />
                                <span>{order.phone}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`px-2 py-0.5 rounded text-[0.62rem] font-bold uppercase tracking-wider ${
                                order.prepMode.includes("antelación")
                                  ? "bg-gold/15 text-gold border border-gold/30"
                                  : "bg-muted/15 text-muted-foreground border border-border/40"
                              }`}>
                                {order.prepMode}
                              </span>
                            </td>
                            <td className="px-6 py-5 max-w-xs">
                              <div className="space-y-0.5 font-mono">
                                {order.items.split(" | ").map((item, idx) => (
                                  <div key={idx} className="truncate">• {item}</div>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right font-serif text-sm font-bold text-gold">
                              {order.total.toFixed(2).replace(".", ",")} €
                            </td>
                            <td className="px-6 py-5 max-w-[180px]">
                              {order.notes && order.notes !== "—" ? (
                                <div className="text-gold-soft bg-gold/5 px-2.5 py-1.5 rounded-lg border border-gold/20 leading-relaxed truncate hover:whitespace-normal" title={order.notes}>
                                  {order.notes}
                                </div>
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="px-6 py-5 text-center">
                              <button
                                onClick={() => handleUpdateStatus(order.id, order.status)}
                                disabled={updatingId === order.id}
                                className={`px-4 py-2 rounded-lg text-[0.68rem] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all ${
                                  isCompleted 
                                    ? "bg-success/20 text-success-foreground border border-success/30" 
                                    : "bg-gold text-carbon border border-gold hover:opacity-95"
                                }`}
                              >
                                {updatingId === order.id ? (
                                  <RefreshCw size={12} className="animate-spin" />
                                ) : isCompleted ? (
                                  <CheckCircle2 size={12} />
                                ) : (
                                  <Play size={10} />
                                )}
                                {isCompleted ? "Listo" : "Preparar"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
