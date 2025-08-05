import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Container from '../components/container';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/navigation';

export default function Home() {
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const { fullName } = route.params || {};
  return (
    <Container>
      <View style={{ flex: 0.9, width: '100%' }}>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Hey,<Text style={styles.boldText}>{fullName || 'User'}</Text></Text>
          <Text>Home Screen Updated</Text>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 30,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
    alignSelf: 'flex-start',
  },
  topText:{
      fontSize: 26,
      marginHorizontal: 14,
      marginTop: 100,
    },
    boldText:{
      fontWeight : 'bold',
      fontSize: 26,
      marginHorizontal: 14,
      marginTop: 100,
    },
});
