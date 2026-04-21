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
import Container from '../../../../Components/Layout/Container';
import BackButton from '../../../../Components/Global/BackButton/BackButton';
import { FontType } from '../../../../Components/Constants/FontType';
import { Dimensions } from 'react-native';
import ChatList from '../../../../Components/Chat/ChatList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { sendMessage, listenToMessages } from '../../../../Firebase/messageUtils';
import { getSafeImageSource } from '../../../../utils/imageSource';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../../Navigation/navigation';

const {width, height} = Dimensions.get('window')
const isSmallScreen = height < 800

// Define the message type
type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: any;
  // add other properties as needed
};

type MessagingScreenRouteProp = RouteProp<RootStackParamList, 'MessagingScreen'>;

export default function MessagingScreen({ navigation }: any) {
  const route = useRoute<MessagingScreenRouteProp>();
  const { chatId, serviceProvider } = route.params || {};
  
  const currentUser = useSelector((state: RootState) => state.user)
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<Message[]>([]) // ✅ Fixed: Added proper type

  // Validate required params
  useEffect(() => {
    if (!chatId || !serviceProvider) {
      Alert.alert('Error', 'Invalid chat data');
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (!chatId) return;
    
    // Start listening to messages
    const unsubscribe = listenToMessages(chatId, (newMessages: Message[]) => { // ✅ Added type
      setMessages(newMessages)
    });
    
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageText.trim().length === 0) return;

    try {
      // ✅ Fixed: sendMessage expects 3 arguments, not 4
      await sendMessage(
        chatId,
        currentUser.uid,
        serviceProvider?.uid,
        messageText  // Only 3 arguments: chatId, senderId, messageText
      );
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  // Show loading if data is missing
  if (!serviceProvider) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container style={{ justifyContent: 'flex-start' }}>
      <BackButton />
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>
          {serviceProvider?.name || 'User'}
        </Text>
        {serviceProvider?.outletName && (
          <Text style={styles.outletName}>
            {serviceProvider.outletName}
          </Text>
        )}
      </View>

      <View style={styles.container}>
        {/* Messages List */}
        <ChatList
          messages={messages}
          currentUser={currentUser}
          provider={serviceProvider}
        />

        {/* Input Area */}
        <View style={styles.messageContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.inputPill}>
              <TextInput
                style={styles.messageTextInput}
                placeholder="Type message"
                placeholderTextColor="#42526E"
                value={messageText}
                onChangeText={setMessageText}    
                returnKeyType="send"
                blurOnSubmit={false}
                onSubmitEditing={handleSendMessage}
              />

              <View style={styles.iconGroup}>
                <TouchableOpacity style={{marginHorizontal: 4}}>
                  <Image
                    source={getSafeImageSource(
                      require('../../../../assets/images/Others/camera.png'), 
                      require('../../../../assets/images/Others/camera.png')
                    )}
                    style={styles.cameraIcon}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 4}}>
                  <Image
                    source={getSafeImageSource(
                      require('../../../../assets/images/Others/emoji.png'), 
                      require('../../../../assets/images/Others/emoji.png')
                    )}
                    style={styles.emojiIcon}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButtonContainer}
            >
              <Image
                source={getSafeImageSource(
                  require('../../../../assets/images/Others/send.png'), 
                  require('../../../../assets/images/Others/send.png')
                )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    width: '100%',
    flexDirection: 'column',
  },
  userName: {
    fontSize: FontType.xxxlarge,
    color: '#263238',
    fontWeight: '600',
    marginTop: 7,
  },
  outletName: {
    fontSize: FontType.medium,
    color: '#F27122',
    fontWeight: '500',
    marginTop: 4,
  },
  messageContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: isSmallScreen ? 100 : 140,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    paddingRight: 70,
    width: '100%',
  },
  inputPill: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    marginRight: 10,
  },
  messageTextInput: {
    flex: 1,
    height: 50,
    color: '#42526E',
    borderRadius: 8,
    paddingHorizontal: 12,
    maxHeight: 140,
    fontSize: FontType.regular,
  },
  iconGroup: {
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
    marginHorizontal: 6,
  },
  sendButton: {
    width: 28,
    height: 28,
  },
  cameraIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
  },
  emojiIcon: {
    width: 26,
    height: 22,
    alignSelf: 'center',
  },
});