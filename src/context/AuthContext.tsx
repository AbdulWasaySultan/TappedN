/*
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

*/

// import { createContext, useContext, useState, useEffect } from 'react';
// import { FirebaseAuthTypes, updatePassword } from '@react-native-firebase/auth';
// import { current } from '@reduxjs/toolkit';
// import { dbInstance } from '../screens/Firebase/firebaseConfig';
import { EmailAuthProvider } from '@react-native-firebase/auth'; // Import EmailAuthProvider
import { authInstance } from '../screens/Firebase/firebaseConfig'; // Import initialized auth
import { Alert, ImageStyle } from 'react-native';

//   // Define UserState type if not already defined
//   type UserState = {
//     displayName?: string;
//     photoURL?: string;
//     contactNo?: string;
//     address?: string;
//     [key: string]: any;
//   };

// type AuthContextType = {
//   user: FirebaseAuthTypes.User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   // updateProfile: (
//   //   fullName: string,
//   //   profileImage: string,
//   //   email: string,
//   //   contactNo: any ,
//   //   address: string,
//   // ) => Promise<void>,
//   changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
//   updateProfileOnFirebase: (userId: string, updatedData: Partial<UserState>) => Promise<void>;
//   // fetchUserProfileFromFirebase: (userId: string) => Promise<any | undefined>;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   login: async () => {},
//   logout: async () => {},
//   // updateProfile: async () => {},
//   changePassword : async () => {},
//   updateProfileOnFirebase : async () => {},
//   // fetchUserProfileFromFirebase : async () => {}
// });

// export const AuthContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     // Check Firebase initialization
//     if (!authInstance) {
//       console.error('Auth instance is not initialized');
//       return;
//     }

//     const unsubscriber = authInstance.onAuthStateChanged(
//       (userState: FirebaseAuthTypes.User | null) => {
//         setUser(userState);
//         setLoading(false); // Set loading to false once Firebase is initialized
//       },
//     );

//     // Clean up the listener on component unmount
//     return () => unsubscriber();
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       if (authInstance) {
//         await authInstance.signInWithEmailAndPassword(email, password);
//       } else {
//         console.error('Auth instance is not initialized');
//       }
//     } catch (error: any) {
//       console.error('Error signing in', error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       if (authInstance) {
//         await authInstance.signOut();
//       } else {
//         console.error('Auth instance is not initialized');
//       }
//     } catch (error) {
//       console.error('Error signing out', error);
//     }
//   };

//   const changePassword = async (currentPassword : string, newPassword : string) => {
//     try{
//       const user = authInstance.currentUser
//       if(!user || !user.email){
//         throw new Error('No user is currently logged in.')
//       }
//       const credentials = EmailAuthProvider.credential(user.email, currentPassword)
//       await user.reauthenticateWithCredential(credentials)

//       await user.updatePassword(newPassword)
//       Alert.alert('Success', 'Your password has been updated.');
//     }
//     catch(error : any){
//       console.error('Error changing password:', error);
//     Alert.alert('Error', error.message);
//     }
//   }

//    const updateProfileOnFirebase = async (userId: string, updatedData: Partial<UserState>) => {
//     try {
//       await dbInstance.collection('users').doc(userId).update(updatedData);
//       console.log("Firestore updated with:", updatedData);
//     } catch (error) {
//       console.error('Error updating profile on Firebase:', error);
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider
//       // value={{ user, loading, login, logout, updateProfile, changePassword }}
//       value={{ user, loading, login, logout, changePassword,updateProfileOnFirebase  }}

//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    const user = authInstance.currentUser;
    if (!user || !user.email) {
      throw new Error('No user is currently logged in.');
    }
    const credentials = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await user.reauthenticateWithCredential(credentials);

    await user.updatePassword(newPassword);
    Alert.alert('Success', 'Your password has been updated.');
  } catch (error: any) {
    console.error('Error changing password:', error);
    Alert.alert('Error', error.message);
  }
};

// const changeUserPassword = async (
//   currentPassword: string,
//   newPassword: string,
// ) => {
//   try {
//     const user = authInstance.currentUser;

//     if (!user || !user.email) {
//       throw new Error('no user is currently loggedin!');
//     }

//     const credentials = EmailAuthProvider.credentials(
//       user.email,
//       currentPassword,
//     );
//     await user.reauthenticateWithCredential(credentials);
//     await user.updatePassword(newPassword);
//     Alert.alert('Success', 'Your password has been updated.');
//   } catch (error: any) {
//     console.log('error in changing password', error);
//     Alert.alert('Error', error.message);
//   }
// };
