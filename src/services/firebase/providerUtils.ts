import React from "react";
import firestore from '@react-native-firebase/firestore';

export type ServiceProvider = {
  uid: string;
  name: string;
  profileImage: string;
  outletName: string;
  email?: string;
  phone?: string;
  rating?: number;
};

export const fetchServiceProvider = async (
    providerId: string
): Promise<ServiceProvider | null> => {
 
    try{
    console.log('[ProviderUtils] Fetching provider:', providerId);

    const providerDoc = await firestore()
    .collection('serviceProviders')
    .doc(providerId)
    .get();

   if (!providerDoc.exists) {
      console.warn('[ProviderUtils] Provider not found:', providerId);
      return null;
    }

    const data = providerDoc.data();
    return{
        uid: providerId,
        name: data?.name || 'Unknown',
        profileImage: data?.profileImage || '',
        outletName: data?.outletName || '',
        email: data?.email || '',
        phone: data?.phone || '',
        rating: data?.rating || 0, 
    }
}
    catch(error){
        console.error('[ProviderUtils] Error fetching provider:', error);
        throw error;
    }
}