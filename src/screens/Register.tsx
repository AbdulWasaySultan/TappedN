import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import { ImageStyle } from 'react-native';
import CustomTextField from '../Components/TextField';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { useUser } from '../Context/userContext';
import BackButton from '../Components/BackButton/BackButton';
import { useAuth } from '../Context/AuthContext';
import { authInstance } from './Firebase/firebaseConfig';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window'); 
const isSmallScreen = height < 800;
const isLargeScreen = height > 850;

export default function Register() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [FullNameIsFocused, setFullNameIsFocused] = useState<boolean>(false);
  const [contactNo, setContactNo] = useState<number | undefined>();
  const [contactNoFieldIsFocused, setContactNoFieldIsFocused] =
    useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] =
    useState<boolean>(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUserFullName, setSelectedProfileImage } = useUser();

  const { loading } = useAuth();

  const showPasswordIcon = (iconStyle: ImageStyle) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowPassword(prev => !prev);
        }}
        style={styles.iconContainer}
      >
        <Image
          source={
            showPassword
              ? require('../assets/images/Others/eye.png')
              : require('../assets/images/Others/eye-off.png')
          }
          style={iconStyle}
        />
      </TouchableOpacity>
    );
  };

  // const preload = async () => {
  //   try {
  //     const response = await fetch('https://mocki.io/v1/717e95ff-cf5d-4715-9aa4-3ada93502a22');
  //     const data = await response.json();
  //     // Store data in state or context
  //     console.log('Preloaded data:', data);
  //   } catch (error) {
  //     console.error('Error preloading data:', error);
  //   }
  // };

  const handleRegister = async () => {
    if (!fullName || !password || !contactNo || !email) {
      Alert.alert('Missing Fields', 'Please fill all the fields.', [
        { text: 'OK' },
      ]);

      return;
    }

    if (isNaN(contactNo)) {
      return Alert.alert(
        'Invalid Contact Number',
        'Please enter a valid contact number.',
        [{ text: 'OK' }],
      );
    }
    setUserFullName(fullName);
    setSelectedProfileImage(selectedImage);

    try {
      const userCredential = await authInstance.createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User created:', userCredential.user);

      // await preload();
      navigation.navigate('HomeTabs');
    } catch (error: any) {
      // console.error('Error creating user:', error);
      Alert.alert('Error Registering User', error.message);
    }
  };

  const handleImageUpload = () => {
    Alert.alert(
      'Upload Photo',
      'Select an option to upload your profile picture',
      [
        {
          text: 'Select From Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Take a Photo',
          onPress: () => openCamera(),
        },
        { text: 'Cancel' },
      ],
      { cancelable: true },
    );
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri || null);
      }
    });
  };
  const openCamera = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri || null);
      }
    });
  };
  return (
    <ImageBackground
      source={require('../assets/images/Others/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <BackButton />
          <View style={styles.topContainer}>
            <Text style={styles.boldText}>Register Your {'\n'}Account</Text>

            <View style={styles.profilePicContainer}>
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require('../assets/images/Others/profile.png')
                }
                style={styles.profilePic}
                resizeMode="cover"
              />

              <TouchableOpacity onPress={handleImageUpload}>
                <Image
                  source={require('../assets/images/Others/uploadOrange.png')}
                  style={styles.uploadOrange}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/Others/upload.png')}
                  style={styles.uploadIcon2}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={handleImageUpload}></TouchableOpacity> */}

              {/* <TouchableOpacity onPress={openGallery}>
                <Image
                  source={require('../assets/images/Others/uploadOrange.png')}
                  style={styles.uploadOrange}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/images/Others/upload.png')}
                  style={styles.uploadIcon2}
                  resizeMode="contain"
                />
                <Text style={styles.smallText}>Uplaod a Photo</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.fullNameContainer}>
              <CustomTextField
                style={styles.input}
                label="Full Name"
                placeholder={'Dave Parker'}
                value={fullName?.toString()}
                onChangeText={text => setFullName(String(text))}
                // onSubmitEditing={handleLogin}
                onFocus={() => setFullNameIsFocused(true)}
                onBlur={() => setFullNameIsFocused(false)}
                isFocused={FullNameIsFocused}
              />
            </View>

            <View style={styles.contactNoContainer}>
            <CustomTextField
  label="Contact Number"
  style={styles.input}
  placeholder="+1 234 567890"
  value={contactNo || ''}
  onChangeText={(text) => {
    // Allow + and digits only
    const cleanedText = text.replace(/[^\d+]/g, '');

    // Update the state directly with the cleaned text
    setContactNo(cleanedText);
  }}
  keyboardType="phone-pad"
  isFocused={contactNoFieldIsFocused}
  onFocus={() => setContactNoFieldIsFocused(true)}
  onBlur={() => setContactNoFieldIsFocused(false)}
/>

            </View>
            <View style={styles.emailContainer}>
              <CustomTextField
                label="Email Address"
                style={styles.input}
                placeholder={'dave.parker@email.com'}
                value={email}
                onChangeText={text => setEmail(String(text))}
                onFocus={() => setEmailFieldIsFocused(true)}
                onBlur={() => setEmailFieldIsFocused(false)}
                isFocused={emailFieldIsFocused}
                autoCapitalize="none" // This prevents automatic capitalization
              />
            </View>
            <View style={styles.passwordContainer}>
              <CustomTextField
                label="Password"
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password?.toString()}
                onChangeText={text => setPassword(String(text))}
                // onSubmitEditing={handleLogin}
                onFocus={() => setPasswordFieldIsFocused(true)}
                onBlur={() => setPasswordFieldIsFocused(false)}
                isFocused={passwordFieldIsFocused}
                autoCapitalize="none"
              />
              {showPasswordIcon(styles.icon)}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => handleRegister()}
            >
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
            <View style={styles.rowCenter}>
              <Text style={styles.smallText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                <Text style={styles.orangeText}>Signin Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  topContainer: {
    maxHeight: hp('50%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#cdcdcd',
    width: '90%',
    marginTop: isSmallScreen ? hp('25%') : isLargeScreen ? hp('20%') : hp('20%')
  },
  boldText: {
    fontSize: wp('9%'),
    fontWeight: 900,
    marginHorizontal: 14,
    color: '#222d32',
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginTop: isSmallScreen ? hp('7.5%') : isLargeScreen ? hp('6%') : hp('6%'),  
  },
  profilePic: {
    borderRadius: 80,
    boxSizing: 'content-box',
    width: isSmallScreen ? wp('32.5%') : isLargeScreen ? wp('35.5%') : wp('30.5%'),
    height: isSmallScreen ? hp('18%') : isLargeScreen ? hp('16%') : hp('15%'),
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    width: '88%',
    marginTop: hp('3%'),
    height: '40%',
  },
  fullNameContainer: {
    justifyContent: 'center',
    marginTop: hp('3%'),
    marginBottom: isSmallScreen? hp('3.5%') : hp('2.5%'),
    alignItems: 'center',
    width: '100%',
    height: '20%',
    // backgroundColor: 'orange',
  },
  // isSmallScreen? hp('4%') : 
  contactNoContainer: {
    justifyContent: 'center',
    marginBottom: isSmallScreen? hp('3.5%') : hp('2.5%'),
    alignItems: 'center',
    width: '100%',
    height: '20%',
    // backgroundColor: 'orange'
  },
  emailContainer: {
    justifyContent: 'center',
    marginBottom: isSmallScreen? hp('3.5%') : hp('2.5%'),
    alignItems: 'center',
    width: '100%',
    height: '20%',
    // backgroundColor: 'yellow'
  },
  passwordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    marginBottom: isSmallScreen? hp('3.5%') : hp('2.5%'),
    // backgroundColor: 'orange',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: wp('4.1%'),
    marginHorizontal: 10,
    paddingHorizontal: wp('5%'),
    paddingVertical: 0,
    width: '92%',
    color: '#42526E',
    height: isSmallScreen? hp('7.5%') : hp('5.75%'),
  },
  inputFocused: {
    borderColor: '#0D8056',
  },
  iconContainer: {
    position: 'absolute',
    right: 22,
    top: isSmallScreen? hp('7%') : hp('5.5%'),
  },
  icon: {
    width: wp('7.5%'),
    height: wp('7.5%'),
    tintColor: 'gray',
    marginRight : wp('1%'),
    marginTop : isSmallScreen? hp('0.1%') : hp('0.2%'),
  },

  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    // paddingVertical: 17,
    marginTop: isSmallScreen? wp('3%') : wp('3.5%'),
    marginBottom : hp('7%'),
    height: isSmallScreen? hp('25%') : hp('20%'),
    marginHorizontal: 10,
    // backgroundColor : 'yellow',
  },
  registerButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: isSmallScreen? hp('2.7%') : hp('2.2%'),
    width: '92%',
    alignItems: 'center',
    marginTop : '5%'
  },

  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: hp('5%'),
  },
  smallText: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#42526E90',
    // alignSelf: 'flex-start',
  },
  orangeText: {
    color: '#F27122',
    fontSize: wp('4%'),
    fontWeight: 700,
  },
  uploadOrange: {
    width: isSmallScreen? wp('10.5%') : wp('11.25%'),
    height: isSmallScreen? wp('10.5%') : wp('11.25%'),
    borderRadius: 40,
    position: 'absolute',
    right: isSmallScreen? wp('1.5%') :  wp('1.5%'),
    top: isSmallScreen? hp('-4.7%') : hp('-4.5%'),  
    alignItems : 'center'
  },
  uploadIcon2: {
    width: isSmallScreen? wp('4.2%') : wp('4.4%'),
    height: isSmallScreen? wp('4%') : wp('4.2%'),
    position: 'absolute',
    right: isSmallScreen? wp('4.5%') : wp('4.875%'),
    top: isSmallScreen? hp('-2.7%') : hp('-2.8%'),  
  },
  // image: {
  //   width: '100%',
  //   height: 300,
  //   marginVertical: 20,
  //   borderRadius: 8,
  // },
  // button: {
  //   backgroundColor: '#007bff',
  //   padding: 15,
  //   borderRadius: 8,
  //   marginTop: 20,
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  // },
});

/* <TouchableOpacity
                 style={styles.iconContainer}
                   onPress={() => {
                     setShowContactNo(prev => !prev);
                   }}
                 >
                   <Image
                   source={
                     showPassword ? 
                     require('../assets/images/Others/eye.png')
                     :
                     require('../assets/images/Others/eye-off.png')
                   }
                    style={styles.icon}
                   />
                 </TouchableOpacity> */

/*
type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
 inputStyle?: TextStyle;
};
  const CustomTextField = ({
    label, 
    placeholder,
    value,
   onChangeText, 
   onFocus, 
   onBlur,
 inputStyle,
}: Props)
 => 
   {
    return(
            <TextInput
              style={inputStyle}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              onFocus={onFocus}
              onBlur={onBlur}
            />
    ) <CustomTextField
              style={[styles.input, contactNoFieldIsFocused && styles.inputFocused]}
              placeholder={'+1 234 567890'}
              value={contactNo}
              onChangeText={setContactNo}
              onFocus={setContactNoFieldIsFocused}
              onBlur={setContactNoFieldIsFocused}
        />
  }*/
