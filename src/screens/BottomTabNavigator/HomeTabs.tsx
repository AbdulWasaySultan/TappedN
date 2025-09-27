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

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('../../assets/images/HomeTabs/home.png');
          } else if (route.name === 'BookingsDashboard') {
            iconSource = require('../../assets/images/HomeTabs/bookings.png');
          } else if (route.name === 'Messages') {
            iconSource = require('../../assets/images/HomeTabs/messages.png');
          } else if (route.name === 'Notifications') {
            iconSource = require('../../assets/images/HomeTabs/notifications.png');
          } else if (route.name === 'Settings') {
            iconSource = require('../../assets/images/HomeTabs/settings.png');
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
          borderBottomWidth: 2,
          borderBottomColor: '#00000020',
          paddingBottom: 8,
          paddingTop: 8,
        //   height: 70,
          paddingHorizontal: 12, // This adds left and right padding
          // marginLeft : 20,
        },
   
        tabBarIndicatorContainerStyle: { 
          width: '100%', 
          backgroundColor : 'blue',
          marginHorizontal: 0,
          // marginLeft : 20
        },
        tabBarIndicatorStyle: { 
          // backgroundColor: '#FF7043', 
          height: 4,
          backgroundColor : 'green',
          // marginLeft : 20
        },
        tabBarLabelStyle: {
          fontSize: FontType.medium,
          fontWeight: '600',
          textTransform: 'none',
          // marginLeft : 20,
        //   backgroundColor : 'yellow',
          width : 0
        },
        tabBarItemStyle: { 
          width: 'auto', 
          marginHorizontal: 4, // Additional spacing between tabs
          paddingHorizontal: 8, // Equal spacing between tabs
          maxWidth : 400,
          // backgroundColor : 'red',
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
