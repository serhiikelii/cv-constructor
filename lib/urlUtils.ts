/**
 * URL formatting utilities for clean display
 */

/**
 * Removes protocol and www from URL for display purposes
 * @param url - Full URL string
 * @returns Cleaned URL (e.g., "linkedin.com/in/johndoe")
 */
export function cleanUrl(url: string): string {
  if (!url) return "";

  return url
    .replace(/^https?:\/\//, "") // Remove http:// or https://
    .replace(/^www\./, ""); // Remove www.
}

/**
 * Ensures URL has a protocol for proper linking
 * @param url - URL string that may or may not have protocol
 * @returns URL with protocol
 */
export function ensureProtocol(url: string): string {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

/**
 * Extracts domain name from URL
 * @param url - Full URL string
 * @returns Domain name (e.g., "linkedin.com")
 */
export function extractDomain(url: string): string {
  if (!url) return "";

  const cleaned = cleanUrl(url);
  const parts = cleaned.split("/");
  return parts[0];
}

/**
 * Formats email for display with clickable mailto link
 * @param email - Email address
 * @returns Mailto URL
 */
export function getMailtoUrl(email: string): string {
  if (!email) return "";
  return `mailto:${email}`;
}

/**
 * Formats phone number for clickable tel link
 * @param phone - Phone number
 * @returns Tel URL with cleaned phone number
 */
export function getTelUrl(phone: string): string {
  if (!phone) return "";
  const cleanedPhone = phone.replace(/\D/g, ""); // Remove all non-digits
  return `tel:+${cleanedPhone}`;
}
