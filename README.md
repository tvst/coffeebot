# ☕️ Coffeebot

A serverless robot that matches people to have coffee. Runs on Google Apps Script (free with GSuite).

---

🤖 **Greetings, humans!** I understand you enjoy partaking in hot beverages in a social setting, so I am
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

   <img width="400" alt="Screenshot 2023-06-17 at 16 42 36" src="https://github.com/tvst/coffeebot/assets/690814/90a54fd2-38c3-4092-82f7-e764c8854f0e">

4. Copy-and-paste the code from [coffeebot.js](https://github.com/tvst/coffeebot/blob/main/coffeebot.js)
   - Change `SHEET_ID` to point to your Google Sheet from #1
   - Change `HELP_EMAIL` to point to your email address (so people have someone to complain to)

5. Create a trigger that calls the `run` function every week
 
   <img width="294" alt="Screenshot 2023-06-17 at 16 51 18" src="https://github.com/tvst/coffeebot/assets/690814/ab8bf3f8-d37d-4070-b54b-083431976dd0"><br />
   
   <img width="400" alt="Screenshot 2023-06-17 at 16 54 31" src="https://github.com/tvst/coffeebot/assets/690814/11aa8bb3-a7ab-42bd-9fa3-16f44c8e2f86">
    
6. Ask people to subscribe Coffeebot by putting their names in the Google Sheet from #1

### What the different columns mean

* **Email:** the address where the match email will be sent.
* **Cadence:** one of "weekly, "biweekly", "monthly", or "paused"
* **Everything else:** just type whatever information you want other humans to see when you're
  matched with them.
  
  
### And that's it!

I wish you a pleasant human bonding activity.

Beep beep bop.
