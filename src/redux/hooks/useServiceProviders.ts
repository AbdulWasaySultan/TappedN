import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  FirebaseFirestoreTypes          // Import this
} from '@react-native-firebase/firestore';
import { firestoreInstance } from '../../Firebase/firebaseConfig';

import {
  setServiceProviders,
  clearServiceProviders,
  ServiceProvider,
  ServiceProviderData
} from '../slices/vendorData/serviceProviderSlice';
import { RootState } from '../store/store';
// import { fetchServiceProvidersFromAPI } from '../API/api';

/**
 * Simple hook to get and manage service providers
 * Just fetches from API and stores in Redux
 */

// Define the shape of your document data

export const useServiceProviders = () => {
  const dispatch = useDispatch();
  const providers = useSelector(
    (state: RootState) => state.serviceProviders.providers,
  );
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  // Fetch from Firestore and store in Redux
  const fetchProviders = async (role?: string, forceRefresh: boolean = false) => {

    if(providers.length > 0 && !forceRefresh) return;

    setLoading(true);
    setError(null);
    if(providers.length > 0){
    try {
      const baseQuery = role
        ? query(
            collection(firestoreInstance, 'users'),
            where('role', '==', role),
          )
        : collection(firestoreInstance, 'users');
      // Modular way: pass the instance and collection name

      const querySnapshot = await getDocs(baseQuery);

      const data: ServiceProvider[] = querySnapshot.docs.map((doc: FirebaseFirestoreTypes
        .QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) => {
       const docData = doc.data() as ServiceProviderData;

       return {
        uid : doc.id,
        ...docData,
       };
      });

      dispatch(setServiceProviders(data));
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown Error';
      setError(message);
      console.error('Firestore Fetch Error:', message);
    } finally {
      setLoading(false);
    }
  }};

  // Get provider by ID
  // .find() gets the whole providers array if
  // the uid gets match with the p.uid
  const getProviderById = (uid: string): ServiceProvider | undefined => {
    return providers.find(p => p.uid === uid);
  };

  return {
    providers,
    fetchProviders,
    getProviderById,
    clearProviders: () => dispatch(clearServiceProviders()),
  };
};
