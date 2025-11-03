import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontType } from '../../Components/Constants/FontType';
import Today from '../BookingsDashboard/Today';
import Upcoming from '../BookingsDashboard/Upcoming';
import PreviousBookings from '../BookingsDashboard/PreviousBookings';
import { Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const {width, height} = Dimensions.get('window');
const isSmallScreen = height < 800;

const Tab = createMaterialTopTabNavigator();

export default function BookingsDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookings</Text>
      </View>
      <Tab.Navigator
        initialRouteName="Today"
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0',
            paddingLeft: isSmallScreen? 5 : 14,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FF6B35',
            height: 3,
            borderRadius: 2,
            marginBottom: -1,
            marginLeft: isSmallScreen? 10 : 24,
          },
          tabBarLabelStyle: {
            fontSize: isSmallScreen? 17 : FontType.medium,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 12,
            alignItems: 'flex-start',
            marginRight: 2,
          },
          tabBarActiveTintColor: '#263238',
          tabBarInactiveTintColor: '#757575',
          tabBarPressColor: 'transparent',
          tabBarContentContainerStyle: {
            justifyContent: 'flex-start',
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
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('10%'),
    marginHorizontal: 20,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginVertical: isSmallScreen? '6%' : '8%',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    textTransform: 'none',
    marginLeft: 8,
    color: '#263238',
  },
});

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { FontType } from '../../Components/Constants/FontType';
// import Today from '../BookingsDashboard/Today';
// import Upcoming from '../BookingsDashboard/Upcoming';
// import PreviousBookings from '../BookingsDashboard/PreviousBookings';

// export default function BookingsDashboard() {
//   const [activeTab, setActiveTab] = useState<'Today' | 'Upcoming' | 'PreviousBookings'>('Today');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'Today':
//         return <Today />;
//       case 'Upcoming':
//         return <Upcoming />;
//       case 'PreviousBookings':
//         return <PreviousBookings />;
//       default:
//         return <Today />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Bookings</Text>
//       </View>
      
//       <View style={styles.tabBar}>
//         <TouchableOpacity
//           style={styles.tabItem}
//           onPress={() => setActiveTab('Today')}
//         >
//           <Text style={[
//             styles.tabLabel,
//             activeTab === 'Today' && styles.activeTabLabel
//           ]}>
//             Today
//           </Text>
//           {activeTab === 'Today' && <View style={styles.indicator} />}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tabItem}
//           onPress={() => setActiveTab('Upcoming')}
//         >
//           <Text style={[
//             styles.tabLabel,
//             activeTab === 'Upcoming' && styles.activeTabLabel
//           ]}>
//             Upcoming
//           </Text>
//           {activeTab === 'Upcoming' && <View style={styles.indicator} />}
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tabItem}
//           onPress={() => setActiveTab('PreviousBookings')}
//         >
//           <Text style={[
//             styles.tabLabel,
//             activeTab === 'PreviousBookings' && styles.activeTabLabel
//           ]}>
//             Previous Bookings
//           </Text>
//           {activeTab === 'PreviousBookings' && <View style={styles.indicator} />}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.contentContainer}>
//         {renderContent()}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: 100,
//     marginHorizontal: 20,
//     height: 'auto',
//     width: '90%',
//     alignSelf: 'center',
//     marginVertical: '10%',
//   },
//   title: {
//     fontSize: FontType.titleBold2,
//     fontWeight: '900',
//     textTransform: 'none',
//     marginLeft: 8,
//     color: '#263238',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     // backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingLeft: 24,
//   },
//   tabItem: {
//     paddingHorizontal: 12,
//     paddingVertical: 16,
//     marginRight: 2,
//     position: 'relative',
//   },
//   tabLabel: {
//     fontSize: FontType.medium,
//     fontWeight: '600',
//     color: '#757575',
//   },
//   activeTabLabel: {
//     color: '#263238',
//   },
//   indicator: {
//     position: 'absolute',
//     bottom: -1,
//     left: 0,
//     right: 0,
//     height: 3,
//     backgroundColor: '#FF6B35',
//     borderRadius: 2,
//   },
//   contentContainer: {
//     flex: 1,
//   },
// });



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
      // a 
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
      }}*/



       
        





      //   tabBarStyle: {
      //     backgroundColor: 'white',
      //     elevation: 0, // Remove shadow on Android
      //     shadowOpacity: 0, // Remove shadow on iOS
      //     borderBottomWidth: 1,
      //     borderBottomColor: '#E0E0E0', // Light gray border
      //     paddingLeft: 14, // Match the title's marginLeft
      //   },
      //   tabBarIndicatorStyle: {
      //     backgroundColor: '#FF6B35', // Orange color matching the image
      //     height: 3,
      //     borderRadius: 2,
      //     marginBottom: -1, // Align with bottom border
      //     marginLeft: 24, // Also offset the indicator to align with tabs
      //   },
      //   tabBarLabelStyle: {
      //     fontSize: FontType.medium,
      //     fontWeight: '600',
      //     textTransform: 'none',
      //   },
      //   tabBarItemStyle: {
      //     width: 'auto',
      //     paddingHorizontal: 12, // Reduced padding for tighter spacing between tabs
      //     alignItems: 'flex-start', // Align items to the start
      //     // backgroundColor : 'red',
      //     marginRight : 2
      //   },
      //   tabBarActiveTintColor: '#263238', // Dark text for active tab
      //   tabBarInactiveTintColor: '#757575', // Gray text for inactive tabs
      //   tabBarPressColor: 'transparent', // Remove press effect
      //   tabBarContentContainerStyle: {
      //     justifyContent: 'flex-start', // Align tabs to start instead of space-around
      //   },
      // }}