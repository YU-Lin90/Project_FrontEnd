//現在訂單 第二層 訂單狀態條
import { useEffect, useState } from 'react';
import OrderMap from '../OrderMap';
import { useFunc } from '../../../Context/FunctionProvider';
import ProgessStep from './ProgessStep';
//selectedOrder 選到的訂單SID
function OrderContents({ selectedOrder }) {
  const [step, setStep] = useState(1);
  const { loginCheckGetFetch } = useFunc();
  //叫資料函式
  const getOrderDetail = async (orderSid) => {
    const res = await loginCheckGetFetch(
      `MemberOrderCheck/OrderDetails?orderSid=${orderSid}`,
      'Member'
    );
    //stepNow  1 店家還沒接單  2 店家還沒完成 3 店家完成外送員還沒取餐  4外送員已取餐還沒到
    console.log(res);
    setStep(res.stepNow);
  };
  /* {
    "orderResult": {
        "sid": 99,
        "member_sid": 1,
        "shop_sid": 89,
        "deliver_sid": null,
        "store_order_sid": 13,
        "deliver_order_sid": null,
        "shop_memo": "店家備註",
        "deliver_memo": "外送員備註",
        "order_time": "2022-11-19T07:49:23.000Z",
        "order_total": 7715,
        "coupon_sid": 0,
        "sale": 7715,
        "paid": 1,
        "pay_method": 1,
        "LinePayID": "2022111900732678910",
        "daily_coupon_sid": 0,
        "deliver_fee": 10,
        "cook_time": 40,
        "shop_order_status": 1,
        "deliver_order_status": 0,
        "total_amount": 65,
        "receive_name": "ゆう",
        "receive_phone": "0952400243",
        "receive_address": "106台北市大安區復興南路一段390號2樓",
        "order_complete": 0,
        "name": "I’m PASTA 和平店"
    },
    "shopResult": {
        "sid": 13,
        "member_sid": 1,
        "deliver_sid": null,
        "deliver_order_sid": null,
        "order_sid": 99,
        "shop_memo": null,
        "shop_accept_time": "2022-11-19T07:49:23.000Z",
        "shop_complete_time": "2022-11-19T07:49:30.000Z",
        "deliver_take": 0,
        "shop_sid": 89,
        "cook_finish": 1
    },
    "stepNow": 3
} */

  useEffect(() => {
    if (selectedOrder !== 0) {
      // console.log(selectedOrder);
      getOrderDetail(selectedOrder);
    }
    //這裡要叫資料
  }, [selectedOrder]);
  return (
    <div className="w100p marHauto">
      <ProgessStep step={step} />
      {/* 下半地圖 */}
      <OrderMap selectedOrder={selectedOrder} />
    </div>
  );
}
export default OrderContents;
