import { usePay } from '../../../Context/PayPageContext';
import { useCart } from '../../../Context/CartProvider';
import { useFunc } from '../../../Context/FunctionProvider';
import { useEffect, useRef, useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
const siteName = window.location.hostname;
//===============================================分隔線================================================
// 開新視窗並置中的函式，facebook use it
// https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
function PopupCenter(url, title, w, h) {
  var userAgent = navigator.userAgent,
    mobile = function () {
      return (
        /\b(iPhone|iP[ao]d)/.test(userAgent) ||
        /\b(iP[ao]d)/.test(userAgent) ||
        /Android/i.test(userAgent) ||
        /Mobile/i.test(userAgent)
      );
    },
    screenX =
      typeof window.screenX != 'undefined' ? window.screenX : window.screenLeft,
    screenY =
      typeof window.screenY != 'undefined' ? window.screenY : window.screenTop,
    outerWidth =
      typeof window.outerWidth != 'undefined'
        ? window.outerWidth
        : document.documentElement.clientWidth,
    outerHeight =
      typeof window.outerHeight != 'undefined'
        ? window.outerHeight
        : document.documentElement.clientHeight - 22,
    targetWidth = mobile() ? null : w,
    targetHeight = mobile() ? null : h,
    V = screenX < 0 ? window.screen.width + screenX : screenX,
    left = parseInt(V + (outerWidth - targetWidth) / 2, 10),
    right = parseInt(screenY + (outerHeight - targetHeight) / 2.5, 10),
    features = [];
  if (targetWidth !== null) {
    features.push('width=' + targetWidth);
  }
  if (targetHeight !== null) {
    features.push('height=' + targetHeight);
  }
  features.push('left=' + left);
  features.push('top=' + right);
  features.push('scrollbars=1');

  var newWindow = window.open(url, title, features.join(','));

  if (window.focus) {
    newWindow.focus();
  }

  return newWindow;
}
//===============================================分隔線================================================
//開啟監聽器
function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}
//關閉監聽器
function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}
//===============================================分隔線================================================
//payWay 0現金 1LINEPAY
function PayButton() {
  //導向
  const navi = useNavigate();
  //結帳按鈕鎖定狀態
  const [buttonLock, setButtonLock] = useState(false);
  //通用函式
  const { loginCheckPostFetch, loginCheckGetFetch } = useFunc();
  //監聽linePay狀態
  const [paid, setPaid] = useState(false);
  //新視窗
  const newWindow = useRef(null);

  //結帳頁CONTEXT
  const {
    couponCutAmount,
    deliverFee,
    profile,
    payWay,
    couponSid,
    deliverMemo,
    storeMemo,
    payingOrderSid,
    setPayingOrderSid,
  } = usePay();
  const { chooseedPayShopContents, sendAddress, chooseedPayShop } = useCart();
  //回傳要傳的資料 避免重複寫
  const dataCollection = () => {
    return JSON.stringify({
      shopSid: chooseedPayShop,
      deliverFee: deliverFee,
      receiveName: profile.name,
      receivePhone: profile.phone,
      sendAddress: sendAddress,
      couponCutAmount: couponCutAmount,
      couponSid: couponSid,
      details: chooseedPayShopContents,
      storeMemo: storeMemo,
      deliverMemo: deliverMemo,
    });
  };
  //現金
  const cashPay = async () => {
    const postData = dataCollection();
    await loginCheckPostFetch('CashPay', 'Member', postData);
  };
  //LinePay
  const linePay = async () => {
    const postData = dataCollection();
    const res = await loginCheckPostFetch(
      'LinePaySetOrder',
      'Member',
      postData
    );
    console.log(res);
    if (res.sucess) {
      setPayingOrderSid(res.orderSid);
      const totalPrice =
        Number(chooseedPayShopContents.shopPriceTotal) -
        Number(couponCutAmount);
      const params = new URLSearchParams({
        productName: '隨饗',
        amount: totalPrice,
        currency: 'TWD',
        orderId: res.orderSid,
      });
      const url =
        `http://${siteName}:3001/LinePay/reserve/?` + params.toString();
      newWindow.current = PopupCenter(url, 'LinelogInPopup', 400, 600);
      // await loginCheckGetFetch(
      //   `LinePay/reserve/?${params.toString()}`,
      //   'Member'
      // );
    }

    // {orderSid:orderSid,sucess:true}
    // const url = `http://${siteName}:3001/LinePay/reserve/`;
    // await loginCheckGetFetch('LinePay/reserve/', 'Member', postData);
    // newWindow.current = PopupCenter(url, 'LinelogInPopup', 400, 600);
  };

  //===============================================分隔線================================================
  //LINEPAY 移植
  //{paid ? <strong>已完成付款</strong> : '尚未付款'}

  //進來時監聽是否已經付款
  useEffect(() => {
    subscribe('paid', () => setPaid(true));
    return () => {
      unsubscribe('paid');
    };
  }, []);

  useEffect(() => {
    if (paid) {
      // alert('已付款');
      //TODO:這邊之後改成結帳完成頁(訂單成立頁)
      //這一頁之後做成元件放在訂單頁
      alert('付款成功');
      setTimeout(() => {
        navi('/');
      }, 3000);
    }
    return;
  }, [paid]);

  //===============================================分隔線================================================
  const showDatasInConsole = () => {
    console.log('-----店家ID-----');
    console.log(chooseedPayShop);
    console.log('-----購物車內容-----');
    console.log(chooseedPayShopContents);
    console.log('-----外送費-----');
    console.log(deliverFee);
    console.log('-----基本資料-----');
    console.log(profile);
    console.log('-----送達地址-----');
    console.log(sendAddress);
    console.log('-----優惠金額-----');
    console.log(couponCutAmount);
    console.log('-----優惠券sid-----');
    console.log(couponSid);
    console.log('-----外送員備註-----');
    console.log(deliverMemo);
    console.log('-----店家備註-----');
    console.log(storeMemo);
    console.log('-----結帳方式-----');
    console.log(payWay === 0 ? '現金' : 'LinePay');
  };
  return (
    <>
      {/* setButtonLock */}
      <div
        onClick={() => {
          if (!buttonLock) {
            setButtonLock(true);
            if (payWay === 0) {
              cashPay();
              console.log('cashPay');
            } else if (payWay === 1) {
              linePay();
              console.log('linePay');
            } else {
              return;
            }
            setTimeout(() => {
              setButtonLock(false);
            }, 2000);
          }
        }}
        className={`as-e payPageButton ${buttonLock ? 'locked' : ''}`}
      >
        確認
      </div>
    </>
  );
}
export default PayButton;
