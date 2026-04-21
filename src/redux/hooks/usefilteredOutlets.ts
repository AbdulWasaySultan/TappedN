// hooks/useFilteredOutlets.ts
import { useState, useEffect } from 'react';
import { OutletData, ServicesData } from '../../Navigation/navigation';

// Filter state type
export type FilterState = {
  serviceCategory: string | null;
  subCategory: string | null;
  bookingType: string | null;
  openNow: boolean;
  location: string;
  distance: number; // in miles
};

export const useFilteredOutlets = (allOutlets: OutletData[]) => {
  const [filters, setFilters] = useState<FilterState>({
    serviceCategory: null,
    subCategory: null,
    bookingType: null,
    openNow: false,
    location: '',
    distance: 10,
  });
  
  const [filteredOutlets, setFilteredOutlets] = useState<OutletData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServicesData[]>([]);
  const [loading, setLoading] = useState(false);

  // Apply filters
  useEffect(() => {

    const applyFilters = async() => {
    setLoading(true)
    let results = [...allOutlets];

    // Filter by service category
    if (filters.serviceCategory) {
      results = results.filter(outlet => 
        outlet.outletName.toLowerCase().includes(filters.serviceCategory!.toLowerCase()) ||
        outlet.services.some(service => 
          service.serviceName.toLowerCase().includes(filters.serviceCategory!.toLowerCase())
        )
      );
    }

    // Filter by sub category
    if (filters.subCategory) {
      results = results.filter(outlet =>
        outlet.services.some(service =>
          service.serviceName.toLowerCase().includes(filters.subCategory!.toLowerCase())
        )
      );
    }

    // Filter by booking type
    if (filters.bookingType && filters.bookingType !== 'All') {
      results = results.filter(outlet =>
        outlet.services.some(service =>
          service.serviceDetails.serviceBookingType === filters.bookingType
        )
      );
    }

    // Filter by open now (you'll need to add opening hours to OutletData)
    if (filters.openNow) {
      results = results.filter(outlet => isOutletOpen(outlet));
    }

    // Filter by location (you'll need geocoding service)
    if (filters.location) {
      results = await filterByLocation(results, filters.location, filters.distance);
    }

    setFilteredOutlets(results);
    
    // Also collect filtered services
    const services = results.flatMap(outlet => outlet.services);
    setFilteredServices(services);
    
}}, [filters, allOutlets]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      serviceCategory: null,
      subCategory: null,
      bookingType: null,
      openNow: false,
      location: '',
      distance: 10,
    });
  };

  return {
    filters,
    filteredOutlets,
    filteredServices,
    updateFilter,
    clearFilters,
    hasActiveFilters: Object.values(filters).some(v => v && v !== '' && v !== 10),
  };
};

// Helper functions
const isOutletOpen = (outlet: OutletData): boolean => {
  // Implement based on your opening hours data structure
  const now = new Date();
  const currentHour = now.getHours();
  // Example: assume open 9 AM to 9 PM
  return currentHour >= 9 && currentHour <= 21;
};

const filterByLocation = async (outlets: OutletData[], location: string, maxDistance: number) => {
  // You'll need a geocoding service (Google Maps, Mapbox, etc.)
  // This is a placeholder implementation
  return outlets;
};