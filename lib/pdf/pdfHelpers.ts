import { Resume } from '@/types';

/**
 * Format date for PDF display (shortened format)
 * @param date - Date string in format "Month YYYY"
 * @returns Shortened date like "01/2024"
 */
export function formatPDFDate(date: string): string {
  if (!date) return '';

  // Handle "Month YYYY" format (e.g., "January 2024")
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const parts = date.split(' ');
  if (parts.length === 2) {
    const monthIndex = monthNames.indexOf(parts[0]);
    if (monthIndex !== -1) {
      const monthNum = String(monthIndex + 1).padStart(2, '0');
      return `${monthNum}/${parts[1]}`;
    }
  }

  return date;
}

/**
 * Format date range for PDF display
 * @param startDate - Start date string or null
 * @param endDate - End date string, "Present", or null
 * @returns Formatted range like "01/2020 - 03/2024"
 */
export function formatPDFDateRange(startDate: string | null, endDate: string | null): string {
  if (!startDate && !endDate) return '';

  const start = startDate ? formatPDFDate(startDate) : '';
  const end = endDate === 'Present' ? 'Present' : (endDate ? formatPDFDate(endDate) : '');

  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;

  return `${start} - ${end}`;
}

/**
 * Get initials from full name for placeholder
 * @param fullName - Full name string
 * @returns Two-letter initials (e.g., "JS" from "John Smith")
 */
export function getInitials(fullName: string): string {
  if (!fullName) return 'YN'; // "Your Name"

  const names = fullName.trim().split(' ').filter(Boolean);

  if (names.length === 0) return 'YN';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  // First letter of first name + first letter of last name
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

/**
 * Clean URL for PDF display (remove protocol)
 * @param url - Full URL string
 * @returns Cleaned URL without http(s)://
 */
export function cleanPDFUrl(url: string): string {
  if (!url) return '';
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
}

/**
 * Generate PDF filename from resume data
 * @param resume - Resume object
 * @returns Sanitized filename like "John_Smith_CV.pdf"
 */
export function generatePDFFilename(resume: Resume): string {
  const fullName = resume.personalDetails.fullName || 'Resume';
  const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitizedName}_CV.pdf`;
}
