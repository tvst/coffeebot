// Get the SHEET_ID from your Google Sheet's URL:
// https://docs.google.com/spreadsheets/d/[ THIS IS THE SHEET_ID ]/edit#gid=0
//                                        ^^^^^^^^^^^^^^^^^^^^^^^^
const SHEET_ID = 'Fill this out! See above.'

// Put your email here:
const authorEmail = 'youremail@foobarbaz.com'

// ----------------------------------------------------------------------
// Don't change anything else below.
// ----------------------------------------------------------------------

// Columns A-F in the spreadsheet should be the following:
//
//    Email (required), Name, Website, LinkedIn, Twitter, Other info
// 
// ...and ROW 1 is a header row, which we ignore.
const RANGE = 'Main!A2:F'


function run() {
  const subscribers = getSubscribers()
  Logger.log('Subscribers: %s', subscribers)

  const assignments = getAssignments(subscribers)
  Logger.log('Assignments: %s', assignments)

  for (let assignment of assignments) {
    Logger.log('Sending email for %s', assignment)
    sendEmail(assignment)
  }

  Logger.log('Done!')
}


const BODY_TEMPLATE = ({assignment}) => (
`👋 Hello there, humans!

You ${assignment.length} have been matched to have coffee this week.

ALLOW ME TO INTRODUCE YOU:

${assignment
  .map(x => x.toString())
  .join('\n\n')}

NEXT STEPS:
📆 Set up a 30min coffee meeting. This could be in-person or virtual. Up to you!
🤘 Be excellent to each other and have a great time. I suggest shadow puppets. Humans enjoy that.

Cheerios! Beep bop beep.
- Coffeebot out

---
You are receiving this because you signed up for Coffeebot.

To unsubscribe, just remove your name from this Google sheet:
https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0

If you have any questions, ping my human at ${authorEmail}
`)


function sendEmail(assignment) {
  const recipients = assignment.map(x => x.email).join(',')
  const subject = "☕ Rejoice! You have been matched for coffee"
  const body = BODY_TEMPLATE({assignment})
  const options = {noReply: true}
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
  try {
    const values = Sheets.Spreadsheets.Values.get(SHEET_ID, RANGE).values

    if (!values) return []
  
    return values.map(x => new Subscriber(x))
    
  } catch (err) {
    return []
  }
}


class Subscriber {
  constructor(row) {
    this.email = row[0]
    this.name = row[1]
    this.website = row[2]
    this.linkedIn = row[3]
    this.twitter = row[4]
    this.other = row[5]
  }

  toString() {
    let out = []
    if (this.name) out.push(`Name: ${this.name}`)
    if (this.email) out.push(`Email: ${this.email}`)
    if (this.website) out.push(`Website: ${this.website}`)
    if (this.linkedIn) out.push(`LinkedIn: ${this.linkedIn}`)
    if (this.twitter) out.push(`Twitter: ${this.twitter}`)
    if (this.other) out.push(`Other stuff: ${this.other}`)

    if (out.length === 0) {
      Logger.log('ERROR: Malformed Subscriber object!', this)
    }

    return out.join('\n')
  }
}
