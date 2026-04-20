import React from 'react';
import { useEffect, useState } from 'react';

import { Text, View, Alert, FlatList } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useServiceProviders } from '../../redux/hooks/useServiceProviders';

import {
  sendMessage,
  listenToMessages,
  getUserProfile,
} from '../../Firebase/messageUtils';
import { setUser } from '../../redux/slices/userData/userSlice';
import ChatItem from './ChatItem';

// export default function ChatList({ users }) {

// export default function ChatList({ messages, currentUser, provider }: any) {

export default function ChatList({ children, route }: any) {
  // const route = useRoute()
  // const { chatId, serviceProvider } = route.params; // serviceProvider has uid, name, profileImage
  const currentUser = useSelector((state: RootState) => state.user);
  const { getProviderById } = useServiceProviders();
  const [messages, setMessages] = useState<Array<any>>([]);
  const [messageText, setMessageText] = useState('');
  const [provider, setProvider] = useState(route.serviceProvider || {});
  const [userData, setUserData] = useState();

  // DEBUG: Log current user and other user

  const fetchProviderData = async () => {
      try {
        const profile = await getUserProfile(route.serviceProvider.uid);
        if (profile) {
          setProvider({
            ...route.serviceProvider,
            ...profile, // Firestore data (name, profileImage, etc.) overrides
          });
          console.log('Provider profile fetched from Firestore:', profile);
        }
      } catch (error) {
        console.error('Error fetching provider profile:', error);
        // Fallback to passed serviceProvider data
        setProvider(route.serviceProvider);
      }
    };
  useEffect(() => {
    console.log('========== MessagingScreen Debug ==========');
    console.log('Current User UID:', currentUser?.uid);
    console.log('Current User Name:', currentUser?.name);
    console.log('Other User UID:', route.serviceProvider?.uid);
    console.log('Other User Name:', route.serviceProvider?.name);
    console.log('Chat ID:', route.chatId);
    console.log('==========================================');
  }, [currentUser?.uid, route.serviceProvider?.uid, route.chatId]);

  // Get provider profile from Firestore (including profile image)
  useEffect(() => {
    if (!route.serviceProvider?.uid) return;


    fetchProviderData();
  }, [route.serviceProvider?.uid]);

  // Listen to messages
  useEffect(() => {
    if (!route.chatId) {
      console.log('No chatId provided');
      return;
    }

    console.log('Setting up message listener for chatId:', route.chatId);

    const unsubscribe = listenToMessages(route.chatId, setMessages, error => {
      console.error('Error fetching messages:', error);
    });

    return () => unsubscribe();
  }, [route.chatId]);

  return (
    <>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
        <ChatItem 
        item={item} 
        isMine={item.senderId === currentUser.uid}
        provider={provider}
        currentUser={currentUser}
        /> 
      )}
        // Keeps your logic
        // contentContainerStyle={styles.flatListContainer}
        scrollEnabled={true}
        inverted
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
