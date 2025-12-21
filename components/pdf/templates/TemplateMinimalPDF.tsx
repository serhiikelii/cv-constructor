import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { cleanPDFUrl } from '@/lib/pdf/pdfHelpers';
import { COLORS, FONT_SIZES } from '@/lib/pdf/pdfStyles';

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: 'Helvetica',
    fontSize: FONT_SIZES.body,
    lineHeight: 1.6,
    padding: 0,
  },
  // Header section
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    paddingLeft: 64,
    paddingRight: 64,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES.h1,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalAccent,
    letterSpacing: -0.5,
    lineHeight: 1.2,
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 11,
    color: COLORS.minimalText,
    lineHeight: 1.6,
  },
  contactLine: {
    marginBottom: 4,
  },
  // Photo (circular)
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.minimalAccent,
    overflow: 'hidden',
    flexShrink: 0,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  // Main content with timeline
  content: {
    paddingLeft: 64,
    paddingRight: 64,
    paddingBottom: 48,
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 40,
  },
  // Timeline vertical line - symmetric padding top and bottom
  timelineLine: {
    position: 'absolute',
    left: 14,
    top: 7,
    bottom: 7, // Same as top for symmetry
    width: 4,
    backgroundColor: COLORS.minimalAccent,
  },
  // Section with timeline dot
  section: {
    position: 'relative',
    marginBottom: 24,
  },
  timelineDot: {
    position: 'absolute',
    left: -32,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    borderColor: COLORS.minimalAccent,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.h2,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalAccent,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 11,
    color: COLORS.minimalText,
    lineHeight: 1.6,
  },
  // Skills - 3 columns
  skillsGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  skillColumn: {
    flex: 1,
  },
  skillsList: {
    marginTop: 8,
  },
  skillItem: {
    flexDirection: 'row',
    fontSize: 11,
    color: COLORS.minimalText,
    marginBottom: 4,
  },
  bullet: {
    marginRight: 8,
  },
  // Experience/Education items
  itemContainer: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
    flex: 1,
  },
  itemDate: {
    fontSize: 11,
    color: COLORS.minimalText,
  },
  itemDescription: {
    marginTop: 8,
    marginLeft: 16,
  },
  descriptionItem: {
    flexDirection: 'row',
    fontSize: 11,
    color: COLORS.minimalText,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  descriptionBullet: {
    marginRight: 8,
  },
  descriptionText: {
    flex: 1,
  },
  // Education specific
  eduInstitution: {
    fontSize: 11,
    color: COLORS.minimalText,
    marginBottom: 2,
  },
  eduDegree: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.minimalText,
  },
  // Education location
  eduLocation: {
    fontSize: 10,
    color: COLORS.minimalText,
    marginTop: 2,
  },
  // Achievements list (for education)
  achievementsList: {
    marginTop: 6,
    paddingLeft: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  achievementBullet: {
    fontSize: 10,
    color: COLORS.minimalAccent,
    marginRight: 6,
    marginTop: 1,
  },
  achievementText: {
    fontSize: 10,
    color: COLORS.minimalText,
    flex: 1,
    lineHeight: 1.4,
  },
  // Placeholder styles
  placeholderText: {
    fontSize: 10,
    color: '#9ca3af',
    fontFamily: 'Helvetica-Oblique',
    lineHeight: 1.5,
  },
});

interface TemplateMinimalPDFProps {
  resume: Resume;
}

export const TemplateMinimalPDF: React.FC<TemplateMinimalPDFProps> = ({ resume }) => {
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
            {resume.personalDetails.photo && (
              <View style={styles.photoContainer}>
                <Image src={resume.personalDetails.photo} style={styles.photo} />
              </View>
            )}
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
              ) : (
                <Text style={styles.placeholderText}>
                  Use this section to give recruiters a quick glimpse of your professional profile. In just 3-4 lines, highlight your background, education and main skills.
                </Text>
              )}
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
                    ) : (
                      <Text style={styles.placeholderText}>
                        List your professional skills (React, Python, etc.)
                      </Text>
                    )}
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
                    ) : (
                      <Text style={styles.placeholderText}>
                        List tools you use (Git, Docker, Figma, etc.)
                      </Text>
                    )}
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
                    ) : (
                      <Text style={styles.placeholderText}>
                        Add languages with proficiency level
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Professional Experience */}
            <View style={styles.section}>
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
              ) : (
                <Text style={styles.placeholderText}>
                  Showcase your relevant experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards using the format: Job Title | Company Name (dates). Add bullet points for key responsibilities and achievements.
                </Text>
              )}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <View style={styles.timelineDot} />
              <Text style={styles.sectionTitle}>Education</Text>

              {resume.education.length > 0 || (resume.certifications && resume.certifications.length > 0) ? (
                <>
                  {/* Education Items */}
                  {resume.education.map((edu) => (
                    <View key={edu.id} style={styles.itemContainer}>
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
                    <View key={cert.id} style={styles.itemContainer}>
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
              ) : (
                <Text style={styles.placeholderText}>
                  Include your degree, school name and the year you graduated. If you don't have a degree, list coursework or training that's relevant to the job you're applying for. You can also add certifications here.
                </Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
