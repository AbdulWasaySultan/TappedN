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
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import CustomTextField from '../Components/TextField/index';
import {
  useNavigation,
  NavigationProp,
  NavigationContainer,
} from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
// import { useAuth } from '../Context/AuthContext'; 

import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { AppDispatch } from '../redux/store';
import { authInstance, dbInstance } from './Firebase/firebaseConfig';

const {width, height} = Dimensions.get('window');




// export default function Login() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const { login, loading } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailFieldIsFocused, setEmailFieldIsFocused] = useState(false);
//   const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);


//   const ResetPassword = () => {
//     navigation.navigate('ResetPassword');
//   };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Missing Fields', 'Please enter both email and password.', [
//         { text: 'OK' },
//       ]);
//       return;
//     }

//     try {
//       // if (loading) {
//       //   return <ActivityIndicator size="large" color="#0000ff" />;
//       // }
//       loading == true; // Set loading to true when login starts
//       await login(email, password);
//       navigation.navigate('HomeTabs');
//     } catch (error: any) {
//       console.log('Error signing in', error);
//       Alert.alert('Login Failed', error.message);
//       return;
//     }
//     finally{
//       loading = false; // Set loading to false when login ends
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/images/Others/bg-image.png')}
//       style={{ width: '100%', flex: 1 }}
//     >
//       <View style={styles.container}>
//         <View style={styles.loginContainer}>
//           <Text style={styles.boldText}>Login Your {'\n'}Account</Text>

//           <View style={styles.emailContainer}>
//             {/* <Text style={styles.smallText}>Email Address</Text> */}
//             <CustomTextField
//               label="Email Address"
//               style={styles.input}
//               placeholder={'dave.parker@email.com'}
//               value={email}
//               onChangeText={setEmail}
//               onSubmitEditing={handleLogin}
//               onFocus={() => setEmailFieldIsFocused(true)}
//               onBlur={() => setEmailFieldIsFocused(false)}
//               isFocused={emailFieldIsFocused}
//               autoCapitalize='none'
//             />
//           </View>
//           <View style={styles.passwordContainer}>
//             {/* <Text style={styles.smallText}></Text> */}
//             <CustomTextField
//               label="Password"
//               style={styles.input}
//               placeholder={'Enter your password'}
//               value={password}
//               onChangeText={setPassword}
//               onSubmitEditing={handleLogin}
//               onFocus={() => setPasswordFieldIsFocused(true)} //onFocus is the textinput prop to handle anything when the textinput gets selected
//               onBlur={() => setPasswordFieldIsFocused(false)}
//               isFocused={passwordFieldIsFocused}
//               secureTextEntry={!showPassword}
//               autoCapitalize='none'
//             />
//             <TouchableOpacity
//               style={styles.iconContainer}
//               onPress={() => {
//                 setShowPassword(prev => !prev);
//               }}
//             >
//               <Image
//                 source={
//                   showPassword
//                     ? require('../assets/images/Others/eye.png')
//                     : require('../assets/images/Others/eye-off.png')
//                 }
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.row}>
//             <Text style={styles.smallText}>Forgot Password? </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 ResetPassword();
//               }}
//             >
//               <Text style={styles.orangeText}>Reset Now</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>
//           <View style={styles.rowCenter}>
//             <Text style={styles.smallText}>Don't have an account? </Text>

//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('Register');
//               }}
//             >
//               <Text style={styles.orangeTextTwo}>Signup Now</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const { login, loading,fetchUserProfileFromFirebase } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] = useState(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>();

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

  const handleLoginWithoutInternet = () => {
          navigation.navigate('HomeTabs');
  }

  const handleLogin = async () => {
    if (loading) return;

    if (!email || !password) {
      Alert.alert('Empty Fields', 'Please enter email and password.', [{ text: 'OK' }]);
      return;
    }

    // try {
    //   await login(email, password);

    //   dispatch(
    //     loginUser({
    //       email: email,
    //       password: password,
    //     })
    //   );
    setLoading(true);
    try {
      // 1. Login with Firebase Auth
      const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // 2. Get user data from Firestore
      const userDoc = await dbInstance.collection('users').doc(uid).get();
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // 3. Update Redux with user data from Firestore
        dispatch(setUser({
          uid: uid,
          name: userData?.name || '',
          email: userData?.email || email, // Use Firestore email (updated email)
          contactNo: userData?.contactNo || '',
          address: userData?.address || '',
          profileImage: userData?.profileImage || '',
        }));
      } else {
        // If no Firestore doc exists, create one
        const basicData = {
          name: '',
          email: email,
          contactNo: '',
          address: '',
          profileImage: '',
        };
        await dbInstance.collection('users').doc(uid).set(basicData);
        dispatch(setUser({
          uid: uid,
          ...basicData,
        }));
      }

      navigation.navigate('HomeTabs');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };
  return (
    <ImageBackground
      source={require('../assets/images/Others/bg-image.png')}
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
                    ? require('../assets/images/Others/eye.png')
                    : require('../assets/images/Others/eye-off.png')
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
    paddingVertical: hp('1%'),
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
