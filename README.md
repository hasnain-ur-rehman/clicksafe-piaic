# Clicksafe Piaic

Build a complete, polished, fully working single-page website called "ClickSafe" with the tagline "Think Before You Click." It teaches people to recognize online scams, phishing, fake prize offers and unsafe links through interactive challenges. Use React, TypeScript, Tailwind CSS and shadcn/ui. No backend, database, auth, API keys, paid services or sign-up. No fake statistics, fake testimonials or fake AI claims. Everything runs client-side.

DESIGN
- Premium dark navy background (around #0A1128 / #0B1530), electric-blue accents (#3B82F6 / #38BDF8), subtle neon-green success color (#22FF88-ish, tasteful), warm red/amber for danger and warnings. Subtle grid pattern background, soft gradients, elegant glow effects, nice cards, smooth transitions, tasteful animations (respect prefers-reduced-motion). Cybersecurity dashboard look mixed with a modern educational site. It must look like a real product made by a professional, not a generic template. Avoid clutter and oversized text.
- Custom ClickSafe shield logo as inline SVG (shield with a check/cursor motif), also used as the favicon (SVG favicon in /public).
- Sticky navbar with logo and links that smooth-scroll to sections (Home, Scam Lab, Quiz, URL Detective, Checklist, Challenge), mobile hamburger menu that works. Excellent contrast, visible focus states, full keyboard navigation, aria labels, semantic HTML.
- Fully responsive for mobile, tablet and desktop.
- index.html: professional title "ClickSafe — Think Before You Click", meta description, Open Graph and Twitter card metadata, theme-color, lang="en".

SECTIONS (in this order, each with an id for anchor navigation)

A. Hero: headline "Think Before You Click." Supporting text: "Learn to spot digital scams, uncover suspicious messages, and protect yourself online — one challenge at a time." Two working buttons: "Start the Challenge" (scrolls to the quiz) and "Explore Scam Examples" (scrolls to the Scam Detective Lab). A CSS/SVG cybersecurity-style graphic (glowing shield, mock message card with a flagged link, etc.).

B. Interactive Scam Detective Lab (id scam-lab): six realistic but entirely FICTIONAL examples, using fictional organizations and fake contact details only (no real brands, no real links; use example domains like .example): 1) fake mobile-wallet prize notification, 2) suspicious parcel-delivery SMS, 3) urgent account-verification email, 4) too-good-to-be-true job offer, 5) a message containing a suspicious shortened link, 6) a fake giveaway asking for personal info. Make at least one example legitimate (for instance a genuine-looking but safe notification, such as a calm bank-style balance alert that asks for no action and tells the user to open the official app themselves) so the "legitimate" choice is meaningful; aim for a mix of roughly four suspicious and two legitimate, or adjust sensibly while still covering the six themes above. Users pick an example from a list/cards, view it rendered like a phone message or email, then press "Suspicious" or "Legitimate". After choosing, reveal: whether they were right, a beginner-friendly explanation, specific red flags (highlight them in the message text where possible), and a safer response. Include "Next example", a tally of how many they got right, and a reset. Do not render real clickable links to external sites in the examples.

C. Interactive quiz (id quiz): at least 8 multiple-choice questions, four options each, one question at a time, visible progress bar and "Question X of N", immediate feedback on selection (correct/incorrect styling, explanation of why), locked answers after choosing, a "Next" button, score tracking, then a polished results screen with score, a performance message tiered by score, and useful advice, plus a working "Try Again" button that fully resets. Shuffle answer order is optional but the correct answer must always be tracked properly. Keyboard accessible.

D. URL Detective (id url-detective): text input for an example URL with validation and helpful empty state, an "Analyze" button (also Enter key). Client-side educational heuristics only, such as: uses http instead of https; IP address as host; "@" in the URL; punycode/xn-- or non-ASCII lookalike characters; very long URLs; too many subdomains; hyphen-heavy hostnames; known URL-shortener hostnames (bit.ly style, tinyurl style); suspicious keywords like login/verify/secure/update/gift/prize in the hostname; unusual TLDs; digits replacing letters (like paypa1 style patterns in a generic way); excessive percent-encoding; a brand-like word placed in a subdomain of a different domain. Show a clear list of findings with severity chips and plain-English explanations, and a "what to do" tip. Prominently state that these are only educational clues, not a real-time security scanner, that no URL is fetched, opened or visited, and that a result cannot guarantee a URL is safe or malicious. Never claim AI or an external API. Never make the entered URL clickable. Include 5 or 6 clickable example URLs (fictional, using example-style domains) that fill the input automatically and analyze.

E. Safety checklist (id checklist): interactive checklist with these six items, each with a short description: verify the sender; inspect links before opening them; never share passwords or one-time passwords; enable two-factor authentication; avoid suspicious downloads; verify unexpected payment requests through official channels. Checkable items, a progress bar and "X of 6 complete", a celebratory completed state, and a reset button. Keep state in React state (localStorage is optional; if used, wrap in try/catch).

F. Final challenge and share (id challenge): a compelling call-to-action inviting visitors to test their scam-detection skills, with a button to the quiz. If the visitor has completed the quiz, show their score and a "Share my score" button that uses navigator.share when available, otherwise copies a text message to the clipboard with a toast confirmation, and always displays the score text clearly so it can be shared manually if both fail. If the quiz is not complete, show a friendly empty state prompting them to take it. Do not collect any personal details. Share text should include the score and the site's current URL (window.location.href).

G. Footer: ClickSafe logo/branding, tagline "Think Before You Click.", working navigation links to every section, a short digital safety disclaimer (educational use only; not a substitute for professional security advice; if you think you have been scammed, contact your bank or the official provider and report it to the relevant authorities), and the small note "Created as a PIAIC class project."

QUALITY
- Clean reusable components in a sensible structure (e.g. components/Hero, ScamLab, Quiz, UrlDetective, Checklist, FinalChallenge, Footer, Logo; data in separate files for scam examples and quiz questions; URL analysis logic in a separate utility with a pure function).
- Share quiz result state between Quiz and FinalChallenge via lifted state or context.
- All buttons, links, quiz answers, cards, restart controls and nav links must work. Smooth scrolling with scroll-margin so the sticky nav does not cover headings.
- Beginner-friendly English throughout. No console errors, no TypeScript errors, no unused placeholder content. Make sure the build passes.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://clicksafe-piaic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f39a8ccc-fac2-42b5-8016-05973edb868e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
