import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from '../screens/HomeStack/HomeTabs/BottomTabNavigator/HomeTabs';
import ServiceStack from './ServiceStack';
import ChangePassword from '../screens/HomeStack/HomeTabs/BottomTabNavigator/Settings/ChangePassword';
import ProfileSettings from '../screens/HomeStack/HomeTabs/BottomTabNavigator/Settings/ProfileSettings';
import PrivacyPolicy from '../screens/HomeStack/HomeTabs/BottomTabNavigator/Settings/PrivacyPolicy';
import Subscription from '../screens/Shared/Subscription';
import MessagingScreen from '../screens/HomeStack/HomeTabs/BottomTabNavigator/MessagingScreen';
import Home from '../screens/HomeStack/HomeTabs/BottomTabNavigator/Home';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTabs"
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ServiceStack" component={ServiceStack} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="MessagingScreen" component={MessagingScreen} />
    </Stack.Navigator>
  );
}
