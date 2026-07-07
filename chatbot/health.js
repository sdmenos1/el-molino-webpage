/**
 * health.js — El Molino Bot
 * Servidor HTTP mínimo para que Fly.io sepa que el bot está vivo.
 * No tiene ninguna funcionalidad de negocio, solo responde 200 OK.
 */

const http = require('http');

const PORT = parseInt(process.env.PORT || '8080', 10);

function startHealthServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('El Molino Bot activo ✅');
  });

  server.listen(PORT, () => {
    console.log(`🏥 Health check disponible en el puerto ${PORT}`);
  });
}

module.exports = { startHealthServer };
