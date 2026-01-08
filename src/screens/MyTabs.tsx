import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {
  RootStackParamList,
  MyTabsParamList,
  OutletData,
  allReviews,    
} from '../navigation/navigation';

import Services from './CompanyDetails/Services';
import Reviews from './CompanyDetails/Reviews';
import BusinessInfo from './CompanyDetails/BusinessInfo';

import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';
import { useOutletContext } from '../Context/OutletContext';

const Tab = createMaterialTopTabNavigator<MyTabsParamList>();

const ServiceCompany = ({ outlet }: { outlet: OutletData}) => {
  return (
    <View style={{ backgroundColor: '#fff', width : '100%' }}>
      <BackButton />
      <Image
        source= { require('../assets/images/OutletHairTreatment/hairCuts.png') ||{uri: outlet.outletBgImage}}
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.contentContainer}>
      <Image
        source={ require('../assets/images/OutletHairTreatment/outlet.png') ||{ uri: outlet.outletIcon }}
        style={styles.outletIcon}
        resizeMode='contain'

  // source={typeof outlet.outletIcon === 'string'
  //   ? { uri: outlet.outletIcon }
  //   : outlet.outletIcon}
  // style={styles.outletIcon}
/>
{/* outlet.outletName */}
        <Text style={styles.outletName}>{outlet.outletName}</Text>
        <View style={styles.outletRating}>
          <Image
            source={require('../assets/images/Others/star.png')}
            style={styles.starImage}
          />
          <Text style={styles.ratingText}>
              {outlet.rating}
            <Text style={styles.ratingText2}>/5.0</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};


export default function MyTabs() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'MyTabs'>>();
  // const {outletData, serviceReviews, outletReviews} =  route.params
  const {outletId} = route.params;
  const {getOutletById} = useOutletContext();
  const outletData = getOutletById(outletId);



  // console.log(serviceData);

  if (!outletData) {
    return (
      <View style={styles.container}>
        <Text>No data available. Please select an outlet.</Text>
        <TouchableOpacity
        style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.filters}>Filters</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ServiceCompany outlet={outletData}/>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderBottomWidth: 2, // make the line bold
            borderBottomColor: '#00000020',
          },
          tabBarIndicatorContainerStyle: { width: '90%', marginHorizontal: 15},
          tabBarIndicatorStyle: { backgroundColor: '#FF7043', height: 4},
          tabBarLabelStyle: {
            fontSize: FontType.medium,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarItemStyle: { width: 'auto', marginLeft : 20, padding: 0,maxWidth : 400 },
          tabBarActiveTintColor: '#FF7043',
          tabBarInactiveTintColor: '#42526E',
        }}
      >
       <Tab.Screen
        name="Services" 
        children={() => <Services outletId={outletId}/>}
       />

        {/* // // The children function receives { route, navigation } as arguments
        // // children={({ route }) => (
        //   // route.params will contain { outletData: ... }
        //   // The ?. handles cases where route.params might be undefined 
        //   // (though it shouldn't be, the component itself expects the data)
        //   <Services  */}

      {/* <Tab.Screen
        name="Business Info"
        children={({ route }) => (
          <BusinessInfo 
            outletData={route.params?.outletData} 
          />
        )}
      /> */}

<Tab.Screen
        name="Business Info"
        children={() => <BusinessInfo outletId={outletId}/>}
          />
         <Tab.Screen
        name="Reviews"
        children={() => <Reviews outletId={outletId}/>}
            />

        
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: 200,
  },

  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 26,
    marginTop: -35,
  },
  outletIcon: {
    width: 110,
    height: 110,
    marginTop: -50,
  },
  outletName: {
    fontSize: FontType.titleBold,
    fontWeight: '900',
    marginTop: 10,
  },
  outletRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    width: 95,
    height: 30,
    gap: 8,
    marginBottom: 20,
    alignSelf: 'center',
    // backgroundColor : 'red'
  },
  starImage: {
    width: 22,
    height: 22,
  },
  ratingText: {
    fontSize: FontType.medium,
    fontWeight: '600',
    color: '#42526E',
    marginTop: 1,
  },
  ratingText2: {
    fontSize: FontType.medium,
    color: '#42526E80',
  },
  back:{
    width : '80%',
    height : '10%',
    borderRadius: 10,
    alignSelf : 'center',
    backgroundColor : 'red',
    justifyContent : 'center',
    alignItems : 'center'
  },
  filters:{
    color : '#fff',
    fontSize : FontType.large,
    alignSelf : 'center',
  }
});
