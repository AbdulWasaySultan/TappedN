// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
//   Touchable,
//   TouchableOpacity,
// } from 'react-native';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { FontType } from '../../Components/Constants/FontType';
// import messaging from '@react-native-firebase/messaging';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { HomeTabsParamList, RootStackParamList } from '../../Navigation/navigation';
// import firebase from '@react-native-firebase/app';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { sendMessage } from './Settings/MessagingScreen';

// const { width, height } = Dimensions.get('window');
// const isSmallScreen = height < 800;

// type Users = {
//   id: string;
//   image: any;
//   name: string;
//   outletName?: string;
//   message: string;
//   time: string;
// };

// async function requestPermission(){
//   const authorizationStatus = await messaging().requestPermission();
//   if(authorizationStatus === 
//     messaging.AuthorizationStatus.AUTHORIZED || 
//     authorizationStatus === 
//     messaging.AuthorizationStatus.PROVISIONAL){
//     console.log('Permission granted');
//   }
// }

// messaging().onMessage(async remoteMessage =>{
//     console.log('Foreground message received:', remoteMessage);
// }
// );

// messaging().setBackgroundMessageHandler(async remoteMessage =>{
//     console.log('Background message received:', remoteMessage);
// })


// export default function Messages() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   // const [selectedUser, setSelectedUser] = useState<string>('');

//   const [users, setUsers] = useState<Users[]>([
//     {
//       id: '1',
//       image: require('../../assets/images/HomeTabs/Messages/user-profile.png'),
//       name: 'Andrew Wilson',
//       outletName : 'Salon XYZ',
//       message: 'Kese ho? aur ghar nein sb theek hein?',
//       time: '3hr ago'
//     },
//     {
//       id: '2',
//       image: require('../../assets/images/HomeTabs/Messages/user2.png'),
//       name: 'Ahmed Khan',
//       outletName : 'Barber Shop ABC',
//       message: 'Assalam u alaikum',
//       time: '3hr ago',
//     },
//     {
//       id: '3',
//       image: require('../../assets/images/HomeTabs/Messages/user3.png'),
//       name: 'Hina',
//       outletName : 'Beauty Salon 123',
//       message: 'Kya haal hein?',
//       time: '5 days ago',
//     },
//     {
//       id: '4',
//       image: require('../../assets/images/HomeTabs/Messages/user4.png'),
//       name: 'Hamza',
//       outletName : 'Spa & Wellness Center',
//       message: 'Kya haal hein?',
//       time: '5 days ago',
//     },
//     {
//       id: '5',
//       image: require('../../assets/images/HomeTabs/Messages/user5.png'),
//       name: 'Sara',
//       outletName : 'Salon XYZ',
//       message: 'Kya haal hein?',
//       time: '5 days ago',
//     },

//   ]);

//     const userPressed = (item : Users) => {
//   // setSelectedUser(item.name);
//   navigation.navigate('MessagingScreen',{item: item});
// }

//   const renderItem = ({ item }: { item: Users }) => {
//     const temp = sendMessage(item.id,item.message);
//     <>
//     <TouchableOpacity style={styles.itemContainer} 
//     onPress={() => userPressed(item)}>
//       <Image source={item.image} style={styles.itemImage} resizeMode="cover" />

//       <View style={styles.textContainer}>
//         <View style={styles.rowContainer}>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.itemTime}>{item.time}</Text>
//         </View>

//         <Text style={styles.message} numberOfLines={1}>
//           {/* {item.message} */}
//           {}
//         </Text>
//       </View>
//     </TouchableOpacity>
//     </>
//   };

  

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.messageTitle}>Messages</Text>
//       </View>

//       <View style={styles.mainContainer}>
//         {/* <FlatList
//           data={users}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 20 }}
//         /> */}
//       </View>
//     </View>
//   );
// }

// Messages.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FontType } from '../../Components/Constants/FontType';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../Navigation/navigation';
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;
import { RFValue } from 'react-native-responsive-fontsize';


type ChatItem = {
  chatId: string;
  serviceProvider: {
    uid: string;
    name: string;
    profileImage: string;
  };
  lastMessage: string;
  lastMessageTimestamp: any;
};

export default function Messages() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!currentUser.uid) return;

    // Real-time listener for chats
    const unsubscribe = firestore()
      .collection('conversations')
      .where('users', 'array-contains', currentUser.uid)
      .orderBy('lastMessageTimestamp', 'desc')
      .onSnapshot(snapshot => {
        const chatList: ChatItem[] = [];

        snapshot.forEach(doc => {
          const data = doc.data();
          const serviceProviderId = data.users.find(
            (uid: string) => uid !== currentUser.uid
          );

          if (serviceProviderId) {
            chatList.push({
              chatId: doc.id,
              serviceProvider: {
                uid: serviceProviderId,
                name: data[`user_${serviceProviderId}`]?.name || 'Unknown',
                profileImage: data[`user_${serviceProviderId}`]?.profileImage || '',
              },
              lastMessage: data.lastMessage || 'No messages yet',
              lastMessageTimestamp: data.lastMessageTimestamp,
            });
          }
        });

        setChats(chatList);
      });

    return () => unsubscribe();
  }, [currentUser.uid]);

  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('MessagingScreen', {
          chatId: item.chatId,
          serviceProvider: item.serviceProvider,
        })
      }
    >
      <Image
  source={
    item.serviceProvider.profileImage && item.serviceProvider.profileImage !== ''
      ? { uri: item.serviceProvider.profileImage }
      : require('../../assets/images/Others/MeAvatar.png')
  }
  style={styles.itemImage}
/>

      <View style={styles.textContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{item.serviceProvider.name}</Text>
          <Text style={styles.itemTime}>
  {item.lastMessageTimestamp ? formatTime(item.lastMessageTimestamp.toDate()) : ''}
</Text>

        </View>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.messageTitle}>Messages</Text>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={item => item.chatId}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: isSmallScreen? '18%' :'22%',
    marginHorizontal: 20,
    height: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginBottom: '4%',
  },
  messageTitle: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    color: '#263238',
    marginLeft : 6
  },
  mainContainer: {
    marginTop : '6%',
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'orange',
  },
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '95%',
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf : 'center'
  },
  itemImage: {
    width: width > 360 ? 65 : 55,
    height: width > 360 ? 65 : 55,
    borderRadius: 0
  },
  textContainer: {
    // backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginBottom : 3
  },
  name: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: '#0E134F',
  },
  message: {
    fontSize: RFValue(12.5),
    fontWeight: '400',
    color: '#42526E',
    marginTop: 4,
  },
  itemTime: {
    fontSize: RFValue(12.5),
    fontWeight: '400',
    color: '#E50914',
  },
});
