import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authMember, setAuthMember] = useState(false);
  const [authStore, setAuthStore] = useState(false);
  const [authDeliver, setAuthDeliver] = useState(false);
  const [authAdmin, setAuthAdmin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        authMember,
        setAuthMember,
        authStore,
        setAuthStore,
        authDeliver,
        setAuthDeliver,
        authAdmin,
        setAuthAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
