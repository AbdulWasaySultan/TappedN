import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Upcoming() {
  return (
    <View style={styles.container}>
      <Text>Upcoming</Text>
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