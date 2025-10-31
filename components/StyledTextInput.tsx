import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  error?: string;
}

const StyledTextInput = ({
  label,
  icon,
  error,
  style,
  ...props
}: StyledTextInputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color="white"
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            error && styles.inputError,
            style,
          ]}
          placeholderTextColor="white"
          {...props}
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 14, // Rounded corners
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'white', // White text
    backgroundColor: Colors.dark_purple, // Dark background
  },
  inputWithIcon: {
    paddingLeft: 45,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  icon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default StyledTextInput;