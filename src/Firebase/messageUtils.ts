import firestore from '@react-native-firebase/firestore';
import { authInstance } from './firebaseConfig';

/**
 * Fetch user profile data (including image) from Firestore
 */
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      console.warn(`User ${userId} not found in Firestore`);
      return null;
    }

    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Send a message in a chat
 */
export const sendMessage = async (
  chatId: string,
  senderId: string,
  receiverId: string,
  text: string
) => {
  try {
    if (!text.trim()) return;

    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        senderId,
        receiverId,
        text: text.trim(),
        timestamp: firestore.FieldValue.serverTimestamp(),
        type: 'text',
      });

    // Update last message in chat document
    await firestore().collection('chats').doc(chatId).update({
      lastMessage: text.trim(),
      lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
    });

    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Listen to messages in a chat and return unsubscribe function
 */
export const listenToMessages = (
  chatId: string,
  setMessages: (messages: any[]) => any,
  onError?: (error: any) => void
) => {
  try {
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        snapshot => {
          const fetchedMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('Fetched messages:', fetchedMessages.length);
          setMessages(fetchedMessages);
        },
        error => {
          console.error('Error listening to messages:', error);
          onError?.(error);
        }
      );

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up message listener:', error);
    throw error;
  }
};

