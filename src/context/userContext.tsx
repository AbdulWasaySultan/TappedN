import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
  userFullName: string;
  setUserFullName: (name: string) => void;
  selectedProfileImage: string | null;
  setSelectedProfileImage: (image: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  userFullName: '',
  setUserFullName: () => {},
  selectedProfileImage: null,
  setSelectedProfileImage: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userFullName, setUserFullName] = useState('');
  const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ userFullName, setUserFullName,selectedProfileImage, setSelectedProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
