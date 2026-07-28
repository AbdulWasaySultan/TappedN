// Filters.tsx (fixed version)
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { OutletData, ServiceStack } from '../../Navigation/navigation';
import { FontType } from '../../Components/Constants/FontType';
import Container from '../../Components/Layout/Container';
import MainContainer from '../../Components/Layout/MainContainer';
import OrangeButton from '../../Components/Buttons/OrangeButton';
import {
  serviceCategories,
  getSubCategoriesByCategoryId,
  SubCategoryItem,
} from '../../utils/constants/serviceCategoryData';
import { useOutletContext } from '../../Context/OutletContext';
import {
  useFilteredOutlets,
  FilterState,
} from '../../Context/hooks/usefilteredOutlets';

const bookingOptions = ['Online', 'In Outlet', 'In-Home'];

// Memoized Divider component
const Divider = React.memo(() => <View style={styles.topDivider} />);

// Memoized Category Item component
const CategoryItem = React.memo(
  ({
    item,
    isActive,
    onPress,
    showIcon = false,
  }: {
    item: any;
    isActive: boolean;
    onPress: () => void;
    showIcon?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        isActive && styles.selectedCategoryColor,
      ]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      {showIcon && item.icon && (
        <Image source={item.icon} style={styles.icon} />
      )}
      <Text style={[styles.name, isActive && styles.selectedText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  ),
);

// Memoized Category List component
const CategoryList = React.memo(
  ({
    data,
    selectedId,
    onSelect,
    showIcon = false,
  }: {
    data: any[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    showIcon?: boolean;
  }) => (
    <FlatList
      data={data}
      horizontal={true}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          isActive={item.id === selectedId}
          onPress={() => onSelect(item.id)}
          showIcon={showIcon}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.flatListContent}
      showsHorizontalScrollIndicator={false}
    />
  ),
);

// Memoized Booking Options component
const BookingOptions = React.memo(
  ({
    visible,
    selectedBooking,
    onSelect,
    onClose,
  }: {
    visible: boolean;
    selectedBooking: string;
    onSelect: (option: string) => void;
    onClose: () => void;
  }) => {
    if (!visible) return null;

    return (
      <View style={styles.modalView}>
        {bookingOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              index === bookingOptions.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => {
              onSelect(option);
              onClose();
            }}
          >
            <Text
              style={[
                styles.optionText,
                selectedBooking === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  },
);

// Main Filters Component
const Filters = React.memo(() => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { getAllOutlets } = useOutletContext();

  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);
  const [location, setLocation] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<string>('In Outlet');
  const [showOptions, setShowOptions] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false); // Only for initial data load
  const [isApplyingFilters, setIsApplyingFilters] = useState(false); // For filter application
  const [allOutlets, setAllOutlets] = useState<OutletData[]>([]);

  // Get subcategories based on selected category
  const subCategories = useMemo(
    () =>
      selectedCategoryId
        ? getSubCategoriesByCategoryId(selectedCategoryId)
        : [],
    [selectedCategoryId],
  );

  // Get selected category and subcategory objects
  const selectedCategory = useMemo(
    () => serviceCategories.find(cat => cat.id === selectedCategoryId),
    [selectedCategoryId],
  );

  const selectedSubCategory = useMemo(
    () => subCategories.find(sub => sub.id === selectedSubCategoryId),
    [subCategories, selectedSubCategoryId],
  );

  // Build filters object for the hook
  const filters: FilterState = useMemo(
    () => ({
      serviceCategory: selectedCategory?.name || null,
      subCategory: selectedSubCategory?.name || null,
      bookingType: selectedBooking,
      openNow,
      location,
      distance: 10,
    }),
    [selectedCategory, selectedSubCategory, selectedBooking, openNow, location],
  );

  // Use the optimized hook (no useEffect inside)
  const { filteredOutlets } = useFilteredOutlets(allOutlets, filters);

  // Load outlets on mount
  React.useLayoutEffect(() => {
    const loadOutlets = async () => {
      setIsDataLoading(true);
      try {
        const data = await getAllOutlets();
        setAllOutlets(data);
      } catch (error) {
        console.error('Error fetching outlet data:', error);
        Alert.alert(
          'Error',
          'Failed to fetch outlet data. Please try again later.',
        );
      } finally {
        setIsDataLoading(false);
      }
    };
    loadOutlets();
  }, [getAllOutlets]);

  // Reset selected subcategory when category changes
  const handleSelectCategory = useCallback((categoryId: string) => {
    setSelectedCategoryId(prev => (prev === categoryId ? null : categoryId));
    setSelectedSubCategoryId(null);
  }, []);

  const handleSelectSubCategory = useCallback((subCategoryId: string) => {
    setSelectedSubCategoryId(prev =>
      prev === subCategoryId ? null : subCategoryId,
    );
  }, []);

  const handleSelectOption = useCallback((option: string) => {
    setSelectedBooking(option);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategoryId(null);
    setSelectedSubCategoryId(null);
    setSelectedBooking('In Outlet');
    setLocation('');
    setOpenNow(false);
  }, []);

  const applyFilters = useCallback(async () => {
    setIsApplyingFilters(true);

    // Simulate a small delay for better UX (optional)
    await new Promise(resolve => setTimeout(resolve, 300));

    if (filteredOutlets.length > 0) {
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate('HomeTabs', {
          screen: 'Home',
          params: { filteredOutlets: filteredOutlets || [] },
        });
      }
    } else {
      Alert.alert(
        'No Results',
        'No services found matching your filters. Please try different criteria.',
      );
    }

    setIsApplyingFilters(false);
  }, [filteredOutlets, navigation]);

  // Determine button text based on what's happening
  const getButtonText = useMemo(() => {
    if (isDataLoading) return 'Loading Outlets...';
    if (isApplyingFilters) return 'Applying Filters...';
    return 'Apply Filters';
  }, [isDataLoading, isApplyingFilters]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <Container style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Image
              source={require('../../assets/images/Others/backButton.png')}
              style={styles.backButtonIcon}
              resizeMode="contain"
              // ../../assets/images/Others/backButton.png
            />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Filters</Text>
          </View>
          <TouchableOpacity
            onPress={clearAllFilters}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <MainContainer style={styles.mainContainer}>
          {/* Service Category */}
          <View style={styles.portionContainer}>
            <Text style={styles.boldText}>Service Category</Text>
            <CategoryList
              data={serviceCategories}
              selectedId={selectedCategoryId}
              onSelect={handleSelectCategory}
            />
          </View>

          <Divider />

          {/* Sub Category */}
          {selectedCategoryId && subCategories.length > 0 && (
            <>
              <View style={styles.portionContainer}>
                <Text style={[styles.boldText, { marginBottom: 20 }]}>
                  Sub Category
                </Text>
                <CategoryList
                  data={subCategories}
                  selectedId={selectedSubCategoryId}
                  onSelect={handleSelectSubCategory}
                  showIcon={true}
                />
              </View>
              <Divider />
            </>
          )}

          {/* Booking Type */}
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
                source={require('../../assets/images/Filters/DropDown.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <BookingOptions
              visible={showOptions}
              selectedBooking={selectedBooking}
              onSelect={handleSelectOption}
              onClose={() => setShowOptions(false)}
            />
          </View>

          <Divider />

          {/* Open Now Toggle */}
          <View style={styles.portionContainer}>
            <View style={styles.openNowContainer}>
              <Text style={styles.boldText}>Open Now</Text>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  openNow && styles.toggleButtonActive,
                ]}
                onPress={() => setOpenNow(prev => !prev)}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    openNow && styles.toggleCircleActive,
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Divider />

          {/* Location */}
          <View style={styles.portionContainer}>
            <Text
              style={[styles.boldText, { marginTop: 20, marginBottom: 30 }]}
            >
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

          {/* Filter Button - Now shows correct text */}
          <OrangeButton
            title={getButtonText}
            onPress={applyFilters}
            textStyle={{ fontSize: 20, fontWeight: '700' }}
            disabled={isDataLoading || isApplyingFilters} // Optional: disable button during operations
          />

          {filteredOutlets.length > 0 && !isDataLoading && (
            <Text style={styles.resultsText}>
              Found {filteredOutlets.length} outlets
            </Text>
          )}
        </MainContainer>
      </Container>
    </ScrollView>
  );
});

export default Filters;

// Styles remain EXACTLY the same
const styles = StyleSheet.create({
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
