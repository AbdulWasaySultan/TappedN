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

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;

type Services = {
  id: string;
  image: any;
  title: string;
  outletName: string;
  price: string;
  schedule: string;
};

export default function Today() {
  // const [data, setData] = useState<Services[]>([]);
  const [services, setServices] = useState<Services[]>([
    {
      id: '1',
      image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
      title: 'Car Wash',
      outletName: 'Garage Services',
      price: '10',
      schedule: 'May 18, 2022',
    },
    {
      id: '2',
      image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
      title: 'Kitchen Cleaning',
      outletName: 'Kitchen Cleaning',
      price: '10',
      schedule: 'Cancelled',
    },
    {
      id: '3',
      image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
      title: 'Sofa Cleaning',
      outletName: 'SofaShofa',
      price: '10',
      schedule: 'Completed',
    },
  ]);

  function getColorForStatus(schedule: string) {
    switch (schedule) {
      case 'Completed':
        return '#0D8056';
      case 'Cancelled':
        return '#E50914';
      default:
        return '#42526E50';
    }
  }

  function getColorForPrice(schedule: string) {
    switch (schedule) {
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
  setServices(preServices => preServices.filter(service => service.id !== id))
  };
  const renderItem = ({ item }: { item: Services }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={item.image}
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
                style={[
                  styles.itemPriceTextBold,
                  { color: getColorForPrice(item.schedule) },
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
                { color: getColorForStatus(item.schedule) },
              ]}
            >
              {item.schedule}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = ({item} : {item: Services}) => {
    return (
      <View style={styles.hiddenItemContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancel(item.id)}
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
          data={services}
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

// export default function Estheticians() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   return (
//     <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
//       <BackButton />
//       <Text>Estheticians</Text>
//     </View>
//   )
// }

