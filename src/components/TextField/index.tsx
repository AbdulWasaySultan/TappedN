import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

interface Props extends TextInputProps {
  // style={[styles.input, emailFieldIsFocused && styles.inputFocused]}
  //   placeholder{}
  label: string;
  style?: object;
  value?: any; // any type for string or number
  onChangeText?: (text: string | number | undefined | any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  placeholder?: string;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  
}

const CustomTextField: React.FC<Props> = ({
  isFocused,
  style,
  label,
  value,
  onChangeText,
  ...rest
}) => {
  // const handleTextChange = (text: string) => {
  //   if (onChangeText) {
  //     // If it's a phone number or number field, handle it accordingly
  //     if (typeof value === 'number') {
  //       onChangeText(Number(text)); // Convert text to number if needed
  //     } else {
  //       onChangeText(text); // Otherwise treat it as a string
  //     }
  //   }
  // };

  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text); // Pass the text as string directly
    }
  };
  

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[style, isFocused && styles.inputFocused]}
        value={value?.toString()}  // Ensure the value is always a string
        onChangeText={handleTextChange}  // Handle text change appropriately
        {...rest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7B869A',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 16,
    marginLeft: 12,
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: '95%',
    color: '#42526E',
    height: 50,
  },
  inputFocused: {
    borderColor: '#0D8056',
  },
});

export default CustomTextField;
