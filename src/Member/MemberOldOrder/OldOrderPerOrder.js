import { useState } from 'react';
import DropDownDetails from './DropDownDetails';
function OldOrderPerOrder({ orderData }) {
  const [openDetail, setOpenDetail] = useState(false);
  /* {
    "sid": 112,
    "shop_sid": 89,
    "deliver_sid": 1,
    "store_order_sid": 19,
    "deliver_order_sid": 1,
    "order_time": "2022/11/22 23:17",
    "order_total": 720,
    "coupon_sid": 0,
    "sale": 720,
    "pay_method": 0,
    "deliver_fee": 10,
    "total_amount": 6,
    "shopName": "I’m PASTA 和平店",
    "src": "null",
    "complete_time": "2022/11/21 23:32",
    "deliverName": "外送員01",
    "coupon_name": null,
    "deliverScore": null,
    "shopScore": null,
    "orderId": "M221122112",
    "order_date": "2022年11月22日"
} */
  return (
    <>
      <div name="單個訂單外框" className="w100p marb20 oldOrderFrame">
        <div className="w100p  padV20 padH20 disf oldOrderTopDetail">
          <div className="w20p">圖片</div>
          <div className="w60p disf fd-c jc-se fw6 fs18">
            <p>訂單編號：{orderData.orderId}</p>
            <p>{orderData.shopName}</p>
            <p>外送員：{orderData.deliverName}</p>
            <p>{orderData.order_date}</p>
          </div>
          <div className="w20p disf fd-c ai-c jc-se gap10">
            <p className="fw6 fs18">${orderData.sale}</p>
            <div className="disf fd-c">
              <p className="oldOrderCommand">重新下單</p>
              <div>
                <p className="oldOrderCommand">給予店家評價</p>
              </div>
              <div>
                <p className="oldOrderCommand">給予外送評價</p>
              </div>
            </div>
          </div>
        </div>
        <div
          name="查看細節"
          onClick={() => {
            setOpenDetail((v) => !v);
          }}
          className="disf jc-sb padV20 padH20 h50 pointer"
        >
          <p className="fw5 fs18">
            {openDetail ? '訂單細節' : '查看細節(5個品項)'}
          </p>
          <div
            className={`fontMainColor reverseArrow ${
              openDetail ? 'active' : ''
            }`}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <div>
          {openDetail ? (
            <>
              <DropDownDetails orderSid={orderData.sid} orderData={orderData} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export default OldOrderPerOrder;
