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
import { RootStackParamList } from '../../src/navigation/navigation';
import { ImageStyle } from 'react-native';
import CustomTextField from '../components/TextField';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import { useUser } from '../../src/context/userContext';

export default function Register() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [FullNameIsFocused, setFullNameIsFocused] = useState<boolean>(false);
  const [contactNo, setContactNo] = useState<string>();
  const [contactNoFieldIsFocused, setContactNoFieldIsFocused] =
    useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] =
    useState<boolean>(false);
  const [passwordFieldIsFocused, setPasswordFieldIsFocused] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);



// const { setFullName } = useUser();


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
              ? require('../assets/eye.png')
              : require('../assets/eye-off.png')
          }
          style={iconStyle}
        />
      </TouchableOpacity>
    );
  };
  const handleRegister = () => {
    
    if (!fullName || !password || !contactNo || !email) {
      Alert.alert('Missing Fields', 'Please fill all the fields.', [
        { text: 'OK' },
      ]);

      return;
    } else if (!fullName && !contactNo && !email && !password) {
      Alert.alert('Missing Fields', 'Please fill all the fields.', [
        { text: 'OK' },
      ]);
      return;
    }
    const { setFullName } = useUser();
    setFullName(fullName);
    navigation.navigate('OTP');
  };

  const handleImagePicker = () => {
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
  // style={styles.}
  return (
    <ImageBackground
      source={require('../assets/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.boldText}>Register Your {'\n'}Account</Text>

            <View style={styles.profilePicContainer}>
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require('../assets/profile.png')
                }
                style={styles.profilePic}
                resizeMode="cover"
              />

              <TouchableOpacity onPress={handleImagePicker}>
                <Image
                  source={require('../assets/uploadOrange.png')}
                  style={styles.uploadOrange}
                  resizeMode="contain"
                />
                <Image
                  source={require('../assets/upload.png')}
                  style={styles.uploadIcon2}
                  resizeMode="contain"
                />
                {/* <Text style={styles.smallText}>Uplaod a Photo</Text> */}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.fullNameContainer}>
              <CustomTextField
                style={styles.input}
                label="Full Name"
                placeholder={'Dave Parker'}
                value={fullName}
                onChangeText={setFullName}
                // onSubmitEditing={handleLogin}
                onFocus={() => setFullNameIsFocused(true)}
                onBlur={() => setFullNameIsFocused(false)}
                isFocused={FullNameIsFocused}
              />
            </View>

            <View style={styles.contactNoContainer}>
              <CustomTextField
                label="Contact no"
                style={styles.input}
                placeholder="+1 234 567890"
                value={contactNo}
                onChangeText={setContactNo}
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
                onChangeText={setEmail}
                onFocus={() => setEmailFieldIsFocused(true)}
                onBlur={() => setEmailFieldIsFocused(false)}
              />
            </View>
            <View style={styles.passwordContainer}>
              <CustomTextField
                label="Password"
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                // onSubmitEditing={handleLogin}
                onFocus={() => setPasswordFieldIsFocused(true)}
                onBlur={() => setPasswordFieldIsFocused(false)}
                isFocused={passwordFieldIsFocused}
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
              <Text style={styles.smallText2}>Already have an account? </Text>
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
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#cdcdcd',
    width: '90%',
    marginTop: 60,
  },
  boldText: {
    fontSize: 32,
    fontWeight: 900,
    marginHorizontal: 14,
    marginTop: 100,
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginTop: 60,
  },
  profilePic: {
    borderRadius: 80,
    boxSizing: 'content-box',
    width: 150,
    height: 150,
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    width: '88%',
    marginTop: 20,
    height: '40%',
    marginBottom: 2,
  },
  fullNameContainer: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 25,
    alignItems: 'center',
    width: '100%',
    height: '20%',
    // backgroundColor: 'orange',
  },
  contactNoContainer: {
    justifyContent: 'center',
    marginBottom: 25,
    alignItems: 'center',
    width: '100%',
    height: '20%',
    // backgroundColor: 'orange'
  },
  emailContainer: {
    justifyContent: 'center',
    marginBottom: 25,
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
    marginBottom: 25,
    // backgroundColor: 'orange',
  },
  smallText: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#42526EB3',
    // alignSelf: 'flex-start',
    // marginLeft: 12,
    marginBottom: 15,
    marginLeft: 17,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 10,
    paddingHorizontal: 25,
    paddingVertical: 0,
    width: '92%',
    color: '#42526E',
    height: 50,
  },
  inputFocused: {
    borderColor: '#0D8056',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  iconContainer: {
    position: 'absolute',
    right: 22,
    top: 48,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    // paddingVertical: 17,
    marginBottom: 30,
    height: 200,
    marginHorizontal: 10,
    //  backgroundColor: 'yellow'
  },
  registerButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: 17,
    marginTop: 35,
    // marginBottom: 50,
    width: '92%',
    alignItems: 'center',
  },
  orangeText: {
    color: '#F27122',
    fontSize: 16,
    fontWeight: 700,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    marginRight: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 40,
    // backgroundColor : 'grey',
    // gap : 20
  },
  smallText2: {
    fontSize: 16,
    fontWeight: 'light',
    color: '#42526EB3',
    marginTop: 2,
    // alignSelf: 'flex-start',
  },
  uploadOrange: {
    width: 45,
    height: 45,
    borderRadius: 40,
    position: 'absolute',
    right: 6,
    top: -39,
  },
  uploadIcon2: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 18,
    top: -26,
  },
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
                     require('../assets/eye.png')
                     :
                     require('../assets/eye-off.png')
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
