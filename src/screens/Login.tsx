import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import CustomTextField from '../Components/TextField/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] = useState(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const ResetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter both email and password.', [
        { text: 'OK' },
      ]);
      return;
    }
    
    // For now, pass a default name. In a real app, you'd get this from your backend
    navigation.navigate('HomeTabs');
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.boldText}>Login Your {'\n'}Account</Text>

          <View style={styles.emailContainer}>
            {/* <Text style={styles.smallText}>Email Address</Text> */}
            <CustomTextField
              label="Email Address"
              style={styles.input}
              placeholder={'dave.parker@email.com'}
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={handleLogin}
              onFocus={() => setEmailFieldIsFocused(true)}
              onBlur={() => setEmailFieldIsFocused(false)}
              isFocused={emailFieldIsFocused}
            />
          </View>
          <View style={styles.passwordContainer}>
            {/* <Text style={styles.smallText}></Text> */}
            <CustomTextField
              label="Password"
              style={styles.input}
              placeholder={'Enter your password'}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
              onFocus={() => setPasswordFieldIsFocused(true)} //onFocus is the textinput prop to handle anything when the textinput gets selected
              onBlur={() => setPasswordFieldIsFocused(false)}
              isFocused={passwordFieldIsFocused}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setShowPassword(prev => !prev);
              }}
            >
              <Image
                source={
                  showPassword
                    ? require('../assets/images/eye.png')
                    : require('../assets/images/eye-off.png')
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.smallText}>Forgot Password? </Text>
            <TouchableOpacity
              onPress={() => {
                ResetPassword();
              }}
            >
              <Text style={styles.orangeText}>Reset Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.rowCenter}>
            <Text style={styles.smallText}>Don't have an account? </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.orangeTextTwo}>Signup Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor : 'blue'
  },
  loginContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 10,
    width: '88%',
    backgroundColor: '#fff',
    marginTop: 140,
    flex: 0.8,
    // backgroundColor: 'blue'
  },
  boldText: {
    fontSize: 32,
    fontWeight: 900,
    marginHorizontal: 10,
  },
  emailContainer: {
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 25,
    alignItems: 'flex-start',
    // backgroundColor: 'yellow',
  },
  passwordContainer: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'flex-start',
    // backgroundColor: 'orange',
  },
  smallText: {
    fontSize: 16,
    fontWeight: 'light',
    color: '#42526EB2',
    // alignSelf: 'flex-start',
    marginLeft: 12,
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

  row: {
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    marginRight: 1,
    justifyContent: 'flex-end',
  },
  rowCenter: {
    flexDirection: 'row',
    marginRight: 1,
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    marginLeft: 10,
    paddingVertical: 17,
    marginTop: 40,
    marginBottom: 50,
    width: '95%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  orangeText: {
    color: '#F27122',
    fontSize: 14,
    fontWeight: 800,
  },
  orangeTextTwo: {
    color: '#F27122',
    fontSize: 16,
    fontWeight: 700,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 44,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'gray', // optional
  },
});
