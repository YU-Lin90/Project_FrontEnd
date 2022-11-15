//訂單第三層 卡片

import '../StoreOrder.css';

/* {
  "sid": 1,
  "member_sid": 1,
  "shop_sid": 89,
  "store_order_sid": null,
  "shop_memo": "不要香菜",
  "order_time": "2022-11-15 16:01:44",
  "order_total": 2000,
  "sale": 2000,
  "paid": 1,
  "pay_method": 0,
  "cook_time": 40,
  "name": "ゆう"
}*/

function OrderDetailsCard({ datas, page }) {
  return (
    <div className="w25p padH5">
      <div className="orderDetailsCard">
        <div>客戶名稱：{datas.name}</div>
        <div>訂單編號：{datas.orderNumber}</div>
        <div>下單時間：{datas.order_time}</div>
        <div>等待時間：{datas.cook_time}</div>
      </div>
    </div>
  );
}
export default OrderDetailsCard;
