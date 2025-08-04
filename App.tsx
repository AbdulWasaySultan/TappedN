import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import ResetPassword from './src/screens/ResetPassword';
import Register from './src/screens/Register';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';

import { RootStackParamList } from './src/navigation/navigation';     
import { UserProvider } from './src/context/userContext';
const Stack = createNativeStackNavigator();

function App() {
  // const [isSplashVisible, setIsSplashVisible] = useState(true);

  // useEffect(() => {
  //  const timer = setTimeout(() => {
  //     setIsSplashVisible(false);
  //   }, 3000); 
  //   return () => clearTimeout(timer);
  // }, []);
  // if (isSplashVisible) {
  //   return <Splash />;
  // }

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        {/* <Stack.Screen name='Login' component={Login}/> */}
        <Stack.Screen name='Register' component={Register}/>
<Stack.Screen name='OTP' component={OTP}/>
<Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

export default App;
