import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontType } from '../../../Components/Constants/FontType';
import {
  MyTabsParamList,
  BusinessDetails,
  OutletData,
  HomeTabsParamList,
  RootStackParamList,
} from '../../../Navigation/navigation';
// import { useRoute, RouteProp } from '@react-navigation/native';
import { useOutletContext } from '../../../Context/API/Outlet/OutletContext';
import { useServiceProviders } from '../../../redux/hooks/useServiceProviders';
import { createOrGetChat } from '../../../Firebase/chatUtils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import { getSafeImageSource } from '../../../utils/imageSource';

type BusinessInfoProps = {
  outletId: string;
};

export default function BusinessInfo({outletId} : BusinessInfoProps) {
// const route = useRoute<RouteProp<MyTabsParamList, 'BusinessInfo'>>()
// const {outletId} = route.params

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
  const photosArray = outletData?.photos?.map(photo => photo.servicePicture) || [];
  const validPhotos = photosArray.filter(url => url && url.trim() !== '');

    const icons = [
     require('../../../assets/images/BusinessInfo/radius.png'),
     require('../../../assets/images/BusinessInfo/clock.png'),
     require('../../../assets/images/BusinessInfo/contact.png'),
     require('../../../assets/images/BusinessInfo/shop.png'),
     require('../../../assets/images/BusinessInfo/globeIcon.png'),
     require('../../../assets/images/BusinessInfo/locationIcon.png')
    ]

    const pic1 = require('../../../assets/images/OutletHairTreatment/OutletPics/pic1.png')
    const pic2 = require('../../../assets/images/OutletHairTreatment/OutletPics/pic2.png')
    const pic3 = require('../../../assets/images/OutletHairTreatment/OutletPics/pic3.png')


    const pic4 = require('../../../assets/images/OutletWindowCleaning/windowService.png')
    const pic5 = require('../../../assets/images/OutletWindowCleaning/deepCleaning.png')
    const pic6 = require('../../../assets/images/OutletWindowCleaning/windowService.png')
    
    const TonyPics = [pic1,pic2,pic3]
    const AthensPics = [pic4, pic5,pic6]

  const ServicePictures = () => {
    // 1. Check if we have valid API photos from your mock.io
    const validApiPhotos = outletData?.photos?.filter(
      photo => photo.servicePicture && photo.servicePicture.trim() !== ''
    ) || [];

    // 2. If API photos exist, show them
    if (validApiPhotos.length > 0) {
      return (
        <>
          {validApiPhotos.map((photo, index) => (
            <Image
              key={photo.id || index}
              source={getSafeImageSource(
                photo.servicePicture,
                require('../../../assets/images/OutletWindowCleaning/windowService.png'),
              )}
              style={styles.picture}
              resizeMode="cover"
            />
          ))}
        </>
      );
    }

    // 3. Fallback to Local Dummy Logic
    // Using ID '1' for Athens/Hair and anything else for Tony/Cleaning
    const currentLocalPics = outletId === '1' ? AthensPics : TonyPics;

    return (
      <>
        {currentLocalPics.map((pic, index) => (
          <Image
            key={`local-${index}`}
            source={pic}
            style={styles.picture}
            resizeMode="cover"
          />
        ))}
      </>
    );
  };

  // type BusinessInfoScreenProps = MyTabsParamList['BusinessInfo'];

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
                source={require('../../../assets/images/BusinessInfo/chat.png')}
                style={styles.chatIcon}
                resizeMode='cover'
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.description, { marginTop: 10 }]}>
            Location Permission will be required to view the nearby providers.
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
            source={require('../../../assets/images/BusinessInfo/phone.png')}
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
    width: 75,
    height: 75,
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
    width: 58,
    height: 58,
    alignSelf: 'center',
    // marginLeft: -10,
  },
  chatIcon : {
    width: 30,
    height: 30,
    alignSelf: 'center'
  },
});



