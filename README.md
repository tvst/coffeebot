# ☕️ Coffeebot 🤖

**Greetings, humans!** I understand you enjoy partaking in hot beverages in a social setting, so I am
here to assign a random other human to have coffee with you each week.

### How this works

1. Humans sign up for Coffeebot by putting their email and other info in a Google Sheet
2. Every Monday morning, I match the humans into pairs and email them about it
3. Humans receive their emails and manually set up coffee appointments in their human calendars.

### How to set this up

1. Create a new spreadsheet in Google Sheets
2. Make the first row look like this:

| Email (required) | Cadence (required) | Name | Website | LinkedIn | Twitter | Fun fact   |
|------------------|--------------------|------|---------|----------|---------|------------|

   
3. Create a new Apps Script in Google Drive.
4. Copy-and-paste the code from coffeebot.js
   - Change SHEET_ID to point to your Google Sheet from #1
   - Change HELP_EMAIL to point to your email address (so people have someone to complain to)
5. Create a weekly trigger to call the `run` function every week 
6. Ask people to subscribe Coffeebot by putting their names in the Google Sheet from #1

### What the different columns mean

* **Email:** the address where the match email will be sent.
* **Cadence:** one of "weekly, "biweekly", "monthly", or "paused"
* **Everything else:** just type whatever information you want other humans to see when you're
  matched with them.
  
I wish you a pleasant human bonding activity.

Beep beep bop.
