/**
 * parser.js — Cafetería El Molino Bot
 * Parsea el mensaje de comanda que el cliente envía por WhatsApp
 * y extrae todos los datos del pedido.
 */

function parseOrderMessage(body, senderJid) {
  const order = {
    senderJid,
    name: 'Cliente',
    phone: '',
    prepMode: 'al-llegar',
    timeLabel: '',
    minutesUntilArrival: 0,
    items: [],
    total: 0,
    notes: '',
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    hour: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
  };

  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    if (line.startsWith('👤 Cliente:')) {
      order.name = line.replace('👤 Cliente:', '').trim();

    } else if (line.startsWith('📞 Teléfono:')) {
      order.phone = line.replace('📞 Teléfono:', '').trim();

    } else if (line.startsWith('🍳 Preparación:')) {
      const prepText = line.replace('🍳 Preparación:', '').trim();
      if (prepText.includes('antelación')) {
        order.prepMode = 'antes';
        // Extraer el tiempo entre paréntesis: "Preparar con antelación (Dentro de 30 min)"
        const match = prepText.match(/\((.+)\)/);
        if (match) {
          order.timeLabel = match[1];
          const minMatch = order.timeLabel.match(/(\d+)\s*min/i);
          if (minMatch) order.minutesUntilArrival = parseInt(minMatch[1]);
        }
      }

    } else if (line.startsWith('•')) {
      // Platos del pedido
      order.items.push(line.replace(/^•\s*/, ''));

    } else if (line.startsWith('💰 Total')) {
      // Extraer total: "💰 Total estimado a pagar en local: 30,00€"
      const match = line.match(/([\d]+[,.][\d]+)\s*€/);
      if (match) {
        order.total = parseFloat(match[1].replace(',', '.'));
      }

    } else if (line.startsWith('📎 Observaciones:')) {
      order.notes = line.replace('📎 Observaciones:', '').trim();
    }
  }

  return order;
}

module.exports = { parseOrderMessage };
