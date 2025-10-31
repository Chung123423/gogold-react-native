// components/ProtectedRoute.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  if (authState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authState.user) {
    // Redirect to login page if not authenticated
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}