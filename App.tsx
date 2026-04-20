import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ErrorBoundary from './src/Components/Global/RenderError/ErrorBoundary';
import { OutletContextProvider } from './src/Context/API/Outlet/OutletContext';
import { BookingContextProvider } from './src/Context/Firebase/Booking/bookingContext';
import RootNavigator from './src/Stacks/RootStack';
import { AuthContextProvider } from './src/Context/Firebase/UserData/AuthContext';

function App() {
  return (
    <ErrorBoundary>
      <OutletContextProvider>
        <BookingContextProvider>
          <AuthContextProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AuthContextProvider>
        </BookingContextProvider>
      </OutletContextProvider>
    </ErrorBoundary>
  );
}

export default App;