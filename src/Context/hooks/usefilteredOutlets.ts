// hooks/useFilteredOutlets.ts
import { useState, useMemo, useCallback } from 'react';
import { OutletData, ServicesData } from '../../Navigation/navigation';

export type FilterState = {
  serviceCategory: string | null;
  subCategory: string | null;
  bookingType: string | null;
  openNow: boolean;
  location: string;
  distance: number;
};

export const useFilteredOutlets = (allOutlets: OutletData[], filters: FilterState) => {
  // Memoize filtered results instead of using useEffect
  const filteredOutlets = useMemo(() => {
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

    // Filter by open now
    if (filters.openNow) {
      const hour = new Date().getHours();
      results = results.filter(() => hour >= 9 && hour <= 21);
    }

    // Filter by location
    if (filters.location) {
      results = results.filter(outlet =>
        outlet.outletName.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return results;
  }, [allOutlets, filters]);

  const filteredServices = useMemo(() => 
    filteredOutlets.flatMap(outlet => outlet.services),
    [filteredOutlets]
  );

  return {
    filteredOutlets,
    filteredServices,
  };
};