/**
 * sheets.js — Cafetería El Molino Bot
 * Guarda cada pedido en una Google Sheet usando Google Apps Script
 * como endpoint gratuito. Si no hay URL configurada, solo muestra
 * advertencia pero el bot sigue funcionando.
 */

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

async function saveOrderToSheets(order) {
  if (!APPS_SCRIPT_URL) {
    console.warn('⚠️  APPS_SCRIPT_URL no configurada. El pedido no se guardará en Sheets.');
    return null;
  }

  try {
    const payload = {
      date: order.date,
      hour: order.hour,
      name: order.name,
      phone: order.phone || '—',
      prepMode: order.prepMode === 'antes'
        ? `Con antelación (${order.timeLabel})`
        : 'Al llegar',
      items: order.items.map(it => {
        if (typeof it === 'string') return it;
        return `${it.qty}x ${it.name}`;
      }).join(' | '),
      total: order.total,
      notes: order.notes || '—',
      status: 'Confirmado ✅',
    };

    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000), // 10 segundos de timeout
    });

    const text = await res.text();
    console.log('📊 Guardado en Google Sheets:', text);
    return text;
  } catch (err) {
    // No lanzar el error: el bot sigue respondiendo aunque falle Sheets
    console.error('❌ Error guardando en Sheets:', err.message);
    return null;
  }
}

module.exports = { saveOrderToSheets };
