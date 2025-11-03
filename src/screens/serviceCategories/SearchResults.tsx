import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RouteProp,useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../Navigation/navigation'
import BackButton from '../../Components/BackButton/BackButton';
import Container from '../../Components/Container';


type SearchResultsProps = RouteProp<RootStackParamList, 'SearchResults'>;

export default function SearchResults() {
    const route = useRoute<SearchResultsProps>();
    const { query } = route.params;
  return (  
    <View style={styles.container}>
    <View style={styles.header}>
        <BackButton />
    </View>
    <View style={styles.content}>
          <Text style={styles.heading}>SearchResults : {query}</Text>
          <Text style={styles.heading}>SearchRfhwhfjkwkesults</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading : {
        fontSize: 18, fontWeight: 'bold', color: '#F27122'
    },
    header: {
        paddingTop: 50, // Adjust this as needed for spacing from the top of the screen
        paddingLeft: 20, // Adjust this as needed for spacing from the left
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})