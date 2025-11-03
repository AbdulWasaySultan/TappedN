import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home';
import BookingsDashboard from './BookingsDashboard';
import Messages from './Messages';
import Notifications from './Notifications';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
import { FontType } from '../../Components/Constants/FontType';
import { useAuth } from '../../Context/AuthContext';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const {loading} = useAuth();

  return (
   
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {

          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../../assets/images/HomeTabs/Home/home.png')   // dark/active
              : require('../../assets/images/HomeTabs/Home/home-light.png'); // light/inactive
          }
          else if (route.name === 'BookingsDashboard') {
            iconSource = focused
              ? require('../../assets/images/HomeTabs/BookingsDashboard/bookings.png')
              : require('../../assets/images/HomeTabs/BookingsDashboard/bookings-light.png'); 
          } else if (route.name === 'Messages') {
            iconSource = focused
            ? require('../../assets/images/HomeTabs/Messages/messages.png')
            : require('../../assets/images/HomeTabs/Messages/messages-light.png');
          } else if (route.name === 'Notifications') {
            iconSource = focused
          ? require('../../assets/images/HomeTabs/Notifications/notifications.png')
            : require('../../assets/images/HomeTabs/Notifications/notifications-light.png');
          } else if (route.name === 'Settings') {
            iconSource = focused
            ? require('../../assets/images/HomeTabs/Settings/settings.png')
            : require('../../assets/images/HomeTabs/Settings/settings-light.png');
          }
          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
                resizeMode: 'contain',
              }}
            />
          )},
        tabBarActiveTintColor: '#0D8056',
        tabBarInactiveTintColor: '#42526E',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          paddingHorizontal: 20, // This adds left and right padding
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        // tabBarLabelStyle: {
        //   fontSize: FontType.medium,
        //   fontWeight: '600',
        //   textTransform: 'none',
        //   marginTop: 4,
        // },
        tabBarShowLabel: false,
        tabBarItemStyle: { 
          paddingHorizontal: 8, // Equal spacing between tabs
          marginHorizontal: 4, // Additional spacing between tabs
        },

      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="BookingsDashboard" component={BookingsDashboard}/>
      <Tab.Screen name="Messages" component={Messages}/>
      <Tab.Screen name="Notifications" component={Notifications}/>
      <Tab.Screen name="Settings" component={Settings}  />

        
    </Tab.Navigator>
  );
}

 // <Tab.Navigator>
    //   <Tab.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <Image
    //           source={require('../../assets/images/home')}
    //           style={{
    //             width: size,
    //             height: size,
    //             tintColor: color,
    //             resizeMode: 'contain',
    //           }}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="BookingsDashboard"
    //     component={BookingsDashboard}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Image
    //           source={require('../../assets/images/home.png')}
    //           style={{ width: 20, height: 20 }}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Messages"
    //     component={Messages}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Image
    //           source={require('../../assets/images/home.png')}
    //           style={{ width: 20, height: 20 }}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Notifications"
    //     component={Notifications}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Image
    //           source={require('../../assets/images/home.png')}
    //           style={{ width: 20, height: 20 }}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Settings"
    //     component={Settings}
    //     options={{
    //       tabBarIcon: ({ color, size }) => (
    //         <Image
    //           source={require('../../assets/images/home.png')}
    //           style={{ width: 20, height: 20 }}
    //         />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>

    // in the above code we are setting each tab constraints
    // (Icon,iconsize,height,width, active inactive color) separately
    // which is a static approach and requires more code but down here
    // we are passing the each tab as a screen to tab.navigator as the
    //  screen option which is a dynamic approach and requires less code
    //Or use the following code:

    //tab.navigator ka header false krdiya to header hide hogya






   
// yahan ham chahein to har screen ka header alag se remove krskte hein
 {/* <Tab.Screen name="Home" component={Home} options={{
        headerShown: false, 
      }}/>
      <Tab.Screen name="BookingsDashboard" component={BookingsDashboard} options={{
        headerShown: false,
      }}/>
      <Tab.Screen name="Messages" component={Messages} options={{
        headerShown: false,
      }}/>
      <Tab.Screen name="Notifications" component={Notifications} options={{
        headerShown: false,
      }}/>
      <Tab.Screen name="Settings" component={Settings} options={{headerShown: false,  
      }}/> */}
