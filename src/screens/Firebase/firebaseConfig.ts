// import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth';
// import { FirebaseFirestoreTypes, getFirestore } from '@react-native-firebase/firestore';

// Your Firebase configuration (get this from Firebase Console)
// const firebaseConfig = {
//   apiKey: 'AIzaSyDzb3r_ATn7vUnWB7Nqp1kkHIIJLMq4aN8',
//   authDomain: 'tappedn-d77b6.firebaseapp.com',
//   projectId: 'tappedn-d77b6',
//   storageBucket: 'tappedn-d77b6.firebasestorage.app',
//   messagingSenderId: '80854759834',
//   appId: '1:80854759834:ios:1faa2e33c5f393ecad6223',
//   measurementId: 'G-1234567890',
//   databaseURL: 'https://tappedn-d77b6-default-rtdb.firebaseio.com',
// };

// Firebase services
// let auth: FirebaseAuthTypes.Module | undefined;
// let db: FirebaseFirestoreTypes.Module | undefined;

// // Initialize Firebase app (No need for async/await here)
// export async function initializeFirebase() {
//   try {
//     // Synchronously initialize Firebase app
//     const app = await initializeApp(firebaseConfig); // Initialize Firebase app

//     // Initialize Auth and Firestore services
//     auth = getAuth(app);
//     db = getFirestore(app);

//     // Return the initialized services
//     return { auth, db, app };
//   } catch (error) {
//     console.error('Error initializing Firebase:', error);
//     throw error;
//   }
// }

// export { auth, db };

// Return initialized services
// export { authInstance, dbInstance };

import { initializeApp, getApp, getApps  } from '@react-native-firebase/app'; // Import getApps to check initialized apps
import {getAuth} from '@react-native-firebase/auth';  // Import auth from @react-native-firebase/auth
import {getFirestore} from '@react-native-firebase/firestore'; // Import firestore

// Your Firebase configuration (get this from Firebase Console)
const firebaseConfig = {
  apiKey: 'AIzaSyDzb3r_ATn7vUnWB7Nqp1kkHIIJLMq4aN8',
  authDomain: 'tappedn-d77b6.firebaseapp.com',
  projectId: 'tappedn-d77b6',
  storageBucket: 'tappedn-d77b6.firebasestorage.app',
  messagingSenderId: '80854759834',
  appId: '1:80854759834:ios:1faa2e33c5f393ecad6223',
  measurementId: 'G-1234567890',
  databaseURL: 'https://tappedn-d77b6-default-rtdb.firebaseio.com',
};

// Initialize Firebase only if it's not already initialized
if (getApps().length === 0) {
  initializeApp(firebaseConfig);  // Initialize Firebase
}

const app = getApp();
// Export the auth and firestore instances
export const authInstance = getAuth(app);
export const dbInstance = getFirestore(app);
