//結帳頁 全體
import OrederDetailForPay from './OrederDetailForPay';
import { useCart } from '../../Context/CartProvider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveDetail from './DeliveDetail';
import ProfileData from './ProfileData';
import PayCoupon from './PayCoupon';
import Payment from './Payment';
import './Pay.css';

function Pay() {
  const { cartTotal, setCartTotal, chooseedPayShopContents } = useCart();
  //優惠券折扣金額 只傳金額
  const [couponCutAmount, setCouponCutAmount] = useState(0);
  const navi = useNavigate();
  useEffect(() => {
    //沒選擇直接擋掉
    if (!chooseedPayShopContents.shopTotal) {
      alert('尚未選擇店家!!');
      navi('/');
    }
  }, []);
  return (
    <>
      <div className="disf">
        <div className="w70p">
          <DeliveDetail />
          <ProfileData />
          <PayCoupon setCouponCutAmount={setCouponCutAmount} />
          <Payment />
        </div>
        <OrederDetailForPay couponCutAmount={couponCutAmount} />
      </div>
    </>
  );
}
export default Pay;
