//第一段 送餐詳情
import { usePay } from '../../../Context/PayPageContext';
import { useCart } from '../../../Context/CartProvider';

import PayTitleBlock from '../PayTitleBlock';
function DeliveDetail() {
  const { sendAddress } = useCart();
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={1} titleString={'送餐詳情'} />
        {sendAddress}
      </div>
    </>
  );
}
export default DeliveDetail;
