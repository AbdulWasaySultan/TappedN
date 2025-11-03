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
import { useAuth } from '../../../Context/AuthContext';
import { authInstance } from '../../Firebase/firebaseConfig';
import { changePassword } from '../../../redux/counterSlice';

export default function ChangePassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypeNewPassword] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const [retypeIsFocused, setRetypeIsFocused] = useState(false);
  //icon state for new password and retype password fields to show and hide the password
  const [showPassword, setShowPassword] = useState(false);
  const [retypeShowPassword, setRetypeShowPassword] = useState(false);
  const { loading } = useAuth();
  const { changePassword } = useAuth();

  const handleChangePassword = () => {
    const user = authInstance.currentUser;

    if (!user || !user.email) {
      throw new Error('No user is currently logged in.');
    }

    if (newPassword !== retypePassword) {
      Alert.alert('Password Mismatch', 'The passwords do not match.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (!newPassword || !retypePassword || !currentPassword) {
      Alert.alert('Missing Fields', 'Please fill both the fields.', [
        { text: 'OK' },
      ]);
      return;
    }

    if (currentPassword == newPassword || currentPassword == retypePassword) {
      Alert.alert('Passwords cannnot happen to be same');
    }

    try {
      changePassword(currentPassword, newPassword);
      navigation.goBack();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {loading? <ActivityIndicator size="large" color="#0000ff" /> : ( */}
      <ImageBackground
        source={require('../../../assets/images/Others/bg-image.png')}
        style={{ width: '100%', flex: 1 }}
      >
        <View style={styles.container}>
          <BackButton />
          <View style={styles.mainContainer}>
            <Text style={styles.boldText}>Change {'\n'}Password</Text>

            <View style={styles.currentPassword}>
              <Text style={styles.smallText}>Password</Text>
              <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                secureTextEntry={!showPassword}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
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
                      ? require('../../../assets/images/Others/eye.png')
                      : require('../../../assets/images/Others/eye-off.png')
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.retypeNewPasswordContainer}>
              <Text style={styles.smallText}>Re-Type Password</Text>
              <TextInput
                style={[styles.input, retypeIsFocused && styles.inputFocused]}
                //   placeholder="Enter your password"
                secureTextEntry={!retypeShowPassword}
                value={retypePassword}
                onChangeText={setRetypeNewPassword}
                onFocus={() => setRetypeIsFocused(true)}
                onBlur={() => setRetypeIsFocused(false)}
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
      </ImageBackground>
      {/* )} */}
    </>
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
    backgroundColor: 'red',
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
    marginBottom: 25,
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
});
