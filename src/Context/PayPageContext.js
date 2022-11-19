import React, { useState, useContext, createContext } from 'react';

const PayContext = createContext(null);

export const PaydetailProvider = ({ children }) => {
  //===============================================分隔線================================================
  //舊 useCart
  //購物車總數
  const [cartTotal, setCartTotal] = useState(0);
  //購物車完整內容
  const [cartContents, setCartContents] = useState({});
  //選擇前往結帳的SID
  const [chooseedPayShop, setChooseedPayShop] = useState(0);
  //選擇前往結帳的商店內容
  //=>    cartContents.cartList[chooseedPayShop]
  // const [chooseedPayShopContents, setChooseedPayShopContents] = useState({});
  //送達地址
  const [sendAddress, setSendAddress] = useState(
    '106台北市大安區復興南路一段390號2樓'
  );
  //===============================================分隔線================================================
  //結帳用
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
        cartTotal,
        setCartTotal,
        cartContents,
        setCartContents,
        chooseedPayShop,
        setChooseedPayShop,
        sendAddress,
        setSendAddress,
      }}
    >
      {children}
    </PayContext.Provider>
  );
};

export const usePay = () => useContext(PayContext);
