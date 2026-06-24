// for code.gs of Sheet AppSCript

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

function checkForNewRows() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Sheet1");

  const currentRows = sheet.getLastRow();

  const props =
    PropertiesService.getScriptProperties();

  let previousRows =
    props.getProperty("LAST_ROW");

  if (!previousRows) {
    props.setProperty("LAST_ROW", currentRows);
    return;
  }

  previousRows = parseInt(previousRows);

  if (currentRows > previousRows) {

    const message =
      "🔔 New Entry Added\n\n" +
      "Sheet: " +
      sheet.getName();

    const url =
      "https://api.telegram.org/bot" +
      BOT_TOKEN +
      "/sendMessage";

    UrlFetchApp.fetch(url, {
      method: "post",
      payload: {
        chat_id: CHAT_ID,
        text: message
      }
    });

    props.setProperty(
      "LAST_ROW",
      currentRows
    );
  }
}
