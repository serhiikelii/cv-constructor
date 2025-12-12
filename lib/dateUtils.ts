/**
 * Date formatting utilities for resume display
 */

/**
 * Formats a date string to a readable month-year format
 * @param dateString - ISO date string (e.g., "2023-01-15")
 * @param locale - Locale for month formatting (default: "en-US")
 * @returns Formatted date string (e.g., "Jan 2023")
 */
export function formatDate(
  dateString: string,
  locale: string = "en-US"
): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString(locale, { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch (error) {
    return dateString;
  }
}

/**
 * Formats a date range for employment or education periods
 * @param startDate - Start date string
 * @param endDate - End date string (null for current positions)
 * @param isCurrent - Flag indicating if this is an ongoing position
 * @param locale - Locale for formatting
 * @returns Formatted date range (e.g., "Jan 2020 - Present")
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean = false,
  locale: string = "en-US"
): string {
  const start = formatDate(startDate, locale);

  if (isCurrent || !endDate) {
    return `${start} - Present`;
  }

  const end = formatDate(endDate, locale);
  return `${start} - ${end}`;
}

/**
 * Calculates duration between two dates in years and months
 * @param startDate - Start date string
 * @param endDate - End date string (null for current date)
 * @returns Duration string (e.g., "2 yrs 3 mos")
 */
export function calculateDuration(
  startDate: string,
  endDate: string | null
): string {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  if (months < 1) return "Less than a month";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const yearStr = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
  const monthStr = remainingMonths > 0 ? `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}` : "";

  return [yearStr, monthStr].filter(Boolean).join(" ");
}
