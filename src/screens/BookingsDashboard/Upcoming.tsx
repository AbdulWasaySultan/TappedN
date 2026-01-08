import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import { NavigationProp } from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';
import { useState } from 'react';
import { FontType } from '../../Components/Constants/FontType';
import { RFValue } from 'react-native-responsive-fontsize'; // Import for responsive font size
import { SwipeListView } from 'react-native-swipe-list-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useBookingContext } from '../../Context/bookingContext';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;

// type Services = {
//   id: string;
//   image: any;
//   title: string;
//   outletName: string;
//   price: string;
//   schedule: string;
// };

type FirestoreBooking = {
  id: string;          // Firestore Doc ID
  serviceName: string; // instead of 'title'
  outletName: string;
  price: number;       // usually a number in DB
  date: string;        // "2026-01-07"
  time: string;
  image: string;       // Remote URL string
  status: string;      // 'upcoming'
  bookingType: string;
};

export default function Upcoming() {
  // Using the context which is connected to Firestore
  const { bookings, deleteBooking } = useBookingContext();
  const now = new Date();

  const getAppointmentDate = (item: any) => {
    try {
      if (item.date && item.time) {
        const iso = `${item.date}T${item.time}`;
        const d = new Date(iso);
        if (!isNaN(d.getTime())) return d;
        const d2 = new Date(`${item.date} ${item.time}`);
        if (!isNaN(d2.getTime())) return d2;
      }
      if (item.createdAt) {
        const d = item.createdAt.toDate ? item.createdAt.toDate() : new Date(item.createdAt);
        if (!isNaN(d.getTime())) return d;
      }
    } catch (e) {}
    return new Date(NaN);
  };

  // upcoming: appointment date/time is in the future and not Cancelled/Completed
  const upcomingData = bookings.filter((item) => {
    const appt = getAppointmentDate(item);
    if (isNaN(appt.getTime())) return false;
    return appt.getTime() > now.getTime() && item.status !== 'Cancelled' && item.status !== 'Completed';
  });


  // const [data, setData] = useState<Services[]>([]);
//   const [services, setServices] = useState<Services[]>([
//   {
//     id: '1',
//     image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//     title: 'Car Wash',
//     outletName: 'Auto Fix',
//     price: '40',
//     schedule: 'Mon, 10 AM',
//   },
//   {
//     id: '2',
//     image: require('../../assets/images/OutletHairTreatment/hairTreatment.png'),
//     title: 'Hair Cut',
//     outletName: 'Tony & Guy',
//     price: '25',
//     schedule: 'Completed',
//   },
//   {
//     id: '3',
//     image: require('../../assets/images/HomeTabs/BookingsDashboard/paw-spa.png'),
//     title: 'Pet Wash',
//     outletName: 'Paw Spa',
//     price: '30',
//     schedule: 'Tomorrow',
//   },
//   {
//     id: '4',
//     image: require('../../assets/images/HomeTabs/BookingsDashboard/ac-check.png'),
//     title: 'AC Check',
//     outletName: 'Air Care',
//     price: '55',
//     schedule: 'In Progress',
//   }
// ]);

  function getColorForStatus(status: string) {
    switch (status) {
      case 'Completed':
        return '#0D8056';
      case 'Cancelled':
        return '#E50914';
      default:
        return '#42526E50';
    }
  }

  function getColorForPrice(status: string) {
    switch (status) {
      case 'Completed':
        return '#42526E80';
      case 'Cancelled':
        return '#42526E80';
      default:
        return '#F27122';
    }
  }

// here service in the filter function represents the each service object in the service array
// preServices previous ya current value ha services state ki aur 
// filter function un values ka naya array banata ha jo given condition ko 
// meet krti hein toh yahan wo her service ko check krega aik aik krke 
// aur hr dafa service id ko item id se check krega 
//   Now, when filter goes through each service:

// For the first service (id: 's1'):
// The condition is service.id !== 's2'.
// 's1' !== 's2' is true, so this service remains in the new array.
// For the second service (id: 's2')
// The condition is service.id !== 's2'.
// 's2' !== 's2' is false, so this service is excluded from the new array.
// For the third service (id: 's3'):
// The condition is service.id !== 's2'.
// 's3' !== 's2' is true, so this service remains in the new array.

//to jb hum cancel button pr click kreinge to woh us particular cell ki 
// item id ko service id se match krega joke obviously same ayegi aur 
// jab same ayegi to condition false hojayegi kyunke 
// condition service.id !== id hai to wo sservice bhi excude hojayegi
    const cancel = (id : string) => {
      deleteBooking(id);
  // setServices(preServices => preServices.filter(service => service.id !== id))
  };
  const renderItem = ({ item }: { item: FirestoreBooking
   }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri : item.image}}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.rowContainer}>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.title}>{item.serviceName}</Text>
            <Text style={styles.outletName}>{item.outletName}</Text>
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
                <Text
                  style={{
                    fontSize: FontType.medium,
                    color: '#42526E80',
                    fontWeight: 400,
                  }}
                >
                  /hr
                </Text>
              </Text>
            </View>
            <Text
              style={[
                styles.itemSchedule,
                { color: getColorForStatus(item.status) },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };


  const renderHiddenItem = ({item} : {item: FirestoreBooking}) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            cancel(item.id);
            deleteBooking(item.id);
          }}
        >
          <Text style={styles.cancel}>x</Text>
          {/* <Image source={require('../../assets/images/HomeTabs/BookingsDashboard/cancelButton.png')} style={styles.cancelButtonImage} resizeMode='cover'/> */}
        </TouchableOpacity>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <SwipeListView
          data={upcomingData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={item => item.id.toString()}
          rightOpenValue={-75}
          disableRightSwipe={true}
          disableLeftSwipe={false}
          closeOnRowPress={true}
          contentContainerStyle={styles.mainContainer}
          showsVerticalScrollIndicator={false}

        />
      </View>
    </View>
  );
}


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
    borderRadius : 18
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
  title: {
    // fontSize: width > 360 ? FontType.medium : FontType.regular,
    fontSize: isSmallScreen? FontType.medium : FontType.large,
    fontWeight: '600',
    color: '#263238',
    marginVertical: 10,
  },
  outletName: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    // fontSize: RFValue(12.5),
    fontSize: isSmallScreen? 15 : FontType.regular,
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
    fontSize: isSmallScreen? 22 : FontType.xlarge,
    fontWeight: '700',
    color: '#F27122',
  },
  itemSchedule: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    // fontSize: RFValue(12.5),
    fontSize: isSmallScreen? FontType.small : FontType.regular,
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
})