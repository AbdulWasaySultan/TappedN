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
} from '../navigation/navigation';

import Services from './CompanyDetails/Services';
import Reviews from './CompanyDetails/Reviews';
import BusinessInfo from './CompanyDetails/BusinessInfo';

import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';

const Tab = createMaterialTopTabNavigator<MyTabsParamList>();

const ServiceCompany = ({ outlet }: { outlet: OutletData }) => {
  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
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
            source={require('../assets/images/star.png')}
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
  const {outletData} =  route.params


  // console.log(serviceData);

  if (!outletData) {
    return (
      <View style={styles.container}>
        <Text>No data available. Please select an outlet.</Text>
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
        //  component={Services}
         children={() => <Services outletData={outletData} />}
        />

        <Tab.Screen
          name="Business Info"
          // component={BusinessInfo}
          children={() => <BusinessInfo outletData={outletData}/>}
        />

        <Tab.Screen name="Reviews" 
        // component={Reviews} 
        children={() => 
          <Reviews 
          outletData={outletData}
          outletReviews={outletData.outletReviews}
        />} 
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
  },

  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: -26,
  },
  outletIcon: {
    width: 120,
    height: 120,
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
    gap: 6,
    marginBottom: 10,
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
    marginTop: 2,
  },
  ratingText2: {
    fontSize: FontType.medium,
    color: '#42526E80',
  },
});
