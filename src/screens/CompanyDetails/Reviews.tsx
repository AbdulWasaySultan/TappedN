import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { FontType } from '../../Components/Constants/FontType';
import { useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  MyTabsParamList,
  RootStackParamList,
} from '../../navigation/navigation';
import OrangeButton from '../../Components/OrangeButton';
import { OutletData } from '../../navigation/navigation';
import { OutletRating } from '../../navigation/navigation';
import { ServiceReviews } from '../../navigation/navigation';
import { OutletReview } from '../../navigation/navigation';

function formattedTime(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
  return `${Math.floor(diff / 2592000)} months ago`;
}
// Example:
const reviewTime = '2025-08-27T09:15:00Z';
console.log(formattedTime(reviewTime)); // "8 min ago"

const star = require('../../assets/images/star.png');
const ratingStars = [star, star, star, star, star];
let totalReview = 0;

export default function Reviews({outletData, outletReviews}: {outletData: OutletData, outletReviews: OutletReview[]}) {
//   /* NavigationProp<RootStackParamList> → generic, looser typing. Good for quick setup.*/
//   /* NativeStackNavigationProp<RootStackParamList, "ScreenName"> → stricter, screen-specific typing. Best practice in TypeScript*/
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const route = useRoute<RouteProp<MyTabsParamList, 'Reviews'>>();
  // const {outletData, outletReviews} = route.params

  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // totalReview = outletData?.outletRating?.reduce( (sum, item) => sum + item.reviews, 0)

  useEffect(() => {
    const reviews = outletData?.outletReviews ?? []
    const total = reviews.length
    if (total > 0) {

      const sumOfRatings = reviews.reduce(
        (sum, item) => sum + item.ratingStars,
        0,
      );
      const averageRating = sumOfRatings / total;
      setTotalReviews(total)//calculates the sum of all reviews = 170 ?? 0; console.log(totalReviews););
      setAverageRating(averageRating);
    }
  else {
    setAverageRating(0);
    setTotalReviews(0);
  }
  },[outletData?.outletReviews]);


  const renderItem = ({ item }: { item: OutletRating }) => {
    const progressBarWidth =
      totalReviews > 0 ? (item.reviews / totalReviews) * 100 : 0;
    // totalReviews > 0 ? (averageRating * 10) * 2 : 0;

    //This can also be done by iterating through forloop like pushing <Image>in an empty star array for (let i = 0; i < ratingStars; i++)
    const stars = Array.from({ length: item.ratingStars }, (_, i) => (
      <View style={styles.smallStarContainer}>
        <Image
          key={i}
          source={star}
          style={styles.starIcon}
          resizeMode="contain"
        />
      </View>
    ));
    return (
      <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: -10 }}>
        <View style={styles.starContainer}>{stars}</View>
        <View style={styles.ratingProgressBaarContainer}>
          <View
            style={[
              styles.ratingProgressBaarFill,
              { width: `${progressBarWidth}%` },
            ]}
          ></View>
        </View>
      </View>
    );
  };

  //funtion ends here

  const renderReviews = ({ item }: { item: OutletReview }) => {
    return (
      <>
        <View style={styles.rowContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            />
          </View>

          <View style={styles.reviewContent}>
            <View
              style={[
                styles.rowContainer,
                { justifyContent: 'space-between', marginTop: 5 },
              ]}
            >
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{formattedTime(item.time)}</Text>
              </View>
            </View>

            <View style={styles.ratingStarsContainer}>
              {ratingStars.map((star, index) => (
                <Image key={index} source={star} style={styles.ratingStars} />
              ))}
            </View>
            <Text style={styles.reviewDescription}>{item.description}</Text>
          </View>
        </View>
      </>
    );
  };
  //function ends here

  //render starts here
  return (
    <ScrollView
      // bounces={false}                // 🚫 disables iOS bounce
      // overScrollMode="never"         // 🚫 disables Android overscroll glow
      showsVerticalScrollIndicator={false} // optional: hides the scrollbar
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.title}>{averageRating.toFixed(1)}</Text>

          <FlatList
            data={[outletData.outletRating]}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
        <Text style={styles.recentReviewsTitle}>RECENT REVIEWS</Text>
        <View style={styles.reviewsContainer}>
          <FlatList
              data={outletData?.outletReviews ?? []}   // ensures array, never undefined
            keyExtractor={item => item.id.toString()}
            renderItem={renderReviews}
            scrollEnabled={false}
          />
        </View>
        <OrangeButton
          title="Write a Review"
          style={styles.postReviewButton}
          onPress={() => {
            navigation.navigate('MyReview');
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 20,
    // backgroundColor : 'blue'
  },
  title: {
    fontSize: FontType.titleBold5,
    fontWeight: '900',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 20,
    // backgroundColor : 'red'
  },
  smallStarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor : 'red',
  },
  starIcon: {
    width: 17,
    height: 17,
    marginLeft: 5,
    // backgroundColor : 'red',
  },
  starContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30,
    width: '45%',
    overflow: 'hidden',
//  backgroundColor: 'pink',
  },
  ratingProgressBaarContainer: {
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: '3%',
    marginRight: 40,
    marginTop: 13,
    width: '50%',
  },
  ratingProgressBaarFill: {
    height: '100%',
    backgroundColor: '#F27122',
    borderRadius: 5,
  },
  recentReviewsTitle: {
    fontSize: FontType.xlarge,
    fontWeight: '300',
    marginLeft: 30,
    marginTop: 40,
    color: '#42526E',
    // backgroundColor : 'red'
  },
  reviewsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    marginLeft: 15,
    // backgroundColor: 'pink',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // backgroundColor: 'pink',
    width: '100%',
    marginVertical: 5,
    marginBottom: 15,
  },
  profileImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor : 'purple',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginTop: 5,
  },
  reviewContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // backgroundColor: 'purple',
    width: '74%',
    marginLeft: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
  },
  name: {
    fontSize: FontType.large,
    fontWeight: '600',
  },
  timeContainer: {
    // backgroundColor : 'red',
    width: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 17,
    color: '#42526E70',
    marginTop: 2,
    marginRight: 5,
    // backgroundColor : 'green'
  },
  ratingStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '60%',
    // backgroundColor : 'orange',
    marginTop: -8,
  },
  ratingStars: {
    width: 16,
    height: 16,
    marginLeft: 2,
    marginRight: 4,
  },
  reviewDescription: {
    fontSize: FontType.large,
    marginTop: 2,
    marginBottom: 15,
    paddingVertical: 5,
    color: '#42526E',
    overflow: 'hidden',
    // backgroundColor : 'blue'
  },
  postReviewButton: {
    marginTop: 40,
    marginBottom: 50,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

//  const star = require('../../assets/images/star.png');
//  const ratingStars = [star, star, star, star, star];
//  let totalReviews = 0;
//  export default function Reviews({ outletData }: { outletData: OutletData }) {
//   /* NavigationProp<RootStackParamList> → generic, looser typing. Good for quick setup.*/ /* NativeStackNavigationProp<RootStackParamList, "ScreenName"> → stricter, screen-specific typing. Best practice in TypeScript*/
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const route = useRoute<RouteProp<MyTabsParamList, 'Reviews'>>();
//   // const {outletData} = route.params
//   const [averageRating, setAverageRating] = useState(0);
//   const data = [
//     { id: 1, ratingStars: 5, reviews: 239 },
//     { id: 2, ratingStars: 4, reviews: 98 },
//     { id: 3, ratingStars: 3, reviews: 48 },
//     { id: 4, ratingStars: 2, reviews: 21 },
//     { id: 5, ratingStars: 1, reviews: 2 },
//   ];
//      const reviewsData = [
//       { id: 1,
//        name: 'Kelly Bishop',
//        ratingStars: 5,
//        reviewDescription: 'Amazing Service',
//        time: '8min ago',
//        profileImage: require('../../assets/images/Review/profileImage.png'), },
//       {
//         id: 2,
//          name: 'Nellson',
//          ratingStars: 4,
//          reviewDescription: 'Really good quality ',
//          time: '1hr ago',
//           profileImage: require('../../assets/images/Review/profileImage2.png'),
//         },
//          { id: 3,
//           name: 'Joshua Miller',
//           ratingStars: 4,
//           reviewDescription: 'I just love the quick service',
//            time: '2d ago',
//            profileImage: require('../../assets/images/Review/profileImage.png'),
//            },
//            { id: 5,
//              name: 'Kristy Brown',
//              ratingStars: 5,
//               reviewDescription: 'Can’t go wrong',
//               time: '5d ago',
//                profileImage: require('../../assets/images/Review/profileImage2.png'),
//               }, ];
//               totalReviews = data.reduce((sum, item) => sum + item.reviews, 0);
//               //calculates the sum of all reviews = 170 console.log(totalReviews);
//               useEffect(() => {
//                const averageRating =
//                totalReviews > 0 ? data.reduce((sum, item) => sum + item.ratingStars * item.reviews, 0) / totalReviews //400 + 160 + 90 + 40 + 0 = 690/170 = 4.05 : 0;
//          setAverageRating(averageRating); }, []);
// const renderItem = ({ item, }: { item: { id: number; ratingStars: number; reviews: number }; }) => {
//                const progressBarWidth = totalReviews > 0 ? (item.reviews / totalReviews) * 100 : 0;
//                 totalReviews > 0 ? (averageRating * 10) * 2 : 0; //This can also be done by iterating through forloop like pushing <Image>in an empty star array for (let i = 0; i < ratingStars; i++)
//                 const stars = Array.from({ length: item.ratingStars }, (_, i) => (
//                 <View style={styles.smallStarContainer}>
//                 <Image key={i} source={star} style={styles.starIcon} resizeMode="contain" />
//                 </View> ));
//                 return ( <View style={{ flexDirection: 'row', marginRight: 10, marginLeft: -10 }}>
//                 <View style={styles.starContainer}>{stars}</View>
//                 <View style={styles.ratingProgressBaarContainer}>
//                   <View style={[ styles.ratingProgressBaarFill, { width: ${progressBarWidth}% }, ]} >
//                     </View> </View>
//                      </View> );
//                      }; //funtion ends here
