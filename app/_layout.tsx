import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import PrivacyPolicyScreen from './legal_pages/privacy_policy';
import { StripeProvider } from '@stripe/stripe-react-native';

const Layout = () => {
  const { authState } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={authState?.token !== null}>
        
        <Stack.Screen name="account" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="gold-recycling-machine-location" options={{ headerShown: false }} />
      <Stack.Screen name="scan-qrcode" options={{ headerShown: false }} />
      <Stack.Screen name="bind-machine" options={{ headerShown: false }} />
      <Stack.Screen name="registration" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}

      <Stack.Screen name="legal_pages/privacy_policy" options={{title: "Privacy Policy" }}/>
      <Stack.Screen name="legal_pages/software_license" options={{title: "Software License" }}/>
      <Stack.Screen name="legal_pages/terms_and_condition" options={{title: "Terms and Condition" }}/>
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="coming_soon" options={{ headerShown: false }}/>
      <Stack.Screen name="payment_pages/buy_gold_screen" options={{headerShown: false}}/>
      <Stack.Screen name="payment_pages/checkout" options={{headerShown: false}}/>
    </Stack>
  );
}

export default function RootLayout() {
  

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StripeProvider 
            publishableKey='pk_test_51RvEm5HnHX8FGu5Q8VSeetwbBD58ggOGi759JsUnQC0FZ5YEJEQyewFUcJBGq1ebzCV3CZRabN3Cw7Z0BiTta01Q00O6O2wlhJ'
          >
            <Layout />
          </StripeProvider>
          
          <StatusBar style="auto" />
        </ThemeProvider>
      </AuthProvider>
  );
}
