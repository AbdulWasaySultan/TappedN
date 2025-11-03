import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { OutletData } from '../Navigation/navigation';
import { fetchAllOutlets } from '../API/api';
import { fetchOutletById } from '../API/api';

type OutletContextType = {
  outlets: OutletData[];
  getOutletById: (id: string) => OutletData | undefined;
  fetchAllOutlets: () => Promise<OutletData[]>;
  loading: boolean;
  error: string | null;
};

const OutletContext = createContext<OutletContextType | undefined>(undefined);

export const OutletContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outlets, setOutlets] = useState<OutletData[]>([]);

  useEffect(() => {
    loadOutlets();
  }, []);

 const loadOutlets = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOutlets();
      setOutlets(data)
      setError(null);
    } catch (error : any) {
      setLoading(false);
      setError(`Error while fetching your request: ${error.message}`);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getOutletById  =  (id: string) => {
return (outlets.find(o => o.id === id))
  }

  return (
    <OutletContext.Provider
      value={{ outlets, getOutletById, fetchAllOutlets, loading, error }}
    >
      {children}
    </OutletContext.Provider>
  );
};

// export const useOutletContext = () => useContext(OutletContext);

//OR

export const useOutletContext = () => {
  let context = useContext(OutletContext);

  if (!context) {
    throw new Error('useOutletContext must be used within an OutletProvider');
  }

  return context;
};
