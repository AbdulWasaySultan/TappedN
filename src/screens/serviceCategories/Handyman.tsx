import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import Container from '../../Components/Layout/Container';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FontType } from '../../Components/Constants/FontType';
import BackButton from '../../Components/Global/BackButton/BackButton';
import { handymanSubCategories, SubCategoryItem } from '../../utils/constants/serviceCategoryData';
import { ServiceStack } from '../../Navigation/navigation';
import { useOutletContext } from '../../Context/OutletContext';
import Loading from '../../Components/Global/Loading';

const { width, height } = Dimensions.get('window');

export default function Handyman() {
  const route = useRoute<RouteProp<ServiceStack, 'Handyman'>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { getAllOutlets } = useOutletContext();

  const [searchServices, setSearchServices] = useState<string>('');
  const [filteredService, setFilteredService] = useState(handymanSubCategories);
  const [allOutlets, setAllOutlets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch outlets when component mounts
  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      setLoading(true);
      const outletsData = await getAllOutlets();
      setAllOutlets(outletsData);
    } catch (error) {
      console.error('Error fetching outlets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchServices(text);
    if (text.trim() === '') {
      setFilteredService(handymanSubCategories);
    } else {
      const filtered = handymanSubCategories.filter(service =>
        service.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredService(filtered);
    }
  };

  // Filter outlets by service name
  const filterOutletsByService = (serviceName: string) => {
    try {
      const filtered = allOutlets.filter(outlet =>
        outlet.services.some((service: any) =>
          service.serviceName.toLowerCase().includes(serviceName.toLowerCase()),
        ),
      );
      return filtered;
    } catch (error) {
      console.error('Error filtering outlets:', error);
      return [];
    }
  };

  // Handle service press - navigate to Home with filtered outlets
  const handleServicePress = async (serviceName: string) => {
    setLoading(true);
    const filteredOutlets = filterOutletsByService(serviceName);
    
    if (filteredOutlets.length > 0) {
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: {
          filteredOutlets: filteredOutlets,
        },
      });
    } else {
      Alert.alert('No Results', `No outlets found for ${serviceName}`);
    }
    setLoading(false);
  };

  const renderItem = ({ item }: { item: SubCategoryItem }) => {
    return (
      <TouchableOpacity
        style={styles.serviceContainer}
        onPress={() => handleServicePress(item.name)}
      >
        <Image
          source={item.icon}  // Changed from item.image to item.icon
          style={styles.serviceImage}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.serviceName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <Container style={{ backgroundColor: '#f9f9f9' }}>
        <BackButton />
        <View style={styles.topContainer}>
          <Text style={styles.topContainerText}>Handyman</Text>
        </View>
        <Loading />
      </Container>
    );
  }

  return (
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
          value={searchServices}
          onChangeText={handleSearch}
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
    height: '60%',
  },
  serviceContainer: {
    width: '25%',
    height: 85,
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
});