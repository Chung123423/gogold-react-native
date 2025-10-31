import Container from '@/components/Container';
import ThemedButton from '@/components/ThemedButton';
import React, { useState, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, ViewStyle, TextStyle, TouchableOpacity, Alert, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useNavigation } from "expo-router";
import { StackNavigationProp } from '@react-navigation/stack';
import { RegistrationRootStackParamList } from '@/types';

type RegistrationNavigationProp = StackNavigationProp<RegistrationRootStackParamList, 'GetMobilePhone'>;

const PrivacyPolicyScreen: React.FC = () => {
  const navigation = useNavigation<RegistrationNavigationProp>();
  const onAgreePress = () => {
    navigation.navigate('BasicInfo')
  };

  return (
    <Container style={{ flex: 1 }}>
      <ScrollView style={styles.container} scrollEventThrottle={16}>
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

        {/* Repeat your Sections here exactly as you had them */}
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


        <Section title="9. Changes to This Privacy Policy">
          <Text style={styles.sectionText}>
            We may update this Privacy Policy periodically. The "Effective Date" at the top indicates when changes were made. 
            We will notify you of significant changes through the Application or via email. Continued use after changes constitutes acceptance.
          </Text>
        </Section>
        
        <View style={{ height: 80 }} />
      </ScrollView>

        <View style={styles.agreeContainer}>
          <ThemedButton
            onPress={onAgreePress}
            title={"Agree"}
          />
        </View>
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

// Styles (with new styles for button)
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
  agreeContainer: ViewStyle;
  agreeButton: ViewStyle;
  disabledButton: ViewStyle;
  agreeButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    marginBottom: 0,
    paddingHorizontal: 16,
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
    color: 'white',
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
  agreeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  agreeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#8E8E93',
  },
  agreeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PrivacyPolicyScreen;
