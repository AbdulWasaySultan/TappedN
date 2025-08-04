import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
  fullName: string;
  setFullName: (name: string) => void;
};

const UserContext = createContext<UserContextType>({
  fullName: '',
  setFullName: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fullName, setFullName] = useState('');
  return (
    <UserContext.Provider value={{ fullName, setFullName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
