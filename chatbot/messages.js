/**
 * messages.js — Cafetería El Molino Bot
 * Plantillas de mensajes automáticos que el bot envía al cliente.
 * Edita estos textos para personalizar los mensajes del restaurante.
 */

/**
 * Mensaje de confirmación inmediata al recibir la comanda.
 * Se envía en cuanto el cliente manda su pedido por WhatsApp.
 */
function confirmationMessage(order) {
  const { name, prepMode, timeLabel, total, items } = order;

  const itemCount = items.length;
  const totalStr = total.toFixed(2).replace('.', ',');

  let prepLine = '';
  if (prepMode === 'al-llegar') {
    prepLine = 'Tu comanda estará lista en cuanto llegues al local. 🙌';
  } else {
    prepLine = `Empezamos a prepararlo ya. Te esperamos ${timeLabel}. ⏱️`;
  }

  return (
    `☕ ¡Hola ${name}! Ya tenemos tu comanda registrada en El Molino.\n\n` +
    `📋 ${itemCount} plato${itemCount !== 1 ? 's' : ''} · Total: ${totalStr}€\n\n` +
    `${prepLine}\n\n` +
    `Si necesitas algo más, escríbenos aquí. ¡Hasta ahora! 👋`
  );
}

/**
 * Mensaje de recordatorio enviado automáticamente ~5 min antes de la
 * hora de llegada estimada (solo para pedidos con preparación con antelación).
 */
function reminderMessage(order) {
  const { name } = order;
  return (
    `⏰ ¡${name}, ya casi es tu hora!\n\n` +
    `Tu comanda en El Molino está en preparación. ¡Te esperamos en breve! 🍳\n\n` +
    `— Cafetería El Molino`
  );
}

module.exports = { confirmationMessage, reminderMessage };
