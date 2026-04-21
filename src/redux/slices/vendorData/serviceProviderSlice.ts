import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Simple provider interface
export interface ServiceProviderData {
  name: string;
  profileImage: string;
  contactNo?: string;
  outletName?: string;
}

export interface ServiceProvider extends ServiceProviderData{
  uid: string;
}
export interface ServiceProviderState {
  providers: ServiceProvider[];
}

const initialState: ServiceProviderState = {
  providers: [],
};

const serviceProviderSlice = createSlice({
  name: 'serviceProviders',
  initialState,
  reducers: {
    // Store providers from API
    setServiceProviders: (state, action: PayloadAction<ServiceProvider[]>) => {
      state.providers = action.payload;
    },
    // Clear on logout
    clearServiceProviders: (state) => {
      state.providers = [];
    },
  },
});

export const { setServiceProviders, clearServiceProviders } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
