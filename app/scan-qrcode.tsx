import Container from '../components/Container';
import Header from '../components/Header';
import { ThemedText } from '../components/ThemedText';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react'; // Add useEffect
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { SERVER_URL } from '../config';

interface BarcodeScannedEvent {
  type: string;
  data: string;
}

export default function App() {
  const router = useRouter();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const { authState } = useAuth();

  const API_URL = `${SERVER_URL}/api/app/auth/gold-machine`;


  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <ThemedText style={styles.message}>Requires camera permission to scan.</ThemedText>;
  }

  if (!authState.token) {
    return <ThemedText style={styles.message}>Please log in to scan a QR code.</ThemedText>;
  }

  // Handle QR code scan
  const handleBarCodeScanned = async ({ type, data }: BarcodeScannedEvent) => {
    if (scanned) return;
    setScanned(true);
    setScannedData(data);

    try {
      const qrData = JSON.parse(data);
      const { machine_id, one_time_code } = qrData;

      const response = await axios.post(
        API_URL,
        {
          machine_id,
          one_time_code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authState.token,
          },
        }
      );

      if (response.status === 200 && response.data.status) {
        router.navigate({
          pathname: '/bind-machine',
          params: {
            gold_machine_name: response.data.gold_machine_name,
            session_id: response.data.session_id
          }
        })
      } else {
        Alert.alert('Error', 'Failed to bind user. Invalid machine ID or one-time code.');
      }
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred.';

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          Alert.alert('Error', 'Invalid QR code. Please try to refresh the QR code on the machine screen.');
        } else {
          errorMessage = error.response?.data?.message || error.message || errorMessage;
          Alert.alert('Error', errorMessage);
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      }

    } finally {
      setTimeout(() => setScanned(false), 3000);
    }
  };

  return (
    <Container>
      <Header />
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      </View>
      <View style={styles.section}>
        <ThemedText>掃描回收黃金機上QR Code綁定用戶</ThemedText>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16
  },
  cameraContainer: {
    width: 290,
    height: 290,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  camera: {
    width: 270,
    height: 270,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  section: {
    marginTop: 20,
  },
});