const BOT_TOKEN="YOUR_CHAT_TOKEN"
const CHAT_ID="YOUR_CHAT_ID"

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get the data from the form submission
  var name = e.parameter.name || "";
  var email = e.parameter.email || "";
  var phone = e.parameter.phone || "";
  var message = e.parameter.message || "";
  
  // Create a new row
  var newRow = [new Date(), name, email, phone, message];
  
  // Append the row to the sheet
  sheet.appendRow(newRow);

  //telegram notification 
    const url ="https://api.telegram.org/bot"+BOT_TOKEN+"/sendMessage";

      const telegramMessage =
    "🔔 New Portfolio Inquiry\n\n" +
    "👤 Name: " + name + "\n" +
    "📧 Email: " + email + "\n" +
    "📱 Phone: " + phone + "\n\n" +
    "🗨️ Message: "+message +"\n\n"+
    "🌐 YOUR CUSTOME TEXT";

  UrlFetchApp.fetch(url, {
    method: "post",
    payload: {
      chat_id: CHAT_ID,
      text: telegramMessage
    }
  });

  
  // Return a success message
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
