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
  TextInput
} from 'react-native';
import { useNavigation,useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import { NavigationProp } from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';
import { useState } from 'react';
import { FontType } from '../../Components/Constants/FontType';
import { RFValue } from 'react-native-responsive-fontsize'; // Import for responsive font size
import { SwipeListView } from 'react-native-swipe-list-view';
import Container from '../../Components/Container'; 

const { width, height } = Dimensions.get('window');

// type Services = {
//   id: string;
//   image: any;
//   title: string;
//   outletName: string;
//   price: string;
//   schedule: string;
// };

// export default function Estheticians() {
//   // const [data, setData] = useState<Services[]>([]);
//   const [services, setServices] = useState<Services[]>([
//     {
//       id: '1',
//       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//       title: 'Car Wash',
//       outletName: 'Garage Services',
//       price: '10',
//       schedule: 'May 18, 2022',
//     },
//     {
//       id: '2',
//       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//       title: 'Kitchen Cleaning',
//       outletName: 'Kitchen Cleaning',
//       price: '10',
//       schedule: 'Cancelled',
//     },
//     {
//       id: '3',
//       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//       title: 'Sofa Cleaning',
//       outletName: 'SofaShofa',
//       price: '10',
//       schedule: 'Completed',
//     },
//   ]);

//   function getColorForStatus(schedule: string) {
//     switch (schedule) {
//       case 'Completed':
//         return '#0D8056';
//       case 'Cancelled':
//         return '#E50914';
//       default:
//         return '#42526E50';
//     }
//   }

//   function getColorForPrice(schedule: string) {
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
//   setServices(preServices => preServices.filter(service => service.id !== id))
//   };
//   const renderItem = ({ item }: { item: Services }) => {
//     return (
//       <View style={styles.itemContainer}>
//         <Image
//           source={item.image}
//           style={styles.itemImage}
//           resizeMode="cover"
//         />
//         <View style={styles.rowContainer}>
//           <View style={styles.itemDetailsContainer}>
//             <Text style={styles.title}>{item.title}</Text>
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

//   const renderHiddenItem = ({item} : {item: Services}) => {
//     return (
//       <>
//         <View style={styles.hiddenItemContainer}>
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => cancel(item.id)}
//           >
//             <Text style={styles.cancel}>x</Text>
//             {/* <Image source={require('../../assets/images/HomeTabs/BookingsDashboard/cancelButton.png')} style={styles.cancelButtonImage} resizeMode='cover'/> */}
//           </TouchableOpacity>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </View>
//       </>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.mainContainer}>
//         <SwipeListView
//           data={services}
//           renderItem={renderItem}
//           renderHiddenItem={renderHiddenItem}
//           keyExtractor={item => item.id.toString()}
//           rightOpenValue={-75} // Makes the item swipeable to the left and shows
//           // the "Cancel" button disableRightSwipe
//           contentContainerStyle={styles.mainContainer}
//           showsVerticalScrollIndicator={false}
//           // scrollEnabled={false}
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
//     // padding : 6,
//     marginBottom: 8,
//     marginHorizontal: 14,
//     justifyContent: 'space-between',
//   },
//   itemDetailsContainer: {
//     // backgroundColor: 'blue',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     width: 'auto',
//   },
//   title: {
//     // fontSize: width > 360 ? FontType.medium : FontType.regular,
//     fontSize: RFValue(15),
//     fontWeight: 700,
//     color: '#263238',
//     marginVertical: 10,
//   },
//   outletName: {
//     // fontSize: width > 360 ? FontType.regular : FontType.small,
//     fontSize: RFValue(12.5),
//     fontWeight: 400,
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
//     fontSize: RFValue(18.5),
//     fontWeight: 700,
//     color: '#F27122',
//   },
//   itemSchedule: {
//     // fontSize: width > 360 ? FontType.regular : FontType.small,
//     fontSize: RFValue(12.5),
//     fontWeight: 400,
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
// });

export default function Estheticians() {
  const route = useRoute<RouteProp<RootStackParamList, 'Estheticians'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Updated services for Estheticians
  const allServices = [
    { id: 1, name: 'Basic Facial', image: require('../../assets/images/Estheticians/facial.png') },
    { id: 2, name: 'Chemical Peel', image: require('../../assets/images/Estheticians/peel.png') },
    { id: 3, name: 'Microderm', image: require('../../assets/images/Estheticians/microderm.png') },
    { id: 4, name: 'Waxing', image: require('../../assets/images/Estheticians/waxing.png') },
    { id: 5, name: 'Lash Lift', image: require('../../assets/images/Estheticians/lashes.png') },
    { id: 6, name: 'Brow Tint', image: require('../../assets/images/Estheticians/brows.png') },
    { id: 7, name: 'Extractions', image: require('../../assets/images/Estheticians/extractions.png') },
    { id: 8, name: 'Dermaplane', image: require('../../assets/images/Estheticians/dermaplaning.png') },
    { id: 9, name: 'Skin Consult', image: require('../../assets/images/Estheticians/skinConsultant.png') },
  ];

  const [searchServices, setSearchServices] = useState<string>('');
  const [filteredService, setFilteredService] = useState(allServices);

  const handleSearch = (text: string) => {
    setSearchServices(text);
    if (text.trim() === '') {
      setFilteredService(allServices);
    } else {
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredService(filtered);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.serviceContainer}>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => {/* Navigate to Service Details */}}
        >
          <Image 
            source={item.image} 
            style={styles.serviceImage} 
            resizeMode='cover'
          />
        </TouchableOpacity>
        <Text numberOfLines={2} style={styles.serviceName}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <Container style={{ backgroundColor: '#f9f9f9' }}>
      <BackButton />
      
      <View style={styles.topContainer}>
        <Text style={styles.topContainerText}>Estheticians</Text>
      </View>

      <View style={styles.searchView}>
        <TextInput
          placeholder="Search Services"
          placeholderTextColor="#42526E"
          style={styles.input}
          value={searchServices}
          onChangeText={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => handleSearch(searchServices)}
          style={styles.searchIconContainer}
        >
          <Image
            source={require('../../assets/images/Home/search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

       <View style={styles.mainContainer}>
             <FlatList
               keyExtractor={item => item.id.toString()}
               data={filteredService}
               renderItem={renderItem}
               numColumns={3}
               // scrollEnabled={false}
               columnWrapperStyle={{
                 justifyContent: 'space-between',
                 marginBottom: 100,
               }}
               showsVerticalScrollIndicator={false}
             />
      </View>
    </Container>
  );
}

// const styles = StyleSheet.create({
//   topContainer: {
//     width: '90%',
//     marginTop: 150,
//     marginBottom: 10,
//   },
//   topContainerText: {
//     fontSize: FontType.titleBold,
//     fontWeight: '900',
//     color: '#263238',
//     marginLeft: 12,
//   },
//   input: {
//     borderRadius: 13,
//     paddingLeft: 26,
//     color: '#000',
//     fontSize: 16,
//     height: 55,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchView: {
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 10,
//     zIndex: 1,
//   },
//   searchIconContainer: {
//     position: 'absolute',
//     right: 15,
//     top: 15,
//   },
//   searchIcon: {
//     width: 25,
//     height: 25,
//   },
//   mainContainer: {
//     flex: 1,
//     width: '94%',
//     alignSelf: 'center',
//     marginTop: 30,
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 25,
//   },
//   itemWrapper: {
//     width: '30%',
//     alignItems: 'center',
//   },
//   serviceContainer: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderColor: '#F2712250',
//     borderWidth: 1,
//     elevation: 3,
//   },
//   serviceImage: {
//     width: '55%',
//     height: '55%',
//   },
//   serviceName: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#263238',
//     marginTop: 10,
//     textAlign: 'center',
//     width: '100%',
//   },
// });
const styles = StyleSheet.create({
  // safeArea:{
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  // },

  topContainer: {
    width: '90%',
    height: 60,
    marginTop: 150,
    // marginTop : Dimensions.get('window').height * 0.1,
    // backgroundColor : 'red'
  },
  topContainerText: {
    fontSize: FontType.titleBold,
    fontWeight: '900',
    color: '#263238',
    marginLeft: 12,
  },
  backButtonContainer: {
    width: '10%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: FontType.title,
    fontWeight: 'bold',
    color: '#263238',
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    paddingVertical: 14,
    paddingLeft: 26,
    margin: 10,
    color: '#000',
    fontSize: 16,
    height: 55,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '94%',
    elevation: 10,
  },
  searchView: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
  },
  searchIconContainer: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 10,
    // backgroundColor: '#000',
  },
  searchIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 6,
    padding: 10,
  },
  mainContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor : 'pink',
    height: '60%',
  },
  serviceContainer: {
    width: '25%',
    height: 90,
    borderRadius: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#cdcdcd',
    marginHorizontal: 10,
    borderColor: '#F2712250',
    borderWidth: 1,
  },
  itemWrapper:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    // marginTop: 24,
    // marginLeft: 3,
    alignSelf: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 15,
    marginLeft: 5,
    textAlign: 'center',
  },
  // suggestionText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#000',

  //   marginHorizontal: 10,
  //   // borderBottomWidth: 1,
  //   borderBottomColor: '#000',
  //   padding: 20,
  //   backgroundColor: '#fff',
  //   flex: 1,
  // },
});
