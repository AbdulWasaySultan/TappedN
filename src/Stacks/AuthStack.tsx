import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/AuthStack/Login';
import Register from '../screens/AuthStack/Register';
import ForgotPassword from '../screens/AuthStack/ForgotPassword';
import ResetPassword from '../screens/AuthStack/ResetPassword';
import OTP from '../screens/AuthStack/OTP';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
}
