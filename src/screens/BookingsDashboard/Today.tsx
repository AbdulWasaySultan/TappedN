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

// // type Services = {
// //   id: string;
// //   image: any;
// //   title: string;
// //   outletName: string;
// //   price: string;
// //   schedule: string;
// // };

// export default function Today() {
//   const {bookings, deleteBooking} = useBookingContext();
//   // const [data, setData] = useState<Services[]>([]);
//   // const [services, setServices] = useState<Services[]>([
//   //   {
//   //     id: '1',
//   //     image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //     title: 'Car Wash',
//   //     outletName: 'Garage Services',
//   //     price: '10',
//   //     schedule: 'May 18, 2022',
//   //   },
//   //   {
//   //     id: '2',
//   //     image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //     title: 'Kitchen Cleaning',
//   //     outletName: 'Kitchen Cleaning',
//   //     price: '10',
//   //     schedule: 'Cancelled',
//   //   },
//   //   {
//   //     id: '3',
//   //     image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //     title: 'Sofa Cleaning',
//   //     outletName: 'SofaShofa',
//   //     price: '10',
//   //     schedule: 'Completed',
//   //   },
//   // ]);

//   function getColorForStatus(schedule: string | undefined) {
//     switch (schedule) {
//       case 'Completed':
//         return '#0D8056';
//       case 'Cancelled':
//         return '#E50914';
//       default:
//         return '#42526E50';
//     }
//   }

//   function getColorForPrice(schedule: string | undefined) {
//     switch (schedule) {
//       case 'Completed':
//         return '#42526E80';
//       case 'Cancelled':
//         return '#42526E80';
//       default:
//         return '#F27122';
//     }
//   }

// // here service in the filter function represents the each service object in the service array
// // preServices previous ya current value ha services state ki aur 
// // filter function un values ka naya array banata ha jo given condition ko 
// // meet krti hein toh yahan wo her service ko check krega aik aik krke 
// // aur hr dafa service id ko item id se check krega 
// //   Now, when filter goes through each service:

// // For the first service (id: 's1'):
// // The condition is service.id !== 's2'.
// // 's1' !== 's2' is true, so this service remains in the new array.
// // For the second service (id: 's2')
// // The condition is service.id !== 's2'.
// // 's2' !== 's2' is false, so this service is excluded from the new array.
// // For the third service (id: 's3'):
// // The condition is service.id !== 's2'.
// // 's3' !== 's2' is true, so this service remains in the new array.

// //to jb hum cancel button pr click kreinge to woh us particular cell ki 
// // item id ko service id se match krega joke obviously same ayegi aur 
// // jab same ayegi to condition false hojayegi kyunke 
// // condition service.id !== id hai to wo sservice bhi excude hojayegi
//     const cancel = (id : string) => {
//       deleteBooking(id);
//   // setServices(preServices => preServices.filter(service => service.id !== id))
//   };
//   const renderItem = ({ item }: { item: DynamicBookingData }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image
//           source={{uri : item.image}}
//           style={styles.itemImage}
//           resizeMode="cover"
//         />
//         <View style={styles.rowContainer}>
//           <View style={styles.itemDetailsContainer}>
//             <Text style={styles.serviceName}>{item.serviceName}</Text>
//             <Text style={styles.outletName}>{item.outletName}</Text>
//           </View>
//           <View style={styles.itemScheduleContainer}>
//             <View style={styles.priceContainer}>
//               <Text
//                 style={[
//                   styles.itemPriceTextBold,
//                   { color: getColorForPrice(item.schedule) },
//                 ]}
//               >
//                 ${item.price}
//                 <Text
//                   style={{
//                     fontSize: FontType.medium,
//                     color: '#42526E80',
//                     fontWeight: 400,
//                   }}
//                 >
//                   /hr
//                 </Text>
//               </Text>
//             </View>
//             <Text
//               style={[
//                 styles.itemSchedule,
//                 { color: getColorForStatus(item.schedule) },
//               ]}
//             >
//               {item.schedule}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   const renderHiddenItem = ({item} : {item: DynamicBookingData}) => {
//     return (
//       <View style={styles.hiddenItemContainer}>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => {cancel(item.id)
//             deleteBooking(item.id)
//           }}
//         >
//           <Text style={styles.cancel}>x</Text>
//           {/* <Image source={require('../../assets/images/HomeTabs/BookingsDashboard/cancelButton.png')} style={styles.cancelButtonImage} resizeMode='cover'/> */}
//         </TouchableOpacity>
//         <Text style={styles.cancelButtonText}>Cancel</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainContainer}>
//         <SwipeListView
//           data={[]}
//           renderItem={renderItem}
//           renderHiddenItem={renderHiddenItem}
//           keyExtractor={item => item.id.toString()}
//           rightOpenValue={-75}
//           disableRightSwipe={true}
//           disableLeftSwipe={false}
//           closeOnRowPress={true}
//           contentContainerStyle={styles.mainContainer}
//           showsVerticalScrollIndicator={false}

//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'pink',
//   },
//   mainContainer: {
//     // backgroundColor: 'yellow',
//     flex: 1,
//     width: '95%',
//     alignSelf: 'center',
//     marginVertical: 20,
//     borderRadius: 10,
//   },

//   itemContainer: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 15,
//     borderRadius: 20,
//   },
//   itemImage: {
//     width: width > 360 ? 80 : 70, // Dynamic image size based on screen width
//     height: width > 360 ? 80 : 70,
//     marginLeft: 10,
//     marginVertical: 10,
//   },
//   rowContainer: {
//     // backgroundColor: 'pink',
//     flexDirection: 'row',
//     flex: 1,
// // paddingVertical : 4,
//     marginBottom: 10,
//     marginHorizontal: 14,
//     justifyContent: 'space-between',
//     // height: '70%',
//   },
//   itemDetailsContainer: {
//     // backgroundColor: 'blue',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: 'auto',
//   },
//   serviceName: {
//     // fontSize: width > 360 ? FontType.medium : FontType.regular,
//     fontSize: isSmallScreen? FontType.medium : FontType.large,
//     fontWeight: '600',
//     color: '#263238',
//     marginVertical: 10,
//   },
//   outletName: {
//     // fontSize: width > 360 ? FontType.regular : FontType.small,
//     // fontSize: RFValue(12.5),
//     fontSize: isSmallScreen? 15 : FontType.regular,
//     fontWeight: '400',
//     color: '#FF731E',
//   },
//   itemScheduleContainer: {
//     // backgroundColor: 'green',
//     width: 'auto',
//     height: 'auto',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginHorizontal: 4,
//   },
//   priceContainer: {
//     // backgroundColor: 'pink',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   itemPriceTextBold: {
//     // fontSize: width > 360 ? FontType.xlarge : FontType.large,
//     // fontSize: RFValue(18.5),
//     fontSize: isSmallScreen? 22 : FontType.xlarge,
//     fontWeight: '700',
//     color: '#F27122',
//   },
//   itemSchedule: {
//     // fontSize: width > 360 ? FontType.regular : FontType.small,
//     // fontSize: RFValue(12.5),
//     fontSize: isSmallScreen? FontType.small : FontType.regular,
//     fontWeight: '400',
//     color: '#42526E50',
//   },
//   hiddenItemContainer: {
//     // flex: 1,
//     // backgroundColor: 'pink',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//     marginVertical: 14,
//     height: 'auto',
//   },
//   cancelButton: {
//     borderRadius: 56,
//     backgroundColor: '#F27122',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 45,
//     height: 45,
//     alignSelf: 'flex-end',
//     marginVertical: 5,
//   },
//   cancel: {
//     color: 'white',
//     fontWeight: 600,
//     fontSize: FontType.xlarge,
//   },
//   cancelButtonText: {
//     color: '#E82831',
//     fontWeight: 500,
//     fontSize: FontType.small,
//   },
//   cancelButtonImage: {
//     width: 12,
//     height: 12,
//   },
// })

// // export default function Estheticians() {
// //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

// //   return (
// //     <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
// //       <BackButton />
// //       <Text>Estheticians</Text>
// //     </View>
// //   )
// // }

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useBookingContext } from '../../Context/bookingContext';
import type { DynamicBookingData } from '../../Context/bookingData';
import { FontType } from '../../Components/Constants/FontType';
import type {Booking} from '../../Context/bookingContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;

export default function Today() {
  const { bookings, deleteBooking } = useBookingContext();

  // Helper function to parse date from booking
  const getAppointmentDate = (item: any): Date => {
    try {
      if (item.date && item.time) {
        // Try ISO format: "2026-01-08T14:30"
        const dateTimeStr = `${item.date}T${item.time}`;
        const d = new Date(dateTimeStr);
        if (!isNaN(d.getTime())) return d;

        // Try space-separated: "2026-01-08 14:30"
        const d2 = new Date(`${item.date} ${item.time}`);
        if (!isNaN(d2.getTime())) return d2;

        //  const dateStr: string = item.date;
        // const timeStr: string = item.time;

        // // parse date
        // let year: number | null = null;
        // let month: number | null = null;
        // let day: number | null = null;

        // if (dateStr.includes('-')) {
        //   // YYYY-MM-DD
        //   const parts = dateStr.split('-');
        //   if (parts.length === 3) {
        //     year = parseInt(parts[0], 10);
        //     month = parseInt(parts[1], 10) - 1;
        //     day = parseInt(parts[2], 10);
        //   }
        // } else if (dateStr.includes('/')) {
        //   // DD/MM/YYYY
        //   const parts = dateStr.split('/');
        //   if (parts.length === 3) {
        //     day = parseInt(parts[0], 10);
        //     month = parseInt(parts[1], 10) - 1;
        //     year = parseInt(parts[2], 10);
        //   }
        // }

        // // parse time 'HH:MM' (24h) or 'HH:MM AM/PM'
        // let hour = 0;
        // let minute = 0;
        // if (timeStr) {
        //   const ampmMatch = timeStr.match(/(AM|PM)$/i);
        //   if (ampmMatch) {
        //     // e.g. '2:30 PM'
        //     const [t, meridiem] = [timeStr.replace(/(AM|PM)$/i, '').trim(), ampmMatch[0].toUpperCase()];
        //     const tparts = t.split(':');
        //     hour = parseInt(tparts[0], 10) || 0;
        //     minute = parseInt(tparts[1], 10) || 0;
        //     if (meridiem === 'PM' && hour < 12) hour += 12;
        //     if (meridiem === 'AM' && hour === 12) hour = 0;
        //   } else {
        //     const tparts = timeStr.split(':');
        //     hour = parseInt(tparts[0], 10) || 0;
        //     minute = parseInt(tparts[1], 10) || 0;
        //   }
        // }

        // if (year !== null && month !== null && day !== null) {
        //   return new Date(year, month, day, hour, minute, 0, 0);
        // }

      }

      // Fallback to createdAt
      if (item.createdAt) {
        if (item.createdAt.toDate) {
          return item.createdAt.toDate();
        }
        return new Date(item.createdAt);
      }
    } catch (e) {
      console.error('Date parsing error:', e);
    }
    return new Date(NaN);
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  };

  // Filter bookings for today
  const todayData = bookings.filter((item) => {
    const apptDate = getAppointmentDate(item);
    
    // Debug logging
    console.log('Booking:', {
      id: item.id,
      date: item.date,
      time: item.time,
      parsedDate: apptDate,
      isValidDate: !isNaN(apptDate.getTime()),
      isTodayCheck: isToday(apptDate),
      status: item.status
    });

    if (isNaN(apptDate.getTime())) return false;
    
    return isToday(apptDate) && item.status !== 'Cancelled';
  });

  console.log('Total bookings:', bookings.length);
  console.log('Today bookings:', todayData.length);

  function getColorForStatus(status: string | undefined) {
    switch (status) {
      case 'Completed':
        return '#0D8056';
      case 'Cancelled':
        return '#E50914';
      case 'Pending':
        return '#FFA500';
      default:
        return '#42526E50';
    }
  }

  function getColorForPrice(status: string | undefined) {
    switch (status) {
      case 'Completed':
      case 'Cancelled':
        return '#42526E80';
      default:
        return '#F27122';
    }
  }

  const cancel = async (id: string) => {
    try {
      await deleteBooking(id);
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  const renderItem = ({ item }: { item: Booking }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.rowContainer}>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.title}>
              { item.serviceName || 'N/A'}
            </Text>
            <Text style={styles.outletName}>
              {item.outletName || 'N/A'}
            </Text>
          </View>
          <View style={styles.itemScheduleContainer}>
            <View style={styles.priceContainer}>
              <Text
                style={[
                  styles.itemPriceTextBold,
                  { color: getColorForPrice(item.status) },
                ]}
              >
                ${item.price}
                <Text style={styles.pricePerHour}>/hr</Text>
              </Text>
            </View>
            <Text
              style={[
                styles.itemSchedule,
                { color: getColorForStatus(item.status) },
              ]}
            >
              {item.status || 'Pending'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancel(item.id)}
        >
          <Text style={styles.cancel}>×</Text>
        </TouchableOpacity>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </View>
    );
  };

  if (todayData.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>No bookings for today</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <SwipeListView
          data={todayData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item) => item.id.toString()}
          rightOpenValue={-75}
          disableRightSwipe={true}
          disableLeftSwipe={false}
          closeOnRowPress={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  rowContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemDetailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 4,
  },
  outletName: {
    fontSize: 14,
    color: '#666',
  },
  itemScheduleContainer: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    marginBottom: 4,
  },
  itemPriceTextBold: {
    fontSize: 18,
    fontWeight: '700',
  },
  pricePerHour: {
    fontSize: 12,
    color: '#42526E80',
    fontWeight: '400',
  },
  itemSchedule: {
    fontSize: 13,
    fontWeight: '600',
  },
  hiddenItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '92%',
    marginVertical: 6,
  },
  cancelButton: {
    backgroundColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  cancel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    display: 'none', // Hidden but kept for reference
  },
});

