import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ThemedDropdownProps {
  open: boolean;
  value: string | null;
  items: { label: string; value: string }[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string | null>>;
  setItems: Dispatch<SetStateAction<{ label: string; value: string }[]>>;
  label?: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  error?: string;
  placeholder?: string;
}

const ThemedDropdown = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  label,
  icon,
  error,
  placeholder = 'Select an option',
}: ThemedDropdownProps) => {
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
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={placeholder}
          placeholderStyle={styles.placeholder}
          style={[
            styles.dropdown,
            icon && styles.dropdownWithIcon,
            error && styles.dropdownError,
          ]}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          listMode="SCROLLVIEW"
          ArrowUpIconComponent={() => (
            <MaterialIcons name="arrow-drop-up" size={20} color="white" />
          )}
          ArrowDownIconComponent={() => (
            <MaterialIcons name="arrow-drop-down" size={20} color="white" />
          )}
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
    zIndex: 1000,
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
  dropdown: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.dark_purple,
  },
  dropdownWithIcon: {
    paddingLeft: 45,
  },
  dropdownError: {
    borderColor: '#ff4444',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 14,
    backgroundColor: Colors.dark_purple,
  },
  placeholder: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
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
  arrowIcon: {
    tintColor: 'white',
  },
});

export default ThemedDropdown;