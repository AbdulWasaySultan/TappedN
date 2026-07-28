import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Filters from '../screens/Shared/Filters';
import Handyman from '../screens/ServiceCategories/Handyman';
import Estheticians from '../screens/ServiceCategories/Estheticians';
import Barbers from '../screens/ServiceCategories/Barbers';
import MusicStudio from '../screens/ServiceCategories/MusicStudio';
import Yoga from '../screens/ServiceCategories/Yoga';
import ViewAll from '../screens/Shared/ViewAll';

const Stack = createNativeStackNavigator();

export default function ServiceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Filters" component={Filters} />
      <Stack.Screen name="Handyman" component={Handyman} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="Estheticians" component={Estheticians} />
      <Stack.Screen name="MusicStudio" component={MusicStudio} />
      <Stack.Screen name="Barbers" component={Barbers} />
      <Stack.Screen name="Yoga" component={Yoga} />  
    </Stack.Navigator>
  );
}
