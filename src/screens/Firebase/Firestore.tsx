// In your registration/signup screen
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

export const createUserProfile = async (userData: {
  uid: string;
  name: string;
  email: string;
  address: string;
  contactNo: string;
  profileImage?: string;
  role: 'user' | 'serviceProvider';
}) => {
  try {
    // If you have a profile image, upload it to Firebase Storage
    let profileImageUrl = '';
    if (userData.profileImage) {
      const filename = `profiles/${userData.uid}.jpg`;
      const reference = storage().ref(filename);
      await reference.putFile(userData.profileImage);
      profileImageUrl = await reference.getDownloadURL();
    }

    // Create user document in Firestore
    await firestore()
      .collection('users')
      .doc(userData.uid)
      .set({
        uid: userData.uid,
        name: userData.name,
        email: userData.email,
        address: userData.address,
        contactNo: userData.contactNo,
        profileImage: profileImageUrl,
        role: userData.role,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log('User profile created successfully!');
  } catch (error) {
    console.error('Error creating user profile:', error);
  }

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

};

// {
//   "outlets": [
//     {
//       "id": "1",
//       "outletName": "Tony&Guy",
//       "outletBgImage": "https://images.unsplash.com/photo-1555992336-03a23c0b7b26?auto=format&fit=crop&w=1200&q=80",
//       "outletIcon": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
//       "rating": 4.6,
      
//       "reviews": [
//         {
//           "id": "1",
//           "outletId": "1",
//           "serviceId": "s1",
//           "name": "Ali Raza",
//           "ratingStars": 5,
//           "description": "Excellent haircut! The barber listened carefully and styled exactly how I wanted.",
//           "time": "2025-08-27T09:15:00Z",
//           "profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
//         },
//         {
//           "id": "2",
//           "outletId": "1",
//           "serviceId": "s2",  
//           "name": "Hamza Khan",
//           "ratingStars": 4,
//           "description": "Good service, clean shop and professional staff. Slight delay in appointment.",
//           "time": "2025-08-20T10:45:00Z",
//           "profileImage": "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80"
//         },
//         {
//           "id": "3",
//           "outletId": "1",
//           "serviceId": "s2", 
//           "name": "Sara Khalid",
//           "ratingStars": 5,
//           "description": "Quick and spotless window cleaning!",
//           "time": "2025-09-01T14:00:00Z",
//           "profileImage": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
//         }
//       ],
      
//       "services": [
//         {
//           "id": "s1",
//           "serviceName": "Hair&Cut",
//           "serviceImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
//           "price": 25,
//           "serviceDetails": {
//             "id": "d101",
//             "serviceDuration": "30 minutes",
//             "serviceBookingType": "In-Store & Home Service"
//           },
//           "serviceRating": {
//             "id": "1",
//             "ratingStars": 5,
//             "reviews": 239
//           }
//         },
//         {
//           "id": "s2",
//           "serviceName": "Window Cleaning",
//           "serviceImage": "https://images.unsplash.com/photo-1551854838-0c3b3c5b2d9b?auto=format&fit=crop&w=800&q=80",
//           "price": 18,
//           "serviceDetails": {
//             "id": "d102",
//             "serviceDuration": "25 minutes",
//             "serviceBookingType": "In-Store"
//           },
//           "serviceRating": {
//             "id": "2",
//             "ratingStars": 4,
//             "reviews": 98
//           }
//         }
//       ],
      
//       "photos": [
//         {
//           "id": "p1",
//           "servicePicture": "https://images.unsplash.com/photo-1542144612-1f8f0f0b6b8a?auto=format&fit=crop&w=800&q=80"
//         },
//         {
//           "id": "p2",
//           "servicePicture": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
//         },
//         {
//           "id": "p3",
//           "servicePicture": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
//         }
//       ],
      
//       "businessDetails": [
//         {
//           "id": "1",
//           "icon": "https://example.com/assets/images/BusinessInfo/radius.png",
//           "description": "1.2 miles away"
//         },
//         {
//           "id": "2",
//           "icon": "https://example.com/assets/images/BusinessInfo/clock.png",
//           "description": "9:00 am - 7:00 pm"
//         },
//         {
//           "id": "3",
//           "icon": "https://example.com/assets/images/BusinessInfo/contact.png",
//           "description": "+1 (212) 555-0198"
//         },
//         {
//           "id": "4",
//           "icon": "https://example.com/assets/images/BusinessInfo/shop.png",
//           "description": "Walk-in & Appointments"
//         },
//         {
//           "id": "5",
//           "icon": "https://example.com/assets/images/BusinessInfo/globeIcon.png",
//           "description": "www.moderncutnyc.com"
//         },
//         {
//           "id": "6",
//           "icon": "https://example.com/assets/images/BusinessInfo/locationIcon.png",
//           "description": "230 West 34th St, New York, NY"
//         }
//       ]
//     }
//   ]
// }