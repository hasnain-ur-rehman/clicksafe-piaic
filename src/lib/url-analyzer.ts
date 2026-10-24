export type Severity = "high" | "medium" | "low" | "info";

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
}

export interface AnalysisResult {
  ok: true;
  input: string;
  hostname: string;
  findings: Finding[];
  level: "high" | "medium" | "low";
  score: number;
}

export interface AnalysisError {
  ok: false;
  error: string;
}

const SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "cutt.ly",
  "rb.gy", "shorturl.at", "tiny.cc", "rebrand.ly", "s.id", "t.ly", "sho.rt.example", "short.example",
];
const KEYWORDS = ["login", "signin", "verify", "verification", "secure", "update", "account", "gift", "prize", "winner", "bonus", "free", "reward", "confirm", "unlock", "wallet"];
const RISKY_TLDS = ["zip", "mov", "xyz", "top", "tk", "ml", "ga", "cf", "gq", "click", "country", "kim", "work", "rest", "loan", "cam", "icu"];
const BRANDISH = ["bank", "wallet", "pay", "mail", "cloud", "store", "shop", "support", "official", "service", "account", "secure"];

const WEIGHT: Record<Severity, number> = { high: 3, medium: 2, low: 1, info: 0 };

/** Pure, offline heuristic analysis. Never fetches or visits the URL. */
export function analyzeUrl(raw: string): AnalysisResult | AnalysisError {
  const input = raw.trim();
  if (!input) return { ok: false, error: "Please paste or type a web address to analyze." };
  if (/\s/.test(input)) return { ok: false, error: "Web addresses can't contain spaces. Check what you typed." };

  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(input);
  let url: URL;
  try {
    url = new URL(hasScheme ? input : `http://${input}`);
  } catch {
    return { ok: false, error: "That doesn't look like a valid web address. Try something like https://example.com." };
  }
  if (!url.hostname || !url.hostname.includes(".") && !/^\[/.test(url.hostname)) {
    return { ok: false, error: "That address has no proper domain name (like example.com)." };
  }

  const findings: Finding[] = [];
  const add = (f: Finding) => findings.push(f);
  const host = url.hostname.toLowerCase();
  const labels = host.split(".");
  const tld = labels[labels.length - 1];
  const registrable = labels.slice(-2).join(".");
  const subLabels = labels.slice(0, -2);

  if (url.protocol === "http:") {
    add({ id: "http", severity: hasScheme ? "medium" : "low", title: hasScheme ? "Uses http instead of https" : "No https shown",
      detail: hasScheme
        ? "Data sent to this address isn't encrypted. Real login or payment pages use https."
        : "You didn't include https://. Real login or payment pages always use https — but https alone doesn't make a site safe." });
  } else if (url.protocol !== "https:") {
    add({ id: "scheme", severity: "medium", title: `Unusual scheme "${url.protocol}"`, detail: "Normal websites start with https://. Other schemes can trigger downloads or apps." });
  }

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.startsWith("[")) {
    add({ id: "ip", severity: "high", title: "Uses an IP address instead of a name", detail: "Real companies use domain names. A bare number address is a common way to hide who runs a site." });
  }

  if (input.replace(/^[a-z]+:\/\//i, "").split(/[/?#]/)[0].includes("@")) {
    add({ id: "at", severity: "high", title: "Contains an \"@\" symbol before the domain", detail: "Browsers ignore everything before \"@\". Scammers use it to show a trusted name while sending you somewhere else." });
  }

  if (host.includes("xn--") || /[^\x00-\x7F]/.test(input.split(/[/?#]/).slice(0, 3).join(""))) {
    add({ id: "puny", severity: "high", title: "Lookalike or non-English characters", detail: "The address uses special characters (punycode / xn--) that can imitate normal letters, like a Cyrillic 'а' instead of 'a'." });
  }

  if (input.length > 100) {
    add({ id: "long", severity: input.length > 160 ? "medium" : "low", title: `Very long address (${input.length} characters)`, detail: "Long addresses can hide the real destination. Focus on the domain name right before the first '/'." });
  }

  if (labels.length >= 5) {
    add({ id: "subs", severity: "medium", title: `Many subdomains (${labels.length - 2})`, detail: `The real website is "${registrable}". Everything before it can be made up by whoever owns that domain.` });
  }

  const hyphens = (host.match(/-/g) || []).length;
  if (hyphens >= 2) {
    add({ id: "hyphen", severity: hyphens >= 3 ? "medium" : "low", title: "Lots of hyphens in the domain", detail: "Names like 'secure-login-verify' are often stitched together to look official." });
  }

  if (SHORTENERS.some((s) => host === s || host.endsWith(`.${s}`))) {
    add({ id: "short", severity: "medium", title: "Shortened link", detail: "Link shorteners hide where you'll really end up. Be careful unless you trust the sender." });
  }

  const kw = KEYWORDS.filter((k) => host.includes(k));
  if (kw.length) {
    add({ id: "kw", severity: kw.length > 1 ? "medium" : "low", title: `Pressure words in the domain: ${kw.join(", ")}`, detail: "Words like 'verify', 'login' or 'prize' in the domain itself are often used by fake pages." });
  }

  if (RISKY_TLDS.includes(tld)) {
    add({ id: "tld", severity: "low", title: `Unusual ending ".${tld}"`, detail: "This domain ending is cheap and often abused. It isn't automatically bad, but be extra careful." });
  }

  if (labels.some((l) => /[a-z][013457][a-z]|[a-z]{3,}[01]$/.test(l))) {
    add({ id: "digits", severity: "medium", title: "Numbers replacing letters", detail: "Swapping letters for lookalike numbers (like 1 for l or 0 for o) is a classic lookalike trick." });
  }

  const pct = (input.match(/%[0-9a-f]{2}/gi) || []).length;
  if (pct >= 4) {
    add({ id: "pct", severity: "medium", title: "Heavy percent-encoding", detail: "Lots of %XX codes can disguise the real text of a link." });
  }

  const brandSub = subLabels.find((l) => BRANDISH.some((b) => l.includes(b)) && l !== "www");
  if (brandSub) {
    add({ id: "brandsub", severity: "high", title: "Trusted-sounding word used as a subdomain", detail: `"${brandSub}" sits in front of the real domain "${registrable}". Anyone who owns "${registrable}" can put any name there.` });
  }

  const score = findings.reduce((s, f) => s + WEIGHT[f.severity], 0);
  const level = score >= 5 || findings.some((f) => f.severity === "high") ? "high" : score >= 2 ? "medium" : "low";

  if (!findings.length) {
    findings.push({ id: "none", severity: "info", title: "No obvious warning signs found", detail: "That doesn't prove it's safe. Still check that the domain is exactly the one you expect." });
  }

  return { ok: true, input, hostname: host, findings, level, score };
}
