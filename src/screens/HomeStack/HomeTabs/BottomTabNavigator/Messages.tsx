import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontType } from '../../../../Components/Constants/FontType';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeStack } from '../../../../Navigation/navigation';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import SafeImage from '../../../../Components/Global/SafeImage';
import firestore from '@react-native-firebase/firestore';

import ChatItem from '../../../../Components/Chat/ChatItem';

// import { sendMessage } from '@react-native-firebase/messaging';
const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;

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

type ChatItem = {
  chatId: string;
  serviceProvider: {
    uid: string;
    name: string;
    profileImage: string;
    outletName: string;
  };
  lastMessage: string;
  lastMessageTimestamp: any;
};

export default function Messages() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [chats, setChats] = useState<ChatItem[]>([]);
  const navigation = useNavigation<NavigationProp<HomeStack>>();

  useEffect(() => {
    if (!currentUser.uid) return;

    // Real-time listener for chats
    // Create the listener directly instead of calling loadChatCells
    const unsubscribe = firestore()
      .collection('chats')
      .where('users', 'array-contains', currentUser.uid)
      .orderBy('lastMessageTimestamp', 'desc')
      .onSnapshot(snapshot => {
        if (!snapshot || snapshot.empty) {
          setChats([]);
          return;
        }

        const chatList: ChatItem[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          const serviceProviderId = data.users.find(
            (uid: string) => uid !== currentUser.uid,
          );

          if (serviceProviderId) {
            chatList.push({
              chatId: doc.id,
              serviceProvider: {
                uid: serviceProviderId,
                name: data[`user_${serviceProviderId}`]?.name || 'Unknown',
                profileImage: data[`user_${serviceProviderId}`]?.profileImage || '',
                outletName: data[`user_${serviceProviderId}`]?.outletName || '', // Add this
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

  const renderItem = ({ item }: { item: ChatItem }) => {
    return (
      <TouchableOpacity
        style={[styles.itemContainer, {backgroundColor: 'green'}]}
        onPress={() =>
          navigation.navigate('MessagingScreen', {
            chatId: item.chatId,
            providerId: item.serviceProvider.uid,
          })
        }
      >
        <SafeImage
          uri={item.serviceProvider.profileImage}
          fallbackSource={require('../../../../assets/images/Others/MeAvatar.png')}
          style={styles.itemImage}
        />

        <View style={styles.textContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.name}>{item.serviceProvider.name}</Text>
            <Text style={styles.itemTime}>
              {item.lastMessageTimestamp
                ? formatTime(item.lastMessageTimestamp.toDate())
                : ''}
            </Text>
          </View>
          <Text style={styles.message} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  header: {
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: isSmallScreen ? '18%' : '22%',
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
    marginLeft: 6,
  },
  mainContainer: {
    marginTop: '6%',
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    // backgroundColor: 'orange',
  },
  itemContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    width: '100%',
    // marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  itemImage: {
    width: width > 360 ? 65 : 55,
    height: width > 360 ? 65 : 55,
    borderRadius: 0,
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
    marginBottom: 3,
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

/* <SafeImage
        uri={item.serviceProvider.profileImage}
        fallbackSource={require('../../../../assets/images/Others/MeAvatar.png')}
        style={styles.itemImage}
      />

      <View style={styles.textContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{item.serviceProvider.name}</Text>
          <Text style={styles.itemTime}>
            {item.lastMessageTimestamp
              ? formatTime(item.lastMessageTimestamp.toDate())
              : ''}
          </Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  ); */
