// ============================================================
// Code.gs — Google Apps Script para Cafetería El Molino
// Guarda los pedidos, los sirve en JSON y permite actualizar su estado.
// ============================================================

const SHEET_NAME = 'Pedidos El Molino';

// Recibe los datos del pedido o acciones de actualización desde la web
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 1. Manejar acción de actualización de estado desde el Dashboard
    if (data.action === 'updateStatus') {
      const rowNum = parseInt(data.row, 10);
      if (sheet && rowNum > 1 && rowNum <= sheet.getLastRow()) {
        sheet.getRange(rowNum, 9).setValue(data.status); // Columna 9 es 'Estado'
        return ContentService
          .createTextOutput(JSON.stringify({ ok: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Fila inválida o no encontrada' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Crear la hoja si no existe (flujo de creación normal)
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
    sheet.appendRow([
      data.date,
      data.hour,
      data.name,
      data.phone,
      data.prepMode,
      data.items,
      data.total,
      data.notes,
      data.status || 'Confirmado ✅',
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

// Devuelve la lista completa de pedidos en formato JSON
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getDisplayValues();
    if (rows.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = rows[0];
    const orders = [];

    // Recorrer filas (saltando la cabecera)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const order = { id: i }; // usar número de fila como ID temporal
      for (let j = 0; j < headers.length; j++) {
        const key = getHeaderKey(headers[j]);
        order[key] = row[j];
      }
      orders.push(order);
    }

    // Devolver en orden inverso (los más recientes primero)
    orders.reverse();

    return ContentService
      .createTextOutput(JSON.stringify(orders))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Mapear nombres de columnas de Sheets a claves JSON para el frontend
function getHeaderKey(header) {
  switch (header) {
    case 'Fecha': return 'date';
    case 'Hora': return 'hour';
    case 'Cliente': return 'name';
    case 'Teléfono': return 'phone';
    case 'Preparación': return 'prepMode';
    case 'Platos': return 'items';
    case 'Total (€)': return 'total';
    case 'Observaciones': return 'notes';
    case 'Estado': return 'status';
    default: return header.toLowerCase();
  }
}
