import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BackButton from '../Components/BackButton/BackButton';
import { FontType } from '../Components/Constants/FontType';
import { useSelector, useDispatch} from 'react-redux';
import { increment, decrement, selectCount } from '../redux/counterSlice';

export default function Subscription() {

  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  return (
    <ScrollView style={styles.scrollView}>
         <BackButton />
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Subscription</Text>
        </View>
        
      </View>
      <Text>Counter : {count}</Text>
            <TouchableOpacity
          onPress={() => dispatch(increment())}>
            <Text>Increment</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => dispatch(decrement())}>
            <Text>Decrement</Text>
          </TouchableOpacity>
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