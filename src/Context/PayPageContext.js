import React, { useState, useContext, createContext } from 'react';

const PayContext = createContext(null);

export const PaydetailProvider = ({ children }) => {
  //優惠券折扣金額 只傳金額
  const [couponCutAmount, setCouponCutAmount] = useState(0);
  //優惠券SID
  const [couponSid, setCouponSid] = useState(0);
  //外送費
  const [deliverFee, setDeliverFee] = useState(10);
  //個人資料
  const [profile, setProfile] = useState({});
  //付款方式 0現金 1LINEPAY
  const [payWay, setPayWay] = useState(0);
  //外送員備註
  const [deliverMemo, setDeliverMemo] = useState('外送員備註');
  //店家備註
  const [storeMemo, setStoreMemo] = useState('店家備註');
  //正在支付的訂單SID LINEPAY用
  const [payingOrderSid, setPayingOrderSid] = useState(0);
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
        couponSid,
        setCouponSid,
        deliverMemo,
        setDeliverMemo,
        storeMemo,
        setStoreMemo,
        payingOrderSid,
        setPayingOrderSid,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePay = () => useContext(PayContext);
