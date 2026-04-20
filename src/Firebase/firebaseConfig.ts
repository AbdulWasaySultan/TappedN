// // import type { FirebaseApp } from '@react-native-firebase/app';

// import { firebase } from '@react-native-firebase/auth'

// // // Your Firebase configuration (get this from Firebase Console)
// // const firebaseConfig = {
// //   apiKey: 'AIzaSyDzb3r_ATn7vUnWB7Nqp1kkHIIJLMq4aN8',
// //   authDomain: 'tappedn-d77b6.firebaseapp.com',
// //   projectId: 'tappedn-d77b6',
// //   storageBucket: 'tappedn-d77b6.firebasestorage.app',
// //   messagingSenderId: '80854759834',
// //   appId: '1:80854759834:ios:1faa2e33c5f393ecad6223',
// //   measurementId: 'G-1234567890',
// //   databaseURL: 'https://tappedn-d77b6-default-rtdb.firebaseio.com',
// // };

// // let app: ReturnType<typeof initializeApp>
// // Initialize Firebase only if it's not already initialized
// import { getApp, getApps, initializeApp } from '@react-native-firebase/app';
// import { getAuth } from '@react-native-firebase/auth';
// import { getFirestore } from '@react-native-firebase/firestore';

// // Define a helper to resolve the app instance synchronously
// const getFirebaseApp = () => {
//   if (getApps().length === 0) {
//     return initializeApp(undefined as any);
//   }
//   return getApp();
// };

// // We use 'as any' here specifically to bypass the Promise/Object conflict 
// // that triggers the 'Did you forget to use await?' error.
// const app = getFirebaseApp() as any;

// const authInstance = getAuth(app);
// const firestoreInstance = getFirestore(app);

// export { app, authInstance, firestoreInstance };

// // // Initialize Firebase only if it's not already initialized
// // if (getApps().length === 0) {
// //   initializeApp(firebaseConfig);  // Initialize Firebase
// // }



// // import firebase from '@react-native-firebase/app';
// // import auth from '@react-native-firebase/auth';
// // import firestore from '@react-native-firebase/firestore';
// // // On Android, @react-native-firebase/app automatically 
// // // initializes the [DEFAULT] app from google-services.json
// // const authInstance = auth();
// // const firestoreInstance = firestore();

// // export { authInstance, firestoreInstance };
// // export default firebase;







// // const app = getApp();

// // // const app = initializeApp(firebaseConfig);

// // const authInstance =  getAuth(app);
// // const dbInstance =  getFirestore(app);


import { getApp, getApps } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

// In RN, the native layer initializes the [DEFAULT] app automatically.
// We just need to retrieve it. 
// If for some reason it's not there, getApp() will throw an error 
// which is better than passing a Promise to getAuth.
const app = getApp(); 

export const authInstance = getAuth(app);
export const firestoreInstance = getFirestore(app);
export { app };