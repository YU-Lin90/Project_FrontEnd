//現在訂單 第二層 訂單狀態條
import { useEffect, useState } from 'react';
import OrderMap from '../OrderMap';
import { useFunc } from '../../../Context/FunctionProvider';
import ProgessStep from './ProgessStep';
import OrderShowOnMap from './OrderShowOnMap';
//selectedOrder 選到的訂單SID
function OrderContents({ selectedOrder }) {
  //現在階段
  const [step, setStep] = useState(1);
  const { loginCheckGetFetch } = useFunc();
  //現在顯示的訂單編號
  const [orderShowNow, setOrderShowNow] = useState({});
  //叫資料函式
  const getOrderDetail = async (orderSid) => {
    const res = await loginCheckGetFetch(
      `MemberOrderCheck/OrderDetails?orderSid=${orderSid}`,
      'Member'
    );
    //stepNow  1 店家還沒接單  2 店家還沒完成 3 店家完成外送員還沒取餐  4外送員已取餐還沒到
    console.log(res);
    setOrderShowNow(res);
    setStep(res.stepNow);
  };

  useEffect(() => {
    if (selectedOrder !== 0) {
      getOrderDetail(selectedOrder);
    }
    //這裡要叫資料
  }, [selectedOrder]);
  return (
    <div className="w100p marHauto">
      <ProgessStep step={step} />
      <div className="po-r">
        {/* 地圖上訂單按鈕 */}
        <OrderShowOnMap
          selectedOrder={selectedOrder}
          orderShowNow={orderShowNow}
        />
        {/* 下半地圖 */}
        <div style={{ height: '500px', width: '100%' }}>
          <OrderMap />
        </div>
      </div>
    </div>
  );
}
export default OrderContents;