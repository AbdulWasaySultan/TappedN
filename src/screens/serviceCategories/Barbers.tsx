import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,FlatList } from 'react-native'
import React from 'react'
import { useNavigation,NavigationContainer,NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/navigation'
import BackButton from '../../Components/BackButton/BackButton';
import { useState } from 'react'
import Container from '../../Components/Container'
import { useRoute,RouteProp } from '@react-navigation/native'
import { FontType } from '../../Components/Constants/FontType'
// export default function Barber() {
//     const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   return (
//     <View style={styles.container}>
//         <BackButton />
//       <Text>Barber</Text>
//     </View>
//   )
// }       
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     }
// })

export default function Barbers() {
  const route = useRoute<RouteProp<RootStackParamList, 'Barbers'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const allServices = [
    { id: 1, name: 'Haircut', image: require('../../assets/images/Barbers/hair-cut.png') },
    { id: 2, name: 'Shave', image: require('../../assets/images/Barbers/shave.png') },
    { id: 3, name: 'Beard Trim', image: require('../../assets/images/Barbers/beard-trimming.png') },
    { id: 4, name: 'Hair Color', image: require('../../assets/images/Barbers/hair-color.png') },
    { id: 5, name: 'Hair Styling', image: require('../../assets/images/Barbers/hair-styling.png') },
    { id: 6, name: 'Scalp Treatment', image: require('../../assets/images/Barbers/scalp.png') },
    { id: 7, name: 'Facial', image: require('../../assets/images/Barbers/facial.png') },
    { id: 8, name: 'Hair Wash', image: require('../../assets/images/Barbers/hair-washing.png') },
    { id: 9, name: 'Hair Transplant', image: require('../../assets/images/Barbers/hairTransplant.png') },
  ];

  const [searchServices, setSearchServices] = useState<string>('');
  const [filteredService, setFilteredService] = useState(allServices);

  const handleSearch = (text: string) => {
    setSearchServices(text);

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
        <View style={styles.itemWrapper}>
      <TouchableOpacity
        style={styles.serviceContainer}
        // onPress={() => navigation.navigate('ServiceDetails')}
      >
        <Image source={item.image} style={styles.serviceImage} resizeMode='cover'/>
      </TouchableOpacity>
       <Text numberOfLines={1} style={styles.serviceName}>
       {item.name}
     </Text>
     </View>
    );
  };

  return (
    <Container style={{ backgroundColor: '#f9f9f9'}}>
      <BackButton />
      <View style={styles.topContainer}>
        <Text style={styles.topContainerText}>Barbers</Text>
      </View>
      <View style={styles.searchView}>
        <TextInput
          placeholder="Search in Barbers"
          placeholderTextColor="#42526E"
          style={styles.input}
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

      <View style={styles.mainContainer}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={filteredService}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: '90%',
    height: 60,
    marginTop: 150,
  },
  topContainerText: {
    fontSize: FontType.titleBold,
    fontWeight: '900',
    color: '#263238',
    marginLeft: 12,
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
  },
  searchIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    right: 6,
    padding: 10,
  },
  mainContainer: {
    // backgroundColor: 'pink',
    width: '94%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60%',
  },
  serviceContainer: {
    width: 80,
    height: 80,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    borderColor: '#F2712280',
    borderWidth: 1,
    elevation : 3
  },
  itemWrapper:{
    width: '30%', // Adjusted to fit 3 columns better
    alignItems: 'center',
    // backgroundColor : '#cdcdcd'
  },
  serviceImage: {
    width: '80%',
    height: '80%',
    borderRadius: 30,
    alignSelf: 'center',
    // marginVertical: 20,
  },
  serviceName: {
    fontSize: FontType.small,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 12,
    marginLeft: 5,
    textAlign: 'center',
  },
});
