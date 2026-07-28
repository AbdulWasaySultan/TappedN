import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

// In RN, the native layer initializes the [DEFAULT] app automatically.
// We just need to retrieve it. 
// If for some reason it's not there, getApp() will throw an error 
// which is better than passing a Promise to getAuth.

/**
 * Retrieves the automatically initialized native Firebase app.
 * This avoids manual initialization and potential "App already exists" errors.
 */

const app = getApp(); 

export const authInstance = getAuth(app);
export const firestoreInstance = getFirestore(app);
export { app };
