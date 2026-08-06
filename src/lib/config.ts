import {
  APPROVED_ORG_HOSTS,
  canonicalizeOrgUrl,
  isApprovedWebsiteUrl,
} from "@/lib/security/source-url";

export const ORG = {
  name: "MentorMe North Georgia",
  canonicalOrigin: "https://www.mentorga.org",
  allowedHosts: APPROVED_ORG_HOSTS,
  contact: {
    phone: "(678) 341-8028",
    email: "info@mentormenorthga.org",
    // TODO: replace with the exact contact-page path once confirmed
    // (mentorga.org/contact-us currently 404s); the site root is a safe
    // fallback destination in the meantime.
    url: "https://www.mentorga.org/",
  },
} as const;

export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

export interface RuntimeConfig {
  apiKey?: string;
  fileSearchStore?: string;
  model: string;
  siteUrl: string;
}

export function getRuntimeConfig(): RuntimeConfig {
  return {
    apiKey: process.env.GEMINI_API_KEY?.trim() || undefined,
    fileSearchStore:
      process.env.GEMINI_FILE_SEARCH_STORE?.trim() || undefined,
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL,
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "https://mentorme-chatbot.vercel.app",
  };
}

export { canonicalizeOrgUrl, isApprovedWebsiteUrl };
