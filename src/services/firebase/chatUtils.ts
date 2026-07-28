// utils/chatUtils.ts
import firestore from '@react-native-firebase/firestore';
import { authInstance } from './firebaseConfig';

export const createOrGetChat = async (
  currentUserId: string | undefined,
  currentUserName: string | undefined,
  currentUserImage: string | undefined,
  serviceProviderId: string,
  serviceProviderName: string,
  serviceProviderImage: string,
  serviceProviderOutletName: string,
) => {
  try {
    // Check if user is authenticated
    const currentUser = authInstance.currentUser;
    console.log('[Chat] Current user UID:', currentUser?.uid);

    if (!currentUserId || !serviceProviderId) {
      console.error('[Chat] No current user id or provider id provided');
      return null;
    }

    // Create a consistent chatId (smaller ID first)
    const chatId = [currentUserId, serviceProviderId].sort().join('_');
    console.log('[Chat] Chat ID created:', chatId);

    // Set the chat document with merge
    await firestore()
      .collection('chats')
      .doc(chatId)
      .set(
        {
          users: [currentUserId, serviceProviderId],
          [`user_${currentUserId}`]: {
            name: currentUserName,
            profileImage: currentUserImage,
          },
          [`user_${serviceProviderId}`]: {
            name: serviceProviderName,
            profileImage: serviceProviderImage,
            outletName: serviceProviderOutletName,
          },
          createdAt: firestore.FieldValue.serverTimestamp(),
          lastMessage: '',
          lastMessageTimestamp: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

    console.log('[Chat] Chat created/updated successfully:', chatId);
    return chatId;
  } catch (error) {
    console.error('[Chat] Error creating/getting chat:', error);
    console.error('[Chat] Error code:', (error as any)?.code);
    return null;
  }
};
