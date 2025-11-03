import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  Dimensions,
} from 'react-native';
import BackButton from '../../Components/BackButton/BackButton';
import { FontType } from '../../Components/Constants/FontType';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomTextField from '../../Components/TextField';
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import OrangeButton from '../../Components/OrangeButton';
const {width, height} = Dimensions.get('window');
const isSmallScreen = height < 800;


export default function BookAppointment() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [link, setLink] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState('In Outlet');

  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const bookingOptions = ['In Outlet', 'Mobile', 'Virtual'];
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [inputHeight, setInputHeight] = useState(100);
  const [notes, setNotes] = useState('');
  const isSmallScreen = width < 800;

  const handleSelectOption = (options: any, showOptions: boolean) => {
    setSelectedBooking(options);
    setShowOptions(false);
  };

  const handleConfirmDate = (date: any) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  const handleConfirmTime = (time: any) => {
    setSelectedTime(time);
    setShowTimeModal(false);
  };

  const setMeetingLink = (link: string) => {
    setLink(link);
  };

  const handleAddress = () => {

    return (
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Address</Text>

    <TouchableOpacity
      style={styles.addressContainer}
      onPress={() => navigation.navigate('AppointmentConfirmed')}
      activeOpacity={0.6}
    >
      <Text style={styles.addressText}>{'Corey Towers, NYC'}</Text>
      <Image
        source={require('../../assets/images/Booking/GPS.jpg')}
        style={styles.arrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>

  </View>
    )
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackButton/>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Book Appointment</Text>
          </View>

          <View style={styles.serviceContainer}>
            <View style={styles.rowContainer}>
              <Image
                source={require('../../assets/images/OutletHairTreatment/hairCuts.png')}
                style={styles.serviceImage}
                resizeMode="cover"
              />
              <View style={styles.serviceRowContainer}>
                <View style={styles.serviceNameAndRatingContainer}>
                  <Text style={styles.serviceName}>Hair Cuts</Text>
                  <View style={styles.serviceRatingContainer}>
                    <Image
                      style={styles.starImage}
                      source={require('../../assets/images/Others/star.png')}
                      resizeMode="cover"
                    />
                    <Text>
                      <Text>4.5</Text>/5.0
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.servicePriceContainer}>
                <Text style={styles.servicePrice}>
                  $10<Text style={styles.greyText}>/hr</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomTextField
              label="Name"
              placeholder="Dave Parker"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextField
              label="Contact Number"
              placeholder="+1 234 567890"
              style={styles.input}
              value={contactNumber}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Booking Type</Text>

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
                //The variable options holds the current element of the loop. //
                So in the first loop, options = "In Outlet", then "Mobile", then
                "Virtual". //The variable index holds the current index of the
                loop.
                {bookingOptions.map((options, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectOption(options, showOptions)}
                    style={[styles.optionButton, index === bookingOptions.length - 1 && {borderBottomWidth : 0}]}
                  >
                    <Text style={styles.optionText}>{options}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>


          {(selectedBooking === 'In Outlet' || selectedBooking === 'Mobile') && (
            handleAddress()
          )}

          {selectedBooking === 'Virtual' && (

          <View style={styles.inputContainer}>
            {/* <Text style={styles.label}>Enter Meeting Link</Text> */}

            <CustomTextField
              label="Enter Meeting Link"
              placeholder="https://meet.google.com/abc123"
              style={styles.input}
              value={link}
              onChangeText={setMeetingLink}
              keyboardType="url"
            />
          </View>

          )}

          <View style={styles.bookingContainer}>
            <View style={styles.inputDateAndTimeContainer}>
              <Text style={styles.label}>Booking Date</Text>

              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDateModal(true)}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../../assets/images/Booking/bookingDate.png')}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
                <Text style={styles.addressText}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : 'Select Date'}
                </Text>
              </TouchableOpacity>
              {showDateModal && (
                <DateTimePickerModal
                  mode="date"
                  display="inline"
                  isVisible={showDateModal}
                  onConfirm={date => handleConfirmDate(date)}
                  onCancel={() => setShowDateModal(false)}
                />
              )}
            </View>

            <View style={styles.inputDateAndTimeContainer}>
              <Text style={styles.label}>Booking Time</Text>

              <TouchableOpacity
                style={styles.timeInput}
                activeOpacity={0.6}
                onPress={() => setShowTimeModal(true)}
              >
                <Image
                  source={require('../../assets/images/Booking/bookingTime.png')}
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
                <Text style={styles.timeText}>
                  {selectedTime
                    ? selectedTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Select Time'}
                </Text>
              </TouchableOpacity>
            </View>

            {showTimeModal && (
              <DateTimePickerModal
                isVisible={showTimeModal}
                mode="time"
                display="inline"
                onConfirm={time => handleConfirmTime(time)}
                onCancel={() => setShowTimeModal(false)}
              />
            )}
  </View>

        <View style={styles.notesContainer}>
          <Text style={styles.label}>Add Notes</Text>
          <TextInput
            style={styles.notesInput}
            multiline
            value={notes}
            onChangeText={setNotes}
            onContentSizeChange={event =>
                setInputHeight(Math.max(100, Math.min(150, event.nativeEvent.contentSize.height)))
            }
            placeholder="Type Something..."
            placeholderTextColor="#42526E50"
            textAlignVertical="top"
          />
          <OrangeButton title='Book Appointment' onPress={()=>{navigation.navigate('AppointmentConfirmed')}} style={styles.button}/>
        </View>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer:{
        backgroundColor: '#FFFFFF30',
        paddingBottom: 30,  // avoid cut-off at bottom
    },
  container: {
    flexGrow: 1,
    // backgroundColor: 'green',
    width: '100%',
    alignItems : 'center'

  },
  contentContainer: {
    // backgroundColor: 'black',
    width: wp('100%'),
    marginTop: isSmallScreen? hp('22%') : hp('17%'),
    gap: hp('4%'), // spacing between title and service card
  },
  titleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: '90%',
    marginHorizontal: 20,
    marginLeft: 30,
    // backgroundColor: 'yellow',
  },
  title: {
    fontSize: isSmallScreen? FontType.xxtraLarge : FontType.title,
    fontWeight: '900',
    color: '#263238',
    marginLeft: -10,
  },
  serviceContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    minWidth: '90%',
    maxWidth: '92%',
    padding: 10,
    height: 100,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  rowContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    // marginVertical : 10
  },
  serviceImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: 14,
  },
  serviceRowContainer: {
    // backgroundColor: 'purple',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    height: 'auto',
  },
  serviceNameAndRatingContainer: {
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: 'auto',
    gap: 10,
    marginLeft: 10,
  },
  serviceName: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#000',
  },
  serviceRatingContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  starImage: {
    width: FontType.regular,
    height: FontType.regular,
    // marginLeft: 2,
    // marginRight: 4,
  },
  servicePriceContainer: {
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyText: {
    color: '#42526E70',
    fontSize: FontType.regular,
    fontWeight: '400',
    fontFamily: 'Montserrat-Regular',
  },
  servicePrice: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F27122',
    fontSize: FontType.xlarge,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },

  mainContainer: {
    // backgroundColor: 'purple',
    width: '100%',
    marginTop: 20,
  },

  inputContainer: {
    // backgroundColor: 'brown',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
    marginHorizontal: 10,
  },
  input: {
    // backgroundColor: '#F4FCF9',
    borderWidth: 2,
    borderColor: '#0D805620',
    borderRadius: 10,
    fontSize: wp('4%'),
    marginHorizontal: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    width: '95%',
    color: '#42526E',
    height: 50,
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#7B869A',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 15,
  },

  bookingTypeContainer: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    width: '95%',
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: '#0D805620',
    borderWidth: 1.2,
    marginVertical: 0,
    marginLeft: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },

  bookingTypeText: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#42526E',
    paddingLeft: 10,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#a0a0a0',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    borderBottomColor : '#42526E20',
    // backgroundColor : 'pink',
    // borderBottomWidth : 1,
  },
  optionText: {
    fontSize: FontType.medium,
    color: '#42526E',
    fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    // paddingHorizontal : 140,
    paddingVertical: 10,
    // marginLeft : 10,
    marginTop: 0,
    width: '94%',

    borderRadius: -20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  addressContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    width: '95%',
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: '#0D805620',
    borderWidth: 1.2,
    marginVertical: 0,
    marginLeft: 10,
  },
  addressText: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#42526E',
    paddingLeft: 10,
  },
  bookingContainer: {
    width: '90%',
    alignSelf: 'center',
marginTop : 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'orange',
    flexDirection: 'row',
  },
  inputDateAndTimeContainer: {
    alignSelf: 'center',
    width: '48%',
    // backgroundColor: 'brown',
    flex: 1,
  },
  dateInput: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    width: '90%',
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#0D805620',
    borderWidth: 1.2,
    marginVertical: 0,
    marginLeft: 10,
    // backgroundColor: 'pink',
  },
  timeInput: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingVertical: 15,
    width: '90%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: '#0D805620',
    borderWidth: 1.2,
    marginVertical: 0,
    marginLeft: 10,
    // backgroundColor: 'pink',
  },
  timeText: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: '#42526E',
    marginLeft: 20,
  },
  notesContainer: {
    // backgroundColor: 'brown',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  notesInput :{
    borderWidth: 2,
    borderColor: '#0D805620',
    borderRadius: 10,
    fontSize: wp('4%'),
    marginHorizontal: 10,
    paddingHorizontal:15,
    paddingVertical: 10,
    width: '94%',
    color: '#000',
    minHeight: 100,
    maxHeight: 150, 
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
