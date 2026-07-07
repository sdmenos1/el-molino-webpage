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
const { confirmationMessage, reminderMessage } = require('./messages');

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
    printQRInTerminal: true,   // Muestra el QR en la terminal al primer inicio
    logger,
    browser: ['El Molino Bot', 'Chrome', '3.0'],
  });

  // Guardar credenciales cada vez que se actualicen
  sock.ev.on('creds.update', saveCreds);

  // ── Estado de la conexión ──
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
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

// Servidor HTTP para que Fly.io sepa que el proceso está vivo
startHealthServer();

startBot().catch(err => {
  console.error('Error fatal al iniciar el bot:', err);
  process.exit(1);
});
