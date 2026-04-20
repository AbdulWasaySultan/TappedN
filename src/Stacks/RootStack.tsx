import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { useAuth } from '../Context/Firebase/UserData/AuthContext';
import { setUser, clearUser } from '../redux/slices/userData/userSlice';
import { firestoreInstance } from '../Firebase/firebaseConfig';
import { authInstance } from '../Firebase/firebaseConfig';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isLoggedIn, loading, user } = useAuth();
  const dispatch = useDispatch();

  // Sync Firebase user with Redux
  useEffect(() => {
    if (user && user.uid) {
      const syncUserDataToRedux = async () => {
        try {
          // Get user data from Firestore
          const userDoc = await firestoreInstance.collection('users').doc(user.uid).get();
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(setUser({
              uid: user.uid,
              name: userData?.name || '',
              email: userData?.email || user.email || '',
              contactNo: userData?.contactNo || '',
              address: userData?.address || '',
              profileImage: userData?.profileImage || '',
            }));
          } else {
            // User logged in but no Firestore doc - create minimal entry
            dispatch(setUser({
              uid: user.uid,
              name: '',
              email: user.email || '',
              contactNo: '',
              address: '',
              profileImage: '',
            }));
          }
        } catch (error) {
          console.error('Error syncing user data:', error);
          // Still set minimal user data in Redux
          dispatch(setUser({
            uid: user.uid,
            email: user.email || '',
            name: '',
            contactNo: '',
            address: '',
            profileImage: '',
          }));
        }
      };

      syncUserDataToRedux();
    } else if (!user && !loading) {
      // User logged out
      dispatch(clearUser());
    }
  }, [user, dispatch, loading]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ animation: 'none' }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ animation: 'none' }}
        />
      )}
    </Stack.Navigator>
  );
}
