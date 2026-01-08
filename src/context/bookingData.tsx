// bookingData.tsx - Utility for handling dynamic booking data
import { useBookingContext } from "./bookingContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../Navigation/navigation";

export interface DynamicBookingData {
  outletId: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: "Completed" | "Pending" | "Cancelled";
  image?: string;
  title?: string;
  outletName?: string;
  schedule?: "Today" | "Upcoming" | "Previous";
  [key: string]: any; // Allow dynamic fields
}

export const useDynamicBooking = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { saveBooking, updateBooking, getBookingById } = useBookingContext();

  const createBooking = async (bookingData: DynamicBookingData) => {
    try {
      await saveBooking(bookingData);
      navigation.navigate("AppointmentConfirmed");
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  };

  const updateBookingData = async (bookingId: string, updates: Partial<DynamicBookingData>) => {
    try {
      await updateBooking(bookingId, updates);
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  };

  const addDynamicField = async (bookingId: string, fieldName: string, fieldValue: any) => {
    try {
      await updateBooking(bookingId, { [fieldName]: fieldValue });
    } catch (error) {
      console.error(`Error adding field ${fieldName}:`, error);
      throw error;
    }
  };

  return {
    createBooking,
    updateBookingData,
    addDynamicField,
    getBookingById,
  };
};

export const handleConfirm = async (bookingData: DynamicBookingData) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { saveBooking } = useBookingContext();

  try {
    await saveBooking(bookingData);
    navigation.navigate("AppointmentConfirmed");
  } catch (error) {
    console.error("Error confirming booking:", error);
  }
};