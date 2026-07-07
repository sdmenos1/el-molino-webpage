/**
 * index.js — Cafetería El Molino Bot
 * Bot de WhatsApp que escucha las comandas entrantes y responde automáticamente.
 *
 * Tecnología: @whiskeysockets/baileys (sin Chrome/Puppeteer, ~100MB RAM)
 * Al iniciarse por primera vez muestra un QR en la terminal — escanéalo
 * con el WhatsApp del restaurante. La sesión se guarda en ./auth_session/
 * y no hace falta escanear de nuevo al reiniciar.
 */

require('dotenv').config();

const { startHealthServer } = require('./health');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require('@whiskeysockets/baileys');
const pino = require('pino');

const { parseOrderMessage } = require('./parser');
const { saveOrderToSheets } = require('./sheets');
const { confirmationMessage, reminderMessage, restaurantNotificationMessage } = require('./messages');
const qrcode = require('qrcode-terminal');

let activeSock = null;

function formatJid(phone) {
  let clean = phone.replace(/\D/g, '');
  if (clean.length === 9 && (clean.startsWith('6') || clean.startsWith('7'))) {
    clean = '34' + clean;
  }
  if (!clean.endsWith('@s.whatsapp.net')) {
    clean = clean + '@s.whatsapp.net';
  }
  return clean;
}

async function handleWebOrder(orderData) {
  if (!activeSock) {
    throw new Error('El bot de WhatsApp no está conectado todavía');
  }

  let minutes = 0;
  if (orderData.prepMode === 'antes' && orderData.time) {
    const timeMatch = orderData.time.match(/^(\d{1,2}):(\d{2})$/);
    if (timeMatch) {
      const targetHours = parseInt(timeMatch[1], 10);
      const targetMinutes = parseInt(timeMatch[2], 10);

      const now = new Date();
      const targetDate = new Date();
      targetDate.setHours(targetHours, targetMinutes, 0, 0);

      if (targetDate < now) {
        // Si la hora es anterior a la actual (ej. al pasar la medianoche), asumimos que es para mañana
        targetDate.setDate(targetDate.getDate() + 1);
      }

      const diffMs = targetDate - now;
      minutes = Math.max(0, Math.floor(diffMs / 60000));
    } else {
      minutes = parseInt((orderData.time || '').match(/\d+/)?.[0] || '30', 10);
    }
  }

  const order = {
    name: orderData.name,
    phone: orderData.phone,
    prepMode: orderData.prepMode,
    timeLabel: orderData.time || '',
    minutesUntilArrival: minutes,
    items: orderData.items || [],
    total: orderData.total || 0,
    notes: orderData.notes || '',
    date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    hour: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
  };

  // 1. WhatsApp del cliente
  const clientJid = formatJid(order.phone);

  // 2. WhatsApp del local (Si hay env var RESTAURANT_NUMBER, se usa. Si no, se manda a sí mismo)
  let restaurantJid = process.env.RESTAURANT_NUMBER
    ? formatJid(process.env.RESTAURANT_NUMBER)
    : activeSock.user.id.split(':')[0] + '@s.whatsapp.net';

  console.log(`\n🕸️ Pedido web recibido de ${order.name} (${order.phone})`);

  // 3. Guardar en Google Sheets (en paralelo, sin bloquear)
  saveOrderToSheets(order).catch(err =>
    console.error('   Sheets error (no crítico):', err.message)
  );

  // 4. Enviar comanda al local
  const restaurantMsg = restaurantNotificationMessage(order);
  await activeSock.sendMessage(restaurantJid, { text: restaurantMsg });
  console.log(`   📨 Comanda enviada al local (${restaurantJid})`);

  // 5. Enviar confirmación al cliente
  const confirmMsg = confirmationMessage(order);
  await activeSock.sendMessage(clientJid, { text: confirmMsg });
  console.log(`   ✅ Confirmación enviada al cliente (${clientJid})`);

  // 6. Programar recordatorio
  if (order.prepMode === 'antes' && order.minutesUntilArrival > 6) {
    const delayMs = (order.minutesUntilArrival - 5) * 60 * 1000;
    console.log(`   ⏰ Recordatorio programado en ${(delayMs / 60000).toFixed(1)} min`);

    setTimeout(async () => {
      try {
        await activeSock.sendMessage(clientJid, { text: reminderMessage(order) });
        console.log(`\n🔔 Recordatorio enviado a ${order.name}`);
      } catch (e) {
        console.error('Error enviando recordatorio:', e.message);
      }
    }, delayMs);
  }

  return { clientJid, restaurantJid };
}

// ─── Constante de detección de comanda ──────────────────────────────────────
const ORDER_TRIGGER = 'NUEVA COMANDA DIGITAL · EL MOLINO';

// ─── Función principal del bot ───────────────────────────────────────────────
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_session');
  const { version } = await fetchLatestBaileysVersion();

  const logger = pino({ level: 'silent' }); // Silenciar logs internos de Baileys

  const sock = makeWASocket({
    version,
    auth: state,
    logger,
    browser: ['El Molino Bot', 'Chrome', '3.0'],
  });

  activeSock = sock;

  // Guardar credenciales cada vez que se actualicen
  sock.ev.on('creds.update', saveCreds);

  // ── Estado de la conexión ──
  sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
    if (qr) {
      console.log('📱 Escanea este código QR con WhatsApp para vincular el bot:\n');
      qrcode.generate(qr, { small: true });
    }
    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;
      console.log(`❌ Conexión cerrada (código ${code}). Reconectando: ${shouldReconnect}`);
      if (shouldReconnect) {
        setTimeout(startBot, 3000); // Reconectar tras 3s
      } else {
        console.log('⚠️  Sesión cerrada (logged out). Elimina ./auth_session/ y reinicia para escanear de nuevo.');
      }
    } else if (connection === 'open') {
      console.log('✅ Bot El Molino conectado y escuchando comandas\n');
    }
  });

  // ── Escuchar mensajes entrantes ──
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      // Ignorar mensajes enviados por el propio restaurante
      if (msg.key.fromMe) continue;

      // Obtener texto del mensaje
      const body =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        '';

      // Solo procesar si es una comanda de El Molino
      if (!body.includes(ORDER_TRIGGER)) continue;

      const from = msg.key.remoteJid; // Número del cliente (con sufijo @s.whatsapp.net)
      console.log(`\n📋 Nueva comanda recibida de ${from}`);

      try {
        // 1. Parsear el mensaje
        const order = parseOrderMessage(body, from);
        console.log(`   👤 ${order.name}  |  💰 ${order.total.toFixed(2)}€  |  🍳 ${order.prepMode}`);

        // 2. Guardar en Google Sheets (en paralelo, sin bloquear)
        saveOrderToSheets(order).catch(err =>
          console.error('   Sheets error (no crítico):', err.message)
        );

        // 3. Responder con confirmación inmediata
        const confirmMsg = confirmationMessage(order);
        await sock.sendMessage(from, { text: confirmMsg });
        console.log(`   ✅ Confirmación enviada a ${order.name}`);

        // 4. Programar recordatorio (si eligió preparación con antelación y quedan más de 6 min)
        if (order.prepMode === 'antes' && order.minutesUntilArrival > 6) {
          const delayMs = (order.minutesUntilArrival - 5) * 60 * 1000;
          console.log(`   ⏰ Recordatorio programado en ${(delayMs / 60000).toFixed(1)} min`);

          setTimeout(async () => {
            try {
              await sock.sendMessage(from, { text: reminderMessage(order) });
              console.log(`\n🔔 Recordatorio enviado a ${order.name}`);
            } catch (e) {
              console.error('Error enviando recordatorio:', e.message);
            }
          }, delayMs);
        }
      } catch (err) {
        console.error('❌ Error procesando comanda:', err.message);
      }
    }
  });
}

// ─── Inicio ──────────────────────────────────────────────────────────────────
console.log('🌟 Iniciando El Molino Bot...');

// Servidor HTTP para que Fly.io sepa que el proceso está vivo y recibir pedidos
startHealthServer(handleWebOrder);

startBot().catch(err => {
  console.error('Error fatal al iniciar el bot:', err);
  process.exit(1);
});
