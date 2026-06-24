# Google Sheets to Telegram Notification System
>by (samarpan)[https://samarpan-portfolio.vercel.app]

A lightweight notification system that sends instant Telegram alerts whenever a new row is added to a Google Sheet.

Perfect for:

* Portfolio contact forms
* Lead collection forms
* Customer inquiries
* Feedback forms
* Order submissions
* Any system that stores data in Google Sheets

## Features

* Real-time Telegram notifications
* No backend server required
* No database required
* No hosting required
* Free to use
* Easy setup
* Works with any Google Sheet

---

# How It Works

```text
Website Form
      ↓
Google Sheet
      ↓
Google Apps Script
      ↓
Telegram Bot API
      ↓
Telegram App
      ↓
Phone Notification
```

Whenever a new row is added to the spreadsheet, Google Apps Script detects the change and sends a Telegram message through your bot.

---

# Prerequisites

Before starting, make sure you have:

* A Google Account
* A Google Sheet
* A Telegram Account

---

# Step 1: Create a Telegram Bot

Open Telegram and search for:

```text
@BotFather
```

Start a conversation and run:

```text
/newbot
```

Follow the instructions:

1. Enter a bot name
2. Enter a unique username

Example:

```text
Bot Name: Sheet Notify Bot
Username: sheet_notify_bot
```

BotFather will return a Bot Token.

Example:

```text
123456789:ABCDefGhIjKlMnOpQrStUvWxYz
```

Save this token.

---

# Step 2: Get Your Chat ID

Open your newly created bot.

Click:

```text
Start
```

Send any message.

Example:

```text
Hello
```

Open:

```text
https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
```

Replace:

```text
YOUR_BOT_TOKEN
```

with your actual bot token.

Example response:

```json
{
  "ok": true,
  "result": [
    {
      "message": {
        "chat": {
          "id": 123456789
        }
      }
    }
  ]
}
```

Copy:

```text
123456789
```

This is your Chat ID.

---

# Step 3: Open Google Apps Script

Open your Google Sheet.

Navigate to:

```text
Extensions
→ Apps Script
```

Delete any existing code.

---

# Step 4: Add Script

Replace the placeholders:

```text
YOUR_BOT_TOKEN
YOUR_CHAT_ID
```

with your own values.

```javascript
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
```

Save the script.

---

# Step 5: Create Trigger

Inside Apps Script:

```text
Triggers
→ Add Trigger
```

Configure:

```text
Function:
checkForNewRows

Event Source:
Time-driven

Type:
Every Minute
```

Save.

Authorize the required permissions.

---

# Step 6: Test

Add a new row to your spreadsheet.

Within one minute you should receive:

```text
🔔 New Entry Added

Sheet: Sheet1
```

inside Telegram.

Telegram will also generate a native phone notification.

---

# Custom Notification Message

You can customize the notification text.

Example:

```javascript
const message =
  "📩 New Portfolio Inquiry\n\n" +
  "Sheet: " + sheet.getName();
```

Output:

```text
📩 New Portfolio Inquiry

Sheet: Portfolio Leads
```

---

# Multiple Sheets

Monitor multiple sheets:

```javascript
const sheets = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheets();

sheets.forEach(sheet => {
  Logger.log(sheet.getName());
});
```

Store individual row counts for each sheet using PropertiesService.

---

# Troubleshooting

## No Telegram Message Received

Verify:

* Bot token is correct
* Chat ID is correct
* Bot has been started
* Trigger is enabled

---

## getUpdates Returns Empty Array

Example:

```json
{
  "ok": true,
  "result": []
}
```

Solution:

1. Open bot chat
2. Click Start
3. Send a message
4. Call getUpdates again

---

## Sheet Not Detected

Check:

```javascript
.getSheetByName("Sheet1")
```

Ensure the name matches your actual sheet tab.

---

# Project Structure

```text
Google Sheet
│
├── Apps Script
│   └── checkForNewRows()
│
├── Telegram Bot
│   ├── Bot Token
│   └── Chat ID
│
└── Trigger
    └── Every Minute
```

---

# Future Improvements

* Instant notifications using doPost()
* Multiple Telegram recipients
* Email notifications
* Discord notifications
* Slack notifications
* Web dashboard
* Mobile app
* SaaS version for multiple users

---

# License

MIT License

Feel free to use, modify, and distribute this project.
