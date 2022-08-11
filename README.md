# ☕️ Coffeebot

Hello humans! I am here to assign a random other human to have coffee with you each week. I understand you enjoy partaking in hot beverages in a social setting.

### How this works

1. Humans sign up for Coffeebot by putting your email and other info in a Google Sheet
2. Every Monday morning, I match the humans into pairs and email them about it
3. Humans receive their emails and set up coffee appointments in the human calendars.

### How to set this up

1. Create a new spreadsheet in Google Sheets
2. Make the first row look like this:

| Email (required) | Name | Website | LinkedIn | Twitter | Other info |
|------------------|------|---------|----------|---------|------------|

   
3. Create a new Apps Script in Google Drive.
4. Copy-and-paste the code from coffeebot.js
5. Change SHEET_ID to point to your Google Sheet from #1
6. Ask people to subscribe Coffeebot by putting their names in the Google Sheet from #1
