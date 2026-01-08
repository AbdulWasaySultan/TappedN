// utils/chatUtils.ts
import firestore from '@react-native-firebase/firestore';
import { authInstance } from './firebaseConfig';

export const createOrGetChat = async (
  currentUserId: string,
  serviceProviderId: string
) => {
  try {
    // Check if user is authenticated
    const currentUser = authInstance.currentUser;
    console.log('Current user UID:', currentUser?.uid);

    if (!currentUserId || !serviceProviderId) {
      console.error('No current user id provided or other user id provided');
      return null;
    }

    // Create a consistent chatId (smaller ID first)
    const chatId = [currentUserId, serviceProviderId].sort().join('_');
    console.log('Chat ID:', chatId);

    // Simplified: Just set the chat document with merge
    // This creates if doesn't exist, updates if exists
    await firestore()
      .collection('chats')
      .doc(chatId)
      .set(
        {
          users: [currentUserId, serviceProviderId],
          createdAt: firestore.FieldValue.serverTimestamp(),
          lastMessage: '',
          lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true } // Don't overwrite existing data
      );

    console.log('Chat created/updated successfully:', chatId);
    return chatId;
  } catch (error) {
    console.error('Error creating/getting chat:', error);
    console.error('Error code:', (error as any)?.code);
    return null;
  }
};