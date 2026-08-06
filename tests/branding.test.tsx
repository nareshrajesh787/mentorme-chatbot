import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";
import { MentorMeLogo } from "@/components/branding/BrandLogos";
import { ChatPanel } from "@/components/chatbot/ChatPanel";

afterEach(cleanup);

function imageSource(image: HTMLImageElement): string {
  return `${image.getAttribute("src") || ""} ${image.getAttribute("srcset") || ""}`;
}

describe("product branding", () => {
  it("uses the supplied MentorMe image asset", () => {
    render(<MentorMeLogo />);
    expect(
      imageSource(
        screen.getByAltText("MentorMe North Georgia") as HTMLImageElement,
      ),
    ).toContain("branding%2Fmentorme-logo.png");
  });

  it("brands the standalone page with the MentorMe logo", () => {
    const { container } = render(<Home />);
    const sources = [...container.querySelectorAll("img")].map(imageSource);
    expect(
      sources.filter((source) => source.includes("mentorme-logo.png")).length,
    ).toBeGreaterThanOrEqual(3);
  });

  it("shows MentorMe branding inside the chat panel", () => {
    Object.defineProperty(HTMLElement.prototype, "scrollTo", {
      configurable: true,
      value: vi.fn(),
    });
    const { container } = render(
      <ChatPanel onMinimize={vi.fn()} onClose={vi.fn()} />,
    );
    const sources = [...container.querySelectorAll("img")].map(imageSource);
    expect(
      sources.some((source) => source.includes("mentorme-logo.png")),
    ).toBe(true);
  });
});
