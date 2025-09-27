// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import BookingsTab from '../DashboardTab/BookingsTab'

// export default function BookingsDashboard() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Bookings</Text>
//       {/* <BookingsTab /> */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'pink',
//     justifyContent: 'flex-start',
//     alignItems: 'center',

//   },
//   title :{
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'black',
//     marginTop: 100,
//     marginLeft: 20,
//     fontFamily: 'Montserrat-Regular',
//   }

// });

import React from 'react';
import { View, Text, Settings, StyleSheet } from 'react-native';
import Home from '../Home';
import Today from '../DashboardTab/Today';
import Upcoming from '../DashboardTab/Upcoming';
import PreviousBookings from '../DashboardTab/PreviousBookings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontType } from '../../Components/Constants/FontType';

const Tab = createMaterialTopTabNavigator();

export default function BookingsDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
      </View>
      <Tab.Navigator
       screenOptions={{
        tabBarScrollEnabled: false, // Set to false for fixed tabs
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0', // Light gray border
          paddingLeft: 14, // Match the title's marginLeft
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF6B35', // Orange color matching the image
          height: 3,
          borderRadius: 2,
          marginBottom: -1, // Align with bottom border
          marginLeft: 24, // Also offset the indicator to align with tabs
        },
        tabBarLabelStyle: {
          fontSize: FontType.medium,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 12, // Reduced padding for tighter spacing between tabs
          alignItems: 'flex-start', // Align items to the start
          // backgroundColor : 'red',
          marginRight : 2
        },
        tabBarActiveTintColor: '#263238', // Dark text for active tab
        tabBarInactiveTintColor: '#757575', // Gray text for inactive tabs
        tabBarPressColor: 'transparent', // Remove press effect
        tabBarContentContainerStyle: {
          justifyContent: 'flex-start', // Align tabs to start instead of space-around
        },
      }}
      >
      
        <Tab.Screen name="Today" component={Today} />
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="PreviousBookings" component={PreviousBookings} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    // backgroundColor: 'pink',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 100,
    marginHorizontal: 20,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginVertical: '10%',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    textTransform: 'none',
    marginLeft: 8,
    color: '#263238',
  },
});

/*
tabBarStyle: {
            borderBottomWidth: 2, // make the line bold
            borderBottomColor: '#00000020',
          },
          tabBarIndicatorContainerStyle: { width: '90%', marginHorizontal: 15},
          tabBarIndicatorStyle: { backgroundColor: '#FF7043', height: 4},
          tabBarLabelStyle: {
            fontSize: FontType.medium,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarItemStyle: { width: 'auto', marginLeft : 20, padding: 0,maxWidth : 400 },
          tabBarActiveTintColor: '#FF7043',
          tabBarInactiveTintColor: '#42526E',
 */

/*
          borderBottomWidth: 2,
          borderBottomColor: '#00000020',
          // backgroundColor: 'pink',
          paddingLeft: 10, // Adds left and right padding
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
          width : '100%',
          alignSelf : 'center'
        },
        tabBarIndicatorContainerStyle: { 
          backgroundColor: 'transparent',
          width : '90%'
          
        },
        tabBarIndicatorStyle: { 
          backgroundColor: '#F27122', 
          height: 4,
          // borderRadius: 2,
          marginHorizontal: 8, // 👈 shrink width by adding side margins
          marginLeft : 22,
          borderTopLeftRadius : 40,
          borderTopRightRadius : 40,
          borderBottomLeftRadius : 0,
          borderBottomRightRadius : 0,
        },
        tabBarLabelStyle: {
          fontSize: FontType.regular,
          fontWeight: '600',
          textTransform: 'none',
          // marginHorizontal: 8, // Equal spacing between labels
        },
        tabBarItemStyle: { 
         width : 'auto',
         
          // marginHorizontal: 0, // Equal spacing between tabs
          // paddingHorizontal: 16, // Internal padding for each tab
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#42526E',
        tabBarPressColor: '#0D805610', // Subtle press effect
      a */
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          borderBottomWidth: 2,
          borderBottomColor: '#00000020',
          backgroundColor: 'pink',
        },

        tabBarIndicatorContainerStyle: { 
          backgroundColor: 'transparent', // let it span full width
        },
        tabBarIndicatorStyle: { 
          backgroundColor: '#FF7043',
          height: 4,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
        tabBarLabelStyle: {
          fontSize: FontType.medium,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarItemStyle: { 
          width: 'auto',          // adaptive to label text
        marginRight : 8,
        marginLeft : 8
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#42526E',
      }}