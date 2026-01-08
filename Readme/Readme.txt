splash images ka folder ki location change ki hai agr masla ho to jahan used hua ha wahan path update krna ha


tabs screens change krne pr deleted items undelete horhe hein
agr topnavigator bar wali approach se na krein to aur agr krein 
to slide horaha ha??



modular sdk version use krrha hun mtlb bundle size chota 
hojayega mtlb poora firebase ki lib ko projet mein add nhi krna 
prega sirf woh lib install hongi jin ki zaroorat ha

user jab kisi service ko rate kare to wo save bhi ho yaani koi state management lib shayd lage mgr ispr pehle chatgpt pr homework karoonga phir implement hoga

Take the user’s email.

Call Firebase’s password reset API.

Show a message that a reset link or OTP has been sent.





{
"outlets": [
{
"id": "1",
"serviceName": "Barber Services",
"outletName": "Modern Cut Barbershop",
"outletBgImage": "https://images.unsplash.com/photo-1555992336-03a23c0b7b26?auto=format&fit=crop&w=1200&q=80",
"outletIcon": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
"rating": 4.6,
"outletReviews": [
{
"id": 1,
"outletId": "1",
"name": "Ali Raza",
"ratingStars": 5,
"description": "Excellent haircut! The barber listened carefully and styled exactly how I wanted.",
"time": "2025-08-27T09:15:00Z",
"profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
},
{
"id": 2,
"outletId": "1",
"name": "Hamza Khan",
"ratingStars": 4,
"description": "Good service, clean shop and professional staff. Slight delay in appointment.",
"time": "2025-08-20T10:45:00Z",
"profileImage": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80"
}
],
"services": [
{
"id": "101",
"serviceName": "Men's Haircut",
"serviceImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
"price": 25,
"serviceDetails": {
"id": "d101",
"serviceDuration": "30 minutes"
},
"serviceRating": {
"id": "1",
"ratingStars": 5,
"reviews": 239
}
},
{
"id": "102",
"serviceName": "Classic Shave",
"serviceImage": "https://images.unsplash.com/photo-1551854838-0c3b3c5b2d9b?auto=format&fit=crop&w=800&q=80",
"price": 18,
"serviceDetails": {
"id": "d102",
"serviceDuration": "25 minutes"
},
"serviceRating": {
"id": "2",
"ratingStars": 4,
"reviews": 98
}
}
],
"photos": [
{
"id": "p1",
"servicePicture": "https://images.unsplash.com/photo-1542144612-1f8f0f0b6b8a?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p2",
"servicePicture": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p3",
"servicePicture": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
}
],
"businessDetails": [
{
"id": 1,
"icon": "https://example.com/assets/images/BusinessInfo/radius.png",
"description": "1.2 miles away"
},
{
"id": 2,
"icon": "https://example.com/assets/images/BusinessInfo/clock.png",
"description": "9:00 am - 7:00 pm"
},
{
"id": 3,
"icon": "https://example.com/assets/images/BusinessInfo/contact.png",
"description": "+1 (212) 555-0198"
},
{
"id": 4,
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "Walk-in & Appointments"
},
{
"id": 5,
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
"description": "www.moderncutnyc.com"
},
{
"id": 6,
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
"description": "230 West 34th St, New York, NY"
}
]
}
]
}

import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FontType } from '../../Components/Constants/FontType';
import {
  RootStackParamList,
  MyTabsParamList,
} from '../../Navigation/navigation';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useOutletContext } from '../../Context/OutletContext';

type ServicesComponentsProp = {
  outletId: string;
};

export default function Services({outletId}: ServicesComponentsProp) {
  const { getOutletById } = useOutletContext();
  const outletData = getOutletById(outletId);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (!outletData) {
    return (
      <View style={styles.container}>
        <Text> Error fetching details</Text>
      </View>
    );
  }

  // The data you need is now directly in props:
  const servicesOffered = outletData?.services || [];

  if (servicesOffered.length === 0) {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text>No services available for this outlet</Text>
        </View>
      </ScrollView>
    );
  }

  console.log(outletData); // Check if the data structure is correct
  console.log(outletData?.reviews); // Check if reviews exist
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          scrollEnabled={false}
          data={sevicesOffered}
          keyExtractor={service => service.id}
          renderItem={({ item }) => (
            <RenderServices
              serviceId={item.id}
              outletId={outletId}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}

type RenderServicesProps = {
  outletId: string;
  serviceId: string;
};

// const RenderServices = ({services,outlet,serviceReviews} : RenderServicesProps)  => {

const RenderServices = ({ outletId, serviceId }: RenderServicesProps) => {
  const { getOutletById } = useOutletContext();
  const outletData = getOutletById(outletId);
  const serviceData = outletData?.services.find(
    service => service.id === serviceId,
  );

  if (!serviceData) {
    return (
      <View style={styles.container}>
        <Text> Error fetching details</Text>
      </View>
    );
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.serviceTouchableContainer]}
      onPress={() =>
        navigation.navigate('ServiceDetails', {
          serviceId,
          outletId,
        })
      }
    >
      //flatlist lagega gi yahan kyunke data array me hai
      <Image
        source={
          serviceData.serviceImage
            ? { uri: serviceData.serviceImage }
            : require('../../assets/images/OutletHairTreatment/hairCuts.png')
        }
        style={styles.serviceImage}
      />
      <View style={styles.serviceDetailsColumn}>
        <View style={styles.serviceDetailsRow}>
          <View style={styles.serviceName}>
            <Text style={styles.serviceNameText}>
              {serviceData.serviceName}
            </Text>
            <View style={styles.bookServiceRow}>
              <Text style={styles.bookServiceText}>{`Book Service `}</Text>
              <Image
                source={require('../../assets/images/Services/right-arrow.png')}
                style={styles.arrowRightIcon}
                resizeMode="contain"
              />
            </View>
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
                {serviceData.price}
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








{
"outlets": [
{
"id": "1",
"outletName": "Tony&Guy",
"outletBgImage": "https://images.unsplash.com/photo-1555992336-03a23c0b7b26?auto=format&fit=crop&w=1200&q=80",
"outletIcon": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
"rating": 4.6,

"services": [
{
"id": "s1",
"serviceName": "Hair&Cut",
"serviceImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
"price": 25,
"serviceDetails": {
"id": "d101",
"serviceDuration": "30 minutes",
"serviceBookingType": "In-Store & Home Service"
},
"serviceRating": {
"id": "1",
"ratingStars": 5,
"reviews": 239
}
},
{
"id": "s2",
"serviceName": "Window Cleaning",
"serviceImage": "https://images.unsplash.com/photo-1551854838-0c3b3c5b2d9b?auto=format&fit=crop&w=800&q=80",
"price": 18,
"serviceDetails": {
"id": "d102",
"serviceDuration": "25 minutes",
"serviceBookingType": "In-Store"
},
"serviceRating": {
"id": "2",
"ratingStars": 4,
"reviews": 98
}
}
],
"photos": [
{
"id": "p1",
"servicePicture": "https://images.unsplash.com/photo-1542144612-1f8f0f0b6b8a?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p2",
"servicePicture": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p3",
"servicePicture": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
}
],
"businessDetails": [
{
"id": "1",
"icon": "https://example.com/assets/images/BusinessInfo/radius.png",
"description": "1.2 miles away"
},
{
"id": "2",
"icon": "https://example.com/assets/images/BusinessInfo/clock.png",
"description": "9:00 am - 7:00 pm"
},
{
"id": "3",
"icon": "https://example.com/assets/images/BusinessInfo/contact.png",
"description": "+1 (212) 555-0198"
},
{
"id": "4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "Walk-in & Appointments"
},
{
"id": "5",
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
"description": "www.moderncutnyc.com"
},
{
"id": "6",
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
"description": "230 West 34th St, New York, NY"
}
],

outletRating : {
      id: "1";
  ratingStars: "5";
  noOfReviews: "500";
}
"reviews": [
{
"id": "1",
"outletId": "1",
"serviceId": "s1",
"name": "Ali Raza",
"ratingStars": 5,
"description": "Excellent haircut! The barber listened carefully and styled exactly how I wanted.",
"time": "2025-08-27T09:15:00Z",
"profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
},
{
"id": "2",
"outletId": "1",
"serviceId": "s2",
"name": "Hamza Khan",
"ratingStars": 4,
"description": "Good service, clean shop and professional staff. Slight delay in appointment.",
"time": "2025-08-20T10:45:00Z",
"profileImage": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80"
},
{
"id": "3",
"outletId": "1",
"serviceId": "s2",
"name": "Sara Khalid",
"ratingStars": 5,
"description": "Quick and spotless window cleaning!",
"time": "2025-09-01T14:00:00Z",
"profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
},
{
"id": "4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "Walk-in & Appointments"
},
{
"id": "5",
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
"description": "www.moderncutnyc.com"
},
{
"id": "6",
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
"description": "230 West 34th St, New York, NY"
}
],
}
]
}














{
"outlets": [
{
"id": "1",
"outletName": "Tony&Guy",
"outletBgImage": "https://images.unsplash.com/photo-1555992336-03a23c0b7b26?auto=format&fit=crop&w=1200&q=80",
"outletIcon": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
"rating": 4.6,
"services": [
{
"id": "s1",
"serviceName": "Hair&Cut",
"serviceImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
"price": 25,
"serviceDetails": {
"id": "d101",
"serviceDuration": "30 minutes",
"serviceBookingType": "In-Store & Home Service"
},
"serviceRating": {
"id": "1",
"ratingStars": 5,
"reviews": 239
}
},
{
"id": "s2",
"serviceName": "Window Cleaning",
"serviceImage": "https://images.unsplash.com/photo-1551854838-0c3b3c5b2d9b?auto=format&fit=crop&w=800&q=80",
"price": 18,
"serviceDetails": {
"id": "d102",
"serviceDuration": "25 minutes",
"serviceBookingType": "In-Store"
},
"serviceRating": {
"id": "2",
"ratingStars": 4,
"reviews": 98
}
}
],
"photos": [
{
"id": "p1",
"servicePicture": "https://images.unsplash.com/photo-1542144612-1f8f0f0b6b8a?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p2",
"servicePicture": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
},
{
"id": "p3",
"servicePicture": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
}
],
"businessDetails": [
{
"id": "1",
"description": "1.2 miles away",
"icon": "https://example.com/assets/images/BusinessInfo/radius.png"
},
{
"id": "2",
"description": "9:00 am - 7:00 pm",
"icon": "https://example.com/assets/images/BusinessInfo/clock.png"
},
{
"id": "3",
"description": "+1 (212) 555-0198",
"icon": "https://example.com/assets/images/BusinessInfo/contact.png"
},
{
"id": "4",
"description": "Walk-in & Appointments",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png"
},
{
"id": "5",
"description": "www.moderncutnyc.com",
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png"
},
{
"id": "6",
"description": "230 West 34th St, New York, NY",
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png"
}
],
"outletRating": {
"id": "1",
"ratingStars": 5,
"outletReviewCount": 500
},
"reviews": [
{
"id": "1",
"outletId": "1",
"serviceId": "s1",
"name": "Ali Raza",
"ratingStars": 5,
"description": "Excellent haircut! The barber listened carefully and styled exactly how I wanted.",
"time": "2025-08-27T09:15:00Z",
"profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
},
{
"id": "2",
"outletId": "1",
"serviceId": "s2",
"name": "Hamza Khan",
"ratingStars": 4,
"description": "Good service, clean shop and professional staff. Slight delay in appointment.",
"time": "2025-08-20T10:45:00Z",
"profileImage": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80"
}
]
}
],
"previousBookings": [
{
"id": "pb1",
"outletId": "1",
"image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
"title": "Haircut",
"outletName": "Tony&Guy",
"price": "$25",
"schedule": "2025-08-01, 2:00 PM"
},
{
"id": "pb2",
"outletId": "1",
"image": "https://images.unsplash.com/photo-1551854838-0c3b3c5b2d9b?auto=format&fit=crop&w=800&q=80",
"title": "Window Cleaning",
"outletName": "Tony&Guy",
"price": "$18",
"schedule": "2025-08-03, 12:30 PM"
}
]
}