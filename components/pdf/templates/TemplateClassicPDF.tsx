import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl, formatPDFDateRange } from '@/lib/pdf/pdfHelpers';
import { COLORS } from '@/lib/pdf/pdfStyles';
import { getAdaptivePDFStyles } from '@/lib/adaptiveScaling';

// Function to create adaptive styles based on resume content
const createAdaptiveStyles = (resume: Resume) => {
  const adaptive = getAdaptivePDFStyles(resume);

  return StyleSheet.create({
    page: {
      backgroundColor: COLORS.white,
      fontFamily: 'Helvetica',
      fontSize: adaptive.bodyFontSize,
      lineHeight: 1.6,
      paddingTop: adaptive.paddingTop,
      paddingHorizontal: adaptive.paddingHorizontal,
      paddingBottom: adaptive.paddingBottom,
    },
    // Header section (always centered, no photo support)
    header: {
      marginBottom: 0,
      textAlign: 'center',
    },
    // Name
    name: {
      fontSize: adaptive.headingFontSize,
      fontFamily: 'Helvetica-Bold',
      color: COLORS.black,
      lineHeight: 1.6,
      marginBottom: 3 * adaptive.spacingScale,
    },
    // Contact info
    contactLine: {
      fontSize: 9 * adaptive.fontScale,
      color: COLORS.classicText,
      marginBottom: 1.5 * adaptive.spacingScale,
    },
    // Section title with bottom border (Professional Summary only)
    summaryTitle: {
      fontSize: 9 * adaptive.fontScale,
      fontFamily: 'Helvetica-Bold',
      color: COLORS.black,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.classicBorder,
      paddingBottom: 1.5 * adaptive.spacingScale,
      marginTop: 6 * adaptive.spacingScale,
      marginBottom: 1 * adaptive.spacingScale,
      lineHeight: 1.6,
    },
    // Section titles (Skills, Experience, Education)
    sectionTitle: {
      fontSize: adaptive.sectionTitleFontSize,
      fontFamily: 'Helvetica-Bold',
      color: COLORS.black,
      textTransform: 'uppercase',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.classicBorder,
      paddingBottom: 3 * adaptive.spacingScale,
      marginTop: adaptive.sectionMarginTop,
      marginBottom: 6 * adaptive.spacingScale,
      lineHeight: 1.6,
    },
    // Professional Summary text
    summaryText: {
      fontSize: 9 * adaptive.fontScale,
      color: COLORS.classicText,
      lineHeight: 1.5,
      marginTop: 3 * adaptive.spacingScale,
    },
    // Skills Section
    skillsContainer: {
      marginTop: 3 * adaptive.spacingScale,
    },
    skillSubtitle: {
      fontSize: adaptive.bodyFontSize,
      fontFamily: 'Helvetica-Bold',
      color: COLORS.black,
      lineHeight: 1.6,
      marginBottom: 1.5 * adaptive.spacingScale,
    },
    skillItem: {
      fontSize: adaptive.bodyFontSize,
      color: COLORS.classicText,
      lineHeight: 1.6,
      marginBottom: 6 * adaptive.spacingScale,
    },
    // Experience/Education items
    itemContainer: {
      marginBottom: adaptive.itemMarginBottom,
    },
    // Row with flex layout (Position/Date or Company/Location)
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 4 * adaptive.spacingScale,
      marginBottom: 1.5 * adaptive.spacingScale,
    },
    itemRowLast: {
      marginBottom: 3 * adaptive.spacingScale,
    },
    itemPosition: {
      fontSize: adaptive.bodyFontSize,
      fontFamily: 'Helvetica-Bold',
      color: COLORS.black,
      lineHeight: 1.6,
      flex: 1,
    },
    itemDate: {
      fontSize: adaptive.bodyFontSize,
      color: COLORS.classicText,
      lineHeight: 1.6,
      flexShrink: 0,
    },
    itemCompany: {
      fontSize: adaptive.bodyFontSize,
      fontFamily: 'Helvetica-Oblique',
      color: COLORS.classicText,
      lineHeight: 1.6,
      flex: 1,
    },
    itemLocation: {
      fontSize: adaptive.bodyFontSize,
      color: COLORS.classicText,
      lineHeight: 1.6,
      flexShrink: 0,
    },
    // Description with bullets
    descriptionContainer: {
      marginTop: 4.5 * adaptive.spacingScale,
      marginLeft: 9 * adaptive.spacingScale,
    },
    descriptionItem: {
      flexDirection: 'row',
      fontSize: adaptive.bodyFontSize,
      color: COLORS.classicText,
      lineHeight: 1.6,
      marginBottom: 1.5 * adaptive.spacingScale,
    },
    bullet: {
      marginRight: 4.5 * adaptive.spacingScale,
    },
    descriptionText: {
      flex: 1,
    },
    // Achievements list (for education)
    achievementsList: {
      marginTop: 4.5 * adaptive.spacingScale,
      marginLeft: 18 * adaptive.spacingScale,
    },
    achievementItem: {
      flexDirection: 'row',
      fontSize: adaptive.bodyFontSize,
      color: COLORS.classicText,
      lineHeight: 1.6,
      marginBottom: 1.5 * adaptive.spacingScale,
    },
    achievementBullet: {
      marginRight: 4.5 * adaptive.spacingScale,
    },
    achievementText: {
      flex: 1,
    },
  });
};

interface TemplateClassicPDFProps {
  resume: Resume;
}

export const TemplateClassicPDF: React.FC<TemplateClassicPDFProps> = ({ resume }) => {
  const styles = createAdaptiveStyles(resume);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
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
          <View wrap={false}>
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
              <View key={exp.id} style={styles.itemContainer} wrap={false}>
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
              <View key={edu.id} style={styles.itemContainer} wrap={false}>
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
              <View key={cert.id} style={styles.itemContainer} wrap={false}>
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
