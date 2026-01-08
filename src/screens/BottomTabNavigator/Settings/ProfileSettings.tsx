import React, { useEffect } from 'react';
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
import { RootStackParamList } from '../../../Navigation/navigation';
import { ImageStyle } from 'react-native';
import CustomTextField from '../../../Components/TextField';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

import BackButton from '../../../Components/BackButton/BackButton';
import { RootState, AppDispatch } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/userSlice';
import { ActivityIndicator } from 'react-native';
import { authInstance,dbInstance } from '../../Firebase/firebaseConfig';

export default function ProfileSettings() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state : RootState) => state.user);


  useEffect(() => {
    // Check if user exists and has values before setting
    if (user.isLoggedIn) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      setContactNo(user.contactNo || '');
      setAddress(user.address || '');
      setSelectedImage(user.profileImage || null);
    }
  }, [user]); // Re-runs whenever ANY part of the user object in Redux changes

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('Dave Parker');
  const [FullNameIsFocused, setFullNameIsFocused] = useState<boolean>(false);
  const [contactNo, setContactNo] = useState<string>('');
  const [contactNoFieldIsFocused, setContactNoFieldIsFocused] =
    useState<boolean>();
  const [email, setEmail] = useState<string>('');
  const [emailFieldIsFocused, setEmailFieldIsFocused] =
    useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [addressFieldIsFocused, setAddressFieldIsFocused] =
    useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


  const handleChangeContactNo = (text: string) => {
    const cleanedText = text.replace(/[^\d+]/g, '');
    setContactNo(cleanedText);
  };

  const showEmailIcon = (iconStyle: ImageStyle) => {
    return (
      <TouchableOpacity style={styles.iconContainer} activeOpacity={1}>
        <Image
          source={require('../../../assets/images/Others/email-id.png')}
          style={iconStyle}
        />
      </TouchableOpacity>
    );
  };
  

const handleUpdate = async () => {
  if (!fullName.trim()) {
    Alert.alert('Validation Error', 'Please enter your name');
    return;
  }
  if (!email.trim()) {
    Alert.alert('Validation Error', 'Please enter your email');
    return;
  }

  setLoading(true);
  
  try {
    const firebaseUser = authInstance.currentUser;
    if (!firebaseUser || !user.uid) {
      Alert.alert('Error', 'User not logged in');
      setLoading(false);
      return;
    }

    const updatedData = {
      name: fullName,
      email: email,
      contactNo: contactNo,
      address: address,
      profileImage: selectedImage || '',
    };

    // 1. Update Firestore (always works)
    await dbInstance.collection('users').doc(user.uid).set(updatedData, { merge: true });

    // 2. Update Redux immediately (for instant UI update)
    dispatch(updateProfile(updatedData));

    // 3. Try to update Firebase Auth email if it changed
    if (email !== firebaseUser.email) {
      try {
        // Try to update email (may require reauthentication)
        await firebaseUser.updateEmail(email);
      } catch (emailError: any) {
        // If email update fails, that's okay - Firestore has the new email
        // User will use new email on next login
        console.log('Email update requires reauthentication:', emailError.message);
      }
    }
    Alert.alert('Success', 'Profile updated successfully!');
    navigation.goBack();
  } catch (error: any) {
    Alert.alert('Update Error', error.message || 'Failed to update profile');
  } finally {
    setLoading(false);
  }
};
      // // (Update context) i am not using usercontext files method anymore
      // setUserFullName(fullName);
      // setSelectedProfileImage(selectedImage);

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
      source={require('../../../assets/images/Others/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
    >
      <ScrollView>
        <View style={styles.container}>
          <BackButton />
          <View style={styles.topContainer}>
            <Text style={styles.boldText}>Profile Setting</Text>

            <View style={styles.profilePicContainer}>
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage }
                    : require('../../../assets/images/Others/profile.png')
                }
                style={styles.profilePic}
                resizeMode="cover"
              />

              <TouchableOpacity onPress={handleImageUpload}>
                <Image
                  source={require('../../../assets/images/Others/uploadOrange.png')}
                  style={styles.uploadOrange}
                  resizeMode="contain"
                />
                <Image
                  source={require('../../../assets/images/Others/upload.png')}
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
            <View style={styles.nameContainer}>
              <CustomTextField
                style={styles.input}
                label="Name"
                value={fullName}
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
                value={contactNo}
                onChangeText={handleChangeContactNo}
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
                value={email}
                onChangeText={text => setEmail(String(text))}
                onFocus={() => setEmailFieldIsFocused(true)}
                onBlur={() => setEmailFieldIsFocused(false)}
                isFocused={emailFieldIsFocused}
              />
            </View>
            <View style={styles.addressContainer}>
              <CustomTextField
                label="Address"
                style={styles.input}
                value={address}
                onChangeText={text => setAddress(String(text))}
                // onSubmitEditing={handleLogin}
                onFocus={() => setAddressFieldIsFocused(true)}
                onBlur={() => setAddressFieldIsFocused(false)}
                isFocused={addressFieldIsFocused}
              />
              {showEmailIcon(styles.icon)}
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && 
      <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#FF8C00"/>
        <Text style={{ color: '#FFF', marginTop: 10 }}>Saving the Changes...</Text>
      </View>
      }
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
    maxHeight: 500,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#cdcdcd',
    width: '90%',
    marginTop: '30%',
  },
  boldText: {
    fontSize: 32,
    fontWeight: 900,
    marginHorizontal: 14,
    marginTop: 60,
  },
  profilePicContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  profilePic: {
    borderRadius: 80,
    boxSizing: 'content-box',
    width: 140,
    height: 140,
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
  nameContainer: {
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
  addressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    marginBottom: 25,
    // backgroundColor: 'orange',
  },
  smallText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#42526EB3',
    // alignSelf: 'flex-start',
    // marginLeft: 12,
    marginBottom: 15,
    marginLeft: 17,
  },
  input: {
    borderWidth: 2,
    borderColor: '#0D805615',
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
    width: 25,
    height: 25,
    tintColor: '#0D8056',
  },
  iconContainer: {
    position: 'absolute',
    right: 28,
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
  updateButton: {
    flexDirection: 'row',
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: 17,
    // marginTop: 20,
    // marginBottom: 50,
    width: '92%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 57
  },
  orangeText: {
    color: '#F27122',
    fontSize: 16,
    fontWeight: 700,
  },
  updateButtonText: {
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
    fontWeight: '300',
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
    width: 18,
    height: 18,
    position: 'absolute',
    right: 19.5,
    top: -25,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the whole screen
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Sits on top of everything
  },
});
