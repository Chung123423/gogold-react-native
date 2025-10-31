import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ColorValue, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

type ThemedButtonVariant = 'primary' | 'secondary';

interface ThemedButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: ThemedButtonVariant;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconName?: React.ComponentProps<typeof Ionicons>['name']; // Changed to Ionicons
    iconSize?: number;
    iconColor?: string;
    iconPosition?: 'left' | 'right'; // Added icon position control
}

export default function ThemedButton({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    iconName,
    iconSize = 20,
    iconColor = variant === 'primary' ? 'white' : Colors.dark_purple,
    iconPosition = 'right', // Default to right
    ...rest
}: ThemedButtonProps) {

    const buttonStyle = variant === 'primary' 
        ? styles.primaryButton 
        : styles.secondaryButton;
    
    const textColorStyle = variant === 'primary' 
        ? styles.primaryText 
        : styles.secondaryText;

    const gradientColors = {
        primary: [Colors.light_purple, Colors.dark_purple] as [ColorValue, ColorValue],
        secondary: [Colors.light_gold, Colors.dark_gold] as [ColorValue, ColorValue],
    };

    return (
        <TouchableOpacity 
            onPress={onPress}
            {...rest}
            style={{ width: '100%' }}
        >
            <LinearGradient 
                colors={gradientColors[variant]} 
                style={[styles.button, buttonStyle, style]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 0, y: 1.2 }}
            >
                {iconName && iconPosition === 'left' && (
                    <Ionicons 
                        name={iconName} 
                        size={iconSize} 
                        color={iconColor} 
                        style={styles.iconLeft} 
                    />
                )}
                <Text style={[styles.text, textColorStyle, textStyle]}>
                    {title}
                </Text>
                {iconName && iconPosition === 'right' && (
                    <Ionicons 
                        name={iconName} 
                        size={iconSize} 
                        color={iconColor} 
                        style={styles.iconRight} 
                    />
                )}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 150,
        width: '100%',
        marginVertical: 5,
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    iconLeft: {
        marginRight: 4,
    },
    iconRight: {
        marginLeft: 4,
    },
    primaryButton: {
        // Purple background handled by gradient
    },
    primaryText: {
        color: 'white',
    },
    secondaryButton: {
        // Gold background handled by gradient
    },
    secondaryText: {
        color: Colors.dark_purple,
    },
});