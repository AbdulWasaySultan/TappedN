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

type Users = {
  id: string;
  image: any;
  name: string;
  message: string;
  time: string;
};

export default function Messages() {
  const [users, setUsers] = useState<Users[]>([
    {
      id: '1',
      image: require('../../assets/images/HomeTabs/Messages/user-profile.png'),
      name: 'Andrew Wilson',
      message: 'Kese ho? aur ghar nein sb theek hein?',
      time: '3hr ago'
    },
    {
      id: '2',
      image: require('../../assets/images/HomeTabs/Messages/user2.png'),
      name: 'Ahmed Khan',
      message: 'Assalam u alaikum',
      time: '3hr ago',
    },
    {
      id: '3',
      image: require('../../assets/images/HomeTabs/Messages/user3.png'),
      name: 'Hina',
      message: 'Kya haal hein?',
      time: '5 days ago',
    },
    {
      id: '4',
      image: require('../../assets/images/HomeTabs/Messages/user4.png'),
      name: 'Hamza',
      message: 'Kya haal hein?',
      time: '5 days ago',
    },
    {
      id: '5',
      image: require('../../assets/images/HomeTabs/Messages/user5.png'),
      name: 'Sara',
      message: 'Kya haal hein?',
      time: '5 days ago',
    },

  ]);

  const renderItem = ({ item }: { item: Users }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="cover" />

      <View style={styles.textContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>

        <Text style={styles.message} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.messageTitle}>Messages</Text>
      </View>

      <View style={styles.mainContainer}>
        <FlatList
          data={users}
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
    marginTop: isSmallScreen? '18%' :'22%',
    marginHorizontal: 20,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '4%',
  },
  messageTitle: {
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf : 'center'
  },
  itemImage: {
    width: width > 360 ? 65 : 55,
    height: width > 360 ? 65 : 55,
    borderRadius: 0
  },
  textContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom : 3
  },
  name: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: '#0E134F',
  },
  message: {
    fontSize: RFValue(12.5),
    fontWeight: '400',
    color: '#42526E',
    marginTop: 4,
  },
  itemTime: {
    fontSize: RFValue(12.5),
    fontWeight: '400',
    color: '#E50914',
  },
});
