import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Keyboard,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Container from '../../Components/Container';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import { FontType } from '../../Components/Constants/FontType';
import { useState } from 'react';
import BackButton from '../../Components/BackButton/BackButton';

const { width, height } = Dimensions.get('window');

export default function Handyman() {
  const route = useRoute<RouteProp<RootStackParamList, 'Handyman'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const allServices = [
    {
      id: 1,
      name: 'Carpenter',
      image: require('../../assets/images/Handyman/Carpenter.png'),
    },
    {
      id: 2,
      name: 'Plumber',
      image: require('../../assets/images/Handyman/Plumber.png'),
    },
    {
      id: 3,
      name: 'Electrician',
      image: require('../../assets/images/Handyman/Electrician.png'),
    },
    {
      id: 4,
      name: 'AC Repair',
      image: require('../../assets/images/Handyman/AC-Repair.png'),
    },
    {
      id: 5,
      name: 'TV Repair',
      image: require('../../assets/images/Handyman/TV-Repair.png'),
    },
    {
      id: 6,
      name: 'Painter',
      image: require('../../assets/images/Handyman/Painter.png'),
    },
    {
      id: 7,
      name: 'Mechanic',
      image: require('../../assets/images/Handyman/Mechanic.png'),
    },
    {
      id: 8,
      name: 'Computer',
      image: require('../../assets/images/Handyman/Computer.png'),
    },
    {
      id: 9,
      name: 'Mobile',
      image: require('../../assets/images/Handyman/Mobile.png'),
    },
  ];
  const [searchServices, setSearchServices] = useState<string>('');
  const [filteredService, setFilteredService] = useState(allServices);

  const handleSearch = (text: string) => {
    setSearchServices(text);

    /*.trim() is primarily used as a JavaScript String method to remove whitespace
 characters from both ends (leading and trailing) of a string.  */
    if (text.trim() === '') {
      setFilteredService(allServices);
    } else {
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredService(filtered);
    }
  };
  const renderItem = ({ item }: { item: any }) => {
    return (
      // <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.serviceContainer}
        // onPress={() => navigation.navigate('ServiceDetails')}
      >
        <Image
          source={item.image}
          style={styles.serviceImage}
          resizeMode="contain"
        />
        <Text numberOfLines={1} style={styles.serviceName}>
          {item.name}
        </Text>
      </TouchableOpacity>
      // </View>
    );
  };

  return (
    // <SafeAreaView>
    <Container style={{ backgroundColor: '#f9f9f9' }}>
      <BackButton />
      <View style={styles.topContainer}>
        <Text style={styles.topContainerText}>Handyman</Text>
      </View>
      <View style={styles.searchView}>
        <TextInput
          placeholder="Search in Handyman"
          placeholderTextColor="#42526E"
          style={styles.input}
          // placeholderTextColor='#000'
          // placeholderStyle={styles.searchInputPlaceholder}
          value={searchServices}
          onChangeText={searchServices => handleSearch(searchServices)}
          onSubmitEditing={() => handleSearch(searchServices)}
          returnKeyType="search"
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => handleSearch(searchServices)}
          activeOpacity={0}
          style={styles.searchIconContainer}
        >
          <Image
            source={require('../../assets/images/Home/search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      {/*  searchView closed here */}

      <View style={styles.mainContainer}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={filteredService}
          renderItem={renderItem}
          numColumns={3}
          // scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />

        {/* <FlatList
          keyExtractor={item => item.id.toString()}
          data={serviceDataTwo}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          keyExtractor={item => item.id.toString()}
          data={serviceDataThree}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>
    </Container>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // safeArea:{
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  // },

  topContainer: {
    width: '90%',
    height: 60,
    marginTop: 150,
    // marginTop : Dimensions.get('window').height * 0.1,
    // backgroundColor : 'red'
  },
  topContainerText: {
    fontSize: FontType.titleBold,
    fontWeight: '900',
    color: '#263238',
    marginLeft: 12,
  },
  backButtonContainer: {
    width: '10%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: FontType.title,
    fontWeight: 'bold',
    color: '#263238',
  },
  input: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 13,
    padding: 10,
    paddingVertical: 14,
    paddingLeft: 26,
    margin: 10,
    color: '#000',
    fontSize: 16,
    height: 55,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: '94%',
    elevation: 10,
  },
  searchView: {
    width: '90%',
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
  },
  searchIconContainer: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 10,
    // backgroundColor: '#000',
  },
  searchIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 6,
    padding: 10,
  },
  mainContainer: {
    width: '94%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor : 'pink',
    height: '60%',
  },
  serviceContainer: {
    width: '25%',
    height: 90,
    borderRadius: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderColor: '#F2712250',
    borderWidth: 1,
  },
  serviceImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // marginTop: 24,
    // marginLeft: 3,
    alignSelf: 'center',
    marginVertical: 25,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 15,
    marginLeft: 5,
    textAlign: 'center',
  },
  // suggestionText: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#000',

  //   marginHorizontal: 10,
  //   // borderBottomWidth: 1,
  //   borderBottomColor: '#000',
  //   padding: 20,
  //   backgroundColor: '#fff',
  //   flex: 1,
  // },
});
