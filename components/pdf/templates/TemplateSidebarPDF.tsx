import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl, getInitials } from '@/lib/pdf/pdfHelpers';
import { COLORS, FONT_SIZES, SPACING } from '@/lib/pdf/pdfStyles';
import { getAdaptivePDFStyles } from '@/lib/adaptiveScaling';

// Function to create adaptive styles based on resume content
const createAdaptiveStyles = (resume: Resume) => {
  const adaptive = getAdaptivePDFStyles(resume);

  return StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: 'Helvetica',
    fontSize: adaptive.bodyFontSize,
    flexDirection: 'row',
  },
  // Left sidebar (30%)
  sidebar: {
    width: '30%',
    backgroundColor: '#DBEAFE', // Light blue to match HTML
    paddingLeft: 36 * adaptive.spacingScale, // 1.5x for better centering (24 * 1.5 = 36pt)
    paddingRight: 24 * adaptive.spacingScale,
    paddingTop: 36 * adaptive.spacingScale,
    paddingBottom: 24 * adaptive.spacingScale,
    borderRight: '1pt solid #E5E7EB', // Gray-200 border to match HTML
  },
  // Right main content (70%)
  mainContent: {
    width: '70%',
    backgroundColor: COLORS.white,
    padding: 30 * adaptive.spacingScale, // HTML: p-10 (2.5rem = 40px → 30pt)
    paddingTop: 36 * adaptive.spacingScale, // HTML: pt-12 (3rem = 48px → 36pt)
    paddingLeft: 30 * adaptive.spacingScale,
  },

  // ===== SIDEBAR STYLES =====

  // Photo
  photoContainer: {
    width: 100 * adaptive.spacingScale, // HTML: w-2/3 of sidebar content (≈ 66.67% of ~150pt = 100pt)
    height: 100 * adaptive.spacingScale,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 36 * adaptive.spacingScale, // HTML: gap-10 (40px) + mb-2 (8px) = 48px → 36pt
    alignSelf: 'flex-start', // Left-aligned to match HTML preview
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
    fontSize: 40 * adaptive.fontScale, // Reduced proportionally (48 * 100/120 = 40)
    fontFamily: 'Helvetica', // Light font to match HTML
    color: COLORS.white,
    letterSpacing: 2, // tracking-wider equivalent
  },

  // Sidebar sections
  sidebarSection: {
    marginBottom: 30 * adaptive.spacingScale, // HTML: gap-10 (2.5rem = 40px → 30pt)
  },
  sidebarTitle: {
    fontSize: 12 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: '#374151', // Gray-800 to match HTML
    textTransform: 'uppercase',
    marginBottom: 12 * adaptive.spacingScale, // HTML: mb-4 (1rem = 16px → 12pt)
    letterSpacing: 0.5,
    borderBottom: '2pt solid #D1D5DB', // Gray-300 border to match HTML
    paddingBottom: 6 * adaptive.spacingScale, // HTML: pb-2 (0.5rem = 8px → 6pt)
  },

  // Contact info
  contactItem: {
    marginBottom: 6 * adaptive.spacingScale, // Reduced from SPACING.md (16) to 6pt for compactness (gap-2 = 8px → 6pt)
  },
  contactLabel: {
    fontSize: 10 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: '#111827', // Gray-900 to match HTML
    marginBottom: 2 * adaptive.spacingScale,
  },
  contactValue: {
    fontSize: 10 * adaptive.fontScale,
    color: '#374151', // Gray-700 to match HTML
    lineHeight: 1.4,
  },

  // Skills list
  skillItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6 * adaptive.spacingScale,
  },
  skillBullet: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalAccent,
    marginRight: 6 * adaptive.spacingScale,
    marginTop: 1 * adaptive.spacingScale,
  },
  skillText: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.4,
  },

  // ===== MAIN CONTENT STYLES =====

  // Header with name
  mainHeader: {
    marginBottom: 24 * adaptive.spacingScale,
  },
  name: {
    fontSize: 48 * adaptive.fontScale, // 3rem to match HTML
    fontFamily: 'Helvetica-Bold',
    color: '#1E3A8A', // Dark blue to match HTML
    letterSpacing: 0.5, // tracking-wide equivalent
    marginBottom: 18 * adaptive.spacingScale,
    lineHeight: 1.2,
  },
  tagline: {
    fontSize: 12 * adaptive.fontScale,
    color: COLORS.minimalText,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },

  // Main sections
  mainSection: {
    marginBottom: 24 * adaptive.spacingScale,
  },
  mainSectionTitle: {
    fontSize: 14 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: '#374151', // Gray-800 to match HTML
    marginBottom: 18 * adaptive.spacingScale, // HTML: mb-6 (1.5rem = 24px → 18pt)
    paddingBottom: 6 * adaptive.spacingScale, // HTML: pb-2 (0.5rem = 8px → 6pt)
    borderBottom: '2pt solid #E5E7EB', // Gray-200 border to match HTML
  },

  // Experience/Education items
  itemContainer: {
    marginBottom: 16 * adaptive.spacingScale,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4 * adaptive.spacingScale,
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 11 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
    flex: 1,
    paddingRight: 8 * adaptive.spacingScale,
  },
  itemDate: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    fontStyle: 'italic',
  },
  itemSubtitle: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    marginBottom: 4 * adaptive.spacingScale,
  },

  // Description bullets
  descriptionList: {
    marginTop: 6 * adaptive.spacingScale,
    paddingLeft: 16 * adaptive.spacingScale,
  },
  descriptionItem: {
    flexDirection: 'row',
    marginBottom: 4 * adaptive.spacingScale,
    alignItems: 'flex-start',
  },
  descriptionBullet: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalAccent,
    marginRight: 6 * adaptive.spacingScale,
    marginTop: 1 * adaptive.spacingScale,
  },
  descriptionText: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.5,
  },
  // Achievements list (for education)
  achievementsList: {
    marginTop: 6 * adaptive.spacingScale,
    paddingLeft: 16 * adaptive.spacingScale,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 4 * adaptive.spacingScale,
    alignItems: 'flex-start',
  },
  achievementBullet: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalAccent,
    marginRight: 6 * adaptive.spacingScale,
    marginTop: 1 * adaptive.spacingScale,
  },
  achievementText: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.4,
  },
  // Item location (for education)
  itemLocation: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    marginBottom: 4 * adaptive.spacingScale,
  },
  // Placeholder styles
  placeholderText: {
    fontSize: 10 * adaptive.fontScale,
    color: '#9ca3af',
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.5,
  },
  });
};

interface TemplateSidebarPDFProps {
  resume: Resume;
  showPlaceholders?: boolean;
}

export const TemplateSidebarPDF: React.FC<TemplateSidebarPDFProps> = ({ resume, showPlaceholders = false }) => {
  const styles = createAdaptiveStyles(resume);

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

            {resume.personalDetails.location ||
            resume.personalDetails.phone ||
            resume.personalDetails.email ||
            resume.personalDetails.linkedin ||
            resume.personalDetails.github ? (
              <>
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
              </>
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                Add your contact information: address, phone, email, and social profiles
              </Text>
            ) : null}
          </View>

          {/* Skills Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {resume.skills.skills.length > 0 ? (
              resume.skills.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                List your professional skills
              </Text>
            ) : null}
          </View>

          {/* Tools Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Tools</Text>
            {resume.skills.tools.length > 0 ? (
              resume.skills.tools.map((tool, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{tool}</Text>
                </View>
              ))
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                List tools you use (Git, Docker, etc.)
              </Text>
            ) : null}
          </View>

          {/* Languages Section */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Languages</Text>
            {resume.skills.languages.length > 0 ? (
              resume.skills.languages.map((lang, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>
                    {lang.language} ({lang.proficiency})
                  </Text>
                </View>
              ))
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                Add languages with proficiency
              </Text>
            ) : null}
          </View>
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
            {resume.personalDetails.summary ? (
              <Text style={styles.tagline}>{resume.personalDetails.summary}</Text>
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                Write a brief professional summary highlighting your background and main skills (3-4 lines)
              </Text>
            ) : null}
          </View>

          {/* Work History / Professional Experience */}
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Work History</Text>
            {resume.experience.length > 0 ? (
              resume.experience.map((exp) => (
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
              ))
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                Showcase your relevant experience by listing each job and your responsibilities. Start with your most recent job and work backwards. Add bullet points for key responsibilities and achievements.
              </Text>
            ) : null}
          </View>

          {/* Education */}
          <View style={styles.mainSection}>
            <Text style={styles.mainSectionTitle}>Education</Text>

            {resume.education.length > 0 || (resume.certifications && resume.certifications.length > 0) ? (
              <>
                {/* Education Items */}
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
                    {edu.location && (
                      <Text style={styles.itemLocation}>{edu.location}</Text>
                    )}

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
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>{cert.name}</Text>
                      <Text style={styles.itemDate}>{cert.date}</Text>
                    </View>
                    <Text style={styles.itemSubtitle}>{cert.issuer}</Text>
                    {cert.credentialId && (
                      <Text style={styles.itemLocation}>ID: {cert.credentialId}</Text>
                    )}
                  </View>
                ))}
              </>
            ) : showPlaceholders ? (
              <Text style={styles.placeholderText}>
                Include your degree, school name and the year you graduated. If you don't have a degree, list coursework or training that's relevant to the job you're applying for. You can also add certifications here.
              </Text>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};
