// MessagingScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Container from '../../../Components/Container';
import BackButton from '../../../Components/BackButton/BackButton';
import { FontType } from '../../../Components/Constants/FontType';
import { useServiceProviders } from '../../../redux/useServiceProviders';
import { Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window')
const isSmallScreen = height < 800
const isSmallScr = width < 400

export default function MessagingScreen({ route }: any) {
  const { chatId, serviceProviders } = route.params; // serviceProvidersId has uid, name, profileImage
  const currentUser = useSelector((state: RootState) => state.user);
  const { getProviderById } = useServiceProviders();
  const [messages, setMessages] = useState<Array<any>>([]);
  const [messageText, setMessageText] = useState('');
  const [providerData, setProviderData] = useState(serviceProviders || {});

  // DEBUG: Log current user and other user
  useEffect(() => {
    console.log('========== MessagingScreen Debug ==========');
    console.log('Current User UID:', currentUser?.uid);
    console.log('Current User Name:', currentUser?.name);
    console.log('Other User UID:', serviceProviders?.uid);
    console.log('Other User Name:', serviceProviders?.name);
    console.log('Chat ID:', chatId);
    console.log('==========================================');
  }, [currentUser?.uid, serviceProviders?.uid, chatId]);
  const {width, height} = Dimensions.get('window');
  
  // Get provider from Redux cache
  useEffect(() => {
    if (serviceProviders?.uid) {
      const provider = getProviderById(serviceProviders.uid);
      if (provider) {
        setProviderData(provider);
      }
    }
  }, [serviceProviders?.uid]);

  // Listen to messages
  useEffect(() => {
    if (!chatId) {
      console.log('No chatId provided');
      return;
    }

    console.log('Setting up message listener for chatId:', chatId);

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc') // Oldest first
      .onSnapshot(
        snapshot => {
          console.log('Messages received:', snapshot.size);
          const fetchedMessages = snapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Message:', {
              id: doc.id,
              senderId: data.senderId,
              text: data.text,
            });
            return {
              id: doc.id,
              ...data,
            };
          });
          console.log('Fetched messages:', fetchedMessages.length);
          setMessages(fetchedMessages);
        },
        error => {
          console.error('Error listening to messages:', error);
        }
      );

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    const trimmedMessage = messageText.trim();
    if (trimmedMessage.length === 0) return;

    try {
      // Add message to sub-collection
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          senderId: currentUser.uid,
          receiverId: serviceProviders.uid,
          text: trimmedMessage,
          timestamp: firestore.FieldValue.serverTimestamp(),
          type: 'text',
        });

      // Update last message in chat document
      await firestore().collection('chats').doc(chatId).update({
        lastMessage: trimmedMessage,
        lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
      });

      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isMine = item.senderId === currentUser.uid;
    
    console.log('Rendering message:', {
      messageId: item.id,
      senderId: item.senderId,
      currentUserUid: currentUser.uid,
      isMine: isMine,
      text: item.text,
    });

    return (
      <View
        style={[
          styles.messageCell,
          isMine ? styles.myMessageRow : styles.theirMessageRow,
        ]}
      >
        {isMine && (
          <Image
            source={
              providerData?.profileImage
                ? { uri: providerData.profileImage }
                : isMine?  require('../../../assets/images/Others/MeAvatar.png')
                : require('../../../assets/images/Others/YouAvatar.png')
            }
            style={styles.profileImage}
          />
        )}
        <View
          style={[
            styles.messageField,
            isMine ? styles.myMessageBubble : styles.theirMessageBubble,
          ]}
        >
          <Text style={isMine ? styles.myMessageText : styles.theirMessageText}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Container style={{ justifyContent: 'flex-start' }}>
      <BackButton />
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>
          {providerData?.name}
        </Text>
      </View>

      {/* <Text style={styles.message}>{providerData.text || 'Provider'}</Text> */}

      {/* {providerData?.outletName ? (
  <Text style={styles.outletName}>
    {providerData.outletName}
  </Text>
) : (
  <Text style={styles.outletName}>
    TappedN User
  </Text>
)} */}

      <View style={styles.container}>
        {/* Messages List: UI structure from first, logic (inverted/renderMessage) from second */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage} // Keeps your logic
          // contentContainerStyle={styles.flatListContainer}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area: UI structure from first, logic from second */}
        <View style={styles.messageContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.inputPill}>
              <TextInput
                style={styles.messageTextInput}
                placeholder="Type message"
                placeholderTextColor="#42526E"
                value={messageText}
                onChangeText={setMessageText}
              />

              <View style={styles.iconGroup}>
              <TouchableOpacity style={{marginHorizontal : 4}}>
                <Image
                  source={require('../../../assets/images/Others/camera.png')}
                  style={styles.cameraIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal : 4}}>
                <Image
                  source={require('../../../assets/images/Others/emoji.png')}
                  style={styles.emojiIcon}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={sendMessage} // Keeps your function call logic
              style={styles.sendButtonContainer}
            >
              <Image
                source={require('../../../assets/images/Others/send.png')}
                style={styles.sendButton}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Container>
  );
}
// Styles remain the same...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    // backgroundColor: 'yellow',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    width: '100%',
    // backgroundColor : 'yellow',
    flexDirection: 'row',
  },
  title: {
    fontSize: FontType.titleBold2,
    fontWeight: '900',
    color: '#F27122',
    textAlign: 'center',
  },
  messageCell: {
    width: '100%',
    marginVertical: 4,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  messageField: {
    borderRadius: 10,
    padding: 12,
    maxWidth: '75%', // Max 75% of screen for flexible bubbles
    justifyContent: 'center',
  },
  myMessageBubble: {
    backgroundColor: '#F2F2F2',
    borderTopRightRadius: 2,
    alignSelf: 'flex-end',
  },
  theirMessageBubble: {
    backgroundColor: '#FDECE1',
    borderTopLeftRadius: 2,
    alignSelf: 'flex-start',
  },
  myMessageText: {
    fontSize: FontType.regular,
    color: '#42526E',
    flexWrap: 'wrap',
  },
  theirMessageText: {
    fontSize: FontType.regular,
    color: '#FFF',
  },
  messageContainer: {
    width: '100%',
    // backgroundColor: '#F27122',
  backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: isSmallScreen? 100 : 140,
    // paddingBottom: 30,
    // paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    // paddingHorizontal: 10,
    // borderRadius : 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-evenly',
    // backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingRight : 70,
    width: '100%',
  },
  inputPill: {
    flex: 0,
    borderRadius : 8,
    paddingHorizontal : 6,
    alignItems : 'center',
    minHeight : 50,
     backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    marginRight : 10
  },
  messageTextInput: {
    flex: 1,
    height: 50,
    // backgroundColor: 'transparent',
    // backgroundColor : '#cdcdcd',
    color : '#42526E',
    borderRadius: 8,
    paddingHorizontal: 12,
    // marginRight: 10,
    maxHeight : 140,
    fontSize : FontType.regular
  },
  iconGroup:{
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F27122',
    width: 46,
    height: 46,
    borderRadius: 7,
    marginBottom: 2,
    marginHorizontal : 6
  },
  sendButton: {
    width: 28,
    height: 28,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 10,
  },
  userName: {
    fontSize: FontType.xxxlarge,
    color: '#263238',
    fontWeight: '600',
    marginTop: 7,
  },
  outletName: {
    fontSize: FontType.regular,
    color: '#000',
    fontWeight: '700',
    marginTop: 2,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  // theirMessageText: {
  //   fontSize: FontType.regular,
  //   color: '#333',
  //   flexWrap: 'wrap',
  // },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  message: {
    color: '#000',
    fontSize: FontType.medium,
    fontWeight: '700',
  },
  cameraIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
    // marginLeft: 10,
  },
  emojiIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
    // marginLeft: 10,
  },
});
