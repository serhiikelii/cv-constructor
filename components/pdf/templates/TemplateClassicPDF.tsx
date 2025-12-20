import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl, formatPDFDateRange } from '@/lib/pdf/pdfHelpers';
import { COLORS, FONT_SIZES } from '@/lib/pdf/pdfStyles';

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: 'Helvetica',
    fontSize: 10.5, // HTML: 14px (0.875rem) → 10.5pt
    lineHeight: 1.6,
    paddingTop: 42, // 15mm ≈ 42pt
    paddingHorizontal: 71, // 25mm ≈ 71pt
    paddingBottom: 71,
  },
  // Header section (always centered, no photo support)
  header: {
    marginBottom: 0, // No extra margin - sections have their own marginTop
    textAlign: 'center',
  },
  // Name
  name: {
    fontSize: 21, // HTML: 28px → 21pt (28/1.33)
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    lineHeight: 1.6,
    marginBottom: 3, // HTML: 4px → 3pt
  },
  // Contact info
  contactLine: {
    fontSize: 9, // HTML: 12px → 9pt (12/1.33)
    color: COLORS.classicText,
    marginBottom: 1.5, // HTML: 2px → 1.5pt
  },
  // Section title with bottom border (Professional Summary only)
  summaryTitle: {
    fontSize: 9, // HTML: 12px → 9pt
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.classicBorder,
    paddingBottom: 1.5, // HTML: 2px → 1.5pt
    marginTop: 6, // HTML: mt-2 (8px) → 6pt
    marginBottom: 1, // HTML: mb-1 → ~1pt
    lineHeight: 1.6,
  },
  // Section titles (Skills, Experience, Education)
  sectionTitle: {
    fontSize: 10.5, // HTML: 14px → 10.5pt (14/1.33)
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.classicBorder,
    paddingBottom: 3, // HTML: 4px → 3pt
    marginTop: 18, // HTML: 24px → 18pt (24/1.33)
    marginBottom: 6, // HTML: 8px → 6pt (8/1.33)
    lineHeight: 1.6,
  },
  // Professional Summary text
  summaryText: {
    fontSize: 9, // HTML: 12px → 9pt
    color: COLORS.classicText,
    lineHeight: 1.5,
    marginTop: 3, // HTML: 4px → 3pt
  },
  // Skills Section
  skillsContainer: {
    marginTop: 3, // HTML: 4px → 3pt
  },
  skillSubtitle: {
    fontSize: 10.5, // HTML: 14px → 10.5pt (0.875rem)
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    lineHeight: 1.6,
    marginBottom: 1.5, // HTML: 2px → 1.5pt
  },
  skillItem: {
    fontSize: 10.5, // HTML: 14px → 10.5pt
    color: COLORS.classicText,
    lineHeight: 1.6,
    marginBottom: 6, // HTML: 8px → 6pt
  },
  // Experience/Education items
  itemContainer: {
    marginBottom: 11.3, // HTML: 4mm ≈ 11.3pt
  },
  // Row with flex layout (Position/Date or Company/Location)
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 4, // HTML: 0.5rem ≈ 4pt
    marginBottom: 1.5, // HTML: 2px → 1.5pt
  },
  itemRowLast: {
    marginBottom: 3, // HTML: 4px → 3pt
  },
  itemPosition: {
    fontSize: 10.5, // HTML: 0.875rem → 10.5pt
    fontFamily: 'Helvetica-Bold',
    color: COLORS.black,
    lineHeight: 1.6,
    flex: 1,
  },
  itemDate: {
    fontSize: 10.5, // HTML: 0.875rem → 10.5pt
    color: COLORS.classicText,
    lineHeight: 1.6,
    flexShrink: 0,
  },
  itemCompany: {
    fontSize: 10.5, // HTML: 0.875rem → 10.5pt
    fontFamily: 'Helvetica-Oblique',
    color: COLORS.classicText,
    lineHeight: 1.6,
    flex: 1,
  },
  itemLocation: {
    fontSize: 10.5, // HTML: 0.875rem → 10.5pt
    color: COLORS.classicText,
    lineHeight: 1.6,
    flexShrink: 0,
  },
  // Description with bullets
  descriptionContainer: {
    marginTop: 4.5, // HTML: 6px → 4.5pt
    marginLeft: 9, // HTML: 12px → 9pt
  },
  descriptionItem: {
    flexDirection: 'row',
    fontSize: 10.5, // HTML: 14px → 10.5pt
    color: COLORS.classicText,
    lineHeight: 1.6,
    marginBottom: 1.5, // HTML: 2px → 1.5pt
  },
  bullet: {
    marginRight: 4.5, // HTML: 6px → 4.5pt
  },
  descriptionText: {
    flex: 1,
  },
  // Achievements list (for education)
  achievementsList: {
    marginTop: 4.5, // HTML: 6px → 4.5pt
    marginLeft: 18, // HTML: 1.5em ≈ 18pt
  },
  achievementItem: {
    flexDirection: 'row',
    fontSize: 10.5,
    color: COLORS.classicText,
    lineHeight: 1.6,
    marginBottom: 1.5, // HTML: 2px → 1.5pt
  },
  achievementBullet: {
    marginRight: 4.5, // HTML: 6px → 4.5pt
  },
  achievementText: {
    flex: 1,
  },
});

interface TemplateClassicPDFProps {
  resume: Resume;
}

export const TemplateClassicPDF: React.FC<TemplateClassicPDFProps> = ({ resume }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Always centered, no photo */}
        <View style={styles.header}>
          {/* Name */}
          <Text style={styles.name}>
            {resume.personalDetails.fullName || 'YOUR NAME'}
          </Text>

          {/* Location */}
          {resume.personalDetails.location && (
            <Text style={styles.contactLine}>
              {resume.personalDetails.location}
            </Text>
          )}

          {/* Email and Phone */}
          {(resume.personalDetails.email || resume.personalDetails.phone) && (
            <Text style={styles.contactLine}>
              {[resume.personalDetails.email, resume.personalDetails.phone]
                .filter(Boolean)
                .join(' | ')}
            </Text>
          )}

          {/* LinkedIn */}
          {resume.personalDetails.linkedin && (
            <Text style={styles.contactLine}>
              {cleanPDFUrl(resume.personalDetails.linkedin)}
            </Text>
          )}

          {/* GitHub */}
          {resume.personalDetails.github && (
            <Text style={styles.contactLine}>
              {cleanPDFUrl(resume.personalDetails.github)}
            </Text>
          )}

          {/* Professional Summary */}
          {resume.personalDetails.summary && (
            <View>
              <Text style={styles.summaryTitle}>Professional Summary</Text>
              <Text style={styles.summaryText}>{resume.personalDetails.summary}</Text>
            </View>
          )}
        </View>

        {/* Skills Section */}
        {(resume.skills.skills.length > 0 ||
          resume.skills.tools.length > 0 ||
          resume.skills.languages.length > 0) && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {/* Skills - joined with bullets */}
              {resume.skills.skills.length > 0 && (
                <Text style={styles.skillItem}>
                  {resume.skills.skills.join(' • ')}
                </Text>
              )}
              {/* Tools - with label and joined with bullets */}
              {resume.skills.tools.length > 0 && (
                <View style={{ marginBottom: 6 }}>
                  <Text style={styles.skillSubtitle}>TOOLS</Text>
                  <Text style={styles.skillItem}>
                    {resume.skills.tools.join(' • ')}
                  </Text>
                </View>
              )}
              {/* Languages - with label and joined with bullets */}
              {resume.skills.languages.length > 0 && (
                <View>
                  <Text style={styles.skillSubtitle}>LANGUAGES</Text>
                  <Text style={styles.skillItem}>
                    {resume.skills.languages
                      .map((lang) => `${lang.language} (${lang.proficiency})`)
                      .join(' • ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Professional Experience */}
        {resume.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer}>
                {/* Row 1: Position (left, bold) + Dates (right, nowrap) */}
                <View style={styles.itemRow}>
                  <Text style={styles.itemPosition}>{exp.position}</Text>
                  <Text style={styles.itemDate}>
                    {formatPDFDateRange(exp.startDate, exp.current ? 'Present' : exp.endDate)}
                  </Text>
                </View>

                {/* Row 2: Company (italic) + Location (right) */}
                <View style={[styles.itemRow, styles.itemRowLast]}>
                  <Text style={styles.itemCompany}>{exp.company}</Text>
                  {exp.location && <Text style={styles.itemLocation}>{exp.location}</Text>}
                </View>

                {/* Description: Bulleted List */}
                {exp.description && exp.description.length > 0 && (
                  <View style={styles.descriptionContainer}>
                    {exp.description.map((item, index) => (
                      <View key={index} style={styles.descriptionItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.descriptionText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {(resume.education.length > 0 || (resume.certifications && resume.certifications.length > 0)) && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>

            {/* Education Items */}
            {resume.education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer}>
                {/* Row 1: Degree (left, bold) + Dates (right, nowrap) */}
                <View style={styles.itemRow}>
                  <Text style={styles.itemPosition}>
                    {edu.degree} in {edu.field}
                  </Text>
                  <Text style={styles.itemDate}>
                    {formatPDFDateRange(edu.startDate, edu.current ? 'Present' : edu.endDate)}
                  </Text>
                </View>

                {/* Row 2: Institution (italic) + Location (right) */}
                <View style={[styles.itemRow, styles.itemRowLast]}>
                  <Text style={styles.itemCompany}>{edu.institution}</Text>
                  {edu.location && <Text style={styles.itemLocation}>{edu.location}</Text>}
                </View>

                {/* Achievements: Bulleted List */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <View style={styles.achievementsList}>
                    {edu.achievements.map((achievement, index) => (
                      <View key={index} style={styles.achievementItem}>
                        <Text style={styles.achievementBullet}>•</Text>
                        <Text style={styles.achievementText}>{achievement}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}

            {/* Certifications Items */}
            {resume.certifications && resume.certifications.map((cert) => (
              <View key={cert.id} style={styles.itemContainer}>
                {/* Row 1: Certification Name (left, bold) + Date (right) */}
                <View style={styles.itemRow}>
                  <Text style={styles.itemPosition}>{cert.name}</Text>
                  <Text style={styles.itemDate}>{cert.date}</Text>
                </View>

                {/* Row 2: Issuer (italic) + Credential ID (right) */}
                <View style={[styles.itemRow, styles.itemRowLast]}>
                  <Text style={styles.itemCompany}>{cert.issuer}</Text>
                  {cert.credentialId && <Text style={styles.itemLocation}>ID: {cert.credentialId}</Text>}
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
