// Filters.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Image, TextInput } from 'react-native';
import { NavigationProp, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, OutletData } from '../../Navigation/navigation';
import { FontType } from '../../Components/Constants/FontType';
import Container from '../../Components/Layout/Container';
import MainContainer from '../../Components/Layout/MainContainer';
import OrangeButton from '../../Components/Buttons/OrangeButton';
import {
  serviceCategories,
  getSubCategoriesByCategoryId,
  SubCategoryItem,
} from '../../utils/constants/serviceCategoryData';

// Mock data - replace with your actual data fetching
const ALL_OUTLETS: OutletData[] = [
  // ... your mock data here
];

export default function Filters() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string | null>(null);
  const [subCategories, setSubCategories] = useState<SubCategoryItem[]>([]);
  const [location, setLocation] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<string | null>('In Outlet');
  const [showOptions, setShowOptions] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredResults, setFilteredResults] = useState<OutletData[]>([]);
  
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Filters'>>();
  
  const bookingOptions = ['Online', 'In Outlet', 'In-Home'];

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const subs = getSubCategoriesByCategoryId(selectedCategoryId);
      setSubCategories(subs);
      // Reset selected subcategory when category changes
      setSelectedSubCategoryId(null);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategoryId]);

  // Apply filters function
  const applyFilters = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let results = [...ALL_OUTLETS];
      
      // Get selected category and subcategory names
      const selectedCategory = serviceCategories.find(cat => cat.id === selectedCategoryId);
      const selectedSubCategory = subCategories.find(sub => sub.id === selectedSubCategoryId);
      
      // Filter by service category
      if (selectedCategory) {
        results = results.filter(outlet =>
          outlet.outletName.toLowerCase().includes(selectedCategory.name.toLowerCase()) ||
          outlet.services.some(service =>
            service.serviceName.toLowerCase().includes(selectedCategory.name.toLowerCase())
          )
        );
      }
      
      // Filter by sub category
      if (selectedSubCategory) {
        results = results.filter(outlet =>
          outlet.services.some(service =>
            service.serviceName.toLowerCase().includes(selectedSubCategory.name.toLowerCase())
          )
        );
      }
      
      // Filter by booking type
      if (selectedBooking && selectedBooking !== 'All') {
        results = results.filter(outlet =>
          outlet.services.some(service =>
            service.serviceDetails.serviceBookingType === selectedBooking
          )
        );
      }
      
      // Filter by open now
      if (openNow) {
        results = results.filter(() => {
          const hour = new Date().getHours();
          return hour >= 9 && hour <= 21;
        });
      }
      
      // Filter by location
      if (location.trim()) {
        results = results.filter(outlet =>
          outlet.outletName.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      setFilteredResults(results);
      
      if (results.length > 0) {
        navigation.navigate('MyTabs', {
          outletId: 'filtered-results',
          // @ts-ignore
          filteredOutlets: results
        });
      } else {
        Alert.alert('No Results', 'No services found matching your filters. Please try different criteria.');
      }
      
    } catch (error) {
      console.error('Filter error:', error);
      Alert.alert('Error', 'Failed to apply filters. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setSelectedSubCategoryId(null);
    setSelectedBooking('In Outlet');
    setLocation('');
    setOpenNow(false);
    Alert.alert('Filters Cleared', 'All filters have been reset.');
  };

  const handleSelectOption = (option: string) => {
    setSelectedBooking(option);
    setShowOptions(false);
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(prevId => (prevId === categoryId ? null : categoryId));
  };

  const handleSelectSubCategory = (subCategoryId: string) => {
    setSelectedSubCategoryId(prevId => (prevId === subCategoryId ? null : subCategoryId));
  };

  const renderCategoryItem = ({ item }: { item: typeof serviceCategories[0] }) => {
    const isActive = item.id === selectedCategoryId;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isActive && styles.selectedCategoryColor,
        ]}
        activeOpacity={0.6}
        onPress={() => handleSelectCategory(item.id)}
      >
        <Text style={[styles.name, isActive && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSubCategoryItem = ({ item }: { item: SubCategoryItem }) => {
    const isActive = item.id === selectedSubCategoryId;
    
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          isActive && styles.selectedCategoryColor,
        ]}
        activeOpacity={0.6}
        onPress={() => handleSelectSubCategory(item.id)}
      >
        {item.icon && <Image source={item.icon} style={styles.icon} />}
        <Text style={[styles.name, isActive && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Container style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
            <Image
              source={require('../../assets/images/Others/backButton.png')}
              style={styles.backButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Filters</Text>
          </View>
          <TouchableOpacity onPress={clearAllFilters} style={styles.clearButton}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <MainContainer style={styles.mainContainer}>
          {/* Service Category */}
          <View style={styles.portionContainer}>
            <Text style={styles.boldText}>Service Category</Text>
            <FlatList
              data={serviceCategories}
              horizontal={true}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContent}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Divider />

          {/* Sub Category - Only show if a category is selected */}
          {selectedCategoryId && subCategories.length > 0 && (
            <>
              <View style={styles.portionContainer}>
                <Text style={[styles.boldText, { marginBottom: 20 }]}>Sub Category</Text>
                <FlatList
                  data={subCategories}
                  horizontal={true}
                  renderItem={renderSubCategoryItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.flatListContent}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <Divider />
            </>
          )}

          {/* Booking Type */}
          <View style={styles.portionContainer}>
            <Text style={[styles.boldText, { marginTop: 10, marginBottom: 15 }]}>
              Booking Type
            </Text>
            <TouchableOpacity
              style={styles.bookingTypeContainer}
              onPress={() => setShowOptions(prev => !prev)}
              activeOpacity={0.6}
            >
              <Text style={styles.bookingTypeText}>{selectedBooking}</Text>
              <Image
                source={require('../../assets/images/Filters/DropDown.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {showOptions && (
              <View style={styles.modalView}>
                {bookingOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      index === bookingOptions.length - 1 && { borderBottomWidth: 0 },
                    ]}
                    onPress={() => handleSelectOption(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedBooking === option && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Divider />

          {/* Open Now Toggle */}
          <View style={styles.portionContainer}>
            <View style={styles.openNowContainer}>
              <Text style={styles.boldText}>Open Now</Text>
              <TouchableOpacity
                style={[styles.toggleButton, openNow && styles.toggleButtonActive]}
                onPress={() => setOpenNow(!openNow)}
              >
                <View style={[styles.toggleCircle, openNow && styles.toggleCircleActive]} />
              </TouchableOpacity>
            </View>
          </View>

          <Divider />

          {/* Location */}
          <View style={styles.portionContainer}>
            <Text style={[styles.boldText, { marginTop: 20, marginBottom: 30 }]}>
              Location
            </Text>
            <View style={styles.row}>
              <TextInput
                style={styles.locationButton}
                placeholder="Enter Location ..."
                value={location}
                onChangeText={setLocation}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.distanceButton}>
                <Text style={styles.distanceButtonText}>10 Miles</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.defaultText}>
              *Default 10 miles location search
            </Text>
          </View>

          {/* Filter Button */}
          <OrangeButton
            title={loading ? "Applying Filters..." : "Apply Filters"}
            onPress={applyFilters}
            textStyle={{ fontSize: 20, fontWeight: '700' }}
          />
          
          {filteredResults.length > 0 && (
            <Text style={styles.resultsText}>
              Found {filteredResults.length} outlets
            </Text>
          )}
        </MainContainer>
      </Container>
    </ScrollView>
  );
}

const Divider = () => <View style={styles.topDivider} />;

// Styles remain the same as before...

// Styles remain the same as before...

const styles = StyleSheet.create({
  // ... (keep your existing styles)
  scrollView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#F27122',
    fontSize: FontType.title,
    fontFamily: 'Montserrat-Bold',
    fontWeight: '600',
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    color: '#F27122',
    fontSize: FontType.medium,
    fontWeight: '500',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 40,
  },
  portionContainer: {
    width: '100%',
    paddingVertical: 15,
  },
  boldText: {
    fontSize: FontType.xlarge,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
    marginTop: 14,
    marginLeft: 15,
    marginBottom: 10,
    fontWeight: '600',
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
  },
  flatListContent: {
    paddingHorizontal: 4,
    marginTop: 20,
  },
  name: {
    fontSize: FontType.medium,
    color: '#263238',
  },
  selectedText: {
    color: '#F27122',
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectedCategoryColor: {
    borderColor: '#F27122',
    backgroundColor: '#F2712210',
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
    borderColor: '#F27122',
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
  modalView: {
    backgroundColor: '#e7e7e7',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: -30,
    width: '95%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  optionButton: {
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#42526E20',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: FontType.medium,
    color: '#42526E',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#F27122',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
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
    width: '70%',
    color: '#000',
  },
  distanceButton: {
    borderColor: '#F27122',
    borderWidth: 1.2,
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  distanceButtonText: {
    fontSize: FontType.small,
    color: '#000000',
    fontWeight: '500',
  },
  defaultText: {
    fontSize: FontType.small,
    fontWeight: '400',
    marginLeft: 10,
    marginVertical: 15,
    color: '#666',
  },
  button: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  backButtonIcon: {
    width: 28,
    height: 28,
    tintColor: '#F27122',
  },
  openNowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleButtonActive: {
    backgroundColor: '#F27122',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleCircleActive: {
    transform: [{ translateX: 22 }],
  },
  resultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: FontType.medium,
    color: '#666',
  },
});