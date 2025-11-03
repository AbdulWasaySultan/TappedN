// import { createContext, useContext, useState, useEffect } from 'react';
// import React from 'react';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { auth, initializeFirebase } from '../screens/Firebase/firebaseConfig'; // Import the function

// type AuthContextType = {
//   user: FirebaseAuthTypes.User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   login: async () => {},
//   logout: async () => {},
// });

// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [authInstance, setAuthInstance] = useState<FirebaseAuthTypes.Module | null>(null);

//   useEffect(() => {
//     // Initialize Firebase only once
//     const initialize = async () => {
//       try {
//         const { auth } = await initializeFirebase(); // Initialize Firebase only once
//         setAuthInstance(auth); // Set auth instance in state

//         // Listen for authentication state changes
//         const unsubscriber = auth.onAuthStateChanged((userState) => {
//           setUser(userState);
//           setLoading(false); // Set loading to false once Firebase is initialized
//         });

//         // Clean up listener on component unmount
//         return unsubscriber;
//       } catch (error) {
//         console.error('Firebase initialization error:', error);
//         setLoading(false); // Set loading to false even if Firebase fails to initialize
//       }
//     };

//     initialize();
//   }, []); // Empty dependency array ensures this runs only once

//   const login = async (email: string, password: string) => {
//     if (!authInstance) {
//       console.error('Auth not initialized');
//       return;
//     }

//     try {
//       await authInstance.signInWithEmailAndPassword(email, password); // Use the initialized auth instance
//     } catch (error: any) {
//       console.log('Error signing in', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     if (!authInstance) {
//       console.error('Auth not initialized');
//       return;
//     }

//     await authInstance.signOut(); // Use the initialized auth instance
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from 'react';
import { FirebaseAuthTypes, updatePassword } from '@react-native-firebase/auth';
import { authInstance } from '../screens/Firebase/firebaseConfig'; // Import initialized auth
import { Alert, ImageStyle } from 'react-native';
import { dbInstance } from '../screens/Firebase/firebaseConfig';
import { EmailAuthProvider } from '@react-native-firebase/auth';  // Import EmailAuthProvider
import { current } from '@reduxjs/toolkit';


type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (
    fullName: string,
    profileImage: string,
    email: string,
    contactNo: number | undefined,
    address: string,
  ) => Promise<void>,
  changePassword : (currentPassword : string, newPassword : string) => Promise<void>
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  changePassword : async () => {}
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check Firebase initialization
    if (!authInstance) {
      console.error('Auth instance is not initialized');
      return;
    }

    const unsubscriber = authInstance.onAuthStateChanged(
      (userState: FirebaseAuthTypes.User | null) => {
        setUser(userState);
        setLoading(false); // Set loading to false once Firebase is initialized
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscriber();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (authInstance) {
        await authInstance.signInWithEmailAndPassword(email, password);
      } else {
        console.error('Auth instance is not initialized');
      }
    } catch (error: any) {
      console.error('Error signing in', error);
      throw error;
    }
  };

  const updateProfile = async (
    fullName: string,
    profileImage: string,
    email: string,
    contactNo: number | undefined,
    address: string,
  ) => {
    // if (contactNo && isNaN(contactNo)) {
    //   throw new Error('Invalid contact number');
    //   return;
    // }
    if (address && address.length < 3) {
      throw new Error('Invalid address');
      return;
    }
    if (email && email.length < 3) {
      throw new Error('Invalid email');
      return;
    }
    if (user) {
      try {
        const userCredential = authInstance.currentUser;
        const currentUser = userCredential;

        if (email !== user?.email) {
          // Create credentials using current email and password
          const credentials = EmailAuthProvider.credential(
            user.email as string, // Current user's email
            `${email}` // You need to provide the user's current password
          );
          await currentUser?.reauthenticateWithCredential(credentials); // Reauthenticate the user
          await currentUser?.updateEmail(email); // Update the email after reauthentication
        }


        // await user.updateProfile({
        //   displayName: fullName,
        //   photoURL: profileImage,
        // });
        // await user.updateEmail(email);

        // firebase only provide default method to update just email,
        // name and profileImage but we can update other fields using
        // firestore database like we have done below

        await currentUser?.updateProfile({
          displayName: fullName,
          photoURL: profileImage,
        });

        // we could also do this
        // await firestore().collection('users').doc(user.uid).update({
        await dbInstance.collection('users').doc(user.uid).update({
          contactNo,
          address,
          profileImage,
        });

        setUser({ ...user, displayName: fullName, photoURL: profileImage });
      } catch (error) {
        console.log('error', error);
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      if (authInstance) {
        await authInstance.signOut();
      } else {
        console.error('Auth instance is not initialized');
      }
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const changePassword = async (currentPassword : string, newPassword : string) => {
    try{
      const user = authInstance.currentUser
      if(!user || !user.email){
        throw new Error('No user is currently logged in.')
      }
      const credentials = EmailAuthProvider.credentials(user.email, currentPassword)
      await user.reauthenticateWithCredential(credentials)

      await user.updatePassword(newPassword)
      Alert.alert('Success', 'Your password has been updated.');
    }
    catch(error : any){
      console.error('Error changing password:', error);
    Alert.alert('Error', error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
