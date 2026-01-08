import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import CustomTextField from '../Components/TextField/index';
import BackButton from '../Components/BackButton/BackButton';

 function ForgotPassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

     const [email, setEmail] = useState<string>('');
  return (
    <ImageBackground
      source={require('../assets/images/Others/bg-image.png')}
      style={{ width: '100%', flex: 1 }}
      >
    <View style={styles.container}>
      <BackButton />
      <View style={styles.mainContainer}>
        <View style={styles.ForgotPasswordText}>
          <Text style={styles.boldText}>Forgot{`\n`}Password</Text>
        </View>
        <View style={styles.emailContainer}>
          {/* <Text style={styles.smallText}>Enter OTP Code</Text> */}
          <CustomTextField
            label="Enter Email Address"
            style={styles.input}
            placeholder="daveparker@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.sendInstructionsButton}
            onPress={() => {
              if(!email){
                Alert.alert('Missing Field', 'Please enter your email address.', [
                  { text: 'OK' },
                ]);
                return;
              }
              navigation.navigate('OTP', {email});
            }}
          >
            <Text style={styles.sendInstructionsText}>Send Instructions</Text>
          </TouchableOpacity>

          <View style={styles.rowCenter}>
            <Text style={styles.smallText2}>Didn't Receive OTP? </Text>
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

export default ForgotPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  ForgotPasswordText: {
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
  emailContainer: {
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
    fontWeight: '300',
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
  sendInstructionsButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: 17,
    // marginTop: 40,
    // marginBottom: 50,
    width: '95%',
    alignItems: 'center',
    // marginTop : 10
  },
  sendInstructionsText: {
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
    marginTop: 0.7,
  },
  orangeText: {
    color: '#F27122',
    fontSize: 16,
    fontWeight: '700',
  },
});
