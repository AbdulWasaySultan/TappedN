import React from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Text
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import OrangeButton from "../../Components/OrangeButton";
import { RootStackParamList } from "../../Navigation/navigation";
import { FontType } from "../../Components/Constants/FontType";

const { width, height } = Dimensions.get("window");

export default function AppointmentConfirmed() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/Booking/serviceBooked.png")}
          style={styles.image}
          resizeMode="contain"
        />

     <View style={styles.titleContainer}>
     <Text style={styles.title}>Your Service Has 
     Been Booked</Text>
     <Text style={styles.description}>
        Our representative will shortly visit according to your 
        service booking. Please do contact us if any query persist.
        </Text>
     </View>

        <OrangeButton
          title="Back To Home"
          onPress={() => navigation.navigate("HomeTabs")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center", // centers vertically
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8, // 80% of screen width
    height: height * 0.35, // 35% of screen height
    marginBottom: 40,
  },
  titleContainer:{
    width : '92%',
    alignSelf : 'center',
    marginBottom : 20
  },
  title:{
    fontSize : FontType.xtraLarge,
    fontWeight : '900',
    color : '#263238',
    marginBottom : 20,
    alignSelf : 'center',
    textAlign : 'center'
  },
  description:{
    fontSize : FontType.medium,
    fontWeight : '400',
    color : '#42526E',
    alignSelf : 'center',
    textAlign : 'center'
  },
  button: {
    width: "85%",
    alignSelf: "center",
    marginTop : 40
  },
});




// import React, { useState } from 'react';
// import { View, Button, Platform, Text } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AppointmentConfirmed = () => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [mode, setMode] = useState<'date' | 'time'>('date');

//   const onChange = (event: any, selectedDate?: Date) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       setDate(selectedDate);
//     }
//   };

//   const showDatePicker = () => {
//     setMode('date');
//     setShowPicker(true);
//   };

//   const showTimePicker = () => {
//     setMode('time');
//     setShowPicker(true);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button title="Pick Date" onPress={showDatePicker} />
//       <Button title="Pick Time" onPress={showTimePicker} />

//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode={mode}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={onChange}
//         />
//       )}
//     </View>
//   );
// };

// export default AppointmentConfirmed;
