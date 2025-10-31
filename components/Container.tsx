import { Colors } from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps extends ViewProps {
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  isPadding?: boolean; // New parameter to control padding
}

export default function Container({
  style,
  children,
  isPadding = true, // Default to true for backward compatibility
  ...rest
}: ContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
          <LinearGradient
            colors={[Colors.dark_purple, Colors.light_purple]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          <KeyboardAwareScrollView
            style={styles.scrollview}
            enableOnAndroid={true}
            extraScrollHeight={100} // Adds extra space above the keyboard
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.content,
              !isPadding && styles.contentNoPadding // Apply no padding style when isPadding is false
            ]}
          >
            {children}
          </KeyboardAwareScrollView>
            
    </SafeAreaView>
          


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20, // Default padding
  },
  contentNoPadding: {
    paddingHorizontal: 0, // No padding when isPadding is false
  },
  scrollview: {
    flex: 1,
    width: '100%',
  }
});