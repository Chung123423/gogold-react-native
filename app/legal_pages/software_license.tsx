import Container from '@/components/Container';
import React from 'react';
import { ScrollView, Text, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';

// Define types for component props
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

interface SubSectionProps {
  title: string;
  children: React.ReactNode;
}

const LicenseAgreementScreen: React.FC = () => {
  return (
    <Container>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Software License Agreement</Text>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Effective Date: August 11, 2025</Text>
        <Text style={styles.headerText}>Software: Gold Transaction Mobile Application ("Application")</Text>
        <Text style={styles.headerText}>Licensor: GoGold Technologies, Inc.</Text>
        <Text style={styles.headerText}>Licensee: End User ("You" or "Licensee")</Text>
      </View>

      <Text style={styles.intro}>
        This Software License Agreement ("Agreement") is a legal contract between You, 
        the Licensee, and GoGold Technologies, Inc., Inc. ("Licensor"), governing the use 
        of the Gold Transaction Mobile Application. By downloading, installing, or using 
        the Application, You agree to be bound by the terms of this Agreement.
      </Text>

      <Section title="1. Scope of License">
        <SubSection title="1.1 Grant of License">
          Licensor grants You a non-exclusive, non-transferable, revocable license to use 
          the Application solely for personal, non-commercial purposes to bind Your personal 
          account to authorized gold machines for selling gold, track transaction history, 
          verify identity, and interact with gold machines, in accordance with this Agreement.
        </SubSection>
        
        <SubSection title="1.2 Restrictions">
          You shall not:{"\n"}
          • Modify, reverse-engineer, decompile, or disassemble the Application{"\n"}
          • Sublicense, rent, lease, or transfer the Application to any third party{"\n"}
          • Use the Application for any illegal or unauthorized purpose{"\n"}
          • Attempt to gain unauthorized access to the Application's systems or networks
        </SubSection>
      </Section>

      <Section title="2. Ownership">
        The Application and all associated intellectual property rights, including but not limited 
        to copyrights, trademarks, and trade secrets, are and shall remain the sole property of 
        Licensor. This Agreement does not transfer any ownership rights to You.
      </Section>

      <Section title="3. Transaction History and Data">
        The Application maintains a record of Your transactions for traceability. Licensor may collect, 
        store, and process data related to Your use of the Application, including identity verification 
        data, in accordance with the Privacy Policy. You grant Licensor a non-exclusive license to use 
        this data solely for the purpose of providing and improving the Application's services.
      </Section>

      <Section title="4. Identity Verification">
        To use the Application, You must provide accurate and complete information for identity verification 
        as required by the Application. You are responsible for maintaining the confidentiality of Your account 
        credentials and for all activities conducted under Your account.
      </Section>

      <Section title="5. Termination">
        This Agreement is effective until terminated. Licensor may terminate this Agreement immediately 
        if You breach any of its terms. Upon termination, You must cease all use of the Application and 
        delete all copies from Your devices.
      </Section>

      <Section title="6. Limitation of Liability">
        To the maximum extent permitted by law, Licensor shall not be liable for any indirect, incidental, 
        special, consequential, or punitive damages arising out of or related to Your use of the Application, 
        including but not limited to losses from gold transactions or data breaches. The Application is 
        provided "as is" without warranties of any kind, express or implied.
      </Section>

      <Section title="7. Governing Law">
        This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, 
        United States, without regard to its conflict of law principles. Any disputes arising under this 
        Agreement shall be resolved in the state or federal courts located in Delaware.
      </Section>

      <Section title="8. Miscellaneous">
        <SubSection title="8.1 Entire Agreement">
          This Agreement constitutes the entire agreement between You and Licensor regarding the Application 
          and supersedes all prior agreements or understandings.
        </SubSection>
        
        <SubSection title="8.2 Severability">
          If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions 
          shall remain in full force and effect.
        </SubSection>
        
        <SubSection title="8.3 Amendments">
          Licensor may amend this Agreement at any time by providing notice through the Application. Continued 
          use of the Application after such notice constitutes Your acceptance of the amended terms.
        </SubSection>
      </Section>

      <Section title="9. Contact Information">
        For questions or concerns regarding this Agreement, contact:{"\n\n"}
        GoGold Technologies, Inc., Inc.{"\n"}
        123 Gold Street, Wilmington, DE 19801, USA{"\n"}
        Email: legal@goldsecuretech.com
      </Section>
    </ScrollView>
    </Container>
  );
};

// Section component with TypeScript
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

// SubSection component with TypeScript
const SubSection: React.FC<SubSectionProps> = ({ title, children }) => (
  <View style={styles.subSection}>
    <Text style={styles.subSectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

// Define style types
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

// Styles
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

export default LicenseAgreementScreen;