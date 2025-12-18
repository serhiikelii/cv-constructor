import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl, getInitials } from '@/lib/pdf/pdfHelpers';
import { COLORS, FONT_SIZES, SPACING } from '@/lib/pdf/pdfStyles';

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: 'Helvetica',
    fontSize: FONT_SIZES.body,
    flexDirection: 'row',
  },
  // Left sidebar (30%)
  sidebar: {
    width: '30%',
    backgroundColor: '#DBEAFE', // Light blue to match HTML
    padding: SPACING.lg,
    paddingTop: 40,
    borderRight: '1pt solid #E5E7EB', // Gray-200 border to match HTML
  },
  // Right main content (70%)
  mainContent: {
    width: '70%',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    paddingTop: 40,
    paddingLeft: 32,
  },

  // ===== SIDEBAR STYLES =====

  // Photo
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DBEAFE', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
    borderStyle: 'solid',
  },
  photoInitials: {
    fontSize: 48,
    fontFamily: 'Helvetica', // Light font to match HTML
    color: COLORS.white,
    letterSpacing: 2, // tracking-wider equivalent
  },

  // Sidebar sections
  sidebarSection: {
    marginBottom: SPACING.lg,
  },
  sidebarTitle: {
    fontSize: FONT_SIZES.h3,
    fontFamily: 'Helvetica-Bold',
    color: '#374151', // Gray-800 to match HTML
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
    letterSpacing: 0.5,
    borderBottom: '2pt solid #D1D5DB', // Gray-300 border to match HTML
    paddingBottom: 2,
  },

  // Contact info
  contactItem: {
    marginBottom: SPACING.md,
  },
  contactLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827', // Gray-900 to match HTML
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 10,
    color: '#374151', // Gray-700 to match HTML
    lineHeight: 1.4,
  },

  // Skills list
  skillItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  skillBullet: {
    fontSize: 10,
    color: COLORS.minimalAccent,
    marginRight: 6,
    marginTop: 1,
  },
  skillText: {
    fontSize: 10,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.4,
  },

  // ===== MAIN CONTENT STYLES =====

  // Header with name
  mainHeader: {
    marginBottom: SPACING.xl,
  },
  name: {
    fontSize: 48, // 3rem to match HTML
    fontFamily: 'Helvetica-Bold',
    color: '#1E3A8A', // Dark blue to match HTML
    letterSpacing: 0.5, // tracking-wide equivalent
    marginBottom: SPACING.lg,
    lineHeight: 1.2,
  },
  tagline: {
    fontSize: 12,
    color: COLORS.minimalText,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },

  // Main sections
  mainSection: {
    marginBottom: SPACING.xl,
  },
  mainSectionTitle: {
    fontSize: FONT_SIZES.h2,
    fontFamily: 'Helvetica-Bold',
    color: '#374151', // Gray-800 to match HTML
    marginBottom: SPACING.lg,
    paddingBottom: 2,
    borderBottom: '2pt solid #E5E7EB', // Gray-200 border to match HTML
  },

  // Experience/Education items
  itemContainer: {
    marginBottom: SPACING.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
    flex: 1,
    paddingRight: SPACING.sm,
  },
  itemDate: {
    fontSize: 10,
    color: COLORS.minimalText,
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 10,
    color: COLORS.minimalText,
    marginBottom: 4,
  },

  // Description bullets
  descriptionList: {
    marginTop: 6,
    paddingLeft: SPACING.md,
  },
  descriptionItem: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  descriptionBullet: {
    fontSize: 10,
    color: COLORS.minimalAccent,
    marginRight: 6,
    marginTop: 1,
  },
  descriptionText: {
    fontSize: 10,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.5,
  },
});

interface TemplateSidebarPDFProps {
  resume: Resume;
}

export const TemplateSidebarPDF: React.FC<TemplateSidebarPDFProps> = ({ resume }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          {/* Photo */}
          <View style={styles.photoContainer}>
            {resume.personalDetails.photo ? (
              <Image src={resume.personalDetails.photo} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoInitials}>
                  {getInitials(resume.personalDetails.fullName || 'Your Name')}
                </Text>
              </View>
            )}
          </View>

          {/* Contact Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>

            {resume.personalDetails.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Address</Text>
                <Text style={styles.contactValue}>{resume.personalDetails.location}</Text>
              </View>
            )}

            {resume.personalDetails.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{resume.personalDetails.phone}</Text>
              </View>
            )}

            {resume.personalDetails.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>E-mail</Text>
                <Text style={styles.contactValue}>{resume.personalDetails.email}</Text>
              </View>
            )}

            {resume.personalDetails.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>
                  {cleanPDFUrl(resume.personalDetails.linkedin)}
                </Text>
              </View>
            )}

            {resume.personalDetails.github && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>GitHub</Text>
                <Text style={styles.contactValue}>
                  {cleanPDFUrl(resume.personalDetails.github)}
                </Text>
              </View>
            )}
          </View>

          {/* Skills Section */}
          {resume.skills.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {resume.skills.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Tools Section */}
          {resume.skills.tools.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Tools</Text>
              {resume.skills.tools.map((tool, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{tool}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages Section */}
          {resume.skills.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Languages</Text>
              {resume.skills.languages.map((lang, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>
                    {lang.language} ({lang.proficiency})
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.mainHeader}>
            <Text style={styles.name}>
              {resume.personalDetails.fullName
                ? resume.personalDetails.fullName.split(' ').join('  ')
                : 'Your  Name'}
            </Text>
            {resume.personalDetails.summary && (
              <Text style={styles.tagline}>{resume.personalDetails.summary}</Text>
            )}
          </View>

          {/* Work History / Professional Experience */}
          {resume.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Work History</Text>
              {resume.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemDate}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>

                  {exp.description && exp.description.length > 0 && (
                    <View style={styles.descriptionList}>
                      {exp.description.map((item, index) => (
                        <View key={index} style={styles.descriptionItem}>
                          <Text style={styles.descriptionBullet}>•</Text>
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
          {resume.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>Education</Text>
              {resume.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>
                      Degree: {edu.degree} in {edu.field}
                    </Text>
                    <Text style={styles.itemDate}>
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {edu.institution}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
