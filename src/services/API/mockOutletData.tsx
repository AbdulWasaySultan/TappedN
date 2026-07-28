import { OutletData } from '../../Navigation/navigation';

export const mockOutletsData: OutletData[] = [
  {
    id: "1",
    outletName: "Athens Cleaners",
    outletBgImage: "https://via.placeholder.com/300x200.png?text=Window+Service+BG",
    outletIcon: "https://via.placeholder.com/100.png?text=Window+Icon",
    rating: 4.2,
    serviceProviderId: "sp_001",
    services: [
      {
        id: "s1",
        serviceName: "Window Cleaning",
        serviceImage: "https://via.placeholder.com/150.png?text=Window+Cleaning",
        price: 30,
        serviceDetails: {
          id: "sd1",
          serviceDuration: "30mins - 45mins",
          serviceBookingType: "Home Visit"
        },
        serviceRating: {
          id: "srating1",
          ratingStars: 4,
          reviews: 122
        }
      }
    ],
    photos: [],
    businessDetails: [],
    outletRating: {
      id: "orating1",
      ratingStars: 4,
      reviews: 239
    },
    reviews: []
  },
  {
    id: "2",
    outletName: "Toni & Guy Salon",
    outletBgImage: "https://via.placeholder.com/300x200.png?text=Hair+Treatment+BG",
    outletIcon: "https://via.placeholder.com/100.png?text=Hair+Icon",
    rating: 4.5,
    serviceProviderId: "sp_002",
    services: [
      {
        id: "s3",
        serviceName: "Hair Treatment",
        serviceImage: "https://via.placeholder.com/150.png?text=Hair+Treatment",
        price: 25,
        serviceDetails: {
          id: "sd3",
          serviceDuration: "30mins - 45mins",
          serviceBookingType: "In-Store"
        },
        serviceRating: {
          id: "srating3",
          ratingStars: 5,
          reviews: 120
        }
      }
    ],
    photos: [],
    businessDetails: [],
    outletRating: {
      id: "orating2",
      ratingStars: 4.5,
      reviews: 337
    },
    reviews: []
  }
];