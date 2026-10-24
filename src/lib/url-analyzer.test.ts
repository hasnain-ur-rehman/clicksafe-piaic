import { describe, expect, it } from "vitest";
import { analyzeUrl } from "./url-analyzer";

const ids = (u: string) => {
  const r = analyzeUrl(u);
  if (!r.ok) throw new Error(r.error);
  return r.findings.map((f) => f.id);
};

describe("analyzeUrl", () => {
  it("rejects empty input", () => expect(analyzeUrl("  ").ok).toBe(false));
  it("flags http", () => expect(ids("http://shop.example")).toContain("http"));
  it("flags IP hosts", () => expect(ids("http://192.168.10.5/login")).toContain("ip"));
  it("flags @ trick", () => expect(ids("https://northbank.example@evil.example")).toContain("at"));
  it("flags punycode", () => expect(ids("https://xn--nrthbank-9za.example")).toContain("puny"));
  it("flags shorteners", () => expect(ids("https://bit.ly/abc")).toContain("short"));
  it("flags brand word in subdomain", () => expect(ids("https://northbank.secure-verify.example")).toContain("brandsub"));
  it("flags digit swaps", () => expect(ids("https://paypa1.example")).toContain("digits"));
  it("calm https url is low", () => {
    const r = analyzeUrl("https://www.example.com/help");
    expect(r.ok && r.level).toBe("low");
  });
});
