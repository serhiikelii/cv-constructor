import { Resume } from '@/types';

/**
 * Configuration for adaptive scaling
 * Based on user requirements:
 * - Min font size: 9pt for body text, 12pt for headings
 * - Strategy: First reduce spacing, then fonts
 * - Target: Fit everything on 1 page if possible
 */
export const SCALING_CONFIG = {
  // Font size limits (in pt for PDF, will convert for HTML)
  minBodyFontSize: 9,
  minHeadingFontSize: 12,
  baseBodyFontSize: 10.5,
  baseHeadingFontSize: 14,

  // Spacing scale limits (percentage)
  minSpacingScale: 0.8, // 80% of original spacing (increased for page boundaries)
  maxSpacingScale: 1.0, // 100% original spacing

  // Font scale limits (percentage)
  minFontScale: 0.857, // 9pt / 10.5pt ≈ 0.857
  maxFontScale: 1.0,

  // Content density thresholds
  lowDensityThreshold: 50,
  mediumDensityThreshold: 100,
  highDensityThreshold: 150,
};

/**
 * Calculate content density score based on resume data
 * Higher score = more content = need more compression
 */
export function calculateContentDensity(resume: Resume): number {
  let score = 0;

  // Personal details contribution
  if (resume.personalDetails.summary) {
    score += Math.ceil(resume.personalDetails.summary.length / 100) * 5; // 5 points per 100 chars
  }

  // Experience contribution (most important)
  score += resume.experience.length * 15; // 15 points per experience item
  resume.experience.forEach((exp) => {
    if (exp.description) {
      score += exp.description.length * 3; // 3 points per bullet point
    }
  });

  // Education contribution
  score += resume.education.length * 12; // 12 points per education item
  resume.education.forEach((edu) => {
    if (edu.achievements) {
      score += edu.achievements.length * 2; // 2 points per achievement
    }
  });

  // Certifications contribution
  if (resume.certifications) {
    score += resume.certifications.length * 8; // 8 points per certification
  }

  // Skills contribution
  score += resume.skills.skills.length * 1; // 1 point per skill
  score += resume.skills.tools.length * 1; // 1 point per tool
  score += resume.skills.languages.length * 2; // 2 points per language

  return score;
}

/**
 * Calculate scale factors based on content density
 * Returns spacing and font scale factors
 */
export interface ScaleFactors {
  spacingScale: number; // For margins, paddings
  fontScale: number; // For font sizes
  contentDensity: number; // Raw density score
  compressionLevel: 'none' | 'light' | 'medium' | 'heavy';
}

export function calculateScaleFactors(resume: Resume): ScaleFactors {
  const density = calculateContentDensity(resume);
  const config = SCALING_CONFIG;

  let spacingScale = 1.0;
  let fontScale = 1.0;
  let compressionLevel: ScaleFactors['compressionLevel'] = 'none';

  // Strategy: First reduce spacing, then fonts (as per user preference)

  if (density <= config.lowDensityThreshold) {
    // Low density - no compression needed
    compressionLevel = 'none';
  } else if (density <= config.mediumDensityThreshold) {
    // Medium density - light compression (spacing only)
    compressionLevel = 'light';
    // Reduce spacing progressively from 100% to 80%
    const progress = (density - config.lowDensityThreshold) /
                     (config.mediumDensityThreshold - config.lowDensityThreshold);
    spacingScale = 1.0 - (progress * 0.2); // 100% → 80%
  } else if (density <= config.highDensityThreshold) {
    // High density - medium compression (spacing + light font reduction)
    compressionLevel = 'medium';
    // Spacing at 80%
    spacingScale = 0.8;
    // Start reducing fonts from 100% to 95%
    const progress = (density - config.mediumDensityThreshold) /
                     (config.highDensityThreshold - config.mediumDensityThreshold);
    fontScale = 1.0 - (progress * 0.05); // 100% → 95%
  } else {
    // Very high density - heavy compression
    compressionLevel = 'heavy';
    // Spacing at minimum (80%)
    const excessDensity = density - config.highDensityThreshold;
    const spacingReduction = Math.min(0.2, excessDensity / 1000); // Max 20% additional reduction
    spacingScale = Math.max(config.minSpacingScale, 0.8 - spacingReduction);

    // Font reduction from 95% down to minimum (85.7%)
    const fontReduction = Math.min(0.143, excessDensity / 500); // Max to 85.7%
    fontScale = Math.max(config.minFontScale, 0.95 - fontReduction);
  }

  return {
    spacingScale: Math.round(spacingScale * 1000) / 1000, // Round to 3 decimals
    fontScale: Math.round(fontScale * 1000) / 1000,
    contentDensity: density,
    compressionLevel,
  };
}

/**
 * Apply font scale to a base size
 */
export function scaleFontSize(baseSize: number, fontScale: number): number {
  return Math.round(baseSize * fontScale * 10) / 10; // Round to 1 decimal
}

/**
 * Apply spacing scale to a base spacing value
 */
export function scaleSpacing(baseSpacing: number, spacingScale: number): number {
  return Math.round(baseSpacing * spacingScale * 10) / 10; // Round to 1 decimal
}

/**
 * Convert pt to rem for HTML (1pt ≈ 1.33px, 1rem = 16px)
 */
export function ptToRem(pt: number): number {
  return Math.round((pt * 1.33 / 16) * 1000) / 1000; // pt → px → rem
}

/**
 * Convert rem to pt for PDF
 */
export function remToPt(rem: number): number {
  return Math.round((rem * 16 / 1.33) * 10) / 10; // rem → px → pt
}

/**
 * Get adaptive styles for HTML template
 * Note: Using same base values as PDF for consistency
 * 1mm ≈ 2.83pt, so 15mm ≈ 42.45pt ≈ 42pt
 */
export function getAdaptiveHTMLStyles(resume: Resume) {
  const { spacingScale, fontScale, compressionLevel } = calculateScaleFactors(resume);

  // Base values - EXACT MATCH with PDF using pt -> px conversion
  // PDF uses pt, HTML uses px: 1pt = 1.33333px (at 96 DPI)
  const baseFontSize = 0.875; // rem (14px ≈ 10.5pt)
  const baseHeadingSize = 1.75; // rem (28px ≈ 21pt)
  const baseLineHeight = 1.6;

  // Convert PDF pt values to px for HTML (1pt = 1.33333px)
  // PDF: paddingTop=42pt, paddingHorizontal=71pt, sectionMargin=18pt
  const basePaddingTopPx = 42 * 1.33333; // 56px (42pt in PDF)
  const basePaddingSidePx = 71 * 1.33333; // 94.67px (71pt in PDF)
  const basePaddingBottomPx = 71 * 1.33333; // 94.67px (71pt in PDF)
  const baseSectionMarginTopPx = 18 * 1.33333; // 24px (18pt in PDF)

  return {
    fontSize: `${scaleFontSize(baseFontSize, fontScale)}rem`,
    headingSize: `${scaleFontSize(baseHeadingSize, fontScale)}rem`,
    lineHeight: baseLineHeight,
    paddingTop: `${scaleSpacing(basePaddingTopPx, spacingScale)}px`,
    paddingSide: `${scaleSpacing(basePaddingSidePx, spacingScale)}px`,
    paddingBottom: `${scaleSpacing(basePaddingBottomPx, spacingScale)}px`,
    sectionMarginTop: `${scaleSpacing(baseSectionMarginTopPx, spacingScale)}px`,
    spacingScale,
    fontScale,
    compressionLevel,
  };
}

/**
 * Get adaptive styles for PDF template
 */
export function getAdaptivePDFStyles(resume: Resume) {
  const { spacingScale, fontScale, compressionLevel } = calculateScaleFactors(resume);

  // Base values (from current TemplateClassicPDF.tsx)
  const baseBodyFontSize = 10.5; // pt
  const baseHeadingFontSize = 21; // pt (name)
  const baseSectionTitleSize = 10.5; // pt
  const basePaddingTop = 42; // pt (15mm)
  const basePaddingHorizontal = 71; // pt (25mm)
  const basePaddingBottom = 71; // pt
  const baseSectionMarginTop = 18; // pt

  return {
    bodyFontSize: scaleFontSize(baseBodyFontSize, fontScale),
    headingFontSize: scaleFontSize(baseHeadingFontSize, fontScale),
    sectionTitleFontSize: scaleFontSize(baseSectionTitleSize, fontScale),
    paddingTop: scaleSpacing(basePaddingTop, spacingScale),
    paddingHorizontal: scaleSpacing(basePaddingHorizontal, spacingScale),
    paddingBottom: scaleSpacing(basePaddingBottom, spacingScale),
    sectionMarginTop: scaleSpacing(baseSectionMarginTop, spacingScale),
    itemMarginBottom: scaleSpacing(11.3, spacingScale), // 4mm
    spacingScale,
    fontScale,
    compressionLevel,
  };
}
