# 🤖 Guía de Configuración — El Molino Bot

> Tiempo estimado: **10-15 minutos**  
> No necesitas saber programar. Sigue los pasos en orden.

---

## ✅ PASO 1 — Instalar Node.js (solo la primera vez)

1. Ve a **https://nodejs.org** y descarga la versión **LTS** (la que dice "Recommended").
2. Instálalo con las opciones por defecto.
3. Para comprobar que se instaló bien, abre la terminal (cmd o PowerShell) y escribe:
   ```
   node --version
   ```
   Debe mostrar algo como `v20.x.x`.

---

## ✅ PASO 2 — Instalar las dependencias del bot

1. Abre la carpeta `chatbot/` del proyecto.
2. Abre una terminal dentro de esa carpeta (clic derecho → "Abrir en Terminal").
3. Escribe:
   ```
   npm install
   ```
4. Espera a que termine (puede tardar 1-2 minutos).

---

## ✅ PASO 3 — Configurar Google Sheets (el "Excel" gratuito)

### 3.1 Crear la hoja de cálculo
1. Ve a **https://sheets.google.com** con tu cuenta de Google.
2. Crea una hoja de cálculo nueva (botón **+** o "En blanco").
3. Ponle el nombre que quieras, por ejemplo: `Pedidos El Molino`.
4. Deja la hoja abierta en el navegador.

### 3.2 Crear el script que recibe los pedidos
1. Ve a **https://script.google.com**.
2. Haz clic en **"Nuevo proyecto"**.
3. Borra todo el código que hay por defecto.
4. Abre el archivo `chatbot/google-apps-script/Code.gs` de este proyecto y **copia todo su contenido**.
5. Pégalo en el editor de Apps Script.
6. Haz clic en el **icono del disquete 💾** para guardar (o `Ctrl + S`).

### 3.3 Publicar el script como Web App
1. En el menú superior haz clic en **"Implementar" → "Nueva implementación"**.
2. Haz clic en el engranaje ⚙️ junto a "Tipo" y selecciona **"Aplicación web"**.
3. Configura:
   - **Ejecutar como**: `Yo (tu@gmail.com)`
   - **Quién tiene acceso**: `Cualquiera`
4. Haz clic en **"Implementar"**.
5. Si te pide permisos, haz clic en **"Autorizar acceso"** y acepta.
6. Copia la **URL de la aplicación web** que aparece (empieza por `https://script.google.com/macros/s/...`).

---

## ✅ PASO 4 — Crear el archivo de configuración

1. Dentro de la carpeta `chatbot/`, crea un archivo llamado `.env` (sin extensión).
2. Ábrelo con el Bloc de notas y escribe:
   ```
   APPS_SCRIPT_URL=https://script.google.com/macros/s/AQUI_TU_URL/exec
   ```
   (Sustituye `AQUI_TU_URL` por la URL que copiaste en el paso anterior.)
3. Guarda el archivo.

> ⚠️ Si no quieres usar Google Sheets de momento, puedes saltarte los pasos 3 y 4. El bot seguirá funcionando y enviando mensajes — solo no guardará los pedidos en la hoja.

---

## ✅ PASO 5 — Vincular el WhatsApp del restaurante (una sola vez)

1. En la terminal dentro de la carpeta `chatbot/`, escribe:
   ```
   npm start
   ```
2. En la terminal aparecerá un **código QR** formado por caracteres.
3. Abre WhatsApp en el teléfono del restaurante.
4. Ve a **Configuración → Dispositivos vinculados → Vincular dispositivo**.
5. Escanea el QR que aparece en la terminal.
6. En la terminal deberías ver:
   ```
   ✅ Bot El Molino conectado y escuchando comandas
   ```

> ✅ A partir de ahora el bot responde automáticamente a cualquier comanda. No hace falta hacer nada más.

---

## 🔁 Cómo reiniciar el bot

Si cierras la terminal o el ordenador, para volver a arrancar el bot:

```bash
cd ruta/a/chatbot
npm start
```

**No** tendrás que volver a escanear el QR. La sesión se guarda automáticamente en la carpeta `auth_session/`.

---

## ❓ Preguntas frecuentes

**¿El cliente tiene que hacer algo especial?**  
No. El cliente envía el pedido por WhatsApp como siempre y el bot le responde solo.

**¿El bot también ve los mensajes normales del restaurante?**  
El bot solo reacciona a mensajes que contienen `NUEVA COMANDA DIGITAL · EL MOLINO`. Los demás mensajes los ignora.

**¿Qué pasa si el WhatsApp se desconecta?**  
El bot se reconecta automáticamente. Si el teléfono se desvincula, tendrás que escanear el QR de nuevo (`npm start`).

**¿Se puede usar con WhatsApp Business?**  
Sí, funciona igual con WhatsApp Business.
