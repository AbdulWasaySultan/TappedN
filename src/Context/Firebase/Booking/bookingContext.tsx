// bookingContext.tsx
import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import firestore from '@react-native-firebase/firestore'
import { authInstance, firestoreInstance } from '../../../Firebase/firebaseConfig';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

 export type Booking = {
  id: string;
  outletId: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: string;
  createdAt: any;
  image?: string;
  outletName?: string;
  schedule?: string;
  userId?: string;
  [key: string]: any; // Allow dynamic fields

  //userid and aid are extra from Dynamic booking;
};

type BookingContextType = {
  bookings: Booking[];
  saveBooking: (data: Omit<Booking, "id" | "createdAt" | "userId">) => Promise<void>;
  loading: boolean;
  getBookingById: (id: string) => Booking | undefined;
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser
  );
  useEffect(() => {    
    const unsubscribeAuth = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return unsubscribeAuth;
  }, []);
      // 3. This useEffect now triggers whenever the 'user' state changes
  useEffect(() => {
        // Don't fetch bookings if user is not logged in
    if (!user) {
      console.log('[BookingContext] User not logged in, skipping bookings fetch');
      setBookings([]);
      return;
    }

    console.log('[BookingContext] Setting up bookings listener...');
    const subscriber = firestore()
      .collection("bookings")
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const list: Booking[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as Booking);
          });
          console.log('[BookingContext] Bookings updated:', list.length);
          setBookings(list);
        },
        (error: any) => {
          console.error("[BookingContext] Error fetching bookings: ", error.code, error.message);
          
          // Handle permission denied error
          if (error.code === 'permission-denied') {
            console.warn('[BookingContext] Permission denied - user may not have access to bookings collection');
            setBookings([]);
            return;
          }
          
          // Handle other errors
          setBookings([]);
        }
      );

    return () => {console.log('[BookingContext] Cleaning up listener'); subscriber()};
  }, [user]);

  const saveBooking = async (data: Omit<Booking, "id" | "createdAt" | "userId">) => {
    try {
      setLoading(true);
      if (!authInstance.currentUser?.uid) {
        throw new Error('No user logged in');
      }
      await firestore().collection("bookings").add({
        ...data,
        userId: authInstance.currentUser.uid,
        createdAt: new Date(),
      });
      console.log('[BookingContext] Booking saved successfully');
    } catch (error: any) {
      console.error("Error saving booking: ", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = (id: string): Booking => {
    const booking = bookings.find((booking) => booking.id === id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
    
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      setLoading(true);
      await firestore().collection("bookings").doc(id).update(updates);
      console.log('[BookingContext] Booking updated successfully:', id);
    } catch (error: any) {
      console.error("Error updating booking: ", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      setLoading(true);
      await firestore().collection("bookings").doc(id).delete();
      console.log('[BookingContext] Booking deleted successfully:', id);
    } catch (error: any) {
      console.error("Error deleting booking: ", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{ bookings, saveBooking, loading, getBookingById, updateBooking, deleteBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookingContext must be used within a BookingContextProvider");
  }
  return context;
};



