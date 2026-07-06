# 🤖 El Molino Bot — Chatbot de WhatsApp

Chatbot automático para la gestión de comandas digitales de **Cafetería El Molino** en Fuenlabrada.

## ¿Qué hace?

1. **Escucha** el número de WhatsApp del restaurante.
2. Cuando un cliente envía una comanda digital desde la web, el bot la **detecta automáticamente**.
3. **Responde al instante** al cliente con la confirmación del pedido.
4. Si el cliente eligió preparación con antelación, el bot envía un **recordatorio automático** ~5 minutos antes de la hora de llegada.
5. **Guarda cada pedido** en una Google Sheet (Excel online, gratis).

## Flujo completo

```
Cliente en la web
  └─ Rellena la comanda → Click en "Confirmar y enviar por WhatsApp"
       └─ WhatsApp se abre con el mensaje del pedido
            └─ Cliente pulsa Enviar (como siempre)
                 └─ 🤖 Bot recibe el mensaje (número del restaurante)
                       ├─ 💬 Responde al cliente: "¡Hola [nombre]! Ya tenemos tu comanda..."
                       ├─ 📊 Guarda el pedido en Google Sheets
                       └─ ⏰ (Si aplica) Recordatorio automático en X minutos
```

## Tecnología

| Librería | Función | Memoria RAM |
|---|---|---|
| @whiskeysockets/baileys | Bot de WhatsApp | ~100 MB |
| Google Apps Script | Backend Sheets | — (cloud) |
| Google Sheets | Base de datos | — (cloud) |

**Coste total: 0 €/mes**

## Archivos

```
chatbot/
  index.js                       ← Bot principal
  parser.js                      ← Extrae datos del mensaje de WhatsApp
  messages.js                    ← Plantillas de mensajes (edita aquí los textos)
  sheets.js                      ← Envía pedidos a Google Sheets
  .env.example                   ← Modelo del archivo de configuración
  .gitignore                     ← Excluye auth y credenciales del repositorio
  google-apps-script/
    Code.gs                      ← Pega esto en script.google.com
  SETUP.md                       ← Guía de configuración paso a paso
  README.md                      ← Este archivo
```

## Configuración rápida

➡️ Lee el archivo **[SETUP.md](./SETUP.md)** para las instrucciones completas (10-15 min).

## Hosting gratuito (para funcionar 24/7 sin PC encendido)

Ver la sección de hosting en el SETUP.md para opciones como **Fly.io** o **Oracle Cloud Always Free**.
