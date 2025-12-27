import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl } from '@/lib/pdf/pdfHelpers';
import { COLORS, FONT_SIZES } from '@/lib/pdf/pdfStyles';
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
    paddingBottom: adaptive.paddingTop, // Use same as top for symmetry
    paddingLeft: 0,
    paddingRight: 0,
  },
  // Header section
  header: {
    paddingBottom: 24 * adaptive.spacingScale,
    paddingLeft: 64 * adaptive.spacingScale,
    paddingRight: 64 * adaptive.spacingScale,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24 * adaptive.spacingScale,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 28 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalAccent,
    letterSpacing: -0.5,
    lineHeight: 1.2,
    marginBottom: 12 * adaptive.spacingScale,
  },
  contactInfo: {
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
    lineHeight: 1.6,
  },
  contactLine: {
    marginBottom: 4 * adaptive.spacingScale,
  },
  // Photo (circular)
  photoContainer: {
    width: 100 * adaptive.spacingScale,
    height: 100 * adaptive.spacingScale,
    borderRadius: 50 * adaptive.spacingScale,
    overflow: 'hidden',
    flexShrink: 0,
  },
  photoContainerWithBorder: {
    borderWidth: 3,
    borderColor: COLORS.minimalAccent,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D1D5DB', // Light gray
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 12 * adaptive.fontScale,
    fontFamily: 'Helvetica',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Main content with timeline
  content: {
    paddingLeft: 64 * adaptive.spacingScale,
    paddingRight: 64 * adaptive.spacingScale,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 40 * adaptive.spacingScale,
  },
  // Timeline vertical line - grows with content
  timelineLine: {
    position: 'absolute',
    left: 14 * adaptive.spacingScale,
    top: 7 * adaptive.spacingScale,
    bottom: 32 * adaptive.spacingScale,
    width: 4,
    backgroundColor: COLORS.minimalAccent,
  },
  // Section with timeline dot
  section: {
    position: 'relative',
    marginBottom: 16 * adaptive.spacingScale,
  },
  timelineDot: {
    position: 'absolute',
    left: -32 * adaptive.spacingScale,
    top: 0,
    width: 16 * adaptive.spacingScale,
    height: 16 * adaptive.spacingScale,
    borderRadius: 8 * adaptive.spacingScale,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.minimalAccent,
  },
  sectionTitle: {
    fontSize: 14 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalAccent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8 * adaptive.spacingScale,
  },
  summaryText: {
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
    lineHeight: 1.6,
  },
  // Skills - 3 columns
  skillsGrid: {
    flexDirection: 'row',
    gap: 24 * adaptive.spacingScale,
  },
  skillColumn: {
    flex: 1,
  },
  skillsList: {
    marginTop: 8 * adaptive.spacingScale,
  },
  skillItem: {
    flexDirection: 'row',
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
    marginBottom: 4 * adaptive.spacingScale,
  },
  bullet: {
    marginRight: 8 * adaptive.spacingScale,
  },
  // Experience/Education items
  itemContainer: {
    marginBottom: 16 * adaptive.spacingScale,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4 * adaptive.spacingScale,
  },
  itemTitle: {
    fontSize: 11 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
    flex: 1,
  },
  itemDate: {
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
  },
  itemDescription: {
    marginTop: 8 * adaptive.spacingScale,
    marginLeft: 16 * adaptive.spacingScale,
  },
  descriptionItem: {
    flexDirection: 'row',
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
    lineHeight: 1.5,
    marginBottom: 4 * adaptive.spacingScale,
  },
  descriptionBullet: {
    marginRight: 8 * adaptive.spacingScale,
  },
  descriptionText: {
    flex: 1,
  },
  // Education specific
  eduInstitution: {
    fontSize: 11 * adaptive.fontScale,
    color: COLORS.minimalText,
    marginBottom: 2 * adaptive.spacingScale,
  },
  eduDegree: {
    fontSize: 11 * adaptive.fontScale,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
  },
  // Education location
  eduLocation: {
    fontSize: 10 * adaptive.fontScale,
    color: COLORS.minimalText,
    marginTop: 2 * adaptive.spacingScale,
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
  // Placeholder styles
  placeholderText: {
    fontSize: 10 * adaptive.fontScale,
    color: '#9ca3af',
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.5,
  },
  });
};

interface TemplateMinimalPDFProps {
  resume: Resume;
  showPlaceholders?: boolean;
}

export const TemplateMinimalPDF: React.FC<TemplateMinimalPDFProps> = ({ resume, showPlaceholders = false }) => {
  const styles = createAdaptiveStyles(resume);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Text Content */}
            <View style={styles.headerText}>
              <Text style={styles.name}>
                {resume.personalDetails.fullName || 'YOUR NAME'}
              </Text>

              {/* Contact Info */}
              <View style={styles.contactInfo}>
                {resume.personalDetails.location && (
                  <Text style={styles.contactLine}>{resume.personalDetails.location}</Text>
                )}
                {(resume.personalDetails.email || resume.personalDetails.phone) && (
                  <Text style={styles.contactLine}>
                    {resume.personalDetails.email}
                    {resume.personalDetails.email && resume.personalDetails.phone && ' | '}
                    {resume.personalDetails.phone}
                  </Text>
                )}
                {resume.personalDetails.linkedin && (
                  <Text style={styles.contactLine}>
                    {cleanPDFUrl(resume.personalDetails.linkedin)}
                  </Text>
                )}
                {resume.personalDetails.github && (
                  <Text style={styles.contactLine}>
                    {cleanPDFUrl(resume.personalDetails.github)}
                  </Text>
                )}
              </View>
            </View>

            {/* Photo - Circular */}
            {resume.personalDetails.photo ? (
              <View style={[styles.photoContainer, styles.photoContainerWithBorder]}>
                <Image src={resume.personalDetails.photo} style={styles.photo} />
              </View>
            ) : showPlaceholders ? (
              <View style={styles.photoContainer}>
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoPlaceholderText}>PHOTO</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>

        {/* Main Content with Timeline */}
        <View style={styles.content}>
          <View style={styles.timelineContainer}>
            {/* Timeline vertical line */}
            <View style={styles.timelineLine} />

            {/* Professional Summary */}
            <View style={styles.section}>
              <View style={styles.timelineDot} />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              {resume.personalDetails.summary ? (
                <Text style={styles.summaryText}>{resume.personalDetails.summary}</Text>
              ) : showPlaceholders ? (
                <Text style={styles.placeholderText}>
                  Use this section to give recruiters a quick glimpse of your professional profile. In just 3-4 lines, highlight your background, education and main skills.
                </Text>
              ) : null}
            </View>

            {/* Skills - 3 columns */}
            <View style={styles.section}>
              <View style={styles.timelineDot} />
              <View style={styles.skillsGrid}>
                {/* Skills Column */}
                <View style={styles.skillColumn}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  <View style={styles.skillsList}>
                    {resume.skills.skills.length > 0 ? (
                      resume.skills.skills.map((skill, index) => (
                        <View key={index} style={styles.skillItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text>{skill}</Text>
                        </View>
                      ))
                    ) : showPlaceholders ? (
                      <Text style={styles.placeholderText}>
                        List your professional skills (React, Python, etc.)
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Tools Column */}
                <View style={styles.skillColumn}>
                  <Text style={styles.sectionTitle}>Tools</Text>
                  <View style={styles.skillsList}>
                    {resume.skills.tools.length > 0 ? (
                      resume.skills.tools.map((tool, index) => (
                        <View key={index} style={styles.skillItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text>{tool}</Text>
                        </View>
                      ))
                    ) : showPlaceholders ? (
                      <Text style={styles.placeholderText}>
                        List tools you use (Git, Docker, Figma, etc.)
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* Languages Column */}
                <View style={styles.skillColumn}>
                  <Text style={styles.sectionTitle}>Languages</Text>
                  <View style={styles.skillsList}>
                    {resume.skills.languages.length > 0 ? (
                      resume.skills.languages.map((lang, index) => (
                        <View key={index} style={styles.skillItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text>
                            {lang.language} ({lang.proficiency})
                          </Text>
                        </View>
                      ))
                    ) : showPlaceholders ? (
                      <Text style={styles.placeholderText}>
                        Add languages with proficiency level
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>

            {/* Professional Experience */}
            <View style={styles.section} wrap={true}>
              <View style={styles.timelineDot} />
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resume.experience.length > 0 ? (
                resume.experience.map((exp) => (
                  <View key={exp.id} style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemTitle}>
                        {exp.position} | {exp.company}
                      </Text>
                      <Text style={styles.itemDate}>
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </Text>
                    </View>
                    {exp.description && exp.description.length > 0 && (
                      <View style={styles.itemDescription}>
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
                  Showcase your relevant experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards using the format: Job Title | Company Name (dates). Add bullet points for key responsibilities and achievements.
                </Text>
              ) : null}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <View style={styles.timelineDot} />
              <Text style={styles.sectionTitle}>Education</Text>

              {resume.education.length > 0 || (resume.certifications && resume.certifications.length > 0) ? (
                <>
                  {/* Education Items */}
                  {resume.education.map((edu) => (
                    <View key={edu.id} style={styles.itemContainer} wrap={false}>
                      <View style={styles.itemHeader}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.eduInstitution}>{edu.institution}</Text>
                          <Text style={styles.eduDegree}>
                            Degree: {edu.degree} in {edu.field}
                          </Text>
                          {edu.location && (
                            <Text style={styles.eduLocation}>{edu.location}</Text>
                          )}
                        </View>
                        <Text style={styles.itemDate}>
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </Text>
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
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>
                          {cert.name} | {cert.issuer}
                        </Text>
                        <Text style={styles.itemDate}>{cert.date}</Text>
                      </View>
                      {cert.credentialId && (
                        <Text style={styles.eduLocation}>ID: {cert.credentialId}</Text>
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
        </View>
      </Page>
    </Document>
  );
};
