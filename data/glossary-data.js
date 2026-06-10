/**
 * glossary-data.js
 * ------------------------------------------------------------------
 * Shared learning data for the glossary, matching game and wordsearch.
 *
 * HOW TO EDIT
 * 1. Add or change a category in CATEGORIES.
 * 2. Add glossary entries inside GLOSSARY.
 * 3. Keep commas between entries.
 *
 * Each glossary entry uses:
 *   term       Full term shown to the learner.
 *   abbr       Short form, or null when there is no short form.
 *   hint       A short clue used in revision activities.
 *   def        The plain-language definition.
 *   example    A practical example.
 *   tags       One or more category keys from CATEGORIES.
 *   searchable Optional. Set to false to exclude it from games.
 * ------------------------------------------------------------------
 */

const CATEGORIES = {
  basics: {
    label: "Internet Basics",
    color: "#086f83",
    soft: "#dff6f8"
  },
  access: {
    label: "Getting Online",
    color: "#3559a8",
    soft: "#e8eeff"
  },
  browser: {
    label: "Browsers",
    color: "#7952a8",
    soft: "#f1eaff"
  },
  search: {
    label: "Search & Sources",
    color: "#a45a00",
    soft: "#fff0d6"
  },
  email: {
    label: "Email",
    color: "#b23a5a",
    soft: "#ffe6ed"
  },
  safety: {
    label: "Safety & Privacy",
    color: "#287a4d",
    soft: "#e0f5e9"
  }
};

const GLOSSARY = [
  // INTERNET BASICS
  {
    term: "Internet",
    abbr: null,
    hint: "A worldwide network connecting devices.",
    def: "A worldwide system of connected computer networks that allows devices to share information and services.",
    example: "Using the internet to send an email or watch a video.",
    tags: ["basics"]
  },
  {
    term: "World Wide Web",
    abbr: "WWW",
    hint: "The collection of pages and websites viewed in a browser.",
    def: "A collection of linked webpages and websites that you access through the internet.",
    example: "Opening a news website in a browser.",
    tags: ["basics", "browser"]
  },
  {
    term: "Website",
    abbr: null,
    hint: "A group of related webpages.",
    def: "A collection of related webpages published under one name or web address.",
    example: "A college website containing course and contact pages.",
    tags: ["basics", "browser"]
  },
  {
    term: "Webpage",
    abbr: null,
    hint: "One page within a website.",
    def: "A single page of information on a website.",
    example: "The contact page on a local organisation's website.",
    tags: ["basics", "browser"]
  },
  {
    term: "Hyperlink",
    abbr: "Link",
    hint: "Select it to move to another page or file.",
    def: "Clickable text, an image or a button that opens another webpage, file or location.",
    example: "Selecting a course title to open the course details.",
    tags: ["basics", "browser"]
  },
  {
    term: "Download",
    abbr: null,
    hint: "Move a file from the internet to your device.",
    def: "To copy or receive a file from the internet onto your device.",
    example: "Downloading a PDF timetable.",
    tags: ["basics"]
  },
  {
    term: "Upload",
    abbr: null,
    hint: "Move a file from your device to an online service.",
    def: "To send a file from your device to a website, app or online service.",
    example: "Uploading an assignment to a learning platform.",
    tags: ["basics"]
  },
  {
    term: "Streaming",
    abbr: null,
    hint: "Play media without waiting for a full download.",
    def: "Watching or listening to media over the internet while it is being delivered.",
    example: "Listening to music online.",
    tags: ["basics"]
  },
  {
    term: "Device",
    abbr: null,
    hint: "Equipment that can store, process or exchange information.",
    def: "A piece of electronic equipment such as a computer, tablet or smartphone.",
    example: "Using a laptop or phone to access the internet.",
    tags: ["basics", "access"]
  },
  {
    term: "Network",
    abbr: null,
    hint: "Connected devices that can communicate and share resources.",
    def: "Two or more connected devices that can communicate or share information and services.",
    example: "Computers connected together in a training centre.",
    tags: ["basics", "access"]
  },
  {
    term: "Blog",
    abbr: null,
    hint: "A website or page containing regularly published posts.",
    def: "An online journal or information website where posts are published, usually with the newest post first.",
    example: "Reading a learner's weekly course blog.",
    tags: ["basics"]
  },
  {
    term: "Social Networking",
    abbr: null,
    hint: "Using an online service to connect and share with other people.",
    def: "Using websites or apps to communicate, connect with people and share content online.",
    example: "Sharing updates or joining an interest group online.",
    tags: ["basics", "safety"],
    searchable: false
  },
  {
    term: "E-commerce",
    abbr: "Electronic Commerce",
    hint: "Buying and selling products or services online.",
    def: "Commercial activity carried out over the internet, including buying and selling goods or services.",
    example: "Ordering an item from an online shop.",
    tags: ["basics", "safety"]
  },
  {
    term: "E-learning",
    abbr: "Electronic Learning",
    hint: "Learning delivered or supported using online technology.",
    def: "Education or training completed using computers, websites, apps or other digital services.",
    example: "Completing an online course or watching a lesson video.",
    tags: ["basics"]
  },

  // GETTING ONLINE
  {
    term: "Internet Service Provider",
    abbr: "ISP",
    hint: "The company that supplies internet access.",
    def: "A company that provides a home, organisation or mobile device with access to the internet.",
    example: "Paying a company for broadband or mobile internet.",
    tags: ["access"]
  },
  {
    term: "Modem",
    abbr: null,
    hint: "Connects a network to the service supplied by an internet provider.",
    def: "A device that converts connection signals so a home or organisation can communicate with an internet service provider.",
    example: "A broadband modem connects the local network to the provider's service.",
    tags: ["access"]
  },
  {
    term: "Broadband",
    abbr: null,
    hint: "A high-speed internet connection.",
    def: "A high-speed internet service that can carry large amounts of data.",
    example: "Using broadband for streaming, browsing and video calls.",
    tags: ["access"]
  },
  {
    term: "Router",
    abbr: null,
    hint: "The box that shares an internet connection.",
    def: "A device that directs network traffic and shares an internet connection with other devices.",
    example: "A laptop connects to the home router using Wi-Fi.",
    tags: ["access"]
  },
  {
    term: "Ethernet",
    abbr: null,
    hint: "A wired network connection.",
    def: "A technology used to connect devices to a network using a cable.",
    example: "Connecting a computer directly to a router with an Ethernet cable.",
    tags: ["access"]
  },
  {
    term: "Wi-Fi",
    abbr: null,
    hint: "A short-range wireless network connection.",
    def: "Technology that connects devices to a local network without a cable.",
    example: "Connecting a phone to the Wi-Fi in a training centre.",
    tags: ["access"]
  },
  {
    term: "Mobile Data",
    abbr: null,
    hint: "Internet access through a mobile phone network.",
    def: "Internet access supplied through a mobile network rather than a local Wi-Fi connection.",
    example: "Using 4G or 5G when away from Wi-Fi.",
    tags: ["access"]
  },
  {
    term: "Bandwidth",
    abbr: null,
    hint: "How much data a connection can carry.",
    def: "The amount of data that an internet connection can transfer in a set amount of time.",
    example: "Higher bandwidth can make video calls run more smoothly.",
    tags: ["access"]
  },

  // BROWSERS
  {
    term: "Web Browser",
    abbr: "Browser",
    hint: "Software used to open and view websites.",
    def: "An application used to visit, view and interact with websites.",
    example: "Chrome, Edge, Firefox and Safari are browsers.",
    tags: ["browser"]
  },
  {
    term: "Address Bar",
    abbr: null,
    hint: "The place where a web address is entered.",
    def: "The browser box that displays the current web address and accepts addresses or searches.",
    example: "Typing a website address into the top of the browser.",
    tags: ["browser"]
  },
  {
    term: "Uniform Resource Locator",
    abbr: "URL",
    hint: "The complete address of an online page or file.",
    def: "The web address that tells a browser where to find a particular online resource.",
    example: "https://www.gov.ie is a URL.",
    tags: ["browser", "basics"]
  },
  {
    term: "Homepage",
    abbr: null,
    hint: "The main or starting page.",
    def: "The main page of a website, or the page a browser opens first.",
    example: "Selecting a website logo often returns to its homepage.",
    tags: ["browser"]
  },
  {
    term: "Tab",
    abbr: null,
    hint: "Lets several webpages stay open in one browser window.",
    def: "A separate page area within a browser window that allows several webpages to remain open.",
    example: "Keeping search results in one tab and a useful website in another.",
    tags: ["browser"]
  },
  {
    term: "Bookmark",
    abbr: "Favourite",
    hint: "A saved shortcut to a webpage.",
    def: "A saved browser link that makes it easy to return to a webpage later.",
    example: "Bookmarking a useful careers website.",
    tags: ["browser"]
  },
  {
    term: "Browser History",
    abbr: "History",
    hint: "A list of webpages recently visited.",
    def: "A record kept by a browser of webpages that have been visited.",
    example: "Using history to find a page that was closed by mistake.",
    tags: ["browser", "safety"]
  },
  {
    term: "Refresh",
    abbr: "Reload",
    hint: "Loads the current page again.",
    def: "A browser control that requests and displays the current webpage again.",
    example: "Refreshing a page to check for updated information.",
    tags: ["browser"]
  },
  {
    term: "Domain Name",
    abbr: "Domain",
    hint: "The readable name used to identify a website.",
    def: "The unique, human-readable name used to locate a website without entering its numerical network address.",
    example: "gov.ie is a domain name.",
    tags: ["browser", "basics"]
  },
  {
    term: "Print Preview",
    abbr: null,
    hint: "Shows how a page should look before it is printed.",
    def: "A browser or application view that displays the expected printed layout before printing.",
    example: "Checking the page range and layout in Print Preview before printing.",
    tags: ["browser"]
  },

  // SEARCH AND SOURCES
  {
    term: "Search Engine",
    abbr: null,
    hint: "A service that finds webpages using search words.",
    def: "An online service that searches an index of the web and returns results related to a query.",
    example: "Using a search engine to find bus times.",
    tags: ["search"]
  },
  {
    term: "Keyword",
    abbr: null,
    hint: "An important word used in a search.",
    def: "A word or short phrase that describes the information being searched for.",
    example: "Searching with the keywords 'Limerick evening courses'.",
    tags: ["search"]
  },
  {
    term: "Search Results",
    abbr: null,
    hint: "The list returned after a search.",
    def: "The webpages, images, videos or other items shown by a search engine in response to a query.",
    example: "Reviewing several search results before choosing a source.",
    tags: ["search"]
  },
  {
    term: "Reliable Source",
    abbr: null,
    hint: "Information that can be trusted after checking it.",
    def: "A source whose author, evidence, purpose and date make the information dependable.",
    example: "Checking health information on an official public health website.",
    tags: ["search", "safety"]
  },
  {
    term: "Sponsored Result",
    abbr: "Advertisement",
    hint: "A result paid for by an advertiser.",
    def: "A search result or post that an organisation has paid to display.",
    example: "A search result labelled 'Sponsored' or 'Ad'.",
    tags: ["search"]
  },
  {
    term: "Copyright",
    abbr: null,
    hint: "Rules that protect a creator's original work.",
    def: "Legal protection given to original work such as writing, photographs, music and video.",
    example: "Checking permission before reusing an online photograph.",
    tags: ["search", "safety"]
  },

  // EMAIL
  {
    term: "Email",
    abbr: null,
    hint: "An electronic message sent over the internet.",
    def: "A digital message sent from one email address to another using the internet.",
    example: "Sending a tutor a question about class times.",
    tags: ["email"]
  },
  {
    term: "Webmail",
    abbr: null,
    hint: "Email opened through a website in a browser.",
    def: "An email service that is accessed through a web browser rather than a separately installed email application.",
    example: "Opening an email account by signing in on its website.",
    tags: ["email", "browser"]
  },
  {
    term: "Recipient",
    abbr: "To",
    hint: "The person who receives a message.",
    def: "The person or email address that a message is sent to.",
    example: "Checking the recipient before selecting Send.",
    tags: ["email"]
  },
  {
    term: "Subject Line",
    abbr: "Subject",
    hint: "A short title describing an email.",
    def: "The brief heading that tells the recipient what an email is about.",
    example: "Course times for next week.",
    tags: ["email"]
  },
  {
    term: "Carbon Copy",
    abbr: "CC",
    hint: "Sends a visible copy to another person.",
    def: "An email field used to send a copy to another recipient whose address is visible to everyone receiving the message.",
    example: "Copying a support worker into a course email.",
    tags: ["email"]
  },
  {
    term: "Blind Carbon Copy",
    abbr: "BCC",
    hint: "Sends a hidden copy to another person.",
    def: "An email field used to send a copy without showing that recipient's address to the other recipients.",
    example: "Protecting addresses when emailing a large group.",
    tags: ["email", "safety"]
  },
  {
    term: "Attachment",
    abbr: null,
    hint: "A file sent with an email.",
    def: "A document, photograph or other file included with an email message.",
    example: "Attaching a completed form to an email.",
    tags: ["email"]
  },
  {
    term: "Reply",
    abbr: null,
    hint: "Responds to the sender.",
    def: "An email action that creates a response addressed to the original sender.",
    example: "Replying to confirm that a message was received.",
    tags: ["email"]
  },
  {
    term: "Archive",
    abbr: null,
    hint: "Moves an email out of the inbox without deleting it.",
    def: "To store an email away from the main inbox while keeping it available for later.",
    example: "Archiving a completed conversation.",
    tags: ["email"]
  },
  {
    term: "Spam",
    abbr: "Junk Mail",
    hint: "Unwanted or suspicious messages.",
    def: "Unwanted email, often sent in large numbers and sometimes used for scams.",
    example: "Moving a suspicious sales message to the spam folder.",
    tags: ["email", "safety"]
  },

  // SAFETY AND PRIVACY
  {
    term: "Password",
    abbr: null,
    hint: "A secret used to protect an account.",
    def: "A private set of characters or words used to prove identity and protect access to an account.",
    example: "Using a different strong password for each important account.",
    tags: ["safety"]
  },
  {
    term: "Passphrase",
    abbr: null,
    hint: "A longer password made from several words.",
    def: "A long password made from a memorable sequence of words, often easier to remember and harder to guess.",
    example: "Using several unrelated words without sharing the real phrase.",
    tags: ["safety"]
  },
  {
    term: "Two-Factor Authentication",
    abbr: "2FA",
    hint: "A second check used when signing in.",
    def: "A security method that requires two different forms of proof before allowing access to an account.",
    example: "Entering a password and then a code from a phone.",
    tags: ["safety"]
  },
  {
    term: "Phishing",
    abbr: null,
    hint: "A fake message designed to steal information.",
    def: "A scam that uses a fake email, text or website to trick someone into revealing private information or opening a harmful link.",
    example: "A message urgently asking for a password or bank details.",
    tags: ["safety", "email"]
  },
  {
    term: "Malware",
    abbr: null,
    hint: "Software designed to harm or misuse a device.",
    def: "Software intentionally created to damage a device, steal information or gain access without permission.",
    example: "A harmful program hidden inside an unsafe download.",
    tags: ["safety"]
  },
  {
    term: "Privacy",
    abbr: null,
    hint: "Control over personal information.",
    def: "The right and ability to control how personal information is collected, used and shared.",
    example: "Checking who can see a social media post.",
    tags: ["safety"]
  },
  {
    term: "Digital Footprint",
    abbr: null,
    hint: "The trail left by online activity.",
    def: "The information and traces created when a person uses websites, apps and online services.",
    example: "Posts, comments, searches and account activity can form part of a digital footprint.",
    tags: ["safety"]
  },
  {
    term: "Personal Information",
    abbr: "Personal Data",
    hint: "Information that identifies or relates to a person.",
    def: "Information connected to an identifiable person, such as a name, address, photograph or phone number.",
    example: "Thinking carefully before sharing a home address online.",
    tags: ["safety"]
  },
  {
    term: "Cookie",
    abbr: null,
    hint: "A small file a website stores in the browser.",
    def: "A small piece of data stored by a website to remember information about a visit or preferences.",
    example: "A website remembering a language choice.",
    tags: ["safety", "browser"]
  },
  {
    term: "HTTPS",
    abbr: null,
    hint: "The secure version of the web transfer protocol.",
    def: "A secure, encrypted method used to transfer information between a browser and a website.",
    example: "Checking for https at the start of a website address before entering sensitive information.",
    tags: ["safety", "browser"]
  },
  {
    term: "Log Out",
    abbr: "Sign Out",
    hint: "Ends access to an account on a device.",
    def: "To end an account session so that another person using the device cannot continue using the account.",
    example: "Logging out of email on a shared computer.",
    tags: ["safety"]
  }
];
