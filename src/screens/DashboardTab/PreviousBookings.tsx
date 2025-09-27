import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PreviousBookings() {
  return (
    <View style={styles.container}>
      <Text>PreviousBookings</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
})