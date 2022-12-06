import { useEffect, useState } from 'react';
import { usePay } from '../../../Context/PayPageContext';
import { useFunc } from '../../../Context/FunctionProvider';
import moment from 'moment/moment';
function PayDailyCoupon() {
  const {
    setDailyCouponAmount,
    dailyCouponSid,
    setDailyCouponSid,
    chooseedPayShop,
  } = usePay();
  const { loginCheckGetFetch } = useFunc();
  const [hasDailyCoupon, setHasDailyCoupon] = useState(false);
  const [showDailyCoupon, setShowDailyCoupon] = useState({
    count: 0,
    shop_sid: 0,
    name: '',
    member_sid: 0,
    expire: '2000-01-01T00:00:00.000Z',
    cut_amount: 0,
    is_used: 0,
  });
  //這裡要改成對應店家SID
  const checkDailyCouponNotUse = async () => {
    const res = await loginCheckGetFetch(
      `DailyCoupon/CheckDailyCouponWithShopSid/?shopSid=${chooseedPayShop}`,
      'Member'
    );
    console.log({ res });
    if (!res.count) {
      return;
    }
    /*{
    "count": 1,
    "shop_sid": 89,
    "name": "I’m PASTA 和平店",
    "member_sid": 1,
    "expire": "2022-12-02T05:10:22.000Z",
    "cut_amount": 30,
    "is_used": 0
    }*/
    //設定店家資訊
    setDailyCouponAmount(res.cut_amount);
    setShowDailyCoupon(res);
    setHasDailyCoupon(true);
    setDailyCouponSid(res.sid);
  };
  useEffect(() => {
    checkDailyCouponNotUse();
  }, [chooseedPayShop]);
  return (
    <>
      {hasDailyCoupon ? (
        <div>
          <p>每日優惠券</p>
          <p>
            <span>折扣金額</span>
            <span>{showDailyCoupon.cut_amount}</span>
          </p>
          <p>
            使用期限:
            <span>
              {moment(showDailyCoupon.expire).utcOffset(8).format('HH:mm:ss')}
            </span>
          </p>
        </div>
      ) : null}
    </>
  );
}
export default PayDailyCoupon;
