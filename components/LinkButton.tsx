import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { GestureResponderEvent, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LinkButtonProps {
  url?: string;
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  buttonStyle?: object;
  textStyle?: object;
  iconName?: React.ComponentProps<typeof MaterialIcons>['name'];
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
  underline?: boolean; // New parameter
}

const LinkButton = ({
  url,
  onPress,
  title,
  buttonStyle,
  textStyle,
  iconName,
  iconPosition = 'right',
  iconSize = 20,
  iconColor = 'white',
  underline = false, // Default to false
}: LinkButtonProps) => {
  const handlePress = async (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    } else if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {iconName && iconPosition === 'left' && (
        <MaterialIcons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.leftIcon}
        />
      )}
      
      <Text style={[styles.text, textStyle, underline && styles.underline]}>
        {title}
      </Text>
      
      {iconName && iconPosition === 'right' && (
        <MaterialIcons
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'none', // Explicitly remove underline
  },
  underline: {
    textDecorationLine: 'underline', // Style for underlined text
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default LinkButton;