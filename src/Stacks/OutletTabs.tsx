import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from '../screens/ServiceStack/MyTabs/MyTabs';
import MyReview from '../screens/Shared/MyReview';
import ServiceDetails from '../screens/Shared/ServiceDetails';
import BookAppointment from '../screens/ServiceStack/BookingDetails/BookAppointment';
import AppointmentConfirmed from '../screens/ServiceStack/BookingDetails/AppointmentConfirmed';

const Stack = createNativeStackNavigator();

export default function OutletTabs() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="MyReview" component={MyReview} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="BookAppointment" component={BookAppointment} />
      <Stack.Screen name="AppointmentConfirmed" component={AppointmentConfirmed} />   
    </Stack.Navigator>
  );
}
