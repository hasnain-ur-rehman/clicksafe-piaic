export type Segment = string | { text: string; flag: number };

export interface ScamExample {
  id: string;
  title: string;
  channel: "sms" | "email" | "chat";
  sender: string;
  subject?: string;
  time: string;
  body: Segment[];
  isScam: boolean;
  explanation: string;
  redFlags: string[];
  safeResponse: string;
}

export const scamExamples: ScamExample[] = [
  {
    id: "wallet-prize",
    title: "Mobile wallet prize",
    channel: "sms",
    sender: "+00 555 0193",
    time: "09:42",
    body: [
      { text: "CONGRATULATIONS!!", flag: 0 },
      " Your PayNova Wallet number was selected to receive ",
      { text: "Rs. 50,000 cash reward", flag: 1 },
      ". To release the money, ",
      { text: "reply with your wallet PIN and the 6-digit code", flag: 2 },
      " we just sent you. ",
      { text: "Offer expires in 30 minutes.", flag: 3 },
    ],
    isScam: true,
    explanation:
      "You cannot win a prize you never entered. Real wallet services never ask for your PIN or one-time code — anyone who has them can empty your account.",
    redFlags: [
      "Shouting and excitement to make you act fast",
      "A large prize for a contest you never joined",
      "Asks for your PIN and one-time code",
      "Fake time pressure",
    ],
    safeResponse:
      "Don't reply. Never share a PIN or code. Block the number and, if worried, check your wallet only through its official app.",
  },
  {
    id: "parcel-sms",
    title: "Parcel delivery SMS",
    channel: "sms",
    sender: "QuickShip",
    time: "14:07",
    body: [
      "QuickShip: Your parcel is on hold due to ",
      { text: "unpaid customs fee (Rs. 149)", flag: 0 },
      ". Pay now to avoid return: ",
      { text: "quickship-delivery-fee.example/pay", flag: 1 },
      " ",
      { text: "Failure to pay today will cancel delivery.", flag: 2 },
    ],
    isScam: true,
    explanation:
      "Small 'delivery fees' are a common trick to collect your card details. The link points to a look-alike website, not the courier's real one.",
    redFlags: [
      "A small unexpected fee you didn't know about",
      "Link to an odd, hyphenated domain instead of the official site",
      "Threat that your parcel will be cancelled",
    ],
    safeResponse:
      "Don't tap the link. Open the courier's official app or type their website yourself and track the parcel with your real tracking number.",
  },
  {
    id: "verify-email",
    title: "Urgent account verification",
    channel: "email",
    sender: "Security Team <security@northbank-alerts.example>",
    subject: "⚠ Your account will be suspended",
    time: "Yesterday",
    body: [
      { text: "Dear Customer,", flag: 0 },
      "\n\nWe detected unusual activity. ",
      { text: "Your account will be permanently suspended within 24 hours", flag: 1 },
      " unless you verify your identity.\n\n",
      { text: "Click here to verify: northbank.secure-login-verify.example", flag: 2 },
      "\n\nPlease enter your ",
      { text: "full card number, expiry date and password", flag: 3 },
      " to continue.",
    ],
    isScam: true,
    explanation:
      "Banks don't threaten to close your account by email or ask you to type your password and card details into a link. This message is built to scare you into handing them over.",
    redFlags: [
      "Generic greeting instead of your name",
      "Threat and a short deadline",
      "The real domain is 'secure-login-verify.example', not the bank",
      "Asks for card number and password",
    ],
    safeResponse:
      "Don't click. Open your bank's official app or call the number on the back of your card to check whether anything is wrong.",
  },
  {
    id: "job-offer",
    title: "Too-good-to-be-true job",
    channel: "chat",
    sender: "Ms. Ayesha — HR Recruiter",
    time: "11:15",
    body: [
      "Hello! We saw your profile. Work from home ",
      { text: "1 hour per day and earn Rs. 15,000 daily", flag: 0 },
      ". ",
      { text: "No interview, no experience needed.", flag: 1 },
      " To start, pay a ",
      { text: "one-time registration fee of Rs. 2,500", flag: 2 },
      " and send a photo of your ID card.",
    ],
    isScam: true,
    explanation:
      "Real employers interview you and never ask you to pay to get a job. Very high pay for very little work is a classic bait.",
    redFlags: [
      "Unrealistic pay for little work",
      "No interview or checks at all",
      "You must pay a fee first",
    ],
    safeResponse:
      "Don't pay or send ID documents. Look up the company yourself and only apply through its official careers page.",
  },
  {
    id: "balance-alert",
    title: "Bank balance alert",
    channel: "sms",
    sender: "NorthBank",
    time: "08:01",
    body: [
      "NorthBank: Your account ending 4821 was debited Rs. 1,200 at City Grocers on 24 Oct. Available balance: Rs. 38,560. ",
      "If you don't recognise this, open the NorthBank app or call the number on the back of your card. We will never ask for your PIN or OTP.",
    ],
    isScam: false,
    explanation:
      "This looks like a normal transaction alert. It contains no link, asks you for nothing, and tells you to contact the bank through channels you already trust.",
    redFlags: [],
    safeResponse:
      "No action needed if you recognise the purchase. If you don't, use the official app or the number on your card — not a number from a message.",
  },
  {
    id: "short-link",
    title: "Shortened link from a 'friend'",
    channel: "chat",
    sender: "Unknown number",
    time: "21:33",
    body: [
      { text: "OMG is this you in this video??", flag: 0 },
      " 😱 ",
      { text: "sho.rt.example/x7Qp2", flag: 1 },
      " ",
      { text: "Log in to see it before it's deleted", flag: 2 },
    ],
    isScam: true,
    explanation:
      "Shortened links hide where they really go. Shocking 'is this you?' messages are used to make you click and then enter your login on a fake page.",
    redFlags: [
      "Shock and curiosity bait",
      "Shortened link hides the real destination",
      "Asks you to log in to view it",
    ],
    safeResponse:
      "Don't click. If it seems to come from a friend, contact them another way to ask. Report and block unknown senders.",
  },
  {
    id: "giveaway",
    title: "Social media giveaway",
    channel: "email",
    sender: "GadgetHub Giveaways <winner@gadgethub-prizes.example>",
    subject: "You're our lucky winner 🎉",
    time: "Mon",
    body: [
      "Hi there! To celebrate our anniversary, ",
      { text: "you have won a brand-new laptop", flag: 0 },
      "! To claim, reply with your ",
      { text: "full name, home address, date of birth, CNIC number and bank details", flag: 1 },
      ". ",
      { text: "Only 3 prizes left!", flag: 2 },
    ],
    isScam: true,
    explanation:
      "Giveaways that ask for lots of personal and bank information are collecting data for identity theft. A real prize never needs your bank details or ID number.",
    redFlags: [
      "A prize you didn't enter for",
      "Asks for ID number, birth date and bank details",
      "Scarcity pressure",
    ],
    safeResponse:
      "Don't reply. Check the company's official social page yourself — real winners are usually announced publicly.",
  },
  {
    id: "password-change",
    title: "Password changed notice",
    channel: "email",
    sender: "Lumen Mail <no-reply@lumenmail.example>",
    subject: "Your password was changed",
    time: "Tue",
    body: [
      "Hi Sara,\n\nThe password for your Lumen Mail account was changed on 21 Oct at 18:04 from your Windows laptop.\n\n",
      "If this was you, you can ignore this email. If not, open the Lumen Mail app or go to Settings → Security yourself to review your account.\n\nThis email does not contain any links.",
    ],
    isScam: false,
    explanation:
      "This message uses your name, gives clear details, has no link, asks for nothing, and points you to the app's own settings. That's how a genuine security notice usually looks.",
    redFlags: [],
    safeResponse:
      "If you changed it, do nothing. If you didn't, open the app yourself (not via email) and change your password and turn on two-factor authentication.",
  },
];
