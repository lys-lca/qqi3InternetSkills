/**
 * quiz-data.js
 * ------------------------------------------------------------------
 * Multiple-choice questions used by the Quick Quiz.
 *
 * HOW TO EDIT
 * - Duplicate one complete question object.
 * - Give it a unique id.
 * - answer is the number of the correct option, starting at 0.
 *   Example: answer: 1 means the SECOND option is correct.
 * - tags use category keys from glossary-data.js.
 * ------------------------------------------------------------------
 */

const QUIZ_QUESTIONS = [
  {
    id: "q01",
    question: "Which application is used to open and view websites?",
    options: ["Spreadsheet", "Web browser", "Media player", "Calculator"],
    answer: 1,
    explanation: "A web browser is the application used to visit and interact with websites.",
    tags: ["browser"]
  },
  {
    id: "q02",
    question: "What does a URL identify?",
    options: ["A web address", "A password", "A printer", "A contact name"],
    answer: 0,
    explanation: "A URL is the complete address of a page or resource online.",
    tags: ["browser", "basics"]
  },
  {
    id: "q03",
    question: "Which search uses the clearest keywords?",
    options: ["help", "course", "free evening computer courses Limerick", "internet things"],
    answer: 2,
    explanation: "Specific keywords usually return more useful and relevant results.",
    tags: ["search"]
  },
  {
    id: "q04",
    question: "What is the best first check when deciding whether a source is reliable?",
    options: ["The page has bright colours", "The author and organisation are clear", "It appears first", "It has many adverts"],
    answer: 1,
    explanation: "A named author or trustworthy organisation is an important reliability clue.",
    tags: ["search", "safety"]
  },
  {
    id: "q05",
    question: "Which action saves a shortcut to a useful webpage?",
    options: ["Archive", "Upload", "Bookmark", "Reply"],
    answer: 2,
    explanation: "A bookmark or favourite saves a browser shortcut to a webpage.",
    tags: ["browser"]
  },
  {
    id: "q06",
    question: "Which browser feature can help you return to a page that you closed?",
    options: ["History", "Attachment", "Subject line", "Spam"],
    answer: 0,
    explanation: "Browser history contains a record of recently visited pages.",
    tags: ["browser"]
  },
  {
    id: "q07",
    question: "What does downloading a file mean?",
    options: ["Sending it to a website", "Copying it from the internet to your device", "Deleting it", "Printing it"],
    answer: 1,
    explanation: "Downloading moves a copy from an online service to your device.",
    tags: ["basics"]
  },
  {
    id: "q08",
    question: "Which item is needed to share a home internet connection with several devices?",
    options: ["Router", "Attachment", "Search result", "Subject line"],
    answer: 0,
    explanation: "A router directs traffic and shares the connection with devices.",
    tags: ["access"]
  },
  {
    id: "q09",
    question: "What should an email subject line do?",
    options: ["Contain the whole message", "Briefly explain the topic", "Hide the recipient", "Replace the greeting"],
    answer: 1,
    explanation: "A clear subject helps the recipient understand the purpose of the email.",
    tags: ["email"]
  },
  {
    id: "q10",
    question: "What is an email attachment?",
    options: ["A saved password", "A file sent with a message", "A hidden recipient", "An unwanted advert"],
    answer: 1,
    explanation: "An attachment is a document, photograph or other file included with an email.",
    tags: ["email"]
  },
  {
    id: "q11",
    question: "When is BCC useful?",
    options: ["When addresses should be hidden from other recipients", "When no subject is needed", "When downloading a file", "When refreshing a page"],
    answer: 0,
    explanation: "BCC sends a hidden copy and helps protect addresses in a group email.",
    tags: ["email", "safety"]
  },
  {
    id: "q12",
    question: "Which message is most likely to be phishing?",
    options: ["A planned class reminder", "An urgent request to click a link and enter your password", "A reply from a tutor", "A receipt for something you bought"],
    answer: 1,
    explanation: "Urgency, suspicious links and requests for secret information are common phishing warning signs.",
    tags: ["safety", "email"]
  },
  {
    id: "q13",
    question: "Which is the safest password habit?",
    options: ["Reuse one short password", "Share passwords with friends", "Use a unique long passphrase", "Write it in a public note"],
    answer: 2,
    explanation: "Long, unique passwords or passphrases reduce the harm if one account is attacked.",
    tags: ["safety"]
  },
  {
    id: "q14",
    question: "What does two-factor authentication add?",
    options: ["A second identity check", "A second email address", "A faster connection", "A public profile"],
    answer: 0,
    explanation: "2FA asks for another form of proof as well as the password.",
    tags: ["safety"]
  },
  {
    id: "q15",
    question: "What is a digital footprint?",
    options: ["A printer mark", "The trail created by online activity", "A Wi-Fi signal", "A type of browser"],
    answer: 1,
    explanation: "Posts, searches, accounts and other activity can all add to a digital footprint.",
    tags: ["safety"]
  },
  {
    id: "q16",
    question: "What should you do on a shared computer after using email?",
    options: ["Leave the inbox open", "Save the password", "Log out", "Forward every message"],
    answer: 2,
    explanation: "Logging out helps stop the next user from accessing your account.",
    tags: ["email", "safety"]
  },
  {
    id: "q17",
    question: "Which result has been paid to appear?",
    options: ["Sponsored result", "Browser history", "Bookmark", "Homepage"],
    answer: 0,
    explanation: "Sponsored results are advertisements and should be clearly labelled.",
    tags: ["search"]
  },
  {
    id: "q18",
    question: "Before reusing an online photograph, what should you check?",
    options: ["Its copyright and permission", "The screen brightness", "Your inbox", "Your download speed"],
    answer: 0,
    explanation: "Copyright rules may limit how an image can be copied or shared.",
    tags: ["search", "safety"]
  },
  {
    id: "q19",
    question: "Which connection uses a mobile phone network?",
    options: ["Mobile data", "Bookmark", "BCC", "Browser history"],
    answer: 0,
    explanation: "Mobile data uses a cellular network such as 4G or 5G.",
    tags: ["access"]
  },
  {
    id: "q20",
    question: "What does HTTPS help protect?",
    options: ["The encrypted connection between browser and website", "A printer cable", "The size of a webpage", "The order of search results"],
    answer: 0,
    explanation: "HTTPS encrypts information travelling between a browser and a website.",
    tags: ["browser", "safety"]
  }
];

