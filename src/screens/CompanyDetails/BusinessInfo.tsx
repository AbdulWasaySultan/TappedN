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
  HomeTabsParamList,
  RootStackParamList,
} from '../../Navigation/navigation';
// import { useRoute, RouteProp } from '@react-navigation/native';
import { useOutletContext } from '../../Context/OutletContext';
import { useServiceProviders } from '../../redux/useServiceProviders';
import { createOrGetChat } from '../../screens/Firebase/chatUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type BusinessInfoProps = {
  outletId: string;
};

export default function BusinessInfo({ outletId }: BusinessInfoProps) {
  const { getOutletById } = useOutletContext();
  const { getProviderById } = useServiceProviders();
  const { fetchProviders } = useServiceProviders();
  const outletData = getOutletById(outletId);
  const currentUser = useSelector((state: RootState) => state.user);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStartChat = async (providerId: string) => {
    try {
      console.log('handleStartChat called with providerId:', providerId);
      console.log('currentUser:', currentUser);
      console.log('currentUser.uid:', currentUser?.uid);
      
      if (!currentUser?.uid) {
        console.error('Error: No current user UID available');
        return;
      }

      if (!providerId) {
        console.error('Error: No provider ID available');
        return;
      }

      // Create or get existing chat
      const chatId = await createOrGetChat(currentUser.uid, providerId);

      if (chatId) {
        // Get provider details from Redux
        const provider = getProviderById(providerId);
      
        
        // Navigate to messaging screen
        navigation.navigate('MessagingScreen', {
          chatId,
          serviceProvider: {
            uid: providerId,
            name: provider?.name || '',
            profileImage: provider?.profileImage || '',
            outletName: provider?.outletName || '',
          },
          
        });
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  if (!outletData) {
    return (
      <View style={styles.container}>
        <Text>No outlet data available</Text>
      </View>
    );
  }

  // const route = useRoute<RouteProp<MyTabsParamList, 'BusinessInfo'>>();
  // const { outletData } = route.params;

  const hairOutletPics = [
    require('../../assets/images/BusinessInfo/hairTreatment.png'),
    require('../../assets/images/BusinessInfo/hairCuts.png'),
    require('../../assets/images/BusinessInfo/picture1.png'),
  ];

    const cleaningOutletPics = [
    require('../../assets/images/OutletWindowCleaning/windowService.png'),
    require('../../assets/images/OutletWindowCleaning/deepCleaning.png'),
    require('../../assets/images/OutletWindowCleaning/windowService.png'),
  ];

  // const outletpic2 =  require('../../assets/images/BusinessInfo/hairCuts2.png');
  // const outletpic3 =  require('../../assets/images/BusinessInfo/hairCuts3.png');
  const photosArray = outletData?.photos?.map(photo => photo.servicePicture) || [];
  const validPhotos = photosArray.filter(url => url && url.trim() !== '');

  const icon1 = require('../../assets/images/BusinessInfo/radius.png');
  const icon2 = require('../../assets/images/BusinessInfo/clock.png');
  const icon3 = require('../../assets/images/BusinessInfo/contact.png');
  const icon4 = require('../../assets/images/BusinessInfo/shop.png');
  const icon5 = require('../../assets/images/BusinessInfo/globeIcon.png');
  const icon6 = require('../../assets/images/BusinessInfo/locationIcon.png');

  const icons = [icon1, icon2, icon3, icon4, icon5, icon6];

  const ServicePictures = () => {

      const validApiPhotos = outletData?.photos?.
      filter(photo => photo.servicePicture && 
        photo.servicePicture.trim() !== '')
      || [];

if(validApiPhotos.length > 0){
    return (
       validApiPhotos.map((photo, index) => (
          <Image
            key={photo.id || index}
            source={{ uri: photo.servicePicture }}
            style={styles.picture}
            resizeMode="cover"
          />
        ))
      );
      }

      const localPics = outletData.id === '1'? hairOutletPics : cleaningOutletPics;

    return (       
        localPics.map((pics, index) => (
          <Image
            key={index}
            source={pics}
            style={styles.picture}
            resizeMode="cover"
          />
        ))
      )
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
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <Text style={styles.title}>About</Text>
            <TouchableOpacity onPress={() => {
              console.log('Chat clicked - outletData:', outletData);
              console.log('serviceProviderId:', outletData?.serviceProviderId);
              
              // Use serviceProviderId if available, otherwise use outlet ID as fallback
              const providerId = outletData?.serviceProviderId || outletData?.id;
              
              if (providerId) {
                console.log('Starting chat with providerId:', providerId);
                handleStartChat(providerId);
              } else {
                console.log('Error: No providerId or outlet ID available');
              }
            }}
            style={{backgroundColor : '#FFFF' }}
            >
              <Image
                source={require('../../assets/images/BusinessInfo/chat.png')}
                style={styles.chatIcon}
                resizeMode='cover'
              />
            </TouchableOpacity>
          </View>
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
    fontSize: FontType.medium,
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
    marginRight: 8
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
  chatIcon : {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
});



