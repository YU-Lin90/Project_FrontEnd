//這個元件作好之後 放在店家那一頁
import { useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
import { useAuth } from '../../Context/AuthProvider';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';

function DailyTimeCounter() {
  const location = useLocation();
  //會員登入狀態
  const { authMember } = useAuth();
  const { loginCheckGetFetch } = useFunc();
  //優惠店家資訊
  const [shopData, setShopData] = useState({ name: '', sid: 0 });
  //倒期時間
  const [expireTime, setExpireTime] = useState('');
  //有沒有今日優惠券
  const [hasDailyCoupon, setHasDailyCoupon] = useState(false);
  //設定倒數時間
  const [showExpire, setShowExpire] = useState('');
  //檢查現在頁面位置(店家內是否要顯示)
  const [checkLocation, setCheckLocation] = useState(false);
  //確認今日優惠券
  const checkDailyCouponNotUse = async () => {
    const res = await loginCheckGetFetch(
      'DailyCoupon/CheckTodayNotUse',
      'Member'
    );
    console.log(res);
    if (!res.expire) {
      return;
    }
    /*{
    "count": 1,
    "name": "I’m PASTA 和平店",
    "member_sid": 1,
    "expire": "11:10:22",
    "cut_amount": 30,
    "is_used": 0
    } */
    //設定店家資訊
    const gettedShopInfo = { name: res.name, sid: res.shop_sid };
    setShopData(gettedShopInfo);
    setExpireTime(res.expire);
    setHasDailyCoupon(true);
  };
  useEffect(() => {
    const disCountInterval = setInterval(() => {
      const timeNow = new Date();
      const expTime = new Date(expireTime);
      let newTimer = expTime - timeNow;
      // newTimer = moment(newTimer).zone(0).format('HH小時mm分ss秒');
      newTimer = moment(newTimer).utcOffset(0).format('H小時mm分ss秒');

      setShowExpire(newTimer);
    }, 1000);
    return () => {
      clearInterval(disCountInterval);
    };
  }, [expireTime]);
  useEffect(() => {
    if (authMember) {
      checkDailyCouponNotUse();
    }
  }, [authMember, location]);
  return (
    <>
      {hasDailyCoupon ? (
        <div>
          <p>今日優惠店家：{shopData.name}</p>
          <p>優惠剩餘時間：{showExpire}</p>
        </div>
      ) : null}
    </>
  );
}
export default DailyTimeCounter;
