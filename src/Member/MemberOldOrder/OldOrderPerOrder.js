//歷史訂單 第二層 各單項訂單
import { useState } from 'react';
import DropDownDetails from './DropDownDetails';
import OrderCommand from './OrderCommand';
const siteName = window.location.hostname;
function OldOrderPerOrder({ orderData, setReloading }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openShopCommand, setOpenShopCommand] = useState(false);
  const [openDeliverCommand, setOpenDeliverCommand] = useState(false);
  const SolidStar = () => {
    return <i className="fa-solid fa-star fs18 fontMainColor"></i>;
  };

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
    "deliverScore": 1,
    "shopScore": null,
    "orderId": "M221122112",
    "order_date": "2022年11月22日"
} */ //orderData.deliverScore       orderData.shopScore
  return (
    <>
      <div name="單個訂單外框" className="w100p marb20 oldOrderFrame bgcW">
        <div className="w100p  padV20 padH20 disf oldOrderTopDetail">
          {/* TODO: 店家照片 */}
          <div className="w20p as1 lh0 flexSetCenter padH10 padV10">
            <img
              className="oldOrderStoreImg"
              src={` http://${siteName}:3001/images/store01.jpg`}
              alt=""
            />
          </div>
          <div className="w60p disf fd-c jc-se fw6 fs18">
            <p>訂單編號：{orderData.orderId}</p>
            <p>{orderData.shopName}</p>
            <p>外送員：{orderData.deliverName}</p>
            <p>{orderData.order_date}</p>
          </div>
          <div className="w20p disf fd-c ai-c jc-se gap10">
            <p className="fw6 fs18">${orderData.sale}</p>
            <div className="disf fd-c">
              {/* TODO: 重新下單 */}
              <p className="oldOrderCommand marb10">重新下單</p>
              <div>
                {orderData.shopScore ? (
                  <p className="ta-c marb10 fw5">
                    店家評價：
                    {orderData.shopScore}
                    <SolidStar />
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setOpenShopCommand(true);
                    }}
                    className="oldOrderCommand"
                  >
                    給予店家評價
                  </p>
                )}
              </div>
              <div>
                {orderData.deliverScore ? (
                  <p className="ta-c marb10 fw5">
                    外送員評價：
                    {orderData.deliverScore}
                    <SolidStar />
                  </p>
                ) : (
                  <p
                    onClick={() => {
                      setOpenDeliverCommand(true);
                    }}
                    className="oldOrderCommand"
                  >
                    給予外送評價
                  </p>
                )}
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
            {openDetail
              ? '訂單細節'
              : `查看細節(${orderData.total_amount}個品項)`}
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

      {openShopCommand ? (
        <OrderCommand
          side={2}
          setOpenShopCommand={setOpenShopCommand}
          orderSid={orderData.sid}
          targetSid={orderData.shop_sid}
          setReloading={setReloading}
        />
      ) : null}
      {openDeliverCommand ? (
        <OrderCommand
          side={3}
          setOpenDeliverCommand={setOpenDeliverCommand}
          orderSid={orderData.sid}
          targetSid={orderData.deliver_sid}
          setReloading={setReloading}
        />
      ) : null}
    </>
  );
}
export default OldOrderPerOrder;
