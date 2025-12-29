import Container from '../components/Container';
import Header from '../components/Header';
import ScanAnimation from '../components/ScanAnimation';
import ThemedButton from '../components/ThemedButton';
import { ThemedText } from '../components/ThemedText';
import { Colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Import the useAuth hook
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const router = useRouter();
  const { authState } = useAuth(); // Get authState from the useAuth hook
  const { t } = useTranslation();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  useEffect(() => {
    async function requestPermissions() {
      // Request Camera Permission
      if (!cameraPermission?.granted) {
        await requestCameraPermission();
      }

      // Request Location Permission
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        console.warn('Location permission not granted');
      }
    }

    requestPermissions();
  }, [cameraPermission, requestCameraPermission]); // Add requestCameraPermission to dependency array

  // New function to handle conditional navigation
  const handleNavigateToScan = () => {
    if (authState.token) {
      // User is logged in, navigate to the QR code scanner
      router.navigate('/scan-qrcode');
    } else {
      // User is not logged in, navigate to the login page
      router.navigate('/login');
    }
  };

  return (
    <Container>
      <View style={{ flex: 1, width: '100%' }}>
        <Header />
        <ScanAnimation />
        {/* <Image source={require("@/assets/images/gold.png")} style={styles.image}/> */}

        <View style={{ alignItems: 'center' }}>
          <ThemedText>{t('fifteenMinsGold2Cash')}</ThemedText>
          <ThemedText type="title" style={{ color: Colors.light_gold }}>HK$4,926</ThemedText>
          <ThemedText>估值 (4.26克)</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedButton title={'黃金回收機位置'} onPress={() => { router.navigate('/coming_soon') }} iconName='location-outline' />
          {/* <ThemedButton title={'價值計數機'} iconName='calculator-outline' onPress={ () => {router.navigate('/registration')} }/> */}
          <ThemedButton title={'登記/登入'} variant='secondary' onPress={() => { router.navigate('/login') }} iconName='person' />
          {/* Updated: Call the new conditional navigation function */}
          <ThemedButton
            title={'使用黃金回收機'}
            variant='secondary'
            iconName='scan-outline'
            onPress={handleNavigateToScan}
          />
        </View>
      </View>
      <View><ThemedText>version 4.1</ThemedText></View>
    </Container>
  );
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    backgroundColor: '#86ACB3',
    marginBottom: 40,
  },
  section: {
    marginTop: 40,
    width: '100%'
  }
});