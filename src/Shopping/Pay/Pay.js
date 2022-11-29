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
function Pay({ orderSocket }) {
  const { chooseedPayShop, clearPayPageState, cartTotal } = usePay();
  const navi = useNavigate();
  // if (!chooseedPayShop) {
  //   alert('尚未選擇店家!!');
  //   navi('/');
  // }

  // 製作中先關掉 做完再打開(空白選擇阻擋)
  useEffect(() => {
    // //沒選擇直接擋掉
    // if (!cartTotal) {
    //   alert('尚未選擇店家!!');
    //   navi('/');
    // }
    return () => {
      clearPayPageState();
    };
  }, []);
  return (
    <>
      <div className="disf padV20 payPageFrame">
        <div className="payPageFrameLeft flexSetCenter fd-c jc-se">
          <DeliveDetail />
          <ProfileData />
          <PayCoupon />
          <Payment orderSocket={orderSocket} />
        </div>
        <OrederDetailForPay />
      </div>
    </>
  );
}
export default Pay;
