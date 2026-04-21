// import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

//Four ways to pass data to a screen
//1. Props (children) → when parent already fetched the data, and you want to avoid another API call.
//2. Route params (full object) → when navigating and you want to hand over all details immediately.
//3. Route params (ID only) → when you want the screen to always fetch the latest version.
//4. Fetch inside screen → for standalone screens, not tightly linked to navigation flow.

// **CHANGE 1: Fixed ServicesData type - removed array notation**
export type OutletData = {
  id: string;
  outletName: string;
  outletBgImage: string; // always from API
  outletIcon: string | number; // API string OR require() number
  rating: number;

  // Service provider info (for messaging)
  serviceProviderName?: string;
  serviceProviderId : string;

  services: ServicesData[]; // Array of services
  photos: Photo[];
  businessDetails: BusinessDetails[];

  outletRating: OutletRating; // "id": 1,// "ratingStars": 5, // "reviews": 239
  reviews: allReviews[];
  // serviceReviews: ServiceReviews[];
};

export type ServicesData = {
  // props for service screen
  id: string;
  serviceName: string;
  serviceImage: string;
  price: number;
  serviceDetails: ServiceDetail;
  serviceRating: OutletRating;
};
// Extra details for a service
export type ServiceDetail = {
  id: string;
  serviceDuration: string;
  serviceBookingType : string;
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
  // outletRating: OutletRating[];
};


// Service Reviews ka array api response mein is liye nhi hai kyunke 
// ham ne outlet reviews ko services ki id ki base pr filter krke 
// service reviews mein daala ha kyunke agar kisi user 
// ne kisi service ko  general review dedia jese best location to ye
// to usne outlet ki tareef ki na to isliye aesa kiya ha
// export type ServiceReviews = {
//   id: string;
//   serviceId: string; // to know which service this review belongs to
//   outletId: string;  // to cross-check if needed
//   name: string;
//   ratingStars: number;
//   description: string;
//   time: string;
//   profileImage: string;
// };


export type MyTabsParamList = {
  Services: {
    // outletData: OutletData; // This contains everything needed including services and photos
    // serviceReviews: ServiceReviews[];
    outletId : string;
  };
  BusinessInfo: {
    // outletData: OutletData;
    //     serviceReviews: ServiceReviews[];
    outletId : string;
  };
  Reviews: {
    // outletData: OutletData; // Reviews might need outlet data for context
    // outletReviews: OutletReview[];
    outletId : string;
  };
}; 
export type HomeTabsParamList = {
  Home: undefined;
  BookingsDashboard: undefined;
  Messages: undefined;
  Notifications: undefined;
  Settings: undefined;
};

// ServiceStack nested navigator param list
export type ServiceStackParamList = {
  Filters: undefined;
  Handyman: undefined;
  ViewAll: undefined;
  Estheticians: undefined;
  MusicStudio: undefined;
  Barbers: undefined;
  Yoga: undefined;
  MyReview: undefined;
  ServiceDetails: { outletId: string; serviceId: string };
  BookAppointment: { outletId: string; serviceId: string };
  AppointmentConfirmed: undefined;
  MyTabs: { outletId: string };
};

// HomeStack navigator param list (includes both direct screens and nested ServiceStack)
export type HomeStackParamList = {
  Home: undefined;
  HomeTabs: undefined;
  ServiceStack: { screen: keyof ServiceStackParamList; params?: any };
  ChangePassword: undefined;
  ProfileSettings: undefined;
  PrivacyPolicy: undefined;
  Subscription: undefined;
  MessagingScreen: { chatId: string; serviceProvider: { uid: string; name: string; profileImage: string; outletName?: string } };
};

// Define a type for your Root Stack Navigator screens and their parameters
export type RootStackParamList = {
  Splash : undefined
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  OTP: {email: string};
  Home: undefined;
  Handyman: undefined;
  Estheticians: undefined;
  MusicStudio: undefined;
  Barbers: undefined;
  Yoga: undefined;
  ViewAll: undefined;
  Filters: undefined;
  WindowService: undefined;
  HairTreatment: undefined;
  BookAppointment : {
    outletId : string;
    serviceId : string;

  };
  AppointmentConfirmed : undefined;

  MyReview: undefined;
// In your navigation types file, update MyTabs:

  // ... other routes
  MyTabs: { 
    outletId: string;
    filteredOutlets?: OutletData[]; // Optional filtered results
  };
  // ServiceDetails: { service: ServicesData; outlet: OutletData; serviceReviews: ServiceReviews[]};
   ServiceDetails: {outletId : string, serviceId : string};

  HomeTabs: undefined;
  ChangePassword: undefined;
  ProfileSettings: undefined;
  PrivacyPolicy: undefined;
  Subscription: undefined;
  Loading: undefined;
  MessagingScreen: { chatId: string; serviceProvider: { uid: string; name: string; profileImage: string; outletName?: string } };

};

// Screen props types
export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
export type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;
export type ResetPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;
export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type WindowServiceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WindowService'
>;
export type HairTreatmentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HairTreatment'
>;
export type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type HandymanScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Handyman'
>;
export type ViewAllScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewAll'
>;
export type EstheticiansScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Estheticians'
>;
export type MusicStudioScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MusicStudio'
>;
export type BarbersScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Barbers'
>;
export type YogaScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Yoga'
>;
export type MyTabsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MyTabs'
>;
export type ServiceScreenProps = NativeStackScreenProps<
  MyTabsParamList,
  'Services'
>;
export type BusinessInfoScreenProps = NativeStackScreenProps<
  MyTabsParamList,
  'BusinessInfo'
>;
export type ReviewsScreenProps = NativeStackScreenProps<
  MyTabsParamList,
  'Reviews'
>;
export type ServiceDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ServiceDetails'
>;

export type BookAppointmentScreenProps = NativeStackScreenProps<
RootStackParamList,
'BookAppointment'
>;

export type AppointmentConfirmedScreenProps = NativeStackScreenProps<
RootStackParamList,
'AppointmentConfirmed'
>;

export type HomeTabsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeTabs'
>;

// export type HomeScreenProps = NativeStackScreenProps<
//   HomeTabsParamList,
//   'Home'
// >;  

export type BookingsDashboardScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'BookingsDashboard'
>;
// export type MessagesScreenProps = NativeStackScreenProps<
//   HomeTabsParamList,
//   'Messages'
// >;
export type NotificationsScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Notifications'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Settings'
>;

export type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
export type ProfileSettingsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileSettings'
>;

export type PrivacyPolicyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PrivacyPolicy'
>;
export type SubscriptionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Subscription'
>;

export type LoadingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Loading'
>;

export type MessagingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MessagingScreen'
>;

export type MessagesScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Messages'
>;  

export type SplashScreenProps = NativeStackScreenProps<
HomeTabsParamList,
'Messages'
>;
