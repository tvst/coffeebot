// Get the SHEET_ID from your Google Sheet's URL:
// https://docs.google.com/spreadsheets/d/[ THIS IS THE SHEET_ID ]/edit#gid=0
//                                        ^^^^^^^^^^^^^^^^^^^^^^^^
const SHEET_ID = 'Fill this out! See above.'

// Put your email here:
const HELP_EMAIL = 'youremail@foobarbaz.com'

// ----------------------------------------------------------------------
// Don't change anything else below.
// ----------------------------------------------------------------------

// Columns A-G in the spreadsheet should be the following:
//
//    Email (required), Cadence, Name, Website, LinkedIn, Twitter, Other info
//
// ...where cadence is either "weekly", "biweekly", "monthly", or "paused".
// ...and ROW 1 is a header row, which we ignore.
const RANGE = 'Main!A2:G'


function run() {
  const subscribers = getSubscribers()
  console.log('Subscribers:\n\n%s', subscribers.join('\n\n'))

  const assignments = getAssignments(subscribers)
  console.log('Assignments:\n\n%s', assignments.join('\n\n'))

  for (let assignment of assignments) {
    console.log('Sending email to assignment:\n\n%s', assignment.join('\n\n'))
    sendEmail(assignment)
  }

  console.log('Done!')
}


const BODY_TEMPLATE = ({assignment}) => (
`👋 Hello there, humans!

You ${assignment.length} have been matched to have coffee this week.

ALLOW ME TO INTRODUCE YOU:

${assignment
  .map(a => a.toString({shorter: true}))
  .join('\n\n')}

NEXT STEPS:

- 📆 Set up a 30min coffee meeting. This could be in-person or virtual. Up to you!
- 🤘 Be excellent to each other and have a great time. I suggest shadow puppets. Humans enjoy that.

🥷 PRO TIP: You can "reply all" to this email to talk to your coffeemates

Cheerios!

Beep bop beep.
- Coffeebot out

---
You are receiving this because you signed up for Coffeebot.

To unsubscribe, just remove your name from this Google sheet:
https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0

If you have any questions, ping my human at ${HELP_EMAIL}
`)


function sendEmail(assignment) {
  const recipients = assignment.map(a => a.email).join(',')
  const subject = "☕ Rejoice! You have been matched for coffee"
  const body = BODY_TEMPLATE({assignment})
  const options = {replyTo: recipients}
  MailApp.sendEmail(recipients, subject, body, options)
}


function getAssignments(subscribers) {
  const shuffled = shuffleArray(subscribers)
  const assignments = []

  // Pair up every 2 consecutive people.
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    assignments.push([shuffled[i], shuffled[i+1]])
  }

  // If odd number of people, add the last person (who hasn't been matched) to the last assignment.
  // So sometimes there's an assignment with 3 people rather than 2. 
  if (shuffled.length % 2 == 1) {
    if (assignments.length == 0) assignments.push([])

    const lastAssignment = assignments[assignments.length - 1]
    lastAssignment.push(shuffled[shuffled.length - 1])
  } 

  return assignments
}


// Copied from: https://stackoverflow.com/a/2450976
function shuffleArray(array) {
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}


function getSubscribers() {
  const values = Sheets.Spreadsheets.Values.get(SHEET_ID, RANGE).values

  if (!values) return []

  const weekNumber = getWeekNumber()

  return values
    .map(row => new Subscriber(row))
    .filter(sub => sub.isValid())
    .filter(sub => sub.isParticipatingThisWeek(weekNumber))
}

// Modified from https://stackoverflow.com/a/6117889
function getWeekNumber() {
  var d = new Date()
  var dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

class Subscriber {
  constructor(row) {
    this.email = row[0]?.trim()
    this.cadence = row[1]?.trim().toLowerCase()
    this.name = row[2]?.trim()
    this.website = row[3]?.trim()
    this.linkedIn = row[4]?.trim()
    this.twitter = row[5]?.trim()
    this.other = row[6]?.trim()
  }

  isValid() {
    const valid = this.email == null ? false : this.email.length > 0

    if (!valid) {
      console.log('Not valid:', this.toString())
    }

    return valid
  }

  isParticipatingThisWeek(weekNumber) {
    switch (this.cadence) {
      case 'paused':
        return false

      case 'weekly':
        return true

      case 'biweekly':
      case 'bi-weekly':
        return weekNumber % 2 == 0

      case 'monthly':
        return weekNumber % 4 == 0

      default:
        return true
    }
  }

  toString({ shorter } = {}) {
    let out = []
    if (this.name) out.push(`Name: ${this.name}`)
    if (this.email) out.push(`Email: ${this.email}`)
    if (this.website) out.push(`Website: ${this.website}`)
    if (this.linkedIn) out.push(`LinkedIn: ${this.linkedIn}`)
    if (this.twitter) out.push(`Twitter: ${this.twitter}`)
    if (this.other) out.push(`Fun fact: ${this.other}`)

    if (!shorter) {
      if (this.cadence) out.push(`Cadence: ${this.cadence}`)
    }

    if (out.length === 0) {
      console.log('ERROR: Malformed Subscriber object!', this)
    }

    return out.join('\n')
  }
}
