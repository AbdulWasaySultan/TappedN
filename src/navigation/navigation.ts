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

  services: ServicesData[]; // Array of services
  photos: Photo[];
  businessDetails: BusinessDetails[];

  outletRating: OutletRating; // "id": 1,// "ratingStars": 5, // "reviews": 239
  outletReviews: OutletReview[];
  serviceReviews: ServiceReviews[];
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

export type OutletReview = {
  id: string;
  outletId : string;
  name: string;
  ratingStars: number;
  description: string;
  time: string;
  profileImage: string;
  // outletRating: OutletRating[];
};


// Service Reviews ka array api response mein is liye nhi hai kyunke 
// ham ne outlet reviews ko services ki id ki base pr filter krke 
// service reviews mein daala ha kyunke agar kisi user 
// ne kisi service ko  general review dedia jese best location to ye
// to usne outlet ki tareef ki na to isliye aesa kiya ha
export type ServiceReviews = {
  id: string;
  serviceId: string; // to know which service this review belongs to
  outletId: string;  // to cross-check if needed
  name: string;
  ratingStars: number;
  description: string;
  time: string;
  profileImage: string;
};


export type MyTabsParamList = {
  Services: {
    outletData: OutletData; // This contains everything needed including services and photos
    serviceReviews: ServiceReviews[];
  };
  'Business Info': {
    outletData: OutletData;
  };
  Reviews: {
    outletData: OutletData; // Reviews might need outlet data for context
    outletReviews: OutletReview[];
  };
};

export type HomeTabsParamList = {
  Home: undefined;
  BookingsDashboard: undefined;
  Messages: undefined;
  Notifications: undefined;
  Settings: undefined;
  ChangePassword: undefined;
};

// Define a type for your Root Stack Navigator screens and their parameters
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  OTP: undefined;
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
  BookAppointment : undefined;
  AppointmentConfirmed : undefined

  MyReview: undefined;
  MyTabs: { outletData: OutletData };
  ServiceDetails: { service: ServicesData; outlet: OutletData; serviceReviews: ServiceReviews[]};
  ChangePassword: undefined;
  HomeTabs: undefined;
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
  'Business Info'
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

// export type ChangePasswordScreenProps = NativeStackScreenProps<
//   SettingsParamList,
//   'ChangePassword'
// >;

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
export type MessagesScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Messages'
>;
export type NotificationsScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Notifications'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  HomeTabsParamList,
  'Settings'
>;

/*
{
"outlets": [
{
"id": "1",
"outletName": "Athens Cleaners",
"outletBgImage": "https://via.placeholder.com/300x200.png?text=Window+Service+BG",
"outletIcon": "https://via.placeholder.com/100.png?text=Window+Icon",
"rating": 4.2,
"services": [
{
"id": "s1",
"serviceName": "Window Cleaning",
"serviceImage": "https://via.placeholder.com/150.png?text=Window+Cleaning",
"price": 30,
"serviceDetails": {
"id": "sd1",
"serviceDuration": "30mins - 45mins",
"serviceBookingType": "Home Visit"
},
"serviceRating": {
"id": "srating1",
"ratingStars": 4,
"reviews": 122
}
},
{
"id": "s2",
"serviceName": "Deep Cleaning",
"serviceImage": "https://via.placeholder.com/150.png?text=Deep+Cleaning",
"price": 45,
"serviceDetails": {
"id": "sd2",
"serviceDuration": "45mins - 60mins",
"serviceBookingType": "Home Visit"
},
"serviceRating": {
"id": "srating2",
"ratingStars": 5,
"reviews": 89
}
}
],
"photos": [
{
"id": "p1",
"servicePicture": "https://via.placeholder.com/150.png?text=Photo+1"
},
{
"id": "p2",
"servicePicture": "https://via.placeholder.com/150.png?text=Photo+2"
}
],
"businessDetails": [
{
"id": "bd1-1",
"icon": "https://example.com/assets/images/BusinessInfo/radius.png",
"description": "250 Meters Away"
},
{
"id": "bd1-2",
"icon": "https://example.com/assets/images/BusinessInfo/clock.png",
"description": "9:00 am - 8:00 pm"
},
{
"id": "bd1-3",
"icon": "https://example.com/assets/images/BusinessInfo/contact.png",
"description": "+1 234 567890"
},
{
"id": "bd1-4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "In-Store & Home Service"
},
{
"id": "bd1-5",
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
"description": "www.toniandguy.com"
},
{
"id": "bd1-6",
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
"description": "Shop 101, Hamilton Courts, New York City"
}
],
"outletRating": {
"id": "orating1",
"ratingStars": 4,
"reviews": 239
}
},
{
"id": "2",
"outletName": "Toni & Guy Salon",
"outletBgImage": "https://via.placeholder.com/300x200.png?text=Hair+Treatment+BG",
"outletIcon": "https://via.placeholder.com/100.png?text=Hair+Icon",
"rating": 4.5,
"services": [
{
"id": "s3",
"serviceName": "Hair Treatment",
"serviceImage": "https://via.placeholder.com/150.png?text=Hair+Treatment",
"price": 25,
"serviceDetails": {
"id": "sd3",
"serviceDuration": "30mins - 45mins",
"serviceBookingType": "In-Store & Home Service"
},
"serviceRating": {
"id": "srating3",
"ratingStars": 5,
"reviews": 120
}
},
{
"id": "s4",
"serviceName": "Hair Cut",
"serviceImage": "https://via.placeholder.com/150.png?text=Hair+Cut",
"price": 20,
"serviceDetails": {
"id": "sd4",
"serviceDuration": "15mins - 30mins",
"serviceBookingType": "In-Store"
},
"serviceRating": {
"id": "srating4",
"ratingStars": 4,
"reviews": 75
}
}
],
"photos": [
{
"id": "p3",
"servicePicture": "https://via.placeholder.com/150.png?text=Photo+1"
},
{
"id": "p4",
"servicePicture": "https://via.placeholder.com/150.png?text=Photo+2"
},
{
"id": "p5",
"servicePicture": "https://via.placeholder.com/150.png?text=Photo+3"
}
],
"businessDetails": [
{
"id": "bd2-1",
"icon": "https://example.com/assets/images/BusinessInfo/radius.png",
"description": "250 Meters Away"
},
{
"id": "bd2-2",
"icon": "https://example.com/assets/images/BusinessInfo/clock.png",
"description": "9:00 am - 8:00 pm"
},
{
"id": "bd2-3",
"icon": "https://example.com/assets/images/BusinessInfo/contact.png",
"description": "+1 234 567890"
},
{
"id": "bd2-4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "In-Store & Home Service"
},
{
"id": "bd2-5",
"icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
"description": "www.toniandguy.com"
},
{
"id": "bd2-6",
"icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
"description": "Shop 101, Hamilton Courts, New York City"
}
],
"outletRating": {
"id": "orating2",
"ratingStars": 4.5,
"reviews": 337
}
}
]
}

*/