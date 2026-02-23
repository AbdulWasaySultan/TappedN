import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useBookingContext } from '../../Context/bookingContext';
import { StyleSheet } from 'react-native'; // Assuming styles are shared
import { FontType } from '../../Components/Constants/FontType';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 360;

export default function Upcoming() {
  const { bookings, updateBooking } = useBookingContext();
  const now = new Date();
  const todayStr = now.toLocaleDateString('en-CA');

  // 1. Filter: Date is in future + Status is Pending
  const upcomingData = bookings.filter((item) => {
    return item.date > todayStr && item.status === 'Pending';
  });

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateBooking(id, { status: newStatus });
    } catch (e) { console.error(e); }
  };

  const showStatusAlert = (item: any) => {
    Alert.alert(
      'Manage Booking',
      'Choose an action for this upcoming service:',
      [
        { text: 'Mark Completed', onPress: () => updateStatus(item.id, 'Completed') },
        { text: 'Cancel Booking', style: 'destructive', onPress: () => updateStatus(item.id, 'Cancelled') },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => showStatusAlert(item)}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.rowContainer}>
        <View style={styles.itemDetailsContainer}>
          <Text style={styles.serviceName}>{item.serviceName}</Text>
          <Text style={styles.outletName}>{item.outletName}</Text>
        </View>
        <View style={styles.itemScheduleContainer}>
          <Text style={styles.itemPriceTextBold}>${item.price}</Text>
          <Text style={[styles.itemSchedule, { color: '#F27122' }]}>
            {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({ item }: { item: any }) => (
    <View style={styles.hiddenItemContainer}>
      <TouchableOpacity style={styles.cancelButton} onPress={() => updateStatus(item.id, 'Cancelled')}>
        <Text style={styles.cancel}>x</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={upcomingData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={(item) => item.id}
        rightOpenValue={-80}
        disableRightSwipe
      />
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

    elevation: 5,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  serviceName :{

    
  }
})