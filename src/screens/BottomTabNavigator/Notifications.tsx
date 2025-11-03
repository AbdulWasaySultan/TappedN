import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontType } from '../../Components/Constants/FontType';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;
type Services = {
  id: string;
  image: any;
  outletName: string;
  message: string;
  time: string;
};

export default function Notifications() {
  const [services, setServices] = useState<Services[]>([
    {
      id: '1',
      image: require('../../assets/images/HomeTabs/Notifications/outlet1.png'),
      outletName: 'Tony&Guy',
      message: 'has accepted your appointment for hair cut.',
      time: '3hr ago'
    },
    {
      id: '2',
      image: require('../../assets/images/HomeTabs/Notifications/outlet2.png'),
      outletName: 'Athens Cleaning',
      message: 'your booking send you reminder message',
      time: '3hr ago',
    },
  ]);

  const renderItem = ({ item }: { item: Services }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />

      <View style={styles.textContainer}>
        <Text style={styles.itemTime}>{item.time}</Text>
        <View style={styles.rowContainer}>

          <Text style={styles.combinedText}>
          <Text style={styles.outletName}>{item.outletName}</Text>
          <Text style={{}}>{"  "}</Text>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        </Text>
        </View>
      </View>
      </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.notificationTitle}>Notifications</Text>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: isSmallScreen? '18%' : '22%',
    marginHorizontal: 20,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '4%',
  },
  notificationTitle: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    color: '#263238',
    marginLeft : 6
  },
  mainContainer: {
    marginTop : '6%',
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'orange',
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignSelf : 'center',
    // height : isSmallScreen? '60%' : '60%',
  },
  itemImage: {
    width: width > 360 ? 65 : 55,
    height: width > 360 ? 65 : 55,
    borderRadius: 0
  },
  textContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  rowContainer: {
    // backgroundColor: 'pink',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 2,
    width: '100%',
  },
  combinedText: {
    flexWrap: 'wrap',
    width: '100%',
    // marginHorizontal: 5,
  },
  outletName: {
    // fontSize: RFValue(13),
    fontSize : isSmallScreen? 15 : FontType.regular,
    fontWeight: '400',
    color: '#F27122',
  },
  message: {
    // fontSize: RFValue(12.5),
    fontSize : isSmallScreen? 15 : FontType.regular,
    fontWeight: '400',
    color: '#42526E',
  },
  itemTime: {
    // fontSize: RFValue(10),
    fontSize: isSmallScreen? FontType.verysmall : FontType.small,
    fontWeight: isSmallScreen?  '500' : '400',
    color: '#42526E70',
  },
});
