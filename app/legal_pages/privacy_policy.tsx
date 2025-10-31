import Container from '@/components/Container';
import React from 'react';
import { ScrollView, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

const PrivacyPolicyScreen: React.FC = () => {
  return (
    <Container>

    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      
      <Text style={styles.headerText}>Effective Date: August 11, 2025</Text>
      
      <Text style={styles.intro}>
        GoGold Technologies, Inc. ("we", "us", or "our") operates the Gold Transaction Mobile Application 
        (the "Application"). This Privacy Policy informs you about how we collect, use, disclose, and safeguard 
        your information when you use our Application.
      </Text>
      
      <Text style={styles.intro}>
        By using the Application, you consent to the practices described in this Privacy Policy. 
        If you do not agree with our policies, please do not use the Application.
      </Text>

      <Section title="1. Information We Collect">
        <SubSection title="1.1 Personal Identification Information">
          When you register and use the Application, we collect:{"\n"}
          • Full name{"\n"}
          • Contact information (email, phone number){"\n"}
          • Government-issued ID details{"\n"}
          • Biometric data for identity verification{"\n"}
          • Date of birth and physical address
        </SubSection>
        
        <SubSection title="1.2 Transaction Information">
          We collect details about your gold transactions:{"\n"}
          • Transaction dates and times{"\n"}
          • Gold amounts and purity levels{"\n"}
          • Transaction values{"\n"}
          • Machine locations and identifiers{"\n"}
          • Transaction verification codes
        </SubSection>
        
        <SubSection title="1.3 Technical and Usage Data">
          We automatically collect:{"\n"}
          • Device information (model, OS version){"\n"}
          • IP address and mobile network information{"\n"}
          • Application usage patterns and preferences{"\n"}
          • Crash reports and performance data
        </SubSection>
      </Section>

      <Section title="2. How We Use Your Information">
        <Text style={styles.sectionText}>
          We use the collected information for the following purposes:{"\n\n"}
          • To provide and maintain our Application{"\n"}
          • To verify your identity and prevent fraud{"\n"}
          • To process gold transactions securely{"\n"}
          • To maintain transaction history records{"\n"}
          • To improve, personalize, and enhance user experience{"\n"}
          • To develop new products and features{"\n"}
          • To communicate with you about updates and security alerts{"\n"}
          • To comply with legal obligations and prevent illegal activities
        </Text>
      </Section>

      <Section title="3. Data Sharing and Disclosure">
        <SubSection title="3.1 Service Providers">
          We share information with third-party service providers who assist us with:{"\n"}
          • Identity verification services{"\n"}
          • Cloud storage and hosting{"\n"}
          • Payment processing{"\n"}
          • Analytics and crash reporting{"\n"}
          • Customer support services
        </SubSection>
        
        <SubSection title="3.2 Legal Requirements">
          We may disclose your information:{"\n"}
          • To comply with legal obligations or government requests{"\n"}
          • To protect our rights, property, or safety{"\n"}
          • In connection with any merger, sale, or acquisition{"\n"}
          • To prevent financial crimes and fraud
        </SubSection>
        
        <SubSection title="3.3 Aggregate Data">
          We may share aggregated, non-personally identifiable information for business analysis, 
          research, or marketing purposes.
        </SubSection>
      </Section>

      <Section title="4. Data Security">
        <Text style={styles.sectionText}>
          We implement industry-standard security measures:{"\n\n"}
          • AES-256 encryption for data at rest and in transit{"\n"}
          • Multi-factor authentication systems{"\n"}
          • Regular security audits and penetration testing{"\n"}
          • Role-based access controls{"\n"}
          • Secure coding practices and vulnerability management{"\n\n"}
          While we strive to protect your information, no security system is impenetrable. 
          We cannot guarantee absolute security of your data transmitted through the Application.
        </Text>
      </Section>

      <Section title="5. Data Retention">
        <Text style={styles.sectionText}>
          We retain your personal information only as long as necessary:{"\n\n"}
          • Identity verification data: 7 years after account closure{"\n"}
          • Transaction records: 10 years for tax and compliance purposes{"\n"}
          • Technical logs: 1 year for security monitoring{"\n\n"}
          We will securely delete or anonymize your information when it's no longer needed.
        </Text>
      </Section>

      <Section title="6. Your Rights">
        <Text style={styles.sectionText}>
          Depending on your jurisdiction, you may have the right to:{"\n\n"}
          • Access and receive a copy of your personal data{"\n"}
          • Correct inaccurate or incomplete information{"\n"}
          • Request deletion of your personal data{"\n"}
          • Object to processing of your personal data{"\n"}
          • Request restriction of processing{"\n"}
          • Data portability{"\n\n"}
          To exercise these rights, contact us at privacy@goldsecuretech.com. We may require identity verification before processing requests.
        </Text>
      </Section>

      <Section title="7. International Data Transfers">
        <Text style={styles.sectionText}>
          Your information may be transferred to and processed in countries other than your own. 
          We ensure appropriate safeguards through Standard Contractual Clauses and other legal mechanisms.
        </Text>
      </Section>

      <Section title="8. Children's Privacy">
        <Text style={styles.sectionText}>
          Our Application is not intended for users under 18. We do not knowingly collect information from minors. 
          If we become aware of such collection, we will promptly delete the information.
        </Text>
      </Section>

      <Section title="9. Changes to This Privacy Policy">
        <Text style={styles.sectionText}>
          We may update this Privacy Policy periodically. The "Effective Date" at the top indicates when changes were made. 
          We will notify you of significant changes through the Application or via email. Continued use after changes constitutes acceptance.
        </Text>
      </Section>

    </ScrollView>
    </Container>
  );
};

// Reusable components
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

const SubSection: React.FC<SubSectionProps> = ({ title, children }) => (
  <View style={styles.subSection}>
    <Text style={styles.subSectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

// Styles (aligned with TermsAndConditionsScreen)
interface Styles {
  container: ViewStyle;
  title: TextStyle;
  headerText: TextStyle;
  intro: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  subSection: ViewStyle;
  subSectionTitle: TextStyle;
  sectionText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginBottom: 32
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: 'white',
  },
  headerText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },
  intro: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'justify',
    color: 'white'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  subSection: {
    marginBottom: 15,
    marginLeft: 10,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: 'white',
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
    color: 'white',
  },
});

export default PrivacyPolicyScreen;