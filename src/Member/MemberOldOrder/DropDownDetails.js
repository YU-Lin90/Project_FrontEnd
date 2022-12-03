//歷史訂單 第三層 訂單細節
import { useEffect, useState } from 'react';
import { useFunc } from '../../Context/FunctionProvider';
//  訂單編號  其他訂單細節
//{ orderSid, orderDetail }  112
function DropDownDetails({ orderSid, orderData }) {
  const [productDetails, setProductDetails] = useState([]);
  const { loginCheckGetFetch } = useFunc();
  const payMethod = ['現金', 'LinePay'];
  const getDetails = async () => {
    const detailResult = await loginCheckGetFetch(
      `MemberOldOrder/GetDropDetails?orderSid=${orderSid}`,
      'Member'
    );
    console.log(detailResult);
    setProductDetails(detailResult);
  };
  useEffect(() => {
    getDetails();
  }, []);
  /* {
    "order_sid": 112,
    "product_sid": 1124,
    "product_price": 155,
    "amount": 1,
    "name": "主廚咖哩海鮮燉飯"
} */
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
        "complete_time": "2022/11/21 23:32",
        "deliverName": "外送員01",
        "coupon_name": null,
        "orderId": "M221122112"
  } */
  return (
    <>
      <div className="w100p padH20 padV20">
        <div>
          {productDetails.map((v, i) => {
            return (
              <>
                <div key={i} className="disf jc-sb padV10 padH20">
                  <p className="fontMainColor fw6 ">{v.amount}x</p>
                  <p>{v.name}</p>
                  <p>{v.product_price * v.amount}</p>
                </div>
                {v.options.length === 0 ? null : (
                  <div className="disf ai-c jc-se">
                    {v.options.map((val) => {
                      return <span>{val.options.options}</span>;
                    })}
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="disf jc-sb marV15">
          <p>付款方式：{payMethod[orderData.pay_method]}</p>
          {!orderData.coupon_sid ? null : (
            <p>優惠券：{orderData.coupon_name}</p>
          )}
        </div>

        <div className="disf jc-sb marV15 ta-c fd-sc-br">
          <p>下單時間：{orderData.order_time}</p>
          <p>完成時間：{orderData.complete_time}</p>
        </div>
      </div>
    </>
  );
}
export default DropDownDetails;
