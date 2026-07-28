// import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

//Four ways to pass data to a screen
//1. Props (children) → when parent already fetched the data, and you want to avoid another API call.
//2. Route params (full object) → when navigating and you want to hand over all details immediately.
//3. Route params (ID only) → when you want the screen to always fetch the latest version.
//4. Fetch inside screen → for standalone screens, not tightly linked to navigation flow.

// ============== DATA TYPES ==============
export type OutletData = {
  id: string;
  outletName: string;
  outletBgImage: string;
  outletIcon: string | null | undefined;
  rating: number;
  serviceProviderName?: string;
  serviceProviderId: string;
  services: ServicesData[];
  photos: Photo[];
  businessDetails: BusinessDetails[];
  outletRating: OutletRating;
  reviews: allReviews[];
};

export type ServicesData = {
  id: string;
  serviceName: string;
  serviceImage: string;
  price: number;
  serviceDetails: ServiceDetail;
  serviceRating: OutletRating;
};

export type ServiceDetail = {
  id: string;
  serviceDuration: string;
  serviceBookingType: string;
};

export type Photo = {
  id: string;
  servicePicture: string;
};

export type BusinessDetails = {
  id: string;
  description: string;
  icon: string;
};

export type OutletRating = {
  id: string;
  ratingStars: number;
  reviews: number;
};

export type allReviews = {
  id: string;
  name: string;
  ratingStars: number;
  description: string;
  time: string;
  profileImage: string;
  serviceId: string | null;
};

// ============== COMMON PARAMS ==============
type ServiceProvider = {
  uid: string;
  name: string;
  profileImage: string;
  outletName?: string;
};

type OutletParams = { outletId: string };
type ServiceParams = { outletId: string; serviceId: string };

// ============== NAVIGATOR PARAMS ==============
export type RootStack = {
  Splash: undefined;
  AuthStack: undefined;
  HomeTabs: undefined;
  Loading: undefined;  
};

export type AuthStack = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  OTP: { email: string };
};

export type HomeTabs = {
  Home: {filteredOutlets?: OutletData[] | undefined};
  BookingsDashboard: undefined;
  Messages: undefined;
  Notifications: undefined;
  Settings: undefined;
  ServiceStack: { screen: keyof ServiceStack; params?: any }; // ✅ Add this line

};

export type ServiceStack = {
  Handyman: undefined;
  ViewAll: undefined;
  Estheticians: OutletParams;
  MusicStudio: undefined;
  Barbers: undefined;
  Yoga: undefined;
  Filters: undefined;

  // HomeTabs: { screen: keyof HomeTabs; params?: { filteredOutlets?: OutletData[] } };
  // Home : { screen: keyof HomeTabs; params?: { filteredOutlets?: OutletData[] } };
};

export type OutletTabs = {
  MyTabs: OutletParams;
  Services: OutletParams;
  BusinessInfo: OutletParams;
  Reviews: OutletParams;
  ServiceDetails: ServiceParams;
  ServiceStack: { screen: keyof ServiceStack; params: ServiceParams };
  MyReview: undefined;
  BookAppointment: ServiceParams;
  AppointmentConfirmed: undefined;
  // ServiceStack: { screen: keyof ServiceStack; params: ServiceParams };
};

export type HomeStack = {
  HomeTabs: undefined;
  ServiceStack: { screen: keyof ServiceStack; params?: any };
  ChangePassword: undefined;
  ProfileSettings: undefined;
  PrivacyPolicy: undefined;
  Subscription: undefined;
  OutletTabs: NavigatorScreenParams<OutletTabs>; 
  MessagingScreen: {
    chatId: string;
    providerId: string;
  };
};

// ============== SCREEN PROPS (AUTO-GENERATED) ==============
// Auth Stack
export type LoginScreenProps = NativeStackScreenProps<AuthStack, 'Login'>;
export type RegisterScreenProps = NativeStackScreenProps<AuthStack, 'Register'>;
export type OTPScreenProps = NativeStackScreenProps<AuthStack, 'OTP'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<AuthStack, 'ResetPassword'>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStack, 'ForgotPassword'>;

// Home Tabs
export type HomeScreenProps = NativeStackScreenProps<HomeTabs, 'Home'>;
export type BookingsDashboardScreenProps = NativeStackScreenProps<HomeTabs, 'BookingsDashboard'>;
export type NotificationsScreenProps = NativeStackScreenProps<HomeTabs, 'Notifications'>;
export type SettingsScreenProps = NativeStackScreenProps<HomeTabs, 'Settings'>;
export type MessagesScreenProps = NativeStackScreenProps<HomeTabs, 'Messages'>;

// Service Stack
export type HandymanScreenProps = NativeStackScreenProps<ServiceStack, 'Handyman'>;
export type ViewAllScreenProps = NativeStackScreenProps<ServiceStack, 'ViewAll'>;
export type EstheticiansScreenProps = NativeStackScreenProps<ServiceStack, 'Estheticians'>;
export type MusicStudioScreenProps = NativeStackScreenProps<ServiceStack, 'MusicStudio'>;
export type BarbersScreenProps = NativeStackScreenProps<ServiceStack, 'Barbers'>;
export type YogaScreenProps = NativeStackScreenProps<ServiceStack, 'Yoga'>;
export type FiltersScreenProps = NativeStackScreenProps<ServiceStack, 'Filters'>;
export type ServiceDetailsScreenProps = NativeStackScreenProps<OutletTabs, 'ServiceDetails'>;
export type BookAppointmentScreenProps = NativeStackScreenProps<OutletTabs, 'BookAppointment'>;
export type AppointmentConfirmedScreenProps = NativeStackScreenProps<OutletTabs, 'AppointmentConfirmed'>;

// Outlet Tabs
export type MyTabsScreenProps = NativeStackScreenProps<OutletTabs, 'MyTabs'>;
export type ServiceScreenProps = NativeStackScreenProps<OutletTabs, 'Services'>;
export type BusinessInfoScreenProps = NativeStackScreenProps<OutletTabs, 'BusinessInfo'>;
export type ReviewsScreenProps = NativeStackScreenProps<OutletTabs, 'Reviews'>;
export type MyReviewScreenProps = NativeStackScreenProps<OutletTabs, 'MyReview'>;

// Home Stack
export type MessagingScreenProps = NativeStackScreenProps<HomeStack, 'MessagingScreen'>;
export type ChangePasswordScreenProps = NativeStackScreenProps<HomeStack, 'ChangePassword'>;
export type ProfileSettingsScreenProps = NativeStackScreenProps<HomeStack, 'ProfileSettings'>;
export type PrivacyPolicyScreenProps = NativeStackScreenProps<HomeStack, 'PrivacyPolicy'>;
export type SubscriptionScreenProps = NativeStackScreenProps<HomeStack, 'Subscription'>;

// Root
export type LoadingScreenProps = NativeStackScreenProps<RootStack, 'Loading'>;
export type SplashScreenProps = NativeStackScreenProps<RootStack, 'Splash'>;