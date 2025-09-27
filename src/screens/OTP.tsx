import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import CustomTextField from '../Components/TextField/index';
import BackButton from '../Components/BackButton/BackButton';

export default function OTP() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [OTP, setOTP] = useState<string>('');
  return (
    <ImageBackground
      source={require('../assets/images/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
      >
    <View style={styles.container}>
      <BackButton />
      <View style={styles.mainContainer}>
        <View style={styles.otpText}>
          <Text style={styles.boldText}>OTP {`\n`}Confirmation</Text>
        </View>
        <View style={styles.OTPContainer}>
          {/* <Text style={styles.smallText}>Enter OTP Code</Text> */}
          <CustomTextField
            label="Enter OTP Code"
            style={styles.input}
            placeholder="-   -   -   -   -"
            value={OTP}
            onChangeText={setOTP}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.authenticateButton}
            onPress={() => {
              if(!OTP){
                Alert.alert('Missing Fields', 'Please enter the OTP code send to your number.', [
                  { text: 'OK' },
                ]);
                return;
              }
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.authenticateButtonText}>Authenticate</Text>
          </TouchableOpacity>

          <View style={styles.rowCenter}>
            <Text style={styles.smallText2}>Didn't Receive an OTP?</Text>
            <TouchableOpacity

            //   onPress={() => {navigation.navigate('Login')}}
            >
              <Text style={styles.orangeText}>Resend Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  otpText: {
    alignSelf: 'flex-start',
    width: '100%',
    // backgroundColor : 'red'
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    width: '88%',
    // backgroundColor: 'blue',
    marginTop: 20,
    flex: 0.8,
    marginBottom: 20,
  },
  boldText: {
    fontSize: 34,
    fontWeight: 900,
    marginHorizontal: 10,
    marginTop: 70,
  },
  OTPContainer: {
    justifyContent: 'center',
    marginBottom: 27,
    alignItems: 'flex-start',
    width: '100%',
    height: '20%',
    marginTop: 20,
    // backgroundColor : '#000'
  },
  smallText: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#42526EB3',
    // alignSelf: 'flex-start',
    marginLeft: 12,
    marginBottom: 15,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 16,
    marginHorizontal: 10,
    paddingHorizontal: 25,
    paddingVertical: 0,
    width: '95%',
    color: '#42526E',
    height: 50,
  },
  bottomContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    // paddingVertical: 17,
    marginBottom: 30,
    height: 200,
    //   backgroundColor: '#cdcdcd',
  },
  authenticateButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: 17,
    // marginTop: 40,
    // marginBottom: 50,
    width: '95%',
    alignItems: 'center',
    // marginTop : 10
  },
  authenticateButtonText: {
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
  },
  orangeText: {
    color: '#F27122',
    fontSize: 16,
    fontWeight: 700,
  },
});
