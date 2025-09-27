// components/BackButton.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.button}
      activeOpacity={0.7}
    >
      <Image
        source={require('../../assets/images/backButton.png')} // <-- use your own icon here
        style={styles.icon}
        resizeMode='contain'
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 90,     // adjust for SafeArea
    left: 28,
    zIndex: 1000,
    // backgroundColor : 'red',
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: '#F27122',  // Optional: color the icon
  },
});
