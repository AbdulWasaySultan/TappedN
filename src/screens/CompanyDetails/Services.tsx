import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import { ImageSourcePropType, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FontType } from '../../Components/Constants/FontType';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, MyTabsParamList, OutletData, ServiceReviews, ServicesData, BusinessDetails } from '../../navigation/navigation'; // **CHANGE 1: Import types**
// import { id } from 'date-fns/locale';

// **CHANGE 2: Fixed RenderServices props type**
type RenderServicesProps = {
  services: ServicesData; // Single service object, not array
  outlet: OutletData;
  serviceReviews: ServiceReviews[];
};

const RenderServices = ({services,outlet,serviceReviews} : RenderServicesProps)  => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.serviceTouchableContainer]}
      onPress={() => navigation.navigate('ServiceDetails', {
        service: services,
        outlet,
        serviceReviews, // Provide empty array if not present
      })}
    >
      //flatlist lagega gi yahan kyunke data array me hai 
      <Image source={ services.serviceImage
      ? {uri : services.serviceImage}
      : require('../../assets/images/OutletHairTreatment/hairCuts.png')} style={styles.serviceImage} />
      <View style={styles.serviceDetailsColumn}>
        <View style={styles.serviceDetailsRow}>
          <View style={styles.serviceName}>
            <Text style={styles.serviceNameText}>{services.serviceName}</Text>
            <View style={styles.bookServiceRow}>
            <Text style={styles.bookServiceText}>{`Book Service `}</Text>
            <Image source={require('../../assets/images/Services/right-arrow.png')} style={styles.arrowRightIcon} resizeMode='contain'/>
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
                {services.price}
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

//basic snippet for receiving data from home screen to services screen
// import { useRoute } from '@react-navigation/native';

// function ServiceScreen() {
//   const route = useRoute();
//   const { itemId, otherParam } = route.params;

//   return (
//     // ... display itemId and otherParam
//   );
// }

export default function Services({ outletData, }: { outletData: OutletData }) {
const navigation = useNavigation<NavigationProp<RootStackParamList>>();
const route = useRoute<RouteProp<MyTabsParamList, 'Services'>>();
// const {outletData} = route.params
  
const servicesOffered = outletData.services || [];

// if (!outletData) {
//   return (
//     <View style={styles.container}>
//       <Text>No outlet data available</Text>
//     </View>
//   );
// }

// if (servicesOffered.length === 0) {
//   return (
//     <ScrollView style={styles.scrollView}>
//       <View style={styles.container}>
//         <Text>No services available for this outlet</Text>
//       </View>
//     </ScrollView>
//   );
// }
  return (
    <ScrollView style={styles.scrollView}
    showsVerticalScrollIndicator={false} 
    >
    <View style={styles.container}>
      <FlatList
       showsVerticalScrollIndicator={false}
       contentContainerStyle={styles.flatListContainer}
       scrollEnabled={false}  
       data={servicesOffered}  
       keyExtractor={(service) => service.id.toString()}
       renderItem={({ item }) => {

       let filteredServiceReviews = [];
       //here we are matching the service from the servicesData 
       // or services (in the api) with the serviceId in the 
       // serviceReviews so we display the right review for the 
       // right service
       filteredServiceReviews = outletData.serviceReviews?.filter((review) => review.serviceId.toString() === item.id.toString()) || [];
          return (
          <RenderServices
            services={item}
            outlet={outletData}
            serviceReviews={filteredServiceReviews}
          />
  )}} 
      />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom : 30
  },
  serviceTouchableContainer: {
    width: '88%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
    // backgroundColor : 'red',
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
    height: 95,
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
    // backgroundColor : 'red',
  },
  serviceDetailsPriceText: {
    fontSize: FontType.medium,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
    color: '#42526E',
  },
  serviceDetailsPriceTextBold: {
    fontSize: FontType.xxxlarge,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    color: '#263238',
  },
  bookServiceRow : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    // backgroundColor : 'pink'
  },
  bookServiceText: {
    fontSize: FontType.medium,
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    color: '#0D8056',
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
  arrowRightIcon : {
    width : 22,
    height : 22,
    marginLeft : 5,
    marginTop : 6,
  }
});
