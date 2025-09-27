import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/navigation'
import { NavigationProp } from '@react-navigation/native'
import BackButton from '../../Components/BackButton/BackButton';

export default function MusicStudio() {

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
        <BackButton />
      <Text>Music Studio</Text>
      
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})