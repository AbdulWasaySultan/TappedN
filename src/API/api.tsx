import { OutletData } from '../Navigation/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { ServiceProvider } from '../redux/slices/vendorData/serviceProviderSlice';

const baseUrl = 'https://mocki.io/v1/42fea963-1bdd-4ccf-8201-22574aedeedc';

export const fetchAllOutlets = async (): 
Promise<OutletData[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.outlets;
  } catch (error) {
    throw error;
  }
};

// Fetch service providers from API
// export const fetchServiceProvidersFromAPI = async (): Promise<ServiceProvider[]> => {
//   try {
//     const response = await axios.get(baseUrl);
//     const providers: ServiceProvider[] = response.data.providers || [];
//     return providers;
//   } catch (error) {
//     console.error('Error fetching providers:', error);
//     return [];
//   }
// };

export const fetchOutletById = async (id: string): Promise<OutletData> => {
  try {
    const response = await axios.get(`${baseUrl}/outlets/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPreviousBooking = (id : string) => {

}



/*
{
"outlets": [
{
"id": "1",
"outletName": "Athens Cleaners",
"outletBgImage": "https://via.placeholder.com/300x200.png?text=Window+Service+BG",
"outletIcon": "https://via.placeholder.com/100.png?text=Window+Icon",
"rating": 4.2,
"serviceProviderName": "John Doe",
"serviceProviderId": "sp_001",
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
"id": "s1_2",
"serviceName": "Dry Cleaning",
"serviceImage": "https://via.placeholder.com/150.png?text=Dry+Cleaning",
"price": 50,
"serviceDetails": {
"id": "sd1_2",
"serviceDuration": "1 - 2 Days",
"serviceBookingType": "Store Drop-off"
},
"serviceRating": {
"id": "srating1_2",
"ratingStars": 4.5,
"reviews": 85
}
},
{
"id": "s1_3",
"serviceName": "Clothes Washing",
"serviceImage": "https://via.placeholder.com/150.png?text=Clothes+Washing",
"price": 20,
"serviceDetails": {
"id": "sd1_3",
"serviceDuration": "24 Hours",
"serviceBookingType": "Home Pickup"
},
"serviceRating": {
"id": "srating1_3",
"ratingStars": 4.2,
"reviews": 210
}
}
],
"photos": [
{
"id": "p1",
"servicePicture": ""
},
{
"id": "p2",
"servicePicture": ""
},
{
"id": "p3",
"servicePicture": ""
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
"icon": "https://example.com/assets/images/BusinessInfo/phone.png",
"description": "+1 234 567890"
},
{
"id": "bd1-4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "In-Store & Home Service"
},
{
"id": "bd1-5",
"icon": "https://example.com/assets/images/BusinessInfo/globe.png",
"description": "www.athenscleaners.com"
},
{
"id": "bd1-6",
"icon": "https://example.com/assets/images/BusinessInfo/gps.png",
"description": "Shop 101, Hamilton Courts, New York City"
}
],
"outletRating": {
"id": "orating1",
"ratingStars": 4,
"reviews": 239
},
"reviews": [
{
"id": "rev1",
"name": "Alice Smith",
"ratingStars": 5,
"description": "Amazing service!",
"time": "2 hours ago",
"profileImage": "https://via.placeholder.com/50.png",
"serviceId": "s1"
},
{
"id": "rev2",
"name": "Bob Martin",
"ratingStars": 4,
"description": "On time.",
"time": "1 day ago",
"profileImage": "https://via.placeholder.com/50.png",
"serviceId": null
}
]
},
{
"id": "2",
"outletName": "Toni & Guy Salon",
"outletBgImage": "https://via.placeholder.com/300x200.png?text=Hair+Treatment+BG",
"outletIcon": "https://via.placeholder.com/100.png?text=Hair+Icon",
"rating": 4.5,
"serviceProviderName": "Sarah Jenkins",
"serviceProviderId": "sp_002",
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
"id": "s3_2",
"serviceName": "Hair Cuts",
"serviceImage": "https://via.placeholder.com/150.png?text=Hair+Cuts",
"price": 40,
"serviceDetails": {
"id": "sd3_2",
"serviceDuration": "45mins - 60mins",
"serviceBookingType": "In-Store"
},
"serviceRating": {
"id": "srating3_2",
"ratingStars": 4.8,
"reviews": 450
}
}
],
"photos": [
{
"id": "p4",
"servicePicture": ""
},
{
"id": "p5",
"servicePicture": ""
},
{
"id": "p6",
"servicePicture": ""
}
],
"businessDetails": [
{
"id": "bd2-1",
"icon": "https://example.com/assets/images/BusinessInfo/radius.png",
"description": "1.2 KM Away"
},
{
"id": "bd2-2",
"icon": "https://example.com/assets/images/BusinessInfo/clock.png",
"description": "10:00 am - 9:00 pm"
},
{
"id": "bd2-3",
"icon": "https://example.com/assets/images/BusinessInfo/phone.png",
"description": "+1 987 654321"
},
{
"id": "bd2-4",
"icon": "https://example.com/assets/images/BusinessInfo/shop.png",
"description": "In-Store Only"
},
{
"id": "bd2-5",
"icon": "https://example.com/assets/images/BusinessInfo/globe.png",
"description": "www.toniandguy.com"
},
{
"id": "bd2-6",
"icon": "https://example.com/assets/images/BusinessInfo/gps.png",
"description": "5th Avenue, Beverly Hills, CA"
}
],
"outletRating": {
"id": "orating2",
"ratingStars": 4.5,
"reviews": 337
},
"reviews": [
{
"id": "rev3",
"name": "Charlie Brown",
"ratingStars": 5,
"description": "Best haircut!",
"time": "3 days ago",
"profileImage": "https://via.placeholder.com/50.png",
"serviceId": "s3"
}
]
}
]
}
   */