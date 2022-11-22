//地圖上訂單內容
function OrderDetailsOnMap({ setOpenDetail, orderShowNow }) {
  const payStatus = [
    ['未付款', '已付款'],
    ['現金', 'LinePay'],
  ];
  return (
    <>
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
    </>
  );
}
export default OrderDetailsOnMap;
