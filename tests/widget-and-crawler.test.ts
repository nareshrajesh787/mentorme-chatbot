import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

import {
  isAllowedByRobots,
  isCrawlableUrl,
  parseApprovedRemovalUrls,
  parseRobotsTxt,
} from "../scripts/crawl-website";
import { isValidWidgetUrl } from "@/lib/widget/url-validation";
import { parseEmbedPresentation } from "@/lib/widget/presentation";

describe("widget and crawler boundaries", () => {
  it("validates widget URLs and requires HTTPS outside localhost", () => {
    expect(isValidWidgetUrl("https://prototype.vercel.app/embed")).toBe(true);
    expect(isValidWidgetUrl("http://localhost:3000/embed")).toBe(true);
    expect(isValidWidgetUrl("http://example.com/embed")).toBe(false);
    expect(isValidWidgetUrl("javascript:alert(1)")).toBe(false);
  });

  it("constrains embed options to an allowlist", () => {
    expect(
      parseEmbedPresentation({
        theme: "url(javascript:bad)",
        launcher: "anything",
        position: "center",
      }),
    ).toEqual({
      theme: "light",
      launcherVisible: false,
      position: "bottom-right",
    });
  });

  it("uses the local MentorMe logo in the framework-independent launcher", () => {
    const loader = readFileSync("public/widget-loader.js", "utf8");
    expect(loader).toContain("/branding/mentorme-logo.png");
    expect(loader).not.toContain("the-place");
    expect(loader).not.toContain("thePlace");
    expect(loader).toContain('logoImage.alt = ""');
    expect(loader).toContain("chatbotUrl.origin !== scriptUrl.origin");
    expect(loader).toContain('resizeButton.addEventListener("pointerdown"');
    expect(loader).toContain('resizeButton.addEventListener("keydown"');
    expect(loader).toContain(".tp-resize{display:none}");
    expect(loader).toContain('script.getAttribute("data-prompt")');
    expect(loader).toContain('script.getAttribute("data-prompt-text")');
    expect(loader).toContain("mentorme-chatbot-nudge-seen");
    expect(loader).toContain("nudgeText.textContent = promptText");
    expect(loader).toContain('nudgeAction.addEventListener("click"');
    expect(loader).toContain('nudgeClose.addEventListener("click"');
  });

  it("uses MentorMe's brand colors, not The Place's original palette", () => {
    const loader = readFileSync("public/widget-loader.js", "utf8");
    const stalePlaceColors = ["#003b59", "#e15a9a", "#7d4b8e", "#b92f70", "#292f4c"];
    for (const color of stalePlaceColors) {
      expect(loader).not.toContain(color);
    }
    expect(loader).toContain("#4a2268");
    expect(loader).toContain("#632d8f");
  });

  it("keeps the crawler on public MentorMe HTML routes", () => {
    expect(isCrawlableUrl("https://mentorga.org/food-pantry/?utm_source=x")).toBe(
      true,
    );
    expect(isCrawlableUrl("https://www.mentorga.org/wp-admin/")).toBe(false);
    expect(isCrawlableUrl("https://example.com/food-pantry")).toBe(false);
    expect(isCrawlableUrl("https://www.mentorga.org/brochure.pdf")).toBe(false);
  });

  it("honors robots allow rules over shorter disallow rules", () => {
    const rules = parseRobotsTxt(
      "User-agent: *\nDisallow: /private\nAllow: /private/public\n",
    );
    expect(
      isAllowedByRobots("https://www.mentorga.org/private/page", rules),
    ).toBe(false);
    expect(
      isAllowedByRobots("https://www.mentorga.org/private/public/info", rules),
    ).toBe(true);
  });

  it("rejects malformed and duplicate removal approvals", () => {
    expect(() => parseApprovedRemovalUrls({ canonicalUrls: "not-an-array" })).toThrow(
      "canonicalUrls array",
    );
    expect(() =>
      parseApprovedRemovalUrls({
        canonicalUrls: [
          "https://www.mentorga.org/contact-us",
          "https://mentorga.org/contact-us/",
        ],
      }),
    ).toThrow("Duplicate approved removal");
  });
});
