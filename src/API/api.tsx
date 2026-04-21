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
