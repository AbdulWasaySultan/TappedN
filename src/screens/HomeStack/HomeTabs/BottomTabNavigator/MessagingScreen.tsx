import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Container from '../../../../Components/Layout/Container';
import BackButton from '../../../../Components/Global/BackButton/BackButton';
import { FontType } from '../../../../Components/Constants/FontType';
import { Dimensions } from 'react-native';
import ChatList from '../../../../Components/Chat/ChatList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store/store';
import { sendMessage, loadMessages } from '../../../../services/firebase/messageUtils';
import { createOrGetChat } from '../../../../services/firebase/chatUtils';
import { fetchServiceProvider } from '../../../../services/firebase/providerUtils'; // ✅ ADD THIS IMPORT
import { getSafeImageSource } from '../../../../utils/imageSource';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStack } from '../../../../Navigation/navigation';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 800;

type Message = {
  id: string;
  text: string;
  senderId: string;
  timestamp: any;
};

type MessagingScreenRouteProp = RouteProp<HomeStack, 'MessagingScreen'>;

export default function MessagingScreen() {
  const route = useRoute<MessagingScreenRouteProp>();
  const navigation = useNavigation();
  
  // ✅ CORRECT: Get providerId and chatId from params (not serviceProvider)
  const { 
    chatId: paramChatId, 
    providerId  // ✅ This is what you need
  } = route.params || {};
  
  const [chatId, setChatId] = useState(paramChatId || null);
  const [provider, setProvider] = useState<any>(null);
  const [loadingProvider, setLoadingProvider] = useState(true);
  const currentUser = useSelector((state: RootState) => state.user);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInitializing, setIsInitializing] = useState(!paramChatId);

  // ✅ Fetch provider data when screen loads
  useEffect(() => {
    const loadProviderData = async () => {
      if (!providerId) {
        console.error('No provider ID provided');
        Alert.alert('Error', 'Unable to load chat');
        navigation.goBack();
        return;
      }

      try {
        console.log('[MessagingScreen] Fetching provider:', providerId);
        const providerData = await fetchServiceProvider(providerId);
        
        if (!providerData) {
          throw new Error('Provider not found');
        }
        
        setProvider(providerData);
        console.log('[MessagingScreen] Provider loaded:', providerData);
      } catch (error) {
        console.error('[MessagingScreen] Error loading provider:', error);
        Alert.alert('Error', 'Failed to load provider information');
        navigation.goBack();
      } finally {
        setLoadingProvider(false);
      }
    };

    loadProviderData();
  }, [providerId]); // ✅ Depends on providerId

  // ✅ Initialize or create chat
  useEffect(() => {
    // If chatId was passed and we have provider, we're good
    if (paramChatId && provider) {
      setChatId(paramChatId);
      setIsInitializing(false);
      return;
    }

    // Don't proceed if no provider or user
    if (!provider || !currentUser?.uid) return;

    const initializeChat = async () => {
      try {
        console.log('Initializing chat with:', {
          currentUserId: currentUser.uid,
          currentUserName: currentUser.name,
          serviceProviderId: provider.uid,
          serviceProviderName: provider.name,
        });

        const existingOrNewChatId = await createOrGetChat(
          currentUser.uid,
          currentUser.name || 'User',
          currentUser.profileImage || '',
          provider.uid,
          provider.name || 'Service Provider',
          provider.profileImage || '',
          provider.outletName || '',
        );

        if (existingOrNewChatId) {
          setChatId(existingOrNewChatId);
          console.log('Chat initialized with ID:', existingOrNewChatId);
        } else {
          throw new Error('Failed to create/get chat');
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        Alert.alert('Error', 'Failed to initialize chat');
        navigation.goBack();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, [provider?.uid, currentUser?.uid, paramChatId]);

  // ✅ Load messages once chatId is available
  useEffect(() => {
    if (!chatId) return;
    
    console.log('Loading messages for chat:', chatId);
    const unsubscribe = loadMessages(chatId, (newMessages: Message[]) => {
      setMessages(newMessages);
    });
    
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (messageText.trim().length === 0) return;
    if (!chatId) {
      Alert.alert('Error', 'Chat not initialized');
      return;
    }

    try {
      await sendMessage(
        chatId,
        currentUser.uid,
        provider?.uid,
        messageText 
      );
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  // Show loading states
  if (loadingProvider || !provider) {
    return (
      <Container style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F27122" />
        <Text style={styles.loadingText}>Loading chat...</Text>
      </Container>
    );
  }

  if (isInitializing) {
    return (
      <Container style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F27122" />
        <Text style={styles.loadingText}>Initializing chat...</Text>
      </Container>
    );
  }

  return (
    <Container style={{ justifyContent: 'flex-start' }}>
      <BackButton />
      <View style={styles.titleContainer}>
        <Text style={styles.userName}>
          {provider?.name || 'User'}
        </Text>
        {provider?.outletName && (
          <Text style={styles.outletName}>
            {provider.outletName}
          </Text>
        )}
      </View>

      <View style={styles.container}>
        <ChatList
          messages={messages}
          currentUser={currentUser}
          provider={provider}
        />

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: FontType.medium,
    color: '#42526E',
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
    width: '100%',
    // backgroundColor: '#000',
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