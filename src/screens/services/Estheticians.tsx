import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/navigation'
import { NavigationProp } from '@react-navigation/native'
import BackButton from '../../Components/BackButton/BackButton';

export default function Estheticians() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
      <BackButton />
      <Text>Estheticians</Text>
    </View>
  )
}