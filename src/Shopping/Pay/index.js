import OrederDetailForPay from './OrederDetailForPay';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveDetail from './DeliveDetail';
import ProfileData from './ProfileData';
import PayCoupon from './PayCoupon';
import Payment from './Payment';
import { usePay } from '../../Context/PayPageContext';
import './Pay.css';
//結帳頁 全體
function Pay() {
  const { chooseedPayShop } = usePay();
  const navi = useNavigate();
  // 製作中先關掉 做完再打開(空白選擇阻擋)
  useEffect(() => {
    //沒選擇直接擋掉
    if (!chooseedPayShop > 1) {
      alert('尚未選擇店家!!');
      navi('/');
    }
  }, []);
  return (
    <>
      <div className="disf">
        <div className="w70p flexSetCenter fd-c jc-se">
          <DeliveDetail />
          <ProfileData />
          <PayCoupon />
          <Payment />
        </div>
        <OrederDetailForPay />
      </div>
    </>
  );
}
export default Pay;
