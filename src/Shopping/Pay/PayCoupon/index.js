import { usePay } from '../../../Context/PayPageContext';
//第三段 優惠券
import PayTitleBlock from '../PayTitleBlock';
function PayCoupon() {
  const { setCouponCutAmount } = usePay();
  return (
    <>
      <div className="payDetailBox">
        <PayTitleBlock number={3} titleString={'優惠券'} />
      </div>
    </>
  );
}
export default PayCoupon;
