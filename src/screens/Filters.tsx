import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';
import Container from '../Components/Container';
import MainContainer from '../Components/MainContainer';
import { useState } from 'react';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/navigation';
import { useRoute, RouteProp } from '@react-navigation/native';

const outletsData = [
  {
    id: 1,
    name: 'Tony&Guy',
    icon: require('../assets/images/OutletHairTreatment/outlet.png'),
  },
  {
    id: 2,
    name: 'Tony&Guy',
    icon: require('../assets/images/OutletHairTreatment/outlet2.png'),
  },
  {
    id: 3,
    name: 'Tony&Guy',
    icon: require('../assets/images/OutletHairTreatment/outlet3.png'),
  },
  {
    id: 4,
    name: 'Tony&Guy',
    icon: require('../assets/images/OutletHairTreatment/outlet3.png'),
  },
  // { id: 5, name: 'Tony&Guy', icon: require('../assets/images/outlet5.png') },
];

const subCategoryData = [
  {
    id: 6,
    name: 'Carpenter',
    icon: require('../assets/images/Handyman/Carpenter.png'),
  },
  {
    id: 7,
    name: 'Plumber',
    icon: require('../assets/images/Handyman/Plumber.png'),
  },
  {
    id: 8,
    name: 'Electrician',
    icon: require('../assets/images/Handyman/Electrician.png'),
  },
  {
    id: 9,
    name: 'Ac-Repair',
    icon: require('../assets/images/Handyman/AC-Repair.png'),
  },
  {
    id: 10,
    name: 'Painter',
    icon: require('../assets/images/Handyman/Painter.png'),
  },
];

export default function Filters() {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [location, setLocation] = useState<string>('Enter Location ...');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Filters'>>();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(
    'In Outlet',
  );
  const [showOptions, setShowOptions] = useState(false);
  const bookingOptions = ['Online', 'In Outlet', 'In-Home'];

  const handleSelectOption = (options: any, showOptions: boolean) => {
    setSelectedBooking(options);
    setShowOptions(false);
  };

  const navigate = () => {
    (navigation as any).navigate('MyTabs', {
      screen: 'Services',
      params: {
        outletData: {
          id: 'filter',
          outletName: 'Available Services',
          outletIcon: require('../assets/images/OutletHairTreatment/hairCuts.png'),
          rating: 4.0,
          services: [
            {
              id: 's1',
              serviceName: 'Filtered Services',
              price: 0,
              serviceImage: require('../assets/images/OutletHairTreatment/hairCuts.png'),
            },
          ],
        },
      },
    });
  };

  const Divider = () => {
    return <View style={styles.topDivider} />;
  };

  const setUserLocation = (text: string) => {
    setLocation(text);
  };

  const serviceCategory = [
    { id: 1, name: 'Estheticians' },
    { id: 2, name: 'Music Studio' },
    { id: 3, name: 'Handyman' },
    { id: 4, name: 'Barbers' },
    { id: 5, name: 'Yoga' },
  ];

  const handleSelect = (id: number) => {
    setIsSelected(prevId => (prevId === id ? null : id));
  };
  const renderItem = ({
    item,
  }: {
    item: { id: number; name: string; icon?: any };
  }) => {
    const isActive = item.id === isSelected;
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isActive && styles.selectedCategoryColor,
        ]}
        activeOpacity={0.6}
        onPress={() => {
          handleSelect(item.id);
        }}
      >
        {item.icon && <Image source={item.icon} style={styles.icon} />}
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderOutlets = ({
    item,
  }: {
    item: { id: number; name: string; icon?: any };
  }) => {
    return (
      <TouchableOpacity>
        <Image
          source={item.icon}
          style={styles.outletsImage}
          resizeMode="center"
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Container style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button]}
      activeOpacity={0.7}
    >
      <Image
        source={require('../assets/images/Others/backButton.png')} // <-- use your own icon here
        style={styles.backButtonIcon}
        resizeMode='contain'
      />
    </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filters</Text>
        </View>
        </View>
        <MainContainer style={styles.mainContainer}>
          <View
            style={[
              styles.portionContainer,
              { marginTop: 10, marginBottom: 5 },
            ]}
          >
            <Text style={[styles.boldText]}>Service Category</Text>
            <FlatList
              data={serviceCategory}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Divider />
          <View style={[styles.portionContainer, { marginBottom: 6 }]}>
            <Text style={[styles.boldText, { marginBottom: 20 }]}>
              Sub Category
            </Text>
            <FlatList
              data={subCategoryData}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Divider />

          <View style={styles.portionContainer}>
            <Text
              style={[styles.boldText, { marginTop: 10, marginBottom: 15 }]}
            >
              Booking Type
            </Text>
            <TouchableOpacity
              style={styles.bookingTypeContainer}
              onPress={() => setShowOptions(prev => !prev)}
              activeOpacity={0.6}
            >
              <Text style={styles.bookingTypeText}>{selectedBooking}</Text>
              <Image
                source={require('../assets/images/Filters/DropDown.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {showOptions && (
              <View style={styles.modalView}>
                {bookingOptions.map((options, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      index === bookingOptions.length - 1 && {
                        borderBottomWidth: 0,
                      },
                    ]}
                    onPress={() => handleSelectOption(options, showOptions)}
                  >
                    <Text style={styles.optionText}>{options}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Divider />

          <View style={styles.portionContainer}>
            <Text style={[styles.boldText, { marginTop: 10, marginBottom: 0 }]}>
              Open Now
            </Text>
            <FlatList
              data={outletsData}
              keyExtractor={item => item.id.toString()}
              renderItem={renderOutlets}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListOutlets}
            />
            <Divider />
            <Text
              style={[styles.boldText, { marginTop: 20, marginBottom: 30 }]}
            >
              Location
            </Text>
            <View style={styles.row}>
              <TextInput
                style={styles.locationButton}
                placeholder="Enter Location ..."
                onChangeText={setUserLocation}
              ></TextInput>
              <TouchableOpacity style={styles.distanceButton}>
                <Text style={styles.distanceButtonText}>10 Miles</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.defaultText}>
              *Default 10 miles location search
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.filterButton} onPress={navigate}>
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </MainContainer>
      </Container>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    backgroundColor: '#cdcdcd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    flexDirection : 'row',
    width : '100%',
    paddingHorizontal : 20,
    paddingTop : 50,
    backgroundColor : 'yellow',
    justifyContent : 'space-between',
    alignItems : 'center',

  },
  backButton:{

  },
  titleContainer: {
    flex : 1,
    alignItems : 'center',
marginRight : 0,
backgroundColor : 'cyan'
  },
  title: {
    color: '#F27122',
    fontSize: FontType.title,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
  },
  mainContainer: {
    backgroundColor: 'red',
    // marginHorizontal: 20,
    // marginTop: 150,
    // marginBottom: 50,
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
    // alignItems: 'center',
    width: '100%',              // Allow it to fill the screen
  paddingHorizontal: 20,      // Use padding instead of margin for better touch handling
  marginTop: 20,              // Small gap after the header
  flexDirection: 'column',
  },
  portionContainer: {
    width: '100%', // stretch horizontally
    paddingVertical: 15,
    // backgroundColor: 'pink',
    // borderRadius : 10,
  },

  boldText: {
    fontSize: FontType.xlarge,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 14,
    marginLeft: 15,
    marginBottom: 10,
    fontWeight: '600',
    // alignSelf: 'flex-start',
  },
  categoryContainer: {
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 20,
    height: 45,
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1.2,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor : 'red',
  },
  flatListContent: {
    paddingHorizontal: 4, // space at list start/end
    // backgroundColor : 'red',
    marginTop: 20,
  },
  flatListOutlets: {
    marginTop: 30,
    gap: 20,
  },
  name: {
    fontSize: FontType.medium,
    color: '#263238',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectedCategoryColor: {
    backgroundColor: '#F2712220',
    borderColor: '#F27122',
  },
  topDivider: {
    height: 1,
    backgroundColor: '#919191',
    marginVertical: 10,
    marginHorizontal: -20,
    alignSelf: 'stretch',
  },
  bookingTypeContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    width: '95%',
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: '#a0a0a0',
    // backgroundColor : '#cdcdcd',

    borderWidth: 1.2,
    marginVertical: 30,
    marginLeft: 10,
  },
  bookingTypeText: {
    fontSize: FontType.medium,
    color: '#42526E',
    paddingLeft: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },

  outletsImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'blue',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  locationButton: {
    borderColor: '#F27122',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingVertical: 11,
    paddingLeft: 20,
    marginLeft: -17,
    width: '80%',
  },
  locationButtonText: {
    fontSize: FontType.medium,
    color: '#797979',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
  },
  distanceButton: {
    borderColor: '#F27122',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: -20,
  },
  distanceButtonText: {
    fontSize: FontType.small,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  defaultText: {
    fontSize: FontType.small,
    fontWeight: '400',
    marginLeft: 10,
    marginVertical: 15,
  },
  filterButton: {
    backgroundColor: '#F27122',
    borderRadius: 10,
    paddingVertical: 17,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: FontType.large,
    fontWeight: 'bold',
    // backgroundColor : 'red',
    width: '100%',
    textAlign: 'center',
  },
  modalView: {
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // paddingHorizontal : 140,
    paddingVertical: 10,
    // marginLeft : 10,
    marginTop: -30,
    width: '100%',

    borderRadius: -20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  optionButton: {
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: '#42526E20',

    borderBottomWidth: 1,
    borderColor: '#42526E20',
    // backgroundColor: '#ffff'
  },
  optionText: {
    fontSize: FontType.medium,
    color: '#42526E',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  button:{
    padding: 10,
    backgroundColor: 'transparent',
    // backgroundColor : 'red',
  },
  backButtonIcon: {
    width: 28,
    height: 28,
    tintColor: '#F27122',  // Optional: color the icon
  },

});
