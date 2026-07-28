// const rendernotes = () => {
//   // const { width, height } = Dimensions.get('window');
//   // type Services = {
//   //   id: string;
//   //   image: any;
//   //   title: string;
//   //   outletName: string;
//   //   price: string;
//   //   schedule: string;
//   // };
//   // export default function Estheticians() {
//   //   // const [data, setData] = useState<Services[]>([]);
//   //   const [services, setServices] = useState<Services[]>([
//   //     {
//   //       id: '1',
//   //       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //       title: 'Car Wash',
//   //       outletName: 'Garage Services',
//   //       price: '10',
//   //       schedule: 'May 18, 2022',
//   //     },
//   //     {
//   //       id: '2',
//   //       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //       title: 'Kitchen Cleaning',
//   //       outletName: 'Kitchen Cleaning',
//   //       price: '10',
//   //       schedule: 'Cancelled',
//   //     },
//   //     {
//   //       id: '3',
//   //       image: require('../../assets/images/HomeTabs/BookingsDashboard/service1.png'),
//   //       title: 'Sofa Cleaning',
//   //       outletName: 'SofaShofa',
//   //       price: '10',
//   //       schedule: 'Completed',
//   //     },
//   //   ]);
//   //   function getColorForStatus(schedule: string) {
//   //     switch (schedule) {
//   //       case 'Completed':
//   //         return '#0D8056';
//   //       case 'Cancelled':
//   //         return '#E50914';
//   //       default:
//   //         return '#42526E50';
//   //     }
//   //   }
//   //   function getColorForPrice(schedule: string) {
//   //     switch (schedule) {
//   //       case 'Completed':
//   //         return '#42526E80';
//   //       case 'Cancelled':
//   //         return '#42526E80';
//   //       default:
//   //         return '#F27122';
//   //     }
//   //   }
//   //   //  const rendernotes = () => {
//   //   //    here service in the filter function represents the each service object in the service array
//   //   //   preServices previous ya current value ha services state ki aur
//   //   //   filter function un values ka naya array banata ha jo given condition ko
//   //   //   meet krti hein toh yahan wo her service ko check krega aik aik krke
//   //   //   aur hr dafa service id ko item id se check krega
//   //   //     Now, when filter goes through each service:
//   //   //   For the first service (id: 's1'):
//   //   //   The condition is service.id !== 's2'.
//   //   //   's1' !== 's2' is true, so this service remains in the new array.
//   //   //   For the second service (id: 's2')
//   //   //   The condition is service.id !== 's2'.
//   //   //   's2' !== 's2' is false, so this service is excluded from the new array.
//   //   //   For the third service (id: 's3'):
//   //   //   The condition is service.id !== 's2'.
//   //   //   's3' !== 's2' is true, so this service remains in the new array.
//   //   //   to jb hum cancel button pr click kreinge to woh us particular cell ki
//   //   //   item id ko service id se match krega joke obviously same ayegi aur
//   //   //   jab same ayegi to condition false hojayegi kyunke
//   //   //   condition service.id !== id hai to wo sservice bhi excude hojayegi
//   //   //  }
//   //   const cancel = (id: string) => {
//   //     setServices(preServices =>
//   //       preServices.filter(service => service.id !== id),
//   //     );
//   //   };
//   //   const renderItem = ({ item }: { item: Services }) => {
//   //     return (
//   //       <View style={styles.itemContainer}>
//   //         <Image
//   //           source={item.image}
//   //           style={styles.itemImage}
//   //           resizeMode="cover"
//   //         />
//   //         <View style={styles.rowContainer}>
//   //           <View style={styles.itemDetailsContainer}>
//   //             <Text style={styles.title}>{item.title}</Text>
//   //             <Text style={styles.outletName}>{item.outletName}</Text>
//   //           </View>
//   //           <View style={styles.itemScheduleContainer}>
//   //             <View style={styles.priceContainer}>
//   //               <Text
//   //                 style={[
//   //                   styles.itemPriceTextBold,
//   //                   { color: getColorForPrice(item.schedule) },
//   //                 ]}
//   //               >
//   //                 ${item.price}
//   //                 <Text
//   //                   style={{
//   //                     fontSize: FontType.medium,
//   //                     color: '#42526E80',
//   //                     fontWeight: 400,
//   //                   }}
//   //                 >
//   //                   /hr
//   //                 </Text>
//   //               </Text>
//   //             </View>
//   //             <Text
//   //               style={[
//   //                 styles.itemSchedule,
//   //                 { color: getColorForStatus(item.schedule) },
//   //               ]}
//   //             >
//   //               {item.schedule}
//   //             </Text>
//   //           </View>
//   //         </View>
//   //       </View>
//   //     );
//   //   };
//   //   const renderHiddenItem = ({ item }: { item: Services }) => {
//   //     return (
//   //       <>
//   //         <View style={styles.hiddenItemContainer}>
//   //           <TouchableOpacity
//   //             style={styles.cancelButton}
//   //             onPress={() => cancel(item.id)}
//   //           >
//   //             <Text style={styles.cancel}>x</Text>
//   //             {/* <Image source={require('../../assets/images/HomeTabs/BookingsDashboard/cancelButton.png')} style={styles.cancelButtonImage} resizeMode='cover'/> */}
//   //           </TouchableOpacity>
//   //           <Text style={styles.cancelButtonText}>Cancel</Text>
//   //         </View>
//   //       </>
//   //     );
//   //   };
//   //   return (
//   //     <View style={styles.container}>
//   //       <View style={styles.mainContainer}>
//   //         <SwipeListView
//   //           data={services}
//   //           renderItem={renderItem}
//   //           renderHiddenItem={renderHiddenItem}
//   //           keyExtractor={item => item.id.toString()}
//   //           rightOpenValue={-75} // Makes the item swipeable to the left and shows
//   //           // the "Cancel" button disableRightSwipe
//   //           contentContainerStyle={styles.mainContainer}
//   //           showsVerticalScrollIndicator={false}
//   //           // scrollEnabled={false}
//   //         />
//   //       </View>
//   //     </View>
//   //   );
//   // }
// };

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import BackButton from '../../Components/Global/BackButton/BackButton';
import { FontType } from '../../Components/Constants/FontType';
import Container from '../../Components/Layout/Container';
import {
  estheticiansSubCategories,
  SubCategoryItem,
} from '../../utils/constants/serviceCategoryData';
import { ServiceStack } from '../../Navigation/navigation';
import { getSubCategoriesByCategoryName } from '../../utils/constants/serviceCategoryData';
import { useOutletContext } from '../../Context/OutletContext';
import Loading from '../../Components/Global/Loading';

const { width, height } = Dimensions.get('window');

export default function Estheticians() {
  const route = useRoute<RouteProp<ServiceStack, 'Estheticians'>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { getAllOutlets, loading: contextLoading, error } = useOutletContext(); // Fixed: renamed to avoid conflict

  const [searchServices, setSearchServices] = useState<string>('');
  const [filteredService, setFilteredService] = useState(
    estheticiansSubCategories,
  );
  const [allOutlets, setAllOutlets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Local loading state

  // Fetch outlets when component mounts
  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      setLoading(true);
      const outletsData = await getAllOutlets();
      setAllOutlets(outletsData);
    } catch (error) {
      console.error('Error fetching outlets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchServices(text);
    if (text.trim() === '') {
      setFilteredService(estheticiansSubCategories);
    } else {
      const filtered = estheticiansSubCategories.filter(service =>
        service.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredService(filtered);
    }
  };

  // Filter outlets by service name
  const filterOutletsByService = (serviceName: string) => {
    try {
      const filtered = allOutlets.filter(outlet =>
        outlet.services.some((service: any) =>
          service.serviceName.toLowerCase().includes(serviceName.toLowerCase()),
        ),
      );
      return filtered;
    } catch (error) {
      console.error('Error filtering outlets:', error);
      return [];
    }
  };

  // Handle service press - navigate to Home with filtered outlets
  const handleServicePress = async (serviceName: string) => {
    setLoading(true);
    const filteredOutlets = filterOutletsByService(serviceName);
    
    if (filteredOutlets.length > 0) {
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: {
          filteredOutlets: filteredOutlets,
        },
      });
    } else {
      Alert.alert('No Results', `No outlets found for ${serviceName}`);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: SubCategoryItem }) => {
    return (
      <View style={styles.serviceContainer}>
        <TouchableOpacity
          style={styles.itemWrapper}
          onPress={() => handleServicePress(item.name)}
        >
          <Image
            source={item.icon}
            style={styles.serviceImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text numberOfLines={2} style={styles.serviceName}>
          {item.name}
        </Text>
      </View>
    );
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <Container style={{ backgroundColor: '#f9f9f9' }}>
        <BackButton />
        <View style={styles.topContainer}>
          <Text style={styles.topContainerText}>Estheticians</Text>
        </View>
        <Loading />
      </Container>
    );
  }

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

// YOUR ORIGINAL STYLES - COMPLETELY UNCHANGED
const styles = StyleSheet.create({
  topContainer: {
    width: '90%',
    height: 60,
    marginTop: 150,
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
    height: '60%',
  },
  serviceContainer: {
    width: '25%',
    height: 85,
    borderRadius: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    borderColor: '#F2712250',
    borderWidth: 1,
  },
  itemWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    alignSelf: 'center',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 15,
    marginLeft: 5,
    textAlign: 'center',
  },
});

// ONLY ONE StyleSheet - Use the correct one for your UI
// const styles = StyleSheet.create({
//   topContainer: {
//     width: '90%',
//     height: 60,
//     marginTop: 150,
//   },
//   topContainerText: {
//     fontSize: FontType.titleBold,
//     fontWeight: '900',
//     color: '#263238',
//     marginLeft: 12,
//   },
//   backButtonContainer: {
//     width: '10%',
//     height: 40,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   backButtonText: {
//     fontSize: FontType.title,
//     fontWeight: 'bold',
//     color: '#263238',
//   },
//   input: {
//     borderColor: '#fff',
//     borderWidth: 1,
//     borderRadius: 13,
//     padding: 10,
//     paddingVertical: 14,
//     paddingLeft: 26,
//     margin: 10,
//     color: '#000',
//     fontSize: 16,
//     height: 55,
//     alignSelf: 'center',
//     backgroundColor: '#FFFFFF',
//     width: '94%',
//     elevation: 10,
//   },
//   searchView: {
//     width: '90%',
//     height: 80,
//     alignSelf: 'center',
//     marginTop: 10,
//   },
//   searchIconContainer: {
//     width: 45,
//     height: 45,
//     position: 'absolute',
//     right: 16,
//     top: 16,
//     padding: 10,
//   },
//   searchIcon: {
//     width: 25,
//     height: 25,
//     position: 'absolute',
//     right: 10,
//     top: 10,
//   },
//   mainContainer: {
//     width: '94%',
//     alignSelf: 'center',
//     marginTop: 30,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: '60%',
//   },
//   serviceContainer: {
//     width: '30%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   itemWrapper: {
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
//     width: 45,
//     height: 45,
//     resizeMode: 'contain',
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
