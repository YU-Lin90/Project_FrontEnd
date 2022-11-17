//結帳頁 全體
import OrederDetailForPay from './OrederDetailForPay';
import { useCart } from '../../Context/CartProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveDetail from './DeliveDetail';
import ProfileData from './ProfileData';
import './Pay.css';

function Pay() {
  const { cartTotal, setCartTotal, chooseedPayShopContents } = useCart();
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
          結帳頁
        </div>
        <OrederDetailForPay />
      </div>
    </>
  );
}
export default Pay;
