import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useOutletContext } from '../../Context/OutletContext';
import { useBookingContext } from '../../Context/bookingContext';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RFValue } from 'react-native-responsive-fontsize';
const FontType = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
};

const { width, height } = Dimensions.get('window');

// Define the type for the props
type PreviousBookingsProps = {
  outletId: string;
};

export default function PreviousBookings({ outletId }: PreviousBookingsProps) {
  // const { getOutletById } = useOutletContext();
  const { getBookingById } = useBookingContext();
  const { bookings, deleteBooking } = useBookingContext();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Filter bookings from context based on outletId
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

        const filteredServices = bookings.filter((booking) => {
          if (booking.outletId !== outletId) return false;
          const appt = getAppointmentDate(booking);
          const isPast = !isNaN(appt.getTime()) ? appt.getTime() < now.getTime() : false;
          return isPast || booking.status === 'Completed';
        });
        setServices(filteredServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [outletId, bookings]); // This effect will run when `outletId` changes


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
  const getColorForPrice = (schedule: string): string => {
  // Return color based on schedule status
  return '#F27122'; // Default color, adjust based on your logic
};

const getColorForStatus = (schedule: string): string => {
  // Return color based on schedule status
  switch (schedule) {
    case 'Completed':
      return '#4CAF50';
    case 'Cancelled':
      return '#E82831';
    case 'Pending':
      return '#FF9800';
    default:
      return '#42526E50';
  }
};

const cancel = async (id: string) => {
    try {
      await deleteBooking(id);
      // Remove from local state
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id)
      );
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };


 const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.rowContainer}>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.outletName}>{item.outletName}</Text>
          </View>
          <View style={styles.itemScheduleContainer}>
            <View style={styles.priceContainer}>
              <Text
                style={[styles.itemPriceTextBold, { color: getColorForPrice(item.schedule) }]}
              >
                ${item.price}
                <Text style={{ fontSize: 12, color: '#42526E80', fontWeight: '400' }}>
                  /hr
                </Text>
              </Text>
            </View>
            <Text
              style={[styles.itemSchedule, { color: getColorForStatus(item.schedule) }]}
            >
              {item.schedule}
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
          <Text style={styles.cancel}>x</Text>
        </TouchableOpacity>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </View>
    );
  };

 if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.mainContainer, { backgroundColor: 'pink' }]}>
        <SwipeListView
          data={services}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#cdcdcd',
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },

  itemContainer: {
    backgroundColor: 'pink',
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
    // padding : 6,
    marginBottom: 8,
    marginHorizontal: 14,
    justifyContent: 'space-between',
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
    fontSize: RFValue(15),
    fontWeight: 700,
    color: '#263238',
    marginVertical: 10,
  },
  outletName: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    fontSize: RFValue(12.5),
    fontWeight: 400,
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
    fontSize: RFValue(18.5),
    fontWeight: 700,
    color: '#F27122',
  },
  itemSchedule: {
    // fontSize: width > 360 ? FontType.regular : FontType.small,
    fontSize: RFValue(12.5),
    fontWeight: 400,
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