/**
 * scenario-data.js
 * ------------------------------------------------------------------
 * Scenario cards used by the Safe or Risky sorting game.
 *
 * HOW TO EDIT
 * - Duplicate a complete scenario object.
 * - Give it a unique id.
 * - choice must be either "safe" or "risky".
 * - The explanation is shown after the learner answers.
 * ------------------------------------------------------------------
 */

const SORT_SCENARIOS = [
  {
    id: "s01",
    text: "You log out of your email before leaving a shared computer.",
    choice: "safe",
    explanation: "Logging out helps prevent the next user from opening your account.",
    tags: ["email", "safety"]
  },
  {
    id: "s02",
    text: "You use the same short password for every account.",
    choice: "risky",
    explanation: "If one account is breached, the same password may give access to all the others.",
    tags: ["safety"]
  },
  {
    id: "s03",
    text: "An unexpected message asks for your bank details, so you contact the organisation using its official number.",
    choice: "safe",
    explanation: "Checking through an official contact method avoids trusting the suspicious message.",
    tags: ["safety", "email"]
  },
  {
    id: "s04",
    text: "You open an unexpected attachment from an unknown sender.",
    choice: "risky",
    explanation: "Unexpected attachments can contain malware or lead to a scam.",
    tags: ["safety", "email"]
  },
  {
    id: "s05",
    text: "You check the author, date and organisation before using information in an assignment.",
    choice: "safe",
    explanation: "These checks help you judge whether the source is current and trustworthy.",
    tags: ["search"]
  },
  {
    id: "s06",
    text: "You believe the first search result without checking any other source.",
    choice: "risky",
    explanation: "The first result may be sponsored, outdated or unsuitable.",
    tags: ["search"]
  },
  {
    id: "s07",
    text: "You create a long, unique passphrase for an important account.",
    choice: "safe",
    explanation: "Length and uniqueness make an account harder to break into.",
    tags: ["safety"]
  },
  {
    id: "s08",
    text: "You send a group email with everyone's address visible in the To field.",
    choice: "risky",
    explanation: "For a large group, BCC may be needed to protect recipients' addresses.",
    tags: ["email", "safety"]
  },
  {
    id: "s09",
    text: "You confirm the recipient, subject, message and attachment before selecting Send.",
    choice: "safe",
    explanation: "A final check helps prevent common email mistakes.",
    tags: ["email"]
  },
  {
    id: "s10",
    text: "You share your home address publicly in a social media post.",
    choice: "risky",
    explanation: "A home address is personal information and should not normally be shared publicly.",
    tags: ["safety"]
  },
  {
    id: "s11",
    text: "You use two-factor authentication on your email account.",
    choice: "safe",
    explanation: "The second check gives extra protection if the password is stolen.",
    tags: ["safety", "email"]
  },
  {
    id: "s12",
    text: "A pop-up says your device is infected and you immediately install its unknown software.",
    choice: "risky",
    explanation: "Scare messages can trick users into installing harmful software.",
    tags: ["safety"]
  },
  {
    id: "s13",
    text: "You bookmark a reliable source so you can return to it later.",
    choice: "safe",
    explanation: "A bookmark gives you a direct route back to the checked source.",
    tags: ["browser", "search"]
  },
  {
    id: "s14",
    text: "You download a file from a website even though you do not know who created it.",
    choice: "risky",
    explanation: "Unknown downloads may be unsafe or contain misleading information.",
    tags: ["safety", "browser"]
  },
  {
    id: "s15",
    text: "You ask permission before posting a photograph that includes another person.",
    choice: "safe",
    explanation: "Consent helps respect the other person's privacy.",
    tags: ["safety"]
  },
  {
    id: "s16",
    text: "You leave your email signed in on a public computer.",
    choice: "risky",
    explanation: "Another person could read messages or use the account.",
    tags: ["email", "safety"]
  },
  {
    id: "s17",
    text: "You check that a website uses HTTPS before entering sensitive information.",
    choice: "safe",
    explanation: "HTTPS protects the connection, although you should still check that the website itself is genuine.",
    tags: ["browser", "safety"]
  },
  {
    id: "s18",
    text: "You click an urgent link because the message says your account will close in ten minutes.",
    choice: "risky",
    explanation: "False urgency is a common phishing technique. Open the official site yourself instead.",
    tags: ["email", "safety"]
  }
];

