//結帳頁--訂單細節
import { useEffect } from 'react';
import { useCart } from '../../../Context/CartProvider';

function OrederDetailForPay() {
  const { chooseedPayShopContents } = useCart();

  useEffect(() => {
    console.log(chooseedPayShopContents);
  }, []);
  return (
    <div className="w30p po-s">
      <div>訂單細節-右半邊</div>
    </div>
  );
}
export default OrederDetailForPay;
