export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number; // index into options
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "You get an SMS saying you won a prize and must share a 6-digit code to claim it. What should you do?",
    options: [
      "Share the code quickly before it expires",
      "Ignore it and never share one-time codes with anyone",
      "Reply asking for more details",
      "Forward it to friends so they can win too",
    ],
    answer: 1,
    explanation: "One-time codes (OTPs) are like keys to your account. No real company will ever ask you to share them.",
  },
  {
    id: 2,
    question: "Which of these web addresses is most likely fake?",
    options: [
      "https://northbank.example/login",
      "https://app.northbank.example",
      "https://northbank.example.secure-verify.example",
      "https://www.northbank.example",
    ],
    answer: 2,
    explanation: "Read the domain from the right. The real site here is 'secure-verify.example' — 'northbank' is just a decoy in front of it.",
  },
  {
    id: 3,
    question: "What does the padlock (https) in your browser actually tell you?",
    options: [
      "The website is safe and trustworthy",
      "The website is owned by a bank",
      "The connection is encrypted — but the site could still be a scam",
      "The website has been checked by the government",
    ],
    answer: 2,
    explanation: "HTTPS only protects data in transit. Scammers can get padlocks too, so always check the domain name itself.",
  },
  {
    id: 4,
    question: "An email from 'your bank' says your account will be closed in 24 hours unless you click a link. What's the best move?",
    options: [
      "Click the link and log in to fix it",
      "Reply with your account number",
      "Open your bank's official app or call the number on your card",
      "Wait and see if your account closes",
    ],
    answer: 2,
    explanation: "Urgent threats are a pressure tactic. Always contact the organisation through a channel you already trust.",
  },
  {
    id: 5,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "A second check, like an app code, in addition to your password",
      "Logging in from two devices",
      "Letting a friend know your password",
    ],
    answer: 1,
    explanation: "2FA adds a second step, so even if someone steals your password they still can't easily get in.",
  },
  {
    id: 6,
    question: "A job offer promises big daily earnings but asks for a registration fee first. This is…",
    options: [
      "A normal hiring process",
      "A likely scam — real employers don't charge you to get hired",
      "Fine if the fee is small",
      "Safe if they have a nice logo",
    ],
    answer: 1,
    explanation: "Paying to get a job is a major red flag. Legitimate employers pay you, not the other way around.",
  },
  {
    id: 7,
    question: "A friend's account messages you a shortened link saying 'Is this you in this video?'. What should you do?",
    options: [
      "Click it to check",
      "Log in on the page that opens",
      "Contact your friend another way to ask if they really sent it",
      "Share it in a group chat",
    ],
    answer: 2,
    explanation: "Hacked accounts often spread these links. Check with your friend through a different app or a phone call.",
  },
  {
    id: 8,
    question: "Someone you met online asks you to pay for an 'emergency' using gift cards. What's true?",
    options: [
      "Gift cards are a safe way to help",
      "Requests for gift-card payments are a common sign of a scam",
      "It's fine if they promise to pay you back",
      "Only send a small amount",
    ],
    answer: 1,
    explanation: "Gift cards are hard to trace and can't be reversed, which is why scammers love them.",
  },
  {
    id: 9,
    question: "You downloaded a file called 'invoice.pdf.exe' from an unknown email. What is it really?",
    options: [
      "A normal PDF document",
      "A program that could install harmful software",
      "An image",
      "A safe receipt",
    ],
    answer: 1,
    explanation: "The real file type is the last part: '.exe' is a program. Don't open unexpected attachments, especially programs.",
  },
  {
    id: 10,
    question: "Which message is most likely legitimate?",
    options: [
      "'Claim your free phone now, only 2 left!'",
      "'Your account is locked. Send your password to unlock.'",
      "'Payment of Rs. 800 made. If this wasn't you, open your app.' (no link)",
      "'Verify your identity here within 1 hour or lose access.'",
    ],
    answer: 2,
    explanation: "Genuine alerts are calm, ask for nothing, and send you to the official app yourself rather than a link.",
  },
];
