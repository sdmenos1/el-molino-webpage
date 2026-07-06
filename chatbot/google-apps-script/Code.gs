// ============================================================
// Code.gs — Google Apps Script para Cafetería El Molino
// Guarda los pedidos recibidos por el bot en una Google Sheet.
//
// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ve a script.google.com
// 2. Crea un nuevo proyecto y pega este código
// 3. En el menú: Implementar > Nueva implementación
// 4. Tipo: Aplicación web
// 5. Ejecutar como: Yo
// 6. Quién tiene acceso: Cualquiera
// 7. Implementar → Copia la URL que aparece
// 8. Pega esa URL en el archivo .env del chatbot como APPS_SCRIPT_URL
// ============================================================

const SHEET_NAME = 'Pedidos El Molino';

// Recibe los datos del pedido vía POST desde el bot
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Crear la hoja si no existe
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = ['Fecha', 'Hora', 'Cliente', 'Teléfono', 'Preparación', 'Platos', 'Total (€)', 'Observaciones', 'Estado'];
      sheet.appendRow(headers);

      // Estilo de cabecera
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2D1A0E'); // Terracota oscuro
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);

      // Ancho de columnas
      sheet.setColumnWidth(1, 90);  // Fecha
      sheet.setColumnWidth(2, 70);  // Hora
      sheet.setColumnWidth(3, 140); // Cliente
      sheet.setColumnWidth(4, 130); // Teléfono
      sheet.setColumnWidth(5, 180); // Preparación
      sheet.setColumnWidth(6, 320); // Platos
      sheet.setColumnWidth(7, 90);  // Total
      sheet.setColumnWidth(8, 200); // Observaciones
      sheet.setColumnWidth(9, 130); // Estado
    }

    // Añadir fila con los datos del pedido
    const row = sheet.appendRow([
      data.date,
      data.hour,
      data.name,
      data.phone,
      data.prepMode,
      data.items,
      data.total,
      data.notes,
      data.status,
    ]);

    // Alternar color de filas para facilitar lectura
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, 9).setBackground('#FFF8F5');
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Respuesta de prueba cuando se accede via GET (para verificar que funciona)
function doGet(e) {
  return ContentService
    .createTextOutput('✅ El Molino Bot — Google Apps Script funcionando correctamente')
    .setMimeType(ContentService.MimeType.TEXT);
}
