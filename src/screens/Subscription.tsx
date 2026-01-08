import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';
import { useSelector, useDispatch} from 'react-redux';
// Removed unused imports - using userSlice now
import type { RootState } from '../redux/store';
export default function Subscription() {

  const userName = useSelector((state : RootState) => state.user.name)
  const contactNumber = useSelector((state : RootState) => state.user.contactNo)
  const email = useSelector((state : RootState) => state.user.email)
  const address = useSelector((state : RootState) => state.user.address)

  // const dispatch = useDispatch()
  return (
    <ScrollView style={styles.scrollView}>
         <BackButton />
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscription</Text>
        </View>
        
      </View>
      <Text>Name : {userName}</Text>
      <Text>Contact No: {contactNumber}</Text>
      <Text>Email Address: {email}</Text>
      <Text>Address: {address}</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical : 10
  },
  mainContainer: {
    backgroundColor: 'red',
    flex: 1,
    width: '92%',
    alignSelf: 'center',
    marginVertical: '20%',
  },
  titleContainer: {
    // backgroundColor: 'blue',
    width: '88%',
    alignSelf: 'center',
    marginTop: '18%',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: 900,
    color: '#263238',
  },
});