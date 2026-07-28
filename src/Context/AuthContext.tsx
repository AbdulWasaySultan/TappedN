import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { authInstance, firestoreInstance } from '../services/firebase/firebaseConfig';
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native';

  // Define UserState type if not already defined
  type UserState = {
    displayName?: string;
    photoURL?: string;
    contactNo?: string;
    address?: string;
    [key: string]: any;
  };

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  isLoggedIn : boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateProfileOnFirebase: (userId: string, updatedData: Partial<UserState>) => Promise<void>;
  // fetchUserProfileFromFirebase: (userId: string) => Promise<any | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isLoggedIn = !!user;
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // used to reduce the time taken to load the app by 700ms


  useEffect(() => {
    // Check Firebase initialization
    if (!authInstance) {
      console.error('Auth instance is not initialized');
      setLoading(false);
      return;
    }

    // Fallback: don't block app start forever if Firebase is slow.
    // This improves UX on iOS simulator/debug where the first auth callback can be delayed.
    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 700);

    const unsubscriber = authInstance.onAuthStateChanged(
      (userState: FirebaseAuthTypes.User | null) => {
        setUser(userState); // setting the user login state in contet to access globally(loggedin or loggedout)
        setLoading(false); // Set loading to false once Firebase is initialized

        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      },
    );

    // Clean up the listener on component unmount
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      unsubscriber();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!authInstance) {
        throw new Error('Auth instance is not initialized');
      }
      await authInstance.signInWithEmailAndPassword(email, password);
      console.log('Login successful, user:', authInstance.currentUser?.uid);
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!authInstance) {
        throw new Error('Auth instance is not initialized');
      }
      await authInstance.signOut();
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  const changePassword = async (currentPassword : string, newPassword : string) => {
    try{
      const user = authInstance.currentUser
      if(!user || !user.email){
        throw new Error('No user is currently logged in.')
      }
      const credentials = auth.EmailAuthProvider.credential(user.email, currentPassword)
      await user.reauthenticateWithCredential(credentials)

      await user.updatePassword(newPassword)
      Alert.alert('Success', 'Your password has been updated.');
    }
    catch(error : any){
      console.error('Error changing password:', error);
    Alert.alert('Error', error.message);
    }
  }

   const updateProfileOnFirebase = async (userId: string, updatedData: Partial<UserState>) => {
    try {
      await firestore().collection('users').doc(userId).update(updatedData);
      console.log("Firestore updated with:", updatedData);
    } catch (error) {
      console.error('Error updating profile on Firebase:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      // value={{ user, loading, login, logout, updateProfile, changePassword }}
      value={{ user, isLoggedIn: !!user, loading, login, logout, changePassword,updateProfileOnFirebase  }}

    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext)
if(!context){
  throw new Error('useAuth must be used within AuthContextProvider'); 
}
  return context;
}

// export const changePassword = async (
//   currentPassword: string,
//   newPassword: string,
// ) => {
//   try {
//     const user = authInstance.currentUser;
//     if (!user || !user.email) {
//       throw new Error('No user is currently logged in.');
//     }
//     const credentials = EmailAuthProvider.credential(
//       user.email,
//       currentPassword,
//     );
//     await user.reauthenticateWithCredential(credentials);

//     await user.updatePassword(newPassword);
//     Alert.alert('Success', 'Your password has been updated.');
//   } catch (error: any) {
//     console.error('Error changing password:', error);
//     Alert.alert('Error', error.message);
//   }
// };

// // const changeUserPassword = async (
// //   currentPassword: string,
// //   newPassword: string,
// // ) => {
// //   try {
// //     const user = authInstance.currentUser;

// //     if (!user || !user.email) {
// //       throw new Error('no user is currently loggedin!');
// //     }

// //     const credentials = EmailAuthProvider.credentials(
// //       user.email,
// //       currentPassword,
// //     );
// //     await user.reauthenticateWithCredential(credentials);
// //     await user.updatePassword(newPassword);
// //     Alert.alert('Success', 'Your password has been updated.');
// //   } catch (error: any) {
// //     console.log('error in changing password', error);
// //     Alert.alert('Error', error.message);
// //   }
// // };

