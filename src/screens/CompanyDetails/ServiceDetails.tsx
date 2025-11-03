import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  // ImageSourcePropType,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { RootStackParamList, allReviews } from '../../Navigation/navigation';

import BackButton from '../../Components/BackButton/BackButton';
import { FontType } from '../../Components/Constants/FontType';
import { ScrollView } from 'react-native';
import OrangeButton from '../../Components/OrangeButton';
import { useOutletContext } from '../../Context/OutletContext';

function formattedTime(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  return `${Math.floor(diff / 2592000)} months ago`;
}
const star = require('../../assets/images/Others/star.png');
const ratingStars = [star, star, star, star, star];

// const serviceImage = require('../assets/images/OutletHairTreatment/hairCuts.png');

//data coming from services screen in serviceDetails function as params are:
//                                     services: ServicesData serviceReview: ServiceReview[];

export default function ServiceDetails() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ServiceDetails'>>();
  const { outletId, serviceId } = route.params;

  const { getOutletById } = useOutletContext();
  const outletData = getOutletById(outletId);

  const service = outletData?.services?.find(s => s.id === serviceId);
  const serviceReviews = outletData?.reviews?.filter(
    r => r.serviceId === serviceId,
  );

  const businessIcon = [
    {
      id: 1,
      icon: require('../../assets/images/BusinessInfo/clock.png'),
      description: 'Service Duration',
    },
    {
      id: 2,
      icon: require('../../assets/images/BusinessInfo/shop.png'),
      description: 'Service Duration',
    },
  ];

  if (!outletData || !service) {
    return (
      <View style={styles.container}>
        <Text>Service Details Not Available.</Text>
      </View>
    );
  }

  const renderReviews = ({ item }: { item: allReviews }) => {
    return (
      <>
        <View style={styles.reviewsRowContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              // key={item.id}
              source={
                typeof item.profileImage === 'string'
                  ? { uri: item.profileImage }
                  : item.profileImage
              }
              style={styles.profileImage}
            />
          </View>

          <View style={styles.reviewContent}>
            <View style={styles.nameTimeRow}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{formattedTime(item.time)}</Text>
              </View>
            </View>
            <View style={styles.ratingStarsContainer}>
              {/* key unique rakhne ke liye key is tarah di ha kyunke 
            key={index} dene pr match krrhi thi flatlist ki key se */}
              {ratingStars.map((star, index) => (
                <Image
                  key={`${item.id}-star-${index}`}
                  source={star}
                  style={styles.ratingStars}
                />
              ))}
            </View>
            <Text style={styles.reviewDescription}>{item.description}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <View style={styles.container}>
        <BackButton />
        <Image
          // service.serviceImage? { uri: service.serviceImage} :
          source={require('../../assets/images/OutletHairTreatment/hairCuts.png')}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <View style={[styles.rowContainer]}>
            <Text style={styles.serviceName}>{service.serviceName}</Text>
            <View style={[styles.sevicePriceContainer]}>
              <Text
                style={[
                  styles.servicePrice,
                  {
                    fontSize: FontType.xxlarge,
                    fontWeight: '400',
                    marginTop: 6,
                  },
                ]}
              >
                $
              </Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              Location Permission will be required to view the nearby providers.
              If not permission not provided, the user won't be displayed any
              nearby providers.
            </Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              marginTop: 40,
              flex: 1,
              // backgroundColor: 'cyan',
            }}
          >
            <View style={styles.serviceDetailsContainer}>
              <Text style={styles.serviceDetailsTitle}>Service Details</Text>
              <View style={[styles.serviceDetailsRow]}>
                <Image
                  source={businessIcon[0].icon}
                  style={styles.clockIcon}
                  resizeMode="cover"
                />
                <Text style={styles.serviceDurationText}>
                  {service.serviceDetails.serviceDuration}
                </Text>
              </View>

              <View style={[styles.serviceDetailsRow, { marginTop: 0 }]}>
                <Image
                  key={businessIcon[1].id}
                  source={businessIcon[1].icon}
                  style={styles.shopIcon}
                  resizeMode="cover"
                />
                <Text style={styles.serviceBookingTypeText}>
                  {service.serviceDetails.serviceBookingType}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.serviceReviewsContainer}>
            <View style={styles.serviceReviewsRow}>
              <Text style={styles.serviceReviewsText}>Reviews</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '3%',
                  // backgroundColor: 'cyan',
                }}
              >
                <Image
                  source={require('../../assets/images/Others/star.png')}
                  style={styles.starImage}
                  resizeMode="contain"
                />
                <Text style={styles.serviceRating}>
                  {service.serviceRating.ratingStars}
                  <Text
                    style={{
                      fontSize: FontType.medium,
                      fontWeight: '200',
                      marginLeft: 5,
                    }}
                  >
                    /5.0
                  </Text>
                </Text>
              </View>
            </View>

            {/* <Text style={styles.serviceRating}>{
            serviceReviews && serviceReviews.length > 0
            ? (
            serviceReviews.reduce((sum, review) => 
            sum + review.ratingStars, 0) / serviceReviews.length).toFixed(1) : 0
            // serviceReviews[0].ratingStars : 
            }
            </Text> */}
            <View style={styles.reviewsContainer}>
              <FlatList
                data={
                  serviceReviews && serviceReviews.length > 0
                    ? serviceReviews
                    : [
                        {
                          id: 'fallback-1',
                          serviceId: 's2',
                          name: 'Kelly Bishop',
                          ratingStars: 0,
                          description: 'Amazing Services',
                          time: new Date().toISOString(),
                          profileImage: require('../../assets/images/Review/profileImage.png'),
                        },
                        {
                          id: 'fallback-2',
                          serviceId: 's2',
                          name: 'Sara Khalid',
                          ratingStars: 0,
                          description: 'Just Loved itt!',
                          time: new Date().toISOString(),
                          profileImage: require('../../assets/images/Review/profileImage2.png'),
                        },
                      ]
                }
                renderItem={renderReviews}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={false}
                ListEmptyComponent={
                  <Text
                    style={{ color: 'red', textAlign: 'center', marginTop: 20 }}
                  >
                    No reviews yet
                  </Text>
                }
              />
            </View>

            <OrangeButton
              title="Book Appointment"
              style={styles.bookAppointmentButton}
              onPress={() => navigation.navigate('BookAppointment')}
            ></OrangeButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    // backgroundColor: 'green',
  },
  image: {
    width: '100%',
    height: 200,
  },

  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    marginTop: -40,
    flex: 1,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '88%',
    maxWidth: '90%',
    marginTop: 20,
    // backgroundColor: 'cyan',
  },
  serviceName: {
    fontSize: FontType.xtraLarge,
    fontWeight: '800',
    marginTop: 8,
  },
  sevicePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  servicePrice: {
    fontSize: FontType.xtraLarge,
    fontWeight: '600',
    color: '#F27122',
    marginTop: 5,
  },
  locationContainer: {
    // backgroundColor: 'yellow',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 26,
    marginRight: 50,
  },
  locationText: {
    fontSize: FontType.regular,
    color: '#42526E',
    marginTop: 10,
    // marginLeft: 10,
  },

  serviceDetailsContainer: {
    // backgroundColor: 'purple',
    borderRadius: 10,
    padding: 10,
    marginLeft: 8,
    marginRight: 6,
  },
  serviceDetailsTitle: {
    fontSize: FontType.xlarge,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 10,
    color: '#263238',
  },
  serviceDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 22,
    marginLeft: 11,
    // backgroundColor : 'pink'
  },
  clockIcon: {
    width: 24,
    height: 24,
  },
  shopIcon: {
    width: 24,
    height: 24,
  },
  serviceDurationText: {
    fontSize: FontType.medium,
    color: '#42526E',
    marginLeft: 10,
  },

  serviceBookingTypeText: {
    fontSize: FontType.medium,
    color: '#42526E',
    marginLeft: 12,
  },
  serviceReviewsContainer: {
    width: '99%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'pink',
    marginTop: 40,
  },
  serviceReviewsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'orange',
    alignSelf: 'center',
    width: '93%',
  },
  serviceReviewsText: {
    fontSize: FontType.xlarge,
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 10,
  },
  starImage: {
    width: 20,
    height: 20,
  },

  flatListContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  serviceRating: {
    fontSize: FontType.medium,
    fontWeight: '400',
    marginLeft: 10,
  },
  reviewsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
    // marginLeft: 15,
    // backgroundColor: '#cdcdcd',
    marginVertical: 15,
  },
  reviewsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
    // padding: 10,
    // backgroundColor: 'blue',
  },
  profileImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor : 'cyan',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 8,
    // backgroundColor: 'red',
  },
  reviewContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    // backgroundColor: 'pink',
  },
  nameTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginTop: 5,
  },
  name: {
    fontSize: FontType.large,
    fontWeight: '600',
  },
  timeContainer: {
    // backgroundColor : 'red',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 17,
    color: '#42526E70',
    marginTop: 2,
    marginRight: 5,
    // backgroundColor : 'green'
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '60%',
    marginVertical : 5
    // backgroundColor : 'orange',
  },
  ratingStars: {
    width: 15,
    height: 15,
    marginLeft: 2,
    marginRight: 4,
  },
  reviewDescription: {
    fontSize: FontType.medium,
    // marginTop: 2,
    marginBottom: 10,
    // paddingVertical: 5,
    color: '#42526E',
    overflow: 'hidden',
    marginLeft: 3,
    // backgroundColor : 'orange'
  },
  bookAppointmentButton: {
    width: '101%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
    borderRadius: -8,
  },
});
