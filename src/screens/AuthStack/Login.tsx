import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  // TextInput,
  // ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import CustomTextField from '../../Components/Form/TextField/index';
import {
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { AppDispatch } from '../../redux/store/store';
import { doc, getDoc, setDoc } from '@react-native-firebase/firestore'; // Add getDoc
import { authInstance, firestoreInstance } from '../../services/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import type { UserProfile } from '../../Context/UserContext';
import { UserState } from '../../redux/slices/userSlice';
import { FontType } from '../../Components/Constants/FontType';

import { useAuth } from '../../Context/AuthContext';
import { AuthStack } from '../../Navigation/navigation';

const {width, height} = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation<NavigationProp<AuthStack>>();
  // const { login, loading,fetchUserProfileFromFirebase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] = useState(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>();
  const {login} = useAuth()


  const ResetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  //  const preload = async () => {
  //   try {
  //     const response = await fetch('https://mocki.io/v1/717e95ff-cf5d-4715-9aa4-3ada93502a22');

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     // Store data in state or context
  //     console.log('Preloaded data:', data);
  //   } catch (error : any) {
  //    if (error instanceof SyntaxError) {
  //     console.error('Failed to parse JSON:', error);
  //   } else {
  //     console.error('Error preloading data:', error.message);
  //   }
  //   }
  // };

  // Handle the login process

const handleLogin = async () => {
  if (loading) return;

  if (!email || !password) {
    Alert.alert('Empty Fields', 'Please enter email and password.');
    return;
  }

  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
    const uid = userCredential.user.uid;

    const userDocRef = doc(firestoreInstance, 'users', uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      // 1. Existing User: Safely cast the data
      const userData = userSnap.data() as UserProfile | UserState;
      
      dispatch(setUser({
        uid: uid,
        name: userData?.name ?? '',
        email: userData?.email ?? email,
        contactNo: userData?.contactNo ?? '',
        address: userData?.address ?? '',
        profileImage: userData?.profileImage ?? '',
      }));
    } else {
      // 2. New User: Create the record
      const basicData = {
        uid: uid,
        name: '',
        email: email,
        contactNo: '',
        address: '',
        profileImage: '',
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      await setDoc(userDocRef, basicData);
      dispatch(setUser(basicData));
    }

    Alert.alert('Success', 'Logged in successfully!');
    // navigation.navigate('Home'); // Navigate after success
  } catch (error: any) {
    console.error('Login error:', error);
    Alert.alert('Login Failed', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <ImageBackground
      source={require('../../assets/images/Others/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.boldText}>Login Your {'\n'}Account</Text>

          <View style={styles.emailContainer}>
            <CustomTextField
              label="Email Address"
              style={styles.input}
              placeholder={'dave.parker@email.com'}
              value={email}
              onChangeText={(text) => setEmail(String(text))}
              onSubmitEditing={handleLogin}
              onFocus={() => setEmailFieldIsFocused(true)}
              onBlur={() => setEmailFieldIsFocused(false)}
              isFocused={emailFieldIsFocused}
              autoCapitalize='none'
              editable={!loading}
            />
          </View>
          
          <View style={styles.passwordContainer}>
            <CustomTextField
              label="Password"
              style={styles.input}
              placeholder={'Enter your password'}
              value={password}
              onChangeText={(text) => setPassword(String(text))}
              onSubmitEditing={handleLogin}
              onFocus={() => setPasswordFieldIsFocused(true)}
              onBlur={() => setPasswordFieldIsFocused(false)}
              isFocused={passwordFieldIsFocused}
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setShowPassword(prev => !prev);
              }}
              disabled={loading}
            >
              <Image
                source={
                  showPassword
                    ? require('../../assets/images/Others/eye.png')
                    : require('../../assets/images/Others/eye-off.png')
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
              disabled={loading}
            >
              <Text style={styles.orangeText}>Reset Now</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
            // onPress={handleLogin}
            onPress={handleLogin}
            disabled={loading}
          >
              <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <View style={styles.rowCenter}>
            <Text style={styles.smallText2}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
              disabled={loading}
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
  },
  loginContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
    width: '88%',
    backgroundColor: '#fff',
    marginTop: hp('15%'),
    flex: 0.8,
    // backgroundColor: '#000',

  },
  boldText: {
    fontSize: wp('9%'),
    fontWeight: '900',
    marginHorizontal: 10,
    color: '#222d32',
  },
  emailContainer: {
    justifyContent: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
    alignItems: 'flex-start',
  },
  passwordContainer: {
    justifyContent: 'center',
    marginBottom: hp('2%'),
    alignItems: 'flex-start',
  },
  smallText: {
    fontSize: wp('3.65%'),
    fontWeight: '400',
    color: '#42526EB2',
    marginLeft: 12,
    marginBottom: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    
    borderRadius: 10,
    fontSize: wp('4%'),
    marginLeft: 12,
    paddingHorizontal: wp('5%'),
    // paddingVertical: hp('2.5%'),
    width: '95%',
    color: '#42526E',
    height: height < 800 ? hp('7.5%') : hp('6%'),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp('3.5%'),
    marginHorizontal: wp('2%'),
  },
  orangeText: {
    color: '#F27122',
    fontSize: wp('3.5%'),
    fontWeight: 800,
  },
  loginButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    marginLeft: 10,
    paddingVertical: hp('2%'),
    marginBottom: hp('5%'),
    width: '95%',
    justifyContent : 'center',
    alignItems: 'center',
    height: height < 800 ? hp('8%') : hp('6%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  smallText2: {
    fontSize: wp('4%'),  // Corrected here
    fontWeight: '400',
    color: '#42526EB2',
  },
  orangeTextTwo: {
    color: '#F27122',
    fontSize: wp('4%'),
    fontWeight: 700,
  },
  iconContainer: {
    position: 'absolute',
    right: wp('4%'),
    top: height < 800 ? wp('7%') : hp('5%'),
    // backgroundColor : '#000'
  },
  icon: {
    width: wp('7.5%'),
    height: wp('7.5%'),
    tintColor: 'gray',
    // top: height < 800 ? hp('0%') : hp('0%'),
    alignSelf : 'center',
    // backgroundColor : 'red'

  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
});
