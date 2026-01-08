import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../Navigation/navigation';
import BackButton from '../../../Components/BackButton/BackButton';
import { changePassword } from '../../../Context/AuthContext';
import { authInstance } from '../../Firebase/firebaseConfig';
import { FontType } from '../../../Components/Constants/FontType';

export default function ChangePassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypeNewPassword, setRetypeNewPassword] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const [retypeIsFocused, setRetypeIsFocused] = useState(false);
  //icon state for new password and retype password fields to show and hide the password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [retypeShowPassword, setRetypeShowPassword] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const handleChangePassword = async () => {
    const user = authInstance.currentUser;

    if (!user || !user.email) {
      throw new Error('No user is currently logged in.');
    }

    if (newPassword !== retypeNewPassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (!newPassword || !retypeNewPassword || !currentPassword) {
      Alert.alert('Missing Fields', 'Please fill both the fields.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (
      currentPassword == newPassword ||
      currentPassword == retypeNewPassword
    ) {
      Alert.alert('Passwords cannnot happen to be same');
    }

    if (newPassword.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    setLoading(true);
    try {
      await changePassword(currentPassword, newPassword);
      navigation.goBack();
    } catch (error: any) {
      console.error(`Error changing password: `, error);

      if (error === 'auth/weak-password') {
        Alert.alert(
          'Weak Password',
          'The new password is too weak. Please choose a stronger password.',
        );
      } else {
        Alert.alert(
          'Error',
          error.message || 'An error occurred while changing the password.',
        );
        console.log(error.message)
      }
    }
    finally{
      setLoading(false);
    }
  };

  return (      
  <ImageBackground
        source={require('../../../assets/images/Others/bg-image.png')}
        style={{ width: '100%', flex: 1 }}
      >
        <View style={styles.container}>
          <BackButton />
          <View style={styles.mainContainer}>
            <Text style={styles.boldText}>Change {'\n'}Password</Text>

            <View style={styles.currentPassword}>
              <Text style={styles.smallText}>Current Password</Text>
              <TextInput
                style={[styles.input, isFocused2 && styles.inputFocused]}
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setShowCurrentPassword(prev => !prev);
                }}
              >
                <Image
                  source={
                    showCurrentPassword
                      ? require('../../../assets/images/Others/eye.png')
                      : require('../../../assets/images/Others/eye-off.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.newPasswordContainer}>
              <Text style={styles.smallText}>New Password</Text>
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setShowNewPassword(prev => !prev);
                }}
              >
                <Image
                  source={
                    showNewPassword
                      ? require('../../../assets/images/Others/eye.png')
                      : require('../../../assets/images/Others/eye-off.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.retypeNewPasswordContainer}>
              <Text style={styles.smallText}>Re-Type New Password</Text>
              <TextInput
                style={[styles.input, retypeIsFocused && styles.inputFocused]}
                //   placeholder="Enter your password"
                secureTextEntry={!retypeShowPassword}
                value={retypeNewPassword}
                onChangeText={setRetypeNewPassword}
                onFocus={() => setRetypeIsFocused(true)}
                onBlur={() => setRetypeIsFocused(false)}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  setRetypeShowPassword(prev => !prev);
                }}
              >
                <Image
                  source={
                    retypeShowPassword
                      ? require('../../../assets/images/Others/eye.png')
                      : require('../../../assets/images/Others/eye-off.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => handleChangePassword()}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size={'large'} color="#FF8C00" />
            <Text style={{color: '#FFF', marginTop : 10, fontSize : 16}}>Updating your password</Text>
          </View>
        )}
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
  mainContainer: {
    // backgroundColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 10,
    width: '88%',
    // backgroundColor: '#fff',
    marginTop: '40%',
  },
  boldText: {
    fontSize: 36,
    fontWeight: 900,
    marginHorizontal: 10,
  },
  currentPassword: {
    justifyContent: 'center',
    marginTop: 40,
    // marginBottom: 25,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    // backgroundColor: 'yellow'
  },
  newPasswordContainer: {
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 25,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    // backgroundColor: 'yellow'
  },
  retypeNewPasswordContainer: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    // backgroundColor: 'orange'
  },
  smallText: {
    fontSize: 14,
    fontWeight: '300',
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
  updateButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    marginHorizontal: 12,
    paddingVertical: 17,
    marginTop: 45,
    marginBottom: 50,
    width: '95%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputFocused: {
    borderColor: '#0D8056',
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
    top: 42,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'gray', // optional
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the whole screen
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Sits on top of everything
  },
});
