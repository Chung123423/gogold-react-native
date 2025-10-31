import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'h1' |'h2' | 'sm_text';
  color?: string; // New color prop that takes priority
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  color: explicitColor, // New prop
  ...rest
}: ThemedTextProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text' // Default color key from your theme
  );

  // Use explicit color if provided, otherwise use theme color
  const textColor = explicitColor ?? themeColor;

  return (
    <Text
      style={[
        { color: textColor }, // Apply the determined color
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'h1' ? styles.h1 : undefined,
        type === 'h2' ? styles.h2 : undefined,
        type === 'sm_text' ? styles.sm_text : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    // Note: Link color will now use the theme color unless overridden
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sm_text: {
    fontSize:12
  }
});