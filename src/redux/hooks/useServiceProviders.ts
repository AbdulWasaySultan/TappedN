import { useDispatch, useSelector } from 'react-redux';
import { setServiceProviders, clearServiceProviders } from '../slices/vendorData/serviceProviderSlice';
import { RootState } from '../store/store';
// import { fetchServiceProvidersFromAPI } from '../API/api';
import { ServiceProvider } from '../slices/vendorData/serviceProviderSlice';


import { collection, getDocs } from '@react-native-firebase/firestore';
import { firestoreInstance } from '../../Firebase/firebaseConfig';

/**
 * Simple hook to get and manage service providers
 * Just fetches from API and stores in Redux
 */
export const useServiceProviders = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state: RootState) => state.serviceProviders.providers);

  // Fetch from Firestore and store in Redux
 const fetchProviders = async () => {
  try {
    // Modular way: pass the instance and collection name
    const querySnapshot = await getDocs(collection(firestoreInstance, 'users'));
    const data : ServiceProvider[] = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...(doc.data() as Omit<ServiceProvider, 'uid'>)
    }));
    
    dispatch(setServiceProviders(data));
    return data;
  } catch (error) {
    console.error('Error fetching providers:', error);
  }
};


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