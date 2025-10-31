import Container from '@/components/Container';
import React from 'react';
import { ScrollView, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

const TermsAndConditionsScreen: React.FC = () => {
  return (
    <Container>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Effective Date: August 11, 2025</Text>
        <Text style={styles.headerText}>Software: Gold Transaction Mobile Application ("Application")</Text>
        <Text style={styles.headerText}>Provider: GoGold Technologies, Inc.</Text>
        <Text style={styles.headerText}>User: End User ("You" or "User")</Text>
      </View>

      <Text style={styles.intro}>
        These Terms and Conditions ("Terms") govern your use of the Gold Transaction Mobile Application 
        (the "Application") provided by GoGold Technologies, Inc., Inc. ("we", "us", or "our"). 
        By accessing or using the Application, you agree to be bound by these Terms. 
        If you do not agree to all of these Terms, do not use the Application.
      </Text>

      <Section title="1. Account Registration and Security">
        <SubSection title="1.1 Eligibility">
          To use the Application, you must:{"\n"}
          • Be at least 18 years old{"\n"}
          • Have legal capacity to enter binding contracts{"\n"}
          • Provide accurate and complete registration information
        </SubSection>
        
        <SubSection title="1.2 Account Security">
          You are responsible for:{"\n"}
          • Maintaining the confidentiality of your credentials{"\n"}
          • All activities under your account{"\n"}
          • Immediately notifying us of any unauthorized use{"\n"}
          We reserve the right to suspend accounts with suspicious activity
        </SubSection>
      </Section>

      <Section title="2. Gold Transaction Services">
        <SubSection title="2.1 Transaction Process">
          The Application enables you to:{"\n"}
          • Securely sell gold through authorized machines{"\n"}
          • Bind your account to specific gold machines{"\n"}
          • Track transaction history in real-time{"\n"}
          • Receive digital receipts for completed transactions
        </SubSection>
        
        <SubSection title="2.2 Transaction Limits">
          We may impose:{"\n"}
          • Daily transaction limits for security{"\n"}
          • Geographic restrictions on machine usage{"\n"}
          • Identity verification requirements for large transactions
        </SubSection>
        
        <SubSection title="2.3 Pricing">
          Gold prices:{"\n"}
          • Are determined by current market rates{"\n"}
          • Include applicable processing fees{"\n"}
          • Are displayed before transaction confirmation{"\n"}
          • May fluctuate during transaction processing
        </SubSection>
      </Section>

      <Section title="3. User Obligations">
        <Text style={styles.sectionText}>
          You agree to:{"\n\n"}
          • Use the Application only for lawful purposes{"\n"}
          • Provide accurate information for identity verification{"\n"}
          • Not engage in fraudulent, deceptive, or illegal activities{"\n"}
          • Not interfere with the Application's operation{"\n"}
          • Not reverse-engineer or modify the Application{"\n"}
          • Comply with all applicable laws and regulations
        </Text>
      </Section>

      <Section title="4. Intellectual Property">
        <Text style={styles.sectionText}>
          All rights in the Application, including:{"\n\n"}
          • Software, design, and content{"\n"}
          • Trademarks, logos, and branding{"\n"}
          • Patents and proprietary technologies{"\n\n"}
          are owned by or licensed to GoGold Technologies, Inc., Inc. 
          These Terms grant you no right, title, or interest except the limited usage license.
        </Text>
      </Section>

      <Section title="5. Fees and Payments">
        <SubSection title="5.1 Transaction Fees">
          We may charge:{"\n"}
          • A processing fee per transaction{"\n"}
          • Currency conversion fees where applicable{"\n"}
          • Bank transfer fees for payments{"\n"}
          All fees will be clearly disclosed before transaction confirmation
        </SubSection>
        
        <SubSection title="5.2 Payment Methods">
          We support:{"\n"}
          • Direct bank transfers{"\n"}
          • Secure digital payment systems{"\n"}
          • Prepaid accounts (subject to terms){"\n"}
          • Other approved payment methods
        </SubSection>
      </Section>

      <Section title="6. Disclaimers">
        <Text style={styles.sectionText}>
          THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. 
          WE DISCLAIM ALL EXPRESS AND IMPLIED WARRANTIES INCLUDING:{"\n\n"}
          • MERCHANTABILITY and fitness for particular purpose{"\n"}
          • Non-infringement of third-party rights{"\n"}
          • Continuous or error-free operation{"\n"}
          • Accuracy of market information{"\n\n"}
          We are not responsible for gold valuation disputes or machine malfunctions.
        </Text>
      </Section>

      <Section title="7. Limitation of Liability">
        <Text style={styles.sectionText}>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW:{"\n\n"}
          • We shall not be liable for any indirect, consequential, or punitive damages{"\n"}
          • Our total liability for any claim shall not exceed the fees you paid in the last 6 months{"\n"}
          • We are not liable for:{"\n"}
          &nbsp;&nbsp;- System failures beyond our control{"\n"}
          &nbsp;&nbsp;- Third-party actions{"\n"}
          &nbsp;&nbsp;- Gold price fluctuations{"\n"}
          &nbsp;&nbsp;- User errors in transaction execution
        </Text>
      </Section>

      <Section title="8. Termination">
        <SubSection title="8.1 By You">
          You may terminate your account at any time by contacting customer support 
          and settling any outstanding transactions.
        </SubSection>
        
        <SubSection title="8.2 By Us">
          We may terminate or suspend your access:{"\n"}
          • For violation of these Terms{"\n"}
          • For suspicious or fraudulent activity{"\n"}
          • As required by law or regulatory authority{"\n"}
          • For prolonged account inactivity (12+ months)
        </SubSection>
        
        <SubSection title="8.3 Effect of Termination">
          Upon termination:{"\n"}
          • Your right to use the Application ceases{"\n"}
          • Outstanding transactions must be completed{"\n"}
          • We may retain records as required by law{"\n"}
          • Fees owed remain payable
        </SubSection>
      </Section>

      <Section title="9. Dispute Resolution">
        <SubSection title="9.1 Governing Law">
          These Terms are governed by Delaware law without regard to conflict of law principles.
        </SubSection>
        
        <SubSection title="9.2 Binding Arbitration">
          Any dispute shall be resolved by binding arbitration in Delaware under AAA rules. 
          You waive rights to class actions or jury trials.
        </SubSection>
        
        <SubSection title="9.3 Exceptions">
          Either party may seek injunctive relief in court for:{"\n"}
          • Intellectual property infringement{"\n"}
          • Unauthorized application use
        </SubSection>
      </Section>

      <Section title="10. Modifications">
        <Text style={styles.sectionText}>
          We may modify these Terms at any time. We will notify you of material changes:{"\n\n"}
          • Through in-application notifications{"\n"}
          • Via email to registered users{"\n"}
          • By updating the Effective Date{"\n\n"}
          Continued use after changes constitutes acceptance. Review Terms periodically.
        </Text>
      </Section>

      <Section title="11. General Provisions">
        <SubSection title="11.1 Entire Agreement">
          These Terms constitute the entire agreement regarding the Application 
          and supersede prior agreements.
        </SubSection>
        
        <SubSection title="11.2 Severability">
          If any provision is invalid or unenforceable, the remaining provisions remain in effect.
        </SubSection>
        
        <SubSection title="11.3 Assignment">
          You may not assign these Terms without our written consent. 
          We may assign these Terms to affiliates or successors.
        </SubSection>
        
        <SubSection title="11.4 Force Majeure">
          We are not liable for delays or failures due to events beyond reasonable control.
        </SubSection>
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

// Styles (identical to Software License Agreement)
interface Styles {
  container: ViewStyle;
  title: TextStyle;
  header: ViewStyle;
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
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
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

export default TermsAndConditionsScreen;