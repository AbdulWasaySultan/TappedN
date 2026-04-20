import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useBookingContext } from '../../../../Context/Firebase/Booking/bookingContext';
import { FontType } from '../../../../Components/Constants/FontType';
import { getSafeImageSource } from '../../../../utils/imageSource';

const { width } = Dimensions.get('window');
const isSmallScreen = Dimensions.get('window').height < 800;

export default function Today() {
  const { bookings, updateBooking } = useBookingContext();
  const now = new Date();
  const todayStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD local

  // 1. FILTER LOGIC
  const todayData = bookings.filter(item => {
    const isTodayDate = item.date === todayStr;
    const isPending = item.status === 'Pending';
    return isTodayDate && isPending;
  });

  // 2. UPDATE ACTION
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateBooking(id, { status: newStatus });
    } catch (e) {
      console.error('Update failed', e);
    }
  };

  // 3. HELPERS
  const getColorForStatus = (status: string | undefined) => {
    if (status === 'Completed') return '#0D8056';
    if (status === 'Cancelled') return '#E50914';
    return '#42526E50';
  };

  const getColorForPrice = (status: string | undefined) => {
    if (status === 'Completed' || status === 'Cancelled') return '#42526E80';
    return '#F27122';
  };

  // 4. RENDER ITEM (Normal View)
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      activeOpacity={0.9}
      onPress={() => updateStatus(item.id, 'Completed')} // Mark as done on tap
    >
      <Image
        source={getSafeImageSource(
          item.image,
          require('../../../../assets/images/Others/profile.png'),
        )}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.rowContainer}>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
          <Text style={styles.outletName}>{item.outletName}</Text>
        </View>
        <View style={styles.itemScheduleContainer}>
          <Text
            style={[
              styles.itemPriceTextBold,
              { color: getColorForPrice(item.status) },
            ]}
          >
            ${item.price}
            <Text style={{ fontSize: FontType.medium, color: '#42526E80' }}>
              /hr
            </Text>
          </Text>
          <Text
            style={[
              styles.itemSchedule,
              { color: getColorForStatus(item.status) },
            ]}
          >
            {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // 5. RENDER HIDDEN (Swipe Action)
  const renderHiddenItem = ({ item }: { item: any }) => (
    <View style={styles.hiddenItemContainer}>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => updateStatus(item.id, 'Cancelled')}
      >
        <Text style={styles.cancel}>x</Text>
      </TouchableOpacity>
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <SwipeListView
          data={todayData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={item => item.id}
          rightOpenValue={-75}
          disableRightSwipe={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

// Ensure your styles are defined here...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  mainContainer: {
    // backgroundColor: 'yellow',
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },

  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderRadius: 20,
  },
  itemImage: {
    width: width > 360 ? 80 : 70, // Dynamic image size based on screen width
    height: width > 360 ? 80 : 70,
    marginLeft: 10,
    marginVertical: 10,
  },
  rowContainer: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    flex: 1,
    // paddingVertical : 4,
    marginBottom: 10,
    marginHorizontal: 14,
    justifyContent: 'space-between',
    // height: '70%',
  },
  itemDetailsContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 'auto',
  },
  serviceName: {
    // fontSize: width > 360 ? FontType.medium : FontType.regular,
    fontSize: isSmallScreen ? FontType.medium : FontType.large,
    fontWeight: '600',
    color: '#263238',
    marginVertical: 10,
  },
  outletName: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    // fontSize: RFValue(12.5),
    fontSize: isSmallScreen ? 15 : FontType.regular,
    fontWeight: '400',
    color: '#FF731E',
  },
  itemScheduleContainer: {
    // backgroundColor: 'green',
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 4,
  },
  priceContainer: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  itemPriceTextBold: {
    // fontSize: width > 360 ? FontType.xlarge : FontType.large,
    // fontSize: RFValue(18.5),
    fontSize: isSmallScreen ? 22 : FontType.xlarge,
    fontWeight: '700',
    color: '#F27122',
  },
  itemSchedule: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    // fontSize: RFValue(12.5),
    fontSize: isSmallScreen ? FontType.small : FontType.regular,
    fontWeight: '400',
    color: '#42526E50',
  },
  hiddenItemContainer: {
    // flex: 1,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 14,
    height: 'auto',
  },
  cancelButton: {
    borderRadius: 56,
    backgroundColor: '#F27122',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    alignSelf: 'flex-end',
    marginVertical: 5,
  },
  cancel: {
    color: 'white',
    fontWeight: 600,
    fontSize: FontType.xlarge,
  },
  cancelButtonText: {
    color: '#E82831',
    fontWeight: 500,
    fontSize: FontType.small,
  },
  cancelButtonImage: {
    width: 12,
    height: 12,
  },
});

// export default function Estheticians() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   return (
//     <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
//       <BackButton />
//       <Text>Estheticians</Text>
//     </View>
//   )
// }

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import { useBookingContext } from '../../Context/bookingContext';
// import type { DynamicBookingData } from '../../Context/bookingData';
// import { FontType } from '../../Components/Constants/FontType';

// const { width, height } = Dimensions.get('window');
// const isSmallScreen = height < 800;

// export default function Today() {
//   const { bookings, deleteBooking } = useBookingContext();

//   // Helper function to parse date from booking
//   const getAppointmentDate = (item: any): Date => {
//     try {
//       if (item.date && item.time) {
//         // Try ISO format: "2026-01-08T14:30"
//         const dateTimeStr = `${item.date}T${item.time}`;
//         const d = new Date(dateTimeStr);
//         if (!isNaN(d.getTime())) return d;

//         // Try space-separated: "2026-01-08 14:30"
//         const d2 = new Date(`${item.date} ${item.time}`);
//         if (!isNaN(d2.getTime())) return d2;

//         //  const dateStr: string = item.date;
//         // const timeStr: string = item.time;

//         // // parse date
//         // let year: number | null = null;
//         // let month: number | null = null;
//         // let day: number | null = null;

//         // if (dateStr.includes('-')) {
//         //   // YYYY-MM-DD
//         //   const parts = dateStr.split('-');
//         //   if (parts.length === 3) {
//         //     year = parseInt(parts[0], 10);
//         //     month = parseInt(parts[1], 10) - 1;
//         //     day = parseInt(parts[2], 10);
//         //   }
//         // } else if (dateStr.includes('/')) {
//         //   // DD/MM/YYYY
//         //   const parts = dateStr.split('/');
//         //   if (parts.length === 3) {
//         //     day = parseInt(parts[0], 10);
//         //     month = parseInt(parts[1], 10) - 1;
//         //     year = parseInt(parts[2], 10);
//         //   }
//         // }

//         // // parse time 'HH:MM' (24h) or 'HH:MM AM/PM'
//         // let hour = 0;
//         // let minute = 0;
//         // if (timeStr) {
//         //   const ampmMatch = timeStr.match(/(AM|PM)$/i);
//         //   if (ampmMatch) {
//         //     // e.g. '2:30 PM'
//         //     const [t, meridiem] = [timeStr.replace(/(AM|PM)$/i, '').trim(), ampmMatch[0].toUpperCase()];
//         //     const tparts = t.split(':');
//         //     hour = parseInt(tparts[0], 10) || 0;
//         //     minute = parseInt(tparts[1], 10) || 0;
//         //     if (meridiem === 'PM' && hour < 12) hour += 12;
//         //     if (meridiem === 'AM' && hour === 12) hour = 0;
//         //   } else {
//         //     const tparts = timeStr.split(':');
//         //     hour = parseInt(tparts[0], 10) || 0;
//         //     minute = parseInt(tparts[1], 10) || 0;
//         //   }
//         // }

//         // if (year !== null && month !== null && day !== null) {
//         //   return new Date(year, month, day, hour, minute, 0, 0);
//         // }

//       }

//       // Fallback to createdAt
//       if (item.createdAt) {
//         if (item.createdAt.toDate) {
//           return item.createdAt.toDate();
//         }
//         return new Date(item.createdAt);
//       }
//     } catch (e) {
//       console.error('Date parsing error:', e);
//     }
//     return new Date(NaN);
//   };

//   // Check if date is today
//   const isToday = (date: Date): boolean => {
//     const now = new Date();
//     return (
//       date.getFullYear() === now.getFullYear() &&
//       date.getMonth() === now.getMonth() &&
//       date.getDate() === now.getDate()
//     );
//   };

//   // Filter bookings for today
//   const todayData = bookings.filter((item) => {
//     const apptDate = getAppointmentDate(item);

//     // Debug logging
//     console.log('Booking:', {
//       id: item.id,
//       date: item.date,
//       time: item.time,
//       parsedDate: apptDate,
//       isValidDate: !isNaN(apptDate.getTime()),
//       isTodayCheck: isToday(apptDate),
//       status: item.status
//     });

//     if (isNaN(apptDate.getTime())) return false;

//     return isToday(apptDate) && item.status !== 'Cancelled';
//   });

//   console.log('Total bookings:', bookings.length);
//   console.log('Today bookings:', todayData.length);

//   function getColorForStatus(status: string | undefined) {
//     switch (status) {
//       case 'Completed':
//         return '#0D8056';
//       case 'Cancelled':
//         return '#E50914';
//       case 'Pending':
//         return '#FFA500';
//       default:
//         return '#42526E50';
//     }
//   }

//   function getColorForPrice(status: string | undefined) {
//     switch (status) {
//       case 'Completed':
//       case 'Cancelled':
//         return '#42526E80';
//       default:
//         return '#F27122';
//     }
//   }

//   const cancel = async (id: string) => {
//     try {
//       await deleteBooking(id);
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//     }
//   };

//   const renderItem = ({ item }: { item: any }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image
//           source={{ uri: item.image }}
//           style={styles.itemImage}
//           resizeMode="cover"
//         />
//         <View style={styles.rowContainer}>
//           <View style={styles.itemDetailsContainer}>
//             <Text style={styles.title}>
//               {item.title || item.serviceName || 'N/A'}
//             </Text>
//             <Text style={styles.outletName}>
//               {item.outletName || 'N/A'}
//             </Text>
//           </View>
//           <View style={styles.itemScheduleContainer}>
//             <View style={styles.priceContainer}>
//               <Text
//                 style={[
//                   styles.itemPriceTextBold,
//                   { color: getColorForPrice(item.status) },
//                 ]}
//               >
//                 ${item.price}
//                 <Text style={styles.pricePerHour}>/hr</Text>
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.itemSchedule,
//                 { color: getColorForStatus(item.status) },
//               ]}
//             >
//               {item.status || 'Pending'}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderHiddenItem = ({ item }: { item: any }) => {
//     return (
//       <View style={styles.hiddenItemContainer}>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => cancel(item.id)}
//         >
//           <Text style={styles.cancel}>×</Text>
//         </TouchableOpacity>
//         <Text style={styles.cancelButtonText}>Cancel</Text>
//       </View>
//     );
//   };

//   if (todayData.length === 0) {
//     return (
//       <View style={[styles.container, styles.emptyContainer]}>
//         <Text style={styles.emptyText}>No bookings for today</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainContainer}>
//         <SwipeListView
//           data={todayData}
//           renderItem={renderItem}
//           renderHiddenItem={renderHiddenItem}
//           keyExtractor={(item) => item.id.toString()}
//           rightOpenValue={-75}
//           disableRightSwipe={true}
//           disableLeftSwipe={false}
//           closeOnRowPress={true}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   emptyContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   mainContainer: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   itemContainer: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     padding: 12,
//     marginVertical: 6,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   itemImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   rowContainer: {
//     flex: 1,
//     marginLeft: 12,
//     justifyContent: 'space-between',
//   },
//   itemDetailsContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#263238',
//     marginBottom: 4,
//   },
//   outletName: {
//     fontSize: 14,
//     color: '#666',
//   },
//   itemScheduleContainer: {
//     alignItems: 'flex-end',
//   },
//   priceContainer: {
//     marginBottom: 4,
//   },
//   itemPriceTextBold: {
//     fontSize: 18,
//     fontWeight: '700',
//   },
//   pricePerHour: {
//     fontSize: 12,
//     color: '#42526E80',
//     fontWeight: '400',
//   },
//   itemSchedule: {
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   hiddenItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     height: '92%',
//     marginVertical: 6,
//   },
//   cancelButton: {
//     backgroundColor: '#E50914',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 50,
//     height: '100%',
//     borderTopRightRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   cancel: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   cancelButtonText: {
//     display: 'none', // Hidden but kept for reference
//   },
// });
