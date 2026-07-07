# 🚀 Despliegue en Fly.io con Docker — El Molino Bot

> **Coste: 0 €/mes** · Fly.io free tier incluye 3 VMs compartidas para siempre  
> **Requisito**: tener [Node.js](https://nodejs.org) instalado en tu PC (solo para la CLI de Fly)

---

## 🧩 ¿Cómo funciona la cadena Docker + Fly.io?

```
Tu PC
  └─ fly deploy
       └─ Lee el Dockerfile
            └─ Construye la imagen Docker (como una "caja" con todo el bot)
                 └─ La sube a los servidores de Fly.io en Madrid
                      └─ Bot corriendo 24/7 en la nube ☁️
                           └─ Tu PC se puede apagar tranquilamente
```

---

## ✅ PASO 1 — Instalar flyctl (CLI de Fly.io)

Abre PowerShell y ejecuta:

```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

Comprueba que se instaló:

```powershell
fly version
```

---

## ✅ PASO 2 — Crear cuenta gratuita y hacer login

```powershell
fly auth login
```

Se abrirá el navegador. Regístrate en **fly.io** (gratis, con Google o email).  
No hace falta tarjeta de crédito para el free tier básico.

---

## ✅ PASO 3 — Crear la aplicación en Fly.io

Desde la carpeta `chatbot/`:

```powershell
fly apps create el-molino-bot
```

> ⚠️ El nombre `el-molino-bot` debe ser único en todo Fly.io. Si ya existe, usa otro como `molino-wa-bot`.

---

## ✅ PASO 4 — Crear el volumen persistente (para la sesión de WhatsApp)

La sesión de WhatsApp se guarda en disco. Sin este volumen, cada vez que Fly reinicie el contenedor tendrías que escanear el QR de nuevo.

```powershell
fly volumes create whatsapp_session --size 1 --region mad --app el-molino-bot
```

- `--size 1` → 1 GB (más que suficiente para los archivos de sesión)
- `--region mad` → servidores en Madrid

---

## ✅ PASO 5 — Configurar la variable de entorno

Añade la URL de Google Apps Script como secreto (nunca queda en el código):

```powershell
fly secrets set APPS_SCRIPT_URL="https://script.google.com/macros/s/TU_URL_AQUI/exec" --app el-molino-bot
```

> Si no tienes la URL de Sheets todavía, puedes saltarte este paso. El bot funcionará igual (solo no guardará en Sheets).

---

## ✅ PASO 6 — Desplegar

Desde la carpeta `chatbot/`:

```powershell
fly deploy --app el-molino-bot
```

Fly.io leerá el `Dockerfile`, construirá la imagen y la desplegará. Tarda ~2-3 minutos la primera vez.

---

## ✅ PASO 7 — Escanear el QR de WhatsApp (una sola vez)

Una vez desplegado, abre los logs en tiempo real:

```powershell
fly logs --app el-molino-bot
```

En la terminal verás un **código QR** formado por caracteres. Ábrelo con zoom si es pequeño.

1. Abre WhatsApp en el teléfono del restaurante.
2. Ve a **Configuración → Dispositivos vinculados → Vincular dispositivo**.
3. Escanea el QR que ves en los logs.

Verás este mensaje cuando todo esté listo:

```
✅ Bot El Molino conectado y escuchando comandas
```

> La sesión queda guardada en el volumen. No hace falta escanear de nuevo aunque el contenedor se reinicie.

---

## 🔁 Actualizaciones futuras

Cuando cambies el código del bot y quieras subir los cambios:

```powershell
fly deploy --app el-molino-bot
```

El bot se reinicia con el nuevo código. La sesión de WhatsApp se mantiene.

---

## 🛠️ Comandos útiles

| Comando | Para qué sirve |
|---|---|
| `fly logs --app el-molino-bot` | Ver logs en tiempo real |
| `fly status --app el-molino-bot` | Ver si el bot está corriendo |
| `fly restart --app el-molino-bot` | Reiniciar el bot |
| `fly ssh console --app el-molino-bot` | Entrar al contenedor por terminal |
| `fly secrets list --app el-molino-bot` | Ver secretos configurados |
| `fly scale memory 512 --app el-molino-bot` | Aumentar RAM si hay problemas |

---

## ❓ Preguntas frecuentes

**¿Cuándo se necesita volver a escanear el QR?**  
Solo si el volumen se borra o si WhatsApp cierra la sesión manualmente. En uso normal, nunca.

**¿Cuánto RAM usa el bot?**  
Unos 100-150 MB. El plan gratuito de Fly da 256 MB, suficiente.

**¿Se puede usar mi propio Docker local para probar antes de subir?**  
Sí:
```powershell
# Construir imagen localmente
docker build -t el-molino-bot .

# Probar localmente (el QR aparecerá en la terminal)
docker run -it -p 8080:8080 --env-file .env el-molino-bot
```

**¿Puedo ver los pedidos en Sheets desde el móvil?**  
Sí, Google Sheets tiene app móvil. Cualquier cuenta con acceso a la hoja puede verla.
