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
  value?: string;
  onChangeText?: (text: string) => void;
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
  ...rest
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[style, isFocused && styles.inputFocused]}

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
    marginLeft: 18,
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
