import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Define the structure based on your registration + profile requirements
export interface UserProfile {
  name: string;
  email: string;
  contactNo: string;
  profileImage?: string; // Optional
  address: string;      // Added later
  createdAt : Date

  location?: {           // For the location feature
    latitude: number;
    longitude: number;
    updatedAt: any;
  };
}

interface UserContextType {
  userData: UserProfile | null;
  loading: boolean;
  userId: string | undefined;
  updateUserLocationInFirebase: (latitude: number, longitude: number) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    const unsubAuth = auth().onAuthStateChanged(user => {
      if (user) {
        // Listen to the specific user document in Firestore
        const unsubUser = firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(doc => {
            setUserData(doc.data() as UserProfile || null);
            setLoading(false);
          });
        return () => unsubUser();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
    return () => unsubAuth();
  }, []);

  // Method to update user profile (Name, Address, etc.)
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!userId) return;
    await firestore().collection('users').doc(userId).update(updates);
  };

  // Method to update Location specifically
  const updateUserLocationInFirebase = async (latitude: number, longitude: number) => {
    if (!userId) return;
    try {
      await firestore().collection('users').doc(userId).update({
        location: {
          latitude,
          longitude,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        }
      });
      console.log("Location updated in Firebase");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, loading, userId, updateProfile, updateUserLocationInFirebase }}>
      {children}
    </UserContext.Provider>
  );
};

export const getUserData = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};