import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
import { NavigationProp } from '@react-navigation/native';
import BackButton from '../../Components/BackButton/BackButton';
import { FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { ImageSourcePropType, Image } from 'react-native';
import axios from 'axios';

const apiUrl = `https://api.onetapdrive.com/brands`;

type data = {
  id: number;
  name: string;
  image: string;
  title: string;
  description: string;
  cars: string;
};
type BrandResponse = {
  success: boolean;
  message: string;
  data: data[];
};

export default function ViewAll() {
  const [brands, setBrands] = useState<data[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchBrands = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      if (response.ok) {
        setBrands(result.data);
        console.log('result.data',result.data);
      } else {
        console.log(`'Error fetching brands' : ${result.message}`);
      }
    } catch (error) {
      console.warn(error);
      console.log('error',error);
    }
  };

  const [loading, setLoading] = useState(true);

   useEffect(() => {

    axios.get(apiUrl).then((response) => {
      console.log('response',response.data.data);
      setBrands(response.data.data);
    }).catch((error) => {
      console.log('error',error);
      console.warn('error',error);
    });
  }, []);

  const renderBrands = ({ item }: { item: data }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain'/>
        <Text>ID: {item.id}</Text>
        <Text>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Cars: {item.cars}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
  <View style={styles.listContainer}>
      <FlatList
        data={brands}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBrands}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',

  },
  listContainer: {
    flex: 1,
    backgroundColor: 'blue',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  itemContainer: { // New style for individual list items
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
