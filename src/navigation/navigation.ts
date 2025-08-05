import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define a type for your Root Stack Navigator screens and their parameters
export type RootStackParamList = {
  Login: undefined; // Login screen takes no parameters
  ResetPassword: undefined; // ResetPassword takes no parameters
  Register: undefined; // Register takes no parameters
  OTP: undefined; // OTP screen takes no parameters for now. If it did, e.g., OTP: { userId: string };
  Home: { fullName?: string }; // Home screen takes optional fullName parameter

};

// Optional: Define types for screen props for better type safety in each screen
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;