# Google Sheets to Telegram Notification System | Real-Time Google Sheets Notifications using Google Apps Script & Telegram Bot API

> By [Samarpan](https://samarpan-portfolio.vercel.app)

Receive instant Telegram notifications whenever a new entry is added to a Google Sheet using Google Apps Script and Telegram Bot API.

This project helps you monitor Google Sheets, Google Forms responses, portfolio contact forms, customer inquiries, lead generation forms, feedback forms, and other spreadsheet-based workflows without constantly checking your sheet.

---

## Features

- Real-time Telegram notifications
- Works with Google Sheets
- Works with Google Forms
- Works with custom HTML forms
- Google Apps Script based
- No backend server required
- No database required
- No hosting required
- Free to use
- Lightweight setup
- Native mobile notifications through Telegram
- Supports both trigger-based and instant notification methods

---

## Use Cases

### Portfolio Contact Forms

Get notified instantly when someone submits your portfolio contact form.

### Lead Generation

Receive Telegram alerts whenever a new lead is added to your Google Sheet.

### Customer Inquiries

Monitor customer messages without manually checking spreadsheets.

### Feedback Collection

Get instant notifications when users submit feedback.

### Google Form Responses

Receive Telegram notifications whenever a Google Form receives a new response.

### Spreadsheet Monitoring

Track new rows added by users, integrations, APIs, or automation tools.

---

# How It Works

This project supports two different notification methods.

## Method 1: Trigger-Based Monitoring

Best for:

- Google Forms
- Existing Google Sheets
- Manual spreadsheet entries
- Third-party integrations
- Shared spreadsheets

### Flow

```text
Google Sheet
      ↓
Apps Script Trigger
      ↓
Detect New Row
      ↓
Telegram Bot API
      ↓
Telegram Notification
      ↓
Phone Notification
```

The script periodically checks the spreadsheet and sends a Telegram notification when it detects a new row.

---

## Method 2: Instant Notification using doPost() (Recommended)

Best for:

- Portfolio websites
- Contact forms
- Lead generation forms
- Custom HTML forms
- Apps Script Web Apps

### Flow

```text
Website Form
      ↓
Apps Script doPost()
      ↓
Google Sheet
      ↓
Telegram Bot API
      ↓
Telegram Notification
      ↓
Phone Notification
```

When a form is submitted, the data is saved to Google Sheets and a Telegram notification is sent instantly.

No triggers required.

---

# Prerequisites

Before starting, make sure you have:

- Google Account
- Google Sheet
- Telegram Account

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

BotFather will provide a Bot Token.

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

with your actual token.

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

# Method 1: Trigger-Based Monitoring

## When Should You Use This?

Use this method if:

- You use Google Forms
- You manually add rows
- Another application writes data into the sheet
- You do not have access to a doPost() function

---

## Apps Script Code

Replace:

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

---

## Create Trigger

Open:

```text
Extensions
→ Apps Script
→ Triggers
```

Add Trigger:

```text
Function:
checkForNewRows

Event Source:
Time-driven

Frequency:
Every Minute
```

Save and authorize permissions.

---

## Example Notification

```text
🔔 New Entry Added

Sheet: Form Responses 1
```

---

# Method 2: Instant Notification using doPost()

## When Should You Use This?

Use this method if:

- Your HTML form sends data to Apps Script
- You have a portfolio website
- You use Apps Script Web Apps
- You want instant notifications

This method is recommended.

---

## Apps Script Code

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

  const telegramMessage =
    "🔔 New Portfolio Inquiry\n\n" +
    "👤 Name: " + name + "\n" +
    "📧 Email: " + email + "\n" +
    "📱 Phone: " + phone;

  UrlFetchApp.fetch(
    "https://api.telegram.org/bot" +
    BOT_TOKEN +
    "/sendMessage",
    {
      method: "post",
      payload: {
        chat_id: CHAT_ID,
        text: telegramMessage
      }
    }
  );

  return ContentService
    .createTextOutput("Success")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

---

## Example Notification

```text
🔔 New Portfolio Inquiry

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: 9876543210
```

Notifications typically arrive within a few seconds.

---

# Which Method Should You Use?

| Scenario | Recommended Method |
|-----------|-------------------|
| Google Form Responses | Trigger Method |
| Existing Google Sheet | Trigger Method |
| Manual Spreadsheet Entries | Trigger Method |
| Shared Spreadsheet | Trigger Method |
| Portfolio Contact Form | doPost Method |
| HTML Form | doPost Method |
| Lead Generation Website | doPost Method |
| Apps Script Web App | doPost Method |

For new projects, the **doPost() method is recommended** because it provides instant notifications and eliminates the need for scheduled spreadsheet monitoring.

---

# Troubleshooting

## No Telegram Message Received

Verify:

- Bot token is correct
- Chat ID is correct
- Bot has been started
- Apps Script permissions are granted

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

1. Open your bot
2. Click Start
3. Send a message
4. Run getUpdates again

---

## Sheet Not Found

Check:

```javascript
.getSheetByName("Sheet1")
```

Make sure the name exactly matches your spreadsheet tab.

---

## Notifications Stopped After Deleting Rows

The trigger-based method stores the previous row count.

If rows are deleted, the stored count may become larger than the actual row count.

Solution:

- Add enough rows to exceed the stored count
- Or reset the stored value using Script Properties

The doPost() method does not have this issue.

---

# Project Structure

```text
Google Sheet
│
├── Google Apps Script
│
├── Telegram Bot
│   ├── Bot Token
│   └── Chat ID
│
└── Notification System
    ├── Trigger-Based Monitoring
    └── Instant doPost Notifications
```

---

# Technologies Used

- Google Apps Script
- Google Sheets
- Telegram Bot API
- JavaScript
- HTML Forms

---

# GitHub Topics

```text
google-sheets
google-apps-script
telegram-bot
telegram-api
notifications
google-workspace
automation
spreadsheet-monitoring
google-forms
form-notifications
telegram-notifications
javascript
webhook
productivity
portfolio-project
```

---

# Future Improvements

- Multiple Telegram recipients
- Discord notifications
- Slack notifications
- Email notifications
- WhatsApp integration
- Web dashboard
- Mobile application
- Multi-user SaaS platform
- Push notifications
- Notification history

---

# License

MIT License

Feel free to use, modify, and distribute this project.

---

⭐ If this project helped you, consider starring the repository.
