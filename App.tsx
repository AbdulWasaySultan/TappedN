import '@react-native-firebase/app';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ActivityIndicator, StatusBar } from 'react-native';
import Login from './src/screens/Login';
import ResetPassword from './src/screens/ResetPassword';
import Register from './src/screens/Register';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';
import Filters from './src/screens/Filters';
import Handyman from './src/screens/serviceCategories/Handyman';
import ForgotPassword from './src/screens/ForgotPassword';

import AppointmentConfirmed from './src/screens/BookingDetails/AppointmentConfirmed';

import { UserProvider } from './src/Context/userContext';
import HairTreatment from './src/screens/HairTreatment';
// import WindowService from './src/screens/WindowService';
import ViewAll from './src/screens/serviceCategories/ViewAll';
import Estheticians from './src/screens/serviceCategories/Estheticians';
import MusicStudio from './src/screens/serviceCategories/Music Studio';
import Barbers from './src/screens/serviceCategories/Barber';
import Yoga from './src/screens/serviceCategories/Yoga';
import MyTabs from './src/screens/MyTabs';
import MyReview from './src/screens/CompanyDetails/MyReview';
import ErrorBoundary from './src/Components/RenderError/ErrorBoundary';
import ServiceDetails from './src/screens/CompanyDetails/ServiceDetails';
import BookAppointment from './src/screens/BookingDetails/BookAppointment';
import ChangePassword from './src/screens/BottomTabNavigator/Settings/ChangePassword';
import HomeTabs from './src/screens/BottomTabNavigator/HomeTabs';
import ProfileSettings from './src/screens/BottomTabNavigator/Settings/ProfileSettings';
import PrivacyPolicy from './src/screens/BottomTabNavigator/Settings/PrivacyPolicy';
import Settings from './src/screens/BottomTabNavigator/Settings';
import Subscription from './src/screens/Subscription';
import Loading from './src/screens/Loading';
// import SearchResults from './src/screens/services/searchResults';
import { AuthContextProvider } from './src/Context/AuthContext';
import { OutletContextProvider } from './src/Context/OutletContext'; 

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
    <ErrorBoundary>
      <AuthContextProvider>
        <UserProvider>
          <OutletContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MyTabs"
                component={MyTabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="OTP" component={OTP} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

              <Stack.Screen name="Filters" component={Filters} />
              <Stack.Screen name="Handyman" component={Handyman} />
              <Stack.Screen name="HairTreatment" component={HairTreatment} />
              {/* <Stack.Screen name="WindowService" component={WindowService} /> */}
              <Stack.Screen name="ViewAll" component={ViewAll} />
              <Stack.Screen name="Estheticians" component={Estheticians} />
              <Stack.Screen name="MusicStudio" component={MusicStudio} />
              <Stack.Screen name="Barbers" component={Barbers} />
              <Stack.Screen name="Yoga" component={Yoga} />

              <Stack.Screen name="MyReview" component={MyReview} />
              <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
              <Stack.Screen
                name="BookAppointment"
                component={BookAppointment}
              />
              <Stack.Screen
                name="AppointmentConfirmed"
                component={AppointmentConfirmed}
              />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="Subscription" component={Subscription} />
              <Stack.Screen name="Loading" component={Loading} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            </Stack.Navigator>
          </NavigationContainer>
          </OutletContextProvider>
        </UserProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  );
}

export default App;
