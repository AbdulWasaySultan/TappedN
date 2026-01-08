// bookingContext.tsx
import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { authInstance, dbInstance } from '../screens/Firebase/firebaseConfig';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

 type Booking = {
  id: string;
  outletId: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: string;
  createdAt: any;
  image?: string;
  title?: string;
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

  useEffect(() => {
    if (!authInstance.currentUser) return;

    const subscriber = dbInstance
      .collection("Bookings")
      .where("userId", "==", authInstance.currentUser.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (snapshot) => {
          const list: Booking[] = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as Booking);
          });
          setBookings(list);
        },
        (error) => {
          console.log("Error fetching bookings: ", error);
        }
      );

    return () => subscriber();
  }, []);

  const saveBooking = async (data: Omit<Booking, "id" | "createdAt" | "userId">) => {
    try {
      setLoading(true);
      await dbInstance.collection("Bookings").add({
        ...data,
        userId: authInstance.currentUser?.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log("Error saving booking: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find((booking) => booking.id === id);
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      setLoading(true);
      await dbInstance.collection("Bookings").doc(id).update(updates);
    } catch (error) {
      console.log("Error updating booking: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      setLoading(true);
      await dbInstance.collection("Bookings").doc(id).delete();

    } catch (error) {
      console.log("Error deleting booking: ", error);
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