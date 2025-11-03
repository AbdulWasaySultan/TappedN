import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import { NavigationProp } from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';

export default function Yoga() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const GoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>Yoga</Text>


      <BackButton />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
});
