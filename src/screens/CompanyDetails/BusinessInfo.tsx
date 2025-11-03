import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontType } from '../../Components/Constants/FontType';
import {
  MyTabsParamList,
  BusinessDetails,
  OutletData,
} from '../../Navigation/navigation';
// import { useRoute, RouteProp } from '@react-navigation/native';
import { useOutletContext } from '../../Context/OutletContext';

type BusinessInfoProps = {
  outletId: string;
};

export default function BusinessInfo({ outletId }: BusinessInfoProps) {
  const { getOutletById } = useOutletContext();
  const outletData = getOutletById(outletId);

  if (!outletData) {
    return (
      <View style={styles.container}>
        <Text>No outlet data available</Text>
      </View>
    );
  }

  // const route = useRoute<RouteProp<MyTabsParamList, 'BusinessInfo'>>();
  // const { outletData } = route.params;

  const outletpics = [
    require('../../assets/images/BusinessInfo/hairTreatment.png'),
    require('../../assets/images/BusinessInfo/hairCuts.png'),
    require('../../assets/images/BusinessInfo/picture1.png'),
  ];

  // const outletpic2 =  require('../../assets/images/BusinessInfo/hairCuts2.png');
  // const outletpic3 =  require('../../assets/images/BusinessInfo/hairCuts3.png');
  const photos = outletData?.photos || [];
  const icon1 = require('../../assets/images/BusinessInfo/radius.png');
  const icon2 = require('../../assets/images/BusinessInfo/clock.png');
  const icon3 = require('../../assets/images/BusinessInfo/contact.png');
  const icon4 = require('../../assets/images/BusinessInfo/shop.png');
  const icon5 = require('../../assets/images/BusinessInfo/globeIcon.png');
  const icon6 = require('../../assets/images/BusinessInfo/locationIcon.png');

  const icons = [icon1, icon2, icon3, icon4, icon5, icon6];

  const ServicePictures = () => {
    return outletData.photos
      ? outletData.photos.map((photo, index) => (
          <Image
            key={photo.id || index}
            source={{ uri: photo.servicePicture }}
            style={styles.picture}
            resizeMode="cover"
          />
        ))
      : outletpics.map((pics, index) => (
          <Image
            key={index}
            source={pics}
            style={styles.picture}
            resizeMode="cover"
          />
        ));
  };

  type BusinessInfoScreenProps = MyTabsParamList['Business Info'];

  const RenderBusinessDetails = ({
    details,
  }: {
    details?: BusinessDetails[];
  }) => {
    return (
      <>
        {icons?.map((businessIcon, index) => {
          const description =
            details?.[index]?.description || 'No details available';
          return (
            <View key={index} style={styles.businessDetailsRow}>
              <Image source={businessIcon} style={styles.icon} />
              <Text style={styles.description}>{description}</Text>
            </View>
          );
        })}
      </>
    );
  };

  // if(details && details.length > 0){
  // return (
  //   details?.map(detail => (
  //   <View key={detail.id} style={styles.businessDetailsRow}>
  //     {/*using key to avoid warning*/}
  //     <Image  source={{ uri: detail.icon as string }} style={styles.icon}/>
  //     <Text style={styles.description}>{detail.description}</Text>
  //     </View>
  //   )))
  // }
  //   return (
  //     icons?.map((businessIcon,index) => (
  //     <View key={index} style={styles.businessDetailsRow}>
  //       <Image source={businessIcon} style={styles.icon}/>
  //       <Text style={styles.description}>No details available</Text>
  //       </View>
  //    )))
  // if(details && details.length > 0){
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.aboutContainer}>
          <Text style={styles.title}>About</Text>
          <Text style={[styles.description, { marginTop: 10 }]}>
            Location Permission will be required to view the nearby providers.{' '}
          </Text>
          <Text style={[styles.title, { marginTop: 14 }]}>Pictures</Text>
        </View>
        <View style={styles.pictureContainer}>
          <ServicePictures />
        </View>
        <View style={styles.businessDetailsContainer}>
          <Text
            style={[
              styles.title,
              { marginBottom: 20, marginLeft: 6, marginTop: 0 },
            ]}
          >
            Business Details
          </Text>
          <RenderBusinessDetails details={outletData.businessDetails} />
        </View>

        <View style={styles.viewDirectionContainer}>
          <TouchableOpacity style={styles.viewDirection}>
            <Text style={styles.orangeText}>View Direction In Map</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/BusinessInfo/phone.png')}
            style={styles.phoneIcon}
          />
        </View>
        {/* <Text>{outletData.outletName}</Text> */}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  aboutContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    // backgroundColor: 'pink',
  },
  title: {
    fontSize: FontType.xlarge,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  description: {
    fontSize: FontType.regular,
    color: '#42526E',
    paddingHorizontal: 8,
  },
  mainContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  pictureContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 4,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    // backgroundColor: 'pink',
  },
  picture: {
    width: 85,
    height: 85,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  businessDetailsContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    // backgroundColor: 'orange',
  },
  businessDetailsRow: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    marginLeft: 8,
  },
  viewDirectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    // backgroundColor : 'blue',
    paddingHorizontal: 0,
  },
  viewDirection: {
    borderColor: '#F27122',
    borderWidth: 1.5,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 15,
    alignSelf: 'center',
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  orangeText: {
    color: '#F27122',
    fontSize: FontType.medium,
    fontWeight: 'bold',
  },
  phoneIcon: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginLeft: -10,
  },
});
