import React, { useState, useContext, createContext } from 'react';
const shoppingContext = createContext({});
//購物車相關狀態管理
export const SearchValueProvider = ({ children }) => {
  const [searchWaitTime, setSearchWaitTime] = useState('80');
  const [formData, setFormData] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  return (
    <shoppingContext.Provider
      value={{
        searchWaitTime,
        setSearchWaitTime,
        formData,
        setFormData,
        isChecked,
        setIsChecked,
      }}
    >
      {children}
    </shoppingContext.Provider>
  );
};

export const UseSearchValue = () => useContext(shoppingContext);
