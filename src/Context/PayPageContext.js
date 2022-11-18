import React, { useState, useContext, createContext } from 'react';

const PayContext = createContext(null);

export const PaydetailProvider = ({ children }) => {
  //優惠券折扣金額 只傳金額
  const [couponCutAmount, setCouponCutAmount] = useState(0);
  //外送費
  const [deliverFee, setDeliverFee] = useState(10);
  //個人資料
  const [profile, setProfile] = useState({});

  const [payWay, setPayWay] = useState(0);
  return (
    <PayContext.Provider
      value={{
        couponCutAmount,
        setCouponCutAmount,
        deliverFee,
        setDeliverFee,
        profile,
        setProfile,
        payWay,
        setPayWay,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePay = () => useContext(PayContext);
