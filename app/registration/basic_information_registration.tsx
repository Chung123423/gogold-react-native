import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import StyledTextInput from '@/components/StyledTextInput';
import ThemedButton from '@/components/ThemedButton';
import Container from '@/components/Container';
import { ThemedText } from '@/components/ThemedText';
import DropDownPicker from 'react-native-dropdown-picker';
import ThemedDropdown from '@/components/ThemedDropdown';
import { RegistrationFormData, RegistrationRootStackParamList } from '@/types';
import axios from 'axios';
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import { SERVER_URL } from '@/config';

type RegistrationNavigationProp = StackNavigationProp<RegistrationRootStackParamList, 'GetMobilePhone'>;


export default function BasicInformationRegScreen() {
  // Initialize form data state
  const [formData, setFormData] = useState<RegistrationFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    chineseName: '',
    surname: '',
    givenName: '',
    email: '',
    hkidOrPassport: '',
    placeOfIssue: '',
    phoneNumber: '',
  });

  const [photo, setPhoto] = useState<string | null>(null);
  const [prefixDropdownOpen, setPrefixDropdownOpen] = useState(false);
  const [prefix, setPrefix] = useState<string | null>(null);
  const [prefixItems, setPrefixItems] = useState([
    { label: 'Mr', value: 'Mr' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Mrs', value: 'Mrs' },
  ]);

  const [docDropdownOpen, setDocDropdownOpen] = useState(false);
  const [document, setDocument] = useState<string | null>(null);
  const [documentItems, setDocumentItems] = useState([
    { label: 'HKID', value: 'hkid' },
    { label: 'Passport', value: 'passport' },
  ]);

  const navigation = useNavigation<RegistrationNavigationProp>();

  const handleInputChange = (name: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email ||
      !formData.hkidOrPassport ||
      !formData.phoneNumber
    ) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    try {
      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmPassword', formData.confirmPassword);
      formDataToSend.append('chineseName', formData.chineseName || '');
      formDataToSend.append('givenName', formData.givenName || '');
      formDataToSend.append('surname', formData.surname || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('hkidOrPassport', formData.hkidOrPassport);
      formDataToSend.append('placeOfIssue', formData.placeOfIssue || '');
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('prefix', prefix || '');
      formDataToSend.append('documentType', document || '');

      if (photo) {
        const fileName = photo.split('/').pop() || 'photo.jpg';
        const fileType = `image/${fileName.split('.').pop() || 'jpeg'}`;
        formDataToSend.append('photo', {
          uri: photo,
          name: fileName,
          type: fileType,
        } as any);
      }

      // Axios POST request
      const response = await axios.post(
        `${SERVER_URL}/api/app/register`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        navigation.navigate('AccountCreateWithIn24Hours')
      } else {
        Alert.alert('Error', `Registration failed. Please try again. ${response.status}`);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Alert.alert('Error', 'Failed to submit registration. Please try again.');
    }
  };



  const handleNext = () => {
    handleSubmit();
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Registration</Text>

        <ThemedText type='h1' style={{marginBottom: 6}}>Account Information</ThemedText>
        <Text style={styles.label}>Username</Text>
        <StyledTextInput
          placeholder="Enter username"
          value={formData.username}
          onChangeText={(text) => handleInputChange('username', text)}
        />

        <Text style={styles.label}>Password</Text>
        <StyledTextInput
          placeholder="Enter password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <StyledTextInput
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          secureTextEntry
        />

        <ThemedText type='h1' style={{marginTop: 12, marginBottom: 6}}>Personal Information</ThemedText>

        <Text style={styles.label}>Prefix</Text>
        <ThemedDropdown
          open={prefixDropdownOpen}
          value={prefix}
          items={prefixItems}
          setOpen={setPrefixDropdownOpen}
          setValue={setPrefix}
          setItems={setPrefixItems}
          placeholder="Select Prefix"
        />

        <Text style={styles.label}>Full SurName</Text>
        <StyledTextInput
          placeholder="Enter Surname"
          value={formData.surname}
          onChangeText={(text) => handleInputChange('surname', text)}
        />

        <Text style={styles.label}>Full Given Name</Text>
        <StyledTextInput
          placeholder="Enter Given Name"
          value={formData.givenName}
          onChangeText={(text) => handleInputChange('givenName', text)}
        />

        <Text style={styles.label}>Full Chinese Name</Text>
        <StyledTextInput
          placeholder="Enter Chinese Name"
          value={formData.chineseName}
          onChangeText={(text) => handleInputChange('chineseName', text)}
        />

        <Text style={styles.label}>Email Address</Text>
        <StyledTextInput
          placeholder="Enter your email address"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <StyledTextInput
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          keyboardType="phone-pad"
        />

        <ThemedText type='h1' style={{marginTop: 12, marginBottom: 6}}>Documentation Details</ThemedText>

        <Text style={styles.label}>Document Type</Text>
        <ThemedDropdown
          open={docDropdownOpen}
          value={document}
          items={documentItems}
          setOpen={setDocDropdownOpen}
          setValue={setDocument}
          setItems={setDocumentItems}
          placeholder="Select Document type"
        />

        <Text style={styles.label}>HKID or Passport Number *</Text>
        <StyledTextInput
          placeholder="Enter HKID or Passport number"
          value={formData.hkidOrPassport}
          onChangeText={(text) => handleInputChange('hkidOrPassport', text)}
        />

        <Text style={styles.label}>Place of Issue</Text>
        <StyledTextInput
          placeholder="Enter place of issue"
          value={formData.placeOfIssue}
          onChangeText={(text) => handleInputChange('placeOfIssue', text)}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>
            {photo ? 'Change Photo' : 'Click here Upload HKID / Passport Photo'}
          </Text>
        </TouchableOpacity>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={styles.profileImage}
          />
        )}

        <View style={styles.submitButton}>
          <ThemedButton title="Create an account" onPress={handleNext} />
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    marginTop: 24
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: 'white',
  },
  uploadButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#333',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
  },
  submitButton: {
    marginTop: 10,
    marginBottom: 30,
  },
});