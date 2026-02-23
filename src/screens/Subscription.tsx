import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';
import { useSelector, useDispatch } from 'react-redux';
// Removed unused imports - using userSlice now
import type { RootState } from '../redux/store';
import { Dimensions } from 'react-native';
import OrangeButton from '../Components/OrangeButton';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800; // Example threshold for small devices

export default function Subscription() {
  const userName = useSelector((state: RootState) => state.user.name);
  const contactNumber = useSelector((state: RootState) => state.user.contactNo);
  const email = useSelector((state: RootState) => state.user.email);
  const address = useSelector((state: RootState) => state.user.address);

  // const dispatch = useDispatch()
  return (
    <ScrollView style={styles.scrollView}>
      <BackButton />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscription</Text>
        </View>
      </View>

      {/* <View style={styles.mainContainer}>
        <Text style={styles.starter}>Starter</Text>
        <View><Text style={styles.subscriptionPrice}>$ 15<Text style={styles.month}>/Month</Text>
</Text>
</View>
      </View> */}

      <View style={styles.mainContainer}>
        <Text style={styles.starter}>Starter</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.subscriptionPrice}>$ 15</Text>
          <Text style={styles.month}>/ Month</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text numberOfLines={2} style={styles.subscriptionPerks}>
          Detail Profile
        </Text>
        <Text numberOfLines={2} style={styles.subscriptionPerks}>
          Tear Conversation
        </Text>
        <Text numberOfLines={2} style={styles.subscriptionPerks}>
          List Engine
        </Text>
        <Text numberOfLines={2} style={styles.subscriptionPerks}>
          Document Storage
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity style={styles.button}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: FontType.large,
              fontWeight: '700',
            }}
          >
            Subscribe Now
          </Text>
        </TouchableOpacity> */}

<OrangeButton style={styles.button} title="Buy Now" onPress={() => {}} />
      </View>
      {/* <Text>Name : {userName}</Text>
      <Text>Contact No: {contactNumber}</Text>
      <Text>Email Address: {email}</Text>
      <Text>Address: {address}</Text> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  container: {
    // backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  titleContainer: {
    // backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    marginTop: isSmallScreen ? 120 : 140,
    paddingHorizontal: 14,
    // paddingVertical:10,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: 900,
    color: '#263238',
  },
  mainContainer: {
    height: 'auto',

    alignItems: 'center',
    width: '94%',
    // backgroundColor: '#cdcdcd',
    alignSelf: 'center',
    // borderRadius: 8,
    paddingTop: 80,
    paddingBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#42526E30',
  },
  starter: {
    color: '#0E134F',
    fontSize: FontType.xtraLarge,
    fontWeight: '500',
    fontFamily: 'PTSansItalic',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffff',
    marginVertical: 35,
  },
  subscriptionPrice: {
    color: '#F27122',
    fontWeight: '900',
    fontSize: isSmallScreen ? FontType.titleBold2 : FontType.titleBold4,
  },
  month: {
    fontSize: isSmallScreen ? FontType.large : FontType.xlarge,
    fontWeight: '400',
    color: '#0E134F',
    marginTop: 10,
    marginLeft: 6,
  },
  bottomContainer: {
    width: '94%',
    // backgroundColor: 'pink',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 20,
  },

  subscriptionPerks: {
    fontSize: FontType.xxlarge,
    color: '#42526E',
    marginVertical: 20,
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '40%',
  },
  buttonContainer: {
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:40, 
    paddingBottom: 30,
    paddingTop: 10
  },
  button: {
    backgroundColor: '#F27122',
    paddingVertical: 25,
    width: '85%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
