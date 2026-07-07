# ─────────────────────────────────────────────────────────────
# Dockerfile — El Molino Bot
# Imagen ligera Node.js 20 (sin Chrome, ~100 MB de RAM)
# ─────────────────────────────────────────────────────────────

FROM node:20-slim

WORKDIR /app

# Copiar dependencias primero (aprovecha cache de Docker)
COPY package*.json ./
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Directorio de sesión de WhatsApp (se monta como volumen en Fly.io
# para que la sesión persista aunque el contenedor se reinicie)
RUN mkdir -p /app/auth_session

# Puerto para el health check de Fly.io
EXPOSE 8080

CMD ["node", "index.js"]
