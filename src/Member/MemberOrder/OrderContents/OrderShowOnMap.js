import { useState } from 'react';
import { useSVG } from '../../../Context/SVGProvider';
//                       訂單編號,訂單內容
function OrderShowOnMap({ selectedOrder, orderShowNow }) {
  const { orderSVG } = useSVG();
  const [openDetail, setOpenDetail] = useState(false);
  const payStatus = [
    ['未付款', '已付款'],
    ['現金', 'LinePay'],
  ];
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
        "name": "I’m PASTA 和平店",
        orderId:"M221121113"
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
  return (
    <>
      <div
        onClick={() => {
          if (!openDetail) {
            setOpenDetail(true);
          }
        }}
        className={`orderButtonOnMap ${openDetail ? 'open' : 'close'} `}
      >
        {openDetail ? (
          <div className="padV20 padH20">
            <p className="marb10 fontMainColor">
              <i
                onClick={() => {
                  setOpenDetail(false);
                }}
                class="fs24 fa-regular fa-square-minus pointer openDetailMinus"
              ></i>
            </p>
            <p className="fw6 fs18 borderBotGray3 padV5">
              訂單編號：{orderShowNow.orderResult.orderId}
            </p>
            <div className="borderBotGray3">
              {/* {    productResult
                  "sid": 262,
                  "order_sid": 113,
                  "product_sid": 1115,
                  "product_price": 160,
                  "amount": 2,
                  "name": "香辣青醬海鮮麵"
              } */}
              {orderShowNow.productResult.map((v, i) => {
                return (
                  <div key={v.sid} className="disf jc-sb padV10 padH10">
                    <div className="disf w80p">
                      <p className="w10p fontMainColor fw6">{v.amount}x</p>
                      <p className="w90p">{v.name}</p>
                    </div>
                    <p className="w20p">NT${v.product_price * v.amount}</p>
                  </div>
                );
              })}
            </div>
            <div className="disf jc-sb padV10 ">
              <p>小計</p>
              <p>NT${orderShowNow.orderResult.order_total}</p>
            </div>
            {orderShowNow.orderResult.deliver_fee === 0 ? (
              <></>
            ) : (
              <div className="disf jc-sb padV10 ">
                <p>＋外送服務費</p>
                <p>NT${orderShowNow.orderResult.deliver_fee}</p>
              </div>
            )}
            {orderShowNow.orderResult.order_total -
              orderShowNow.orderResult.sale ===
            0 ? (
              <></>
            ) : (
              <div className="disf jc-sb padV10 ">
                <p>－優惠券</p>
                <p>
                  NT$
                  {orderShowNow.orderResult.order_total -
                    orderShowNow.orderResult.sale}
                </p>
              </div>
            )}

            <div className="disf jc-sb padV10 fw6">
              <p>總計金額</p>
              <p>
                NT$
                {orderShowNow.orderResult.sale +
                  orderShowNow.orderResult.deliver_fee}
              </p>
            </div>
            <div className="borderBotGray3"></div>
            <div className="disf jc-sb padV10">
              <p>付款狀態</p>
              <p>{payStatus[1][orderShowNow.orderResult.pay_method]}</p>
              <p>{payStatus[0][orderShowNow.orderResult.paid]}</p>
            </div>
          </div>
        ) : (
          // <orderSVG className={'orderButtonOnMapSVG'} />
          <>{orderSVG('orderButtonOnMapSVG')}</>
        )}
      </div>
    </>
  );
}
export default OrderShowOnMap;
