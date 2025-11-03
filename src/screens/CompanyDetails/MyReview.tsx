import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import BackButton from '../../Components/BackButton/BackButton';
import { FontType } from '../../Components/Constants/FontType';
import { Image, ImageProps } from 'react-native';
import OrangeButton from '../../Components/OrangeButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const MyReview = () => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [inputHeight, setInputHeight] = useState(150);
  const navigation = useNavigation();

  const star = require('../../assets/images/Review/emptyStar.png');
  const filledStar = require('../../assets/images/Others/star.png');

  const stars = [
    { id: 1, image: star, filledImage: filledStar },
    { id: 2, image: star, filledImage: filledStar },
    { id: 3, image: star, filledImage: filledStar },
    { id: 4, image: star, filledImage: filledStar },
    { id: 5, image: star, filledImage: filledStar },
  ];

  const renderStars = ({
    item,
  }: {
    item: { id: number; image: ImageProps; filledImage: ImageProps };
  }) => {
    return (
      <TouchableOpacity
        style={styles.starTouchable}
        onPress={() => setSelectedStars(item.id)}
      >
        <Image
          source={item.id <= selectedStars ? item.filledImage : item.image}
          style={styles.star}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Write Review</Text>
        </View>

        <View style={styles.starsContainer}>
          <FlatList
            data={stars}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderStars}
          />
        </View>
        <View style={[styles.commentContainer]}>
          <TextInput
            style={[styles.commentField, { height: inputHeight }]}
            multiline
            onContentSizeChange={event =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            placeholder="Write Comments"
            placeholderTextColor="#42526E50"
            textAlignVertical="top"
          />
        </View>
        <OrangeButton
          title="Post review"
          onPress={() => {
            navigation.getParent()?.navigate('Reviews');
            // navigation.navigate('Reviews' as never);
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor : 'red',
    height: '80%',
  },
  titleContainer: {
    width: '100%',
    marginTop: '18%',
    alignSelf: 'center',
    // backgroundColor : 'pink'
  },
  title: {
    fontSize: FontType.titleBold,
    fontWeight: '900',
    color: '#263238',
    marginBottom: 20,
    marginLeft: 17,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor : 'purple',
    height: 40,
    marginLeft: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  starTouchable: {
    marginRight: 25,
    // backgroundColor : 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  star: {
    width: 40,
    height: 40,
    // backgroundColor : 'orange',
  },
  //f9f9f9
  commentContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 7,
    marginHorizontal: 30,
    height: 250,
    maxHeight: 350,
    marginTop: 40,
    padding: 10,
    width: '93%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#42526E30',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  commentField: {
    fontSize: FontType.regular,
    color: '#000',
    marginVertical: 5,
    marginHorizontal: 15,
    // backgroundColor: 'red',
    width: '100%',
    padding: 10,
  },
  button: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 12,
  },
});
