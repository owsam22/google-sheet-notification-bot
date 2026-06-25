# Google Sheets to Telegram Notifier | Real-Time Notifications using Google Apps Script & Telegram Bot API

> By Samarpan

Get instant Telegram notifications whenever a new entry is added to a Google Sheet. Works with Google Forms, HTML forms, portfolio contact forms, lead generation forms, customer inquiries, and spreadsheet monitoring.

---

## 🚀 Quick Navigation

> **Using a Website Contact Form or HTML Form?**
>
> 👉 Jump to **[Method 2: Instant Notifications with doPost()](#method-2-instant-notifications-with-dopost-recommended)**

* [Features](#features)
* [Which Method Should I Use?](#which-method-should-i-use)
* [Telegram Bot Setup](#step-1-create-a-telegram-bot)
* [Get Chat ID](#step-2-get-your-chat-id)
* [Method 1: Trigger-Based Monitoring](#method-1-trigger-based-monitoring)
* [Method 2: Instant Notifications with doPost()](#method-2-instant-notifications-with-dopost-recommended)
* [Troubleshooting](#troubleshooting)

---

## Features

* Real-time Telegram notifications
* Google Sheets monitoring
* Google Forms notifications
* HTML form notifications
* Portfolio contact form alerts
* No backend required
* No database required
* Free to use
* Easy setup
* Mobile notifications through Telegram

---

# Which Method Should I Use?

| Use Case                       | Recommended Method |
| ------------------------------ | ------------------ |
| Google Forms                   | Method 1           |
| Existing Google Sheet          | Method 1           |
| Manual Spreadsheet Entry       | Method 1           |
| Shared Spreadsheet             | Method 1           |
| Portfolio Website Contact Form | Method 2           |
| HTML Form                      | Method 2           |
| Apps Script Web App            | Method 2           |
| Lead Generation Form           | Method 2           |

### Method 1

Uses a scheduled Apps Script trigger to monitor a Google Sheet and detect new rows.

### Method 2 (Recommended)

Sends Telegram notifications directly from `doPost()` when form data is submitted.

Faster, simpler, and more reliable.

---

# Step 1: Create a Telegram Bot

Open Telegram and search:

```text
@BotFather
```

Run:

```text
/newbot
```

Create your bot and save the Bot Token.

Example:

```text
123456789:ABCDefGhIjKlMnOpQrStUvWxYz
```

---

# Step 2: Get Your Chat ID

Open your bot.

Click:

```text
Start
```

Send any message.

Open:

```text
https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
```

Example response:

```json
{
  "message": {
    "chat": {
      "id": 123456789
    }
  }
}
```

Copy:

```text
123456789
```

This is your Chat ID.

---

# Method 1: Trigger-Based Monitoring

### Best For

* Google Forms
* Existing Google Sheets
* Manual spreadsheet updates
* Third-party integrations

### How It Works

```text
Google Sheet
      ↓
Apps Script Trigger
      ↓
Detect New Row
      ↓
Telegram Notification
```

### Code

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

    UrlFetchApp.fetch(
      "https://api.telegram.org/bot" +
      BOT_TOKEN +
      "/sendMessage",
      {
        method: "post",
        payload: {
          chat_id: CHAT_ID,
          text:
            "🔔 New Entry Added\n\nSheet: " +
            sheet.getName()
        }
      }
    );

    props.setProperty(
      "LAST_ROW",
      currentRows
    );
  }
}
```

### Create Trigger

```text
Extensions
→ Apps Script
→ Triggers
→ Add Trigger

Function:
checkForNewRows

Event Source:
Time-driven

Frequency:
Every Minute
```

### Example Notification

```text
🔔 New Entry Added

Sheet: Form Responses 1
```

---

# Method 2: Instant Notifications with doPost() (Recommended)

### Best For

* Portfolio websites
* Contact forms
* HTML forms
* Apps Script Web Apps
* Lead generation forms

### How It Works

```text
HTML Form
      ↓
Apps Script doPost()
      ↓
Google Sheet
      ↓
Telegram Notification
```

### Code

```javascript
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

function doPost(e) {

  var sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet();

  var name = e.parameter.name || "";
  var email = e.parameter.email || "";
  var phone = e.parameter.phone || "";
  var message = e.parameter.message || "";

  sheet.appendRow([
    new Date(),
    name,
    email,
    phone,
    message
  ]);

  UrlFetchApp.fetch(
    "https://api.telegram.org/bot" +
    BOT_TOKEN +
    "/sendMessage",
    {
      method: "post",
      payload: {
        chat_id: CHAT_ID,
        text:
          "🔔 New Portfolio Inquiry\n\n" +
          "👤 Name: " + name + "\n" +
          "📧 Email: " + email + "\n" +
          "📱 Phone: " + phone
      }
    }
  );

  return ContentService
    .createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Example Notification

```text
🔔 New Portfolio Inquiry

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: 9876543210
```

Notifications typically arrive within a few seconds.

---

# Troubleshooting

### No Telegram Notification

Check:

* Bot token is correct
* Chat ID is correct
* Bot has been started
* Apps Script permissions are granted

### getUpdates Returns Empty Array

```json
{
  "ok": true,
  "result": []
}
```

Solution:

1. Open the bot
2. Click Start
3. Send a message
4. Run getUpdates again

### Notifications Stopped After Deleting Rows

This only affects Method 1.

The stored row count may become larger than the current row count.

Fix:

* Add enough rows to exceed the stored value
* Or reset the Script Property

Method 2 is not affected.

---

# Technologies Used

* Google Apps Script
* Google Sheets
* Telegram Bot API
* JavaScript
* HTML Forms

---

# GitHub Topics

```text
google-sheets
google-apps-script
telegram-bot
telegram-api
notifications
google-forms
spreadsheet-monitoring
telegram-notifications
javascript
automation
```

---

# License

MIT License

Feel free to use, modify, and distribute this project.

⭐ If this project helped you, consider starring the repository.
