// coming_soon.tsx
import Container from '@/components/Container';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { router, useNavigation } from "expo-router";
import ThemedButton from '@/components/ThemedButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AccountCreateWithIn24Hours() {
    const { height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const safeHeight = height - insets.top - insets.bottom;

    return (
        <Container style={{height: safeHeight, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={styles.container}>
            <Text style={styles.title}>Your account will be created within 24 hours</Text>
            <ThemedButton
                title={"Back to home"}
                onPress={() => router.replace("/")}// Navigate to your home screen
            >
            </ThemedButton>

            </View>
        </Container>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white'
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
