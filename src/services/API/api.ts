import { OutletData } from '../../Navigation/navigation';
import axios from 'axios';
import { mockOutletsData } from './mockOutletData';

const baseUrl = 'https://mocki.io/v1/12611da9-69ed-4033-9ff2-239abde3d4bb';

export const fetchAllOutlets = async (): 
Promise<OutletData[]> => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.outlets;
  } catch (error) {
    throw error;
    console.warn('API failed, using mock data:', error);
    return mockOutletsData;
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


