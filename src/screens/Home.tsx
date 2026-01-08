import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Container from '../Components/Container';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, OutletData } from '../Navigation/navigation'; // **CHANGE 1: Import OutletData type**
import { FontType } from '../Components/Constants/FontType';
import { Image } from 'react-native';
import RowContainer from '../Components/RowContainer';
import { TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { fetchAllOutlets } from '../API/api';
import { useOutletContext } from '../Context/OutletContext';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// import { useLocation } from '';

const {width, height} = Dimensions.get('window');
const isSmallScreen = height < 800;

export default function Home() {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  // const { userFullName, selectedProfileImage } = useUser();
  const [searchServices, setSearchServices] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [outlets, setOutlets] = useState<OutletData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  
  const userName = useSelector((state : RootState) => state.user.name);
  const profileImage = useSelector((state : RootState) => state.user.profileImage);
  
  useEffect(() => {

  const fetchAndSetOutlets = async () => {
    try{
      setLoading(true)
   const result = await fetchAllOutlets();
   setOutlets(result)
   setError(null);
    }
    catch(error : any){
      console.log(error.message);
      setError(error.message);
      setLoading(false)
    }
    finally{
      setLoading(false)
    }

  }
  fetchAndSetOutlets();
  }, []);


  const handleSearch = () => {
    console.log('searchServices', searchServices);
  };
  const handleViewAll = () => {
    navigation.navigate('Subscription');
  };
  const renderOutlets = ({ item }: { item: OutletData }) => {
    const fallbackImage = require('../assets/images/OutletHairTreatment/hairTreatment.png');
    const fallbackImage2 = require('../assets/images/OutletWindowCleaning/windowService.png');

    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate({serviceName})}
        style={[styles.serviceTouchableContainer]}
        onPress={() =>
          navigation.navigate(
            'MyTabs', {
              outletId: item.id,
          })
        }
      >
        <Image source={ 
          item.outletBgImage && !imageError
          ? {uri : item.outletBgImage as string} 
          : item.id == '1' ? fallbackImage : fallbackImage2
        }
          style={styles.serviceImage}
          onError={() => {setImageError(true)}}
          resizeMode="cover"
          />

        <View style={styles.serviceDetailsColumn}>
          <View style={styles.serviceDetailsRow}>
            <View style={styles.serviceName}>
              <Text style={styles.serviceNameText}>
                {item.services.length > 0 ? 
                item.services[0].serviceName : 'no service'
                }
              </Text>
              <Text style={styles.serviceShopName}>{item.outletName}</Text>
            </View>
            <View
              style={[
                styles.serviceDetailsPrice,
                // { backgroundColor: 'pink' },
              ]}
            >
              <Text style={styles.serviceDetailsPriceText}>
                $
                <Text style={styles.serviceDetailsPriceTextBold}>
                  {
                  item.services.length > 0 ? 
                  item.services[0].price 
                  : 0
                  }
                </Text>
                /h
              </Text>
            </View>
          </View>
        </View>

        {/* closed  */}
      </TouchableOpacity>
    );
  };

// useEffect(() => {

//   const fetchOutlets = async () => {
//     try{
//       setLoading(true)
//       setError(null)
//   const response = await api.get('/outlets')
//   if (response.data && Array.isArray(response.data.outlets)) {
//     setOutlets(response.data.outlets);
//     console.log("API Data:", JSON.stringify(response.data, null, 2));
//   } else {
//     console.log('Invalid data format received from API');
//     console.log(error)
//     setError(error)
//     console.log("API Data:", JSON.stringify(response.data, null, 2));
//   }  
//     } catch (error) {
//       console.log(error,error)
//     }
//     finally{
//       setLoading(false);
//     }
//   }
//   fetchOutlets()
// }, []);

  const serviceCategories = [
    {
      id: '1',
      name: 'Estheticians',
      icon: require('../assets/images/Home/Estheticians.png'), // Or an SVG component
      color: '#0D805640',
      screen: 'Estheticians',
    },
    {
      id: '2',
      name: 'Music Studio',
      icon: require('../assets/images/Home/music_studio.png'),
      color: '#65c9ff',
      screen: 'MusicStudio',
    },
    {
      id: '3',
      name: 'Handyman',
      icon: require('../assets/images/Handyman/Handyman.png'),
      color: '#ffc170',
      screen: 'Handyman',
    },
    {
      id: '4',
      name: 'Barbers',
      icon: require('../assets/images/Home/Barber.png'),
      color: '#ff7070',
      screen: 'Barbers',
    },
    {
      id: '5',
      name: 'Yoga',
      icon: require('../assets/images/Home/yoga.png'),
      color: '#e492ff',
      screen: 'Yoga',
    },
  ];

  type ServiceItem = {
    name: string;
    color: string;
    icon: ImageSourcePropType;
  };

  type Props = {
    item: ServiceItem;
    onPress: () => void;
  };

  const ServiceCategoryItem = ({ item, onPress }: Props) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>
          <Image
            resizeMode="cover"
            source={item.icon}
            style={styles.serviceIcon}
          />
        </View>
       <View style={styles.nameContainer}>
       <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
       </View>
      </TouchableOpacity>
    );
  };
if(loading){
  return(
    <SafeAreaView style={styles.safeArea}>
      <Text>Loading...</Text>
    </SafeAreaView>
  )
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Container style={styles.scrollContent}>
          <View style={styles.mainContainer}>
            <View style={styles.top}>
              <View style={styles.row1}>
                <View style={styles.row}>
                  <Text style={styles.greetingsText}>
                    Hey,{'\t'}
                    <Text style={styles.greetingsTextBold}>
                      {userName || 'Guest'}
                    </Text>
                  </Text>
                </View>
                <Image
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : require('../assets/images/Others/profile.png')
                  }
                  style={styles.userImage}
                />
              </View>
              <Text style={styles.orangeTitle}>Good Afternoon</Text>
            </View>
            <RowContainer>
              <TextInput
                placeholder="Search Nearby Service  "
                style={styles.input}
                // placeholderTextColor='#000'
                // placeholderStyle={styles.searchInputPlaceholder}
                onChangeText={setSearchServices}
                value={searchServices}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                autoCapitalize="none"
              />
              <Image
                source={require('../assets/images/Home/search.png')}
                style={styles.searchIcon}
              />
              <Image
                source={require('../assets/images/Home/line.png')}
                style={styles.inputPlaceHolder}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Filters');

                }}
              >
                <Image
                  source={require('../assets/images/Home/filter.png')}
                  style={styles.filterIcon}
                />
              </TouchableOpacity>
            </RowContainer>
            <TouchableOpacity onPress={handleViewAll} style={styles.viewAll}>
              <Text style={styles.boldUnderlined}>{`View all>`}</Text>
            </TouchableOpacity>
            {/* Service Categories */}
            <View style={styles.servicesRowContainer}>
              <FlatList
                data={serviceCategories}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <ServiceCategoryItem
                    item={item}
                    onPress={() => {
                      // Handle navigation based on screen name
                      switch (item.screen) {
                        case 'Estheticians':
                          navigation.navigate('Estheticians');
                          break;
                        case 'MusicStudio':
                          navigation.navigate('MusicStudio');
                          break;
                        case 'Handyman':
                          navigation.navigate('Handyman');
                          break;
                        case 'Barbers':
                          navigation.navigate('Barbers');
                          break;
                        case 'Yoga':
                          navigation.navigate('Yoga');
                          break;
                        default:
                          console.log('Unknown screen:', item.screen);
                      }
                    }}
                  />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.nearByServicesContainer}>
              <View style={styles.nearByRowContainer}>
                <Text style={styles.nearByText}>Nearby Services</Text>
                <View style={styles.rowContainer}>
                  <Image
                    source={require('../assets/images/Home/naerbyRadiusGPSIcon.png')}
                    style={styles.nearByRadiusGPSIcon}
                  />
                  <Text style={styles.nearByRadiusText}>1 FLE, Porto</Text>
                  {/* <Text style={styles.nearByRadiusText}>{`${userLocation.latitude}, ${userLocation.longitude}`}</Text> */}
                </View>
              </View>


              <FlatList
                data={outlets}
                keyExtractor={item => item.id.toString()}
                renderItem={renderOutlets}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
                scrollEnabled={false}
              />
            </View>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'red', // Add background color
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1, // This is key for proper scrolling
    // backgroundColor: 'green', // // Add bottom padding
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  top: {
    width: '95%',
    minHeight: 120, // Changed from percentage to fixed height
    // backgroundColor: '#cdcdcd',
    marginHorizontal: 10,
    marginTop: 15,
  },
  row1: {
    width: '90%',
    height: 60, // Fixed height instead of percentage
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: 'red',
    marginHorizontal: 15,
    marginTop: 10,
  },
  row: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    marginHorizontal: 1,
  },
  greetingsText: {
    fontSize: FontType.xlarge,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    marginBottom: 4,
    color: '#42526E',
  },
  greetingsTextBold: {
    fontWeight: '700',
    fontSize: FontType.xlarge,
    color: '#42526E',
  },
  orangeTitle: {
    color: '#F27122',
    fontSize: FontType.xtraLarge,
    marginLeft: 16,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '800',
    marginHorizontal: 1,
  },
  userImage: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginLeft: 30,
    marginTop: 20,
    resizeMode: 'cover',
  },
  input: {
    borderColor: '#F27122',
    borderWidth: 0.5,
    borderRadius: 13,
    padding: 10,
    paddingVertical: 14,
    paddingLeft: 62,
    margin: 10,
    color: '#000',
    fontSize: 16,
    width: '100%',
    height: 55,
    alignSelf: 'center',
  },
  searchIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    left: 22,
    top: 26,
    padding: 10,
    color: '#000',
  },
  inputPlaceHolder: {
    width: 1,
    height: 30,
    position: 'absolute',
    right: 69,
    top: 32,
    color: '#F2712280',
    fontWeight: 'bold',
  },
  filterIcon: {
    width: 43,
    height: 43,
    position: 'absolute',
    right: 8,
    top: -59,
    padding: 10,
  },
  viewAll: {
    // backgroundColor : 'blue',
    width: 80,
    height: 30,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: '3%',
    marginTop: '10%',
  },
  viewAllText: {
    fontSize: isSmallScreen ? FontType.medium : FontType.regular,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '800',
    color: '#F27122',
  },
  boldUnderlined: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#F27122',
  },
  // 
  servicesRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // evenly spread
    width: '98%',
    alignSelf: 'center',
    marginVertical: 5,
    // backgroundColor: 'red',

  },
  
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // marginLeft: 6,
    // marginRight: 8,
    marginHorizontal : isSmallScreen? 4 : 9,
    flex: 1,
      // 👈 fixed width so text & icon align
  },
  
  serviceIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center', 
  width: '100%',
  marginTop : '2%'
  // backgroundColor: 'pink',
  },

  name: {
    fontSize: FontType.verysmall,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
    marginTop: 6,
    flexWrap: 'wrap',     // 👈 allow text wrapping        // 👈 keep under each circle
  },
  
  nearByServicesContainer: {
    width: '100%',
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 50,
    // backgroundColor: 'orange',
    justifyContent: 'flex-start',
  },
  nearByRowContainer: {
    width: '100%',
    height: 40, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor : 'blue',
    marginLeft : '10%'
  },
  nearByText: {
    fontSize: FontType.xxlarge,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
    color: '#263238',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor : 'red',
    marginRight: 30,
    marginLeft: 20,
    height: 30,
  },
  nearByRadiusGPSIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  nearByRadiusText: {
    fontSize: FontType.regular,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: '#42526E',
    // backgroundColor : 'red',
marginHorizontal : 10,
  },
  serviceTouchableContainer: {
    width: '95%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,

  },
  serviceImage: {
    width: '100%',
    height: 150,
    marginHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 30,
    resizeMode: 'cover',
  },
  serviceDetailsColumn: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  serviceDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'blue',
    height: '100%',
  },
  serviceName: {
    height: '100%',
    // backgroundColor : 'yellow',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  serviceNameText: {
    fontSize: FontType.xlarge,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    color: '#263238',
    marginLeft: 20,
    marginTop: 20,
  },

  serviceDetailsPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    width: '20%',
    marginRight: 20,
    marginTop: 5,
    // backgroundColor : 'red',
  },
  serviceDetailsPriceText: {
    fontSize: FontType.medium,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: '#42526E',
    marginBottom : 6
  },
  serviceDetailsPriceTextBold: {
    fontSize: FontType.xxxlarge,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    color: '#263238',
  },
  serviceShopName: {
    fontSize: FontType.medium,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: '#F27122',
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: 5,
  },

  touchableServiceItem: {
    width: '20%', // Match the itemContainer width
    alignItems: 'center',
    justifyContent: 'center',
  },
  // backgroundColor: 'blue',
  flatListContainer: {
    marginBottom: 10,
  },
});



  // const outlets = [
  //   {
  //     id: '1',
  //     serviceName: 'Window Cleaning',
  //     outletName: 'Athens Cleaniners',
  //     outletBgImage: require('../assets/images/OutletWindowCleaning/windowService.png'),
  //     outletIcon: require('../assets/images/OutletWindowCleaning/windowGuy.png'),
  //     rating: 4.2,
  //     services: [
  //       {
  //         id: 's1',
  //         serviceName: 'Window Cleaning',
  //         serviceImage: require('../assets/images/OutletWindowCleaning/windowService.png'),
  //         price: 30,
  //       },
  //       {
  //         id: 's2',
  //         serviceName: 'Deep Cleaning',
  //         serviceImage: require('../assets/images/OutletWindowCleaning/deepCleaning.png'),
  //         price: 45,
  //       },
  //     ],
  //     photos: [
  //       {
  //         id: 'p1',
  //         servicePicture: require('../assets/images/OutletWindowCleaning/windowService.png'),
  //       },
  //       {
  //         id: 'p2',
  //         servicePicture: require('../assets/images/OutletWindowCleaning/windowService.png'),
  //       },
  //       {
  //         id: 'p3',
  //         servicePicture: require('../assets/images/OutletWindowCleaning/windowService.png'),
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     serviceName: 'Hair Treatment',
  //     outletName: 'Toni & Guy Saloon',
  //     outletBgImage: require('../assets/images/OutletHairTreatment/hairTreatment.png'),
  //     outletIcon: require('../assets/images/OutletHairTreatment/outlet.png'),
  //     rating: 4.5,
  //     services: [
  //       {
  //         id: 's1',
  //         serviceName: 'Hair Treatment',
  //         serviceImage: require('../assets/images/OutletHairTreatment/hairTreatment.png'),
  //         price: 25,
  //       },
  //       {
  //         id: 's2',
  //         serviceName: 'Hair Cut',
  //         serviceImage: require('../assets/images/OutletHairTreatment/hairCuts.png'),
  //         price: 20,
  //       },
  //     ],
  //     photos: [
  //       {
  //         id: 'p1',
  //         servicePicture: require('../assets/images/OutletHairTreatment/hairTreatment.png'),
  //       },
  //       {
  //         id: 'p2',
  //         servicePicture: require('../assets/images/OutletHairTreatment/hairTreatment.png'),
  //       },
  //       {
  //         id: 'p3',
  //         servicePicture: require('../assets/images/OutletHairTreatment/hairTreatment.png'),
  //       },
  //     ],
  //   },
  // ];