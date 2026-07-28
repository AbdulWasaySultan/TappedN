import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useBookingContext } from '../../../../Context/bookingContext';
import { SwipeListView } from 'react-native-swipe-list-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { getSafeImageSource } from '../../../../utils/imageSource';

const FontType = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
};

const { width, height } = Dimensions.get('window');

export default function PreviousBookings() {
  const { bookings, deleteBooking, updateBooking } = useBookingContext();
  // const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

        // Filter bookings from context based on outletId
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];
        const previousBookingData = bookings.filter((item) => {
        const appt = new Date(`${item.date}T${item.time}`);
        const isDone = item.status === 'Completed' || item.status === 'Cancelled';
        const hasPassed = now > appt;

          return isDone || hasPassed
        });
        // setServices(filteredServices);

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

const markSchedule = async (bookingId: string) => {
  await updateBooking(bookingId, {status : 'Completed'})
}

const cancel = async (id: string) => {
    try {
      await deleteBooking(id);
    } 
    
    catch (error) {
      console.error('Error canceling booking:', error);
    }
  };


 const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => markSchedule(item.bookingId)}>
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
      </TouchableOpacity>
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
          data={previousBookingData}
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