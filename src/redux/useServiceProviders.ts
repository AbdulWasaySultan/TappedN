import { useDispatch, useSelector } from 'react-redux';
import { setServiceProviders, clearServiceProviders } from './serviceProviderSlice';
import { RootState } from './store';
// import { fetchServiceProvidersFromAPI } from '../API/api';
import { ServiceProvider } from './serviceProviderSlice';
import firestore from '@react-native-firebase/firestore';

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
      const querySnapshot = await firestore().collection('users').get();
      const data: any = [];

      querySnapshot.forEach((doc) => {
        data.push({ uid: doc.id, ...doc.data() });
      });

      console.log('Fetched providers:', data.length);
      dispatch(setServiceProviders(data));
      return data;
    } catch (error) {
      console.error('Error fetching providers:', error);
      throw error;
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