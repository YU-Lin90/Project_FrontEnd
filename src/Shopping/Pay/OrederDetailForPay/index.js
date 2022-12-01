//結帳頁--訂單細節(右半邊)
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePay } from '../../../Context/PayPageContext';
import PayPageCart from '../PayPageCart';
function OrederDetailForPay() {
  //顯示商品列表用 只在這頁顯示
  const [productList, setProductList] = useState({});
  const { couponCutAmount, deliverFee, cartContents, chooseedPayShop } =
    usePay();
  const navi = useNavigate();
  useEffect(() => {
    // setProductList(cartContents.cartList["89"].list);
    setProductList(cartContents.cartList[chooseedPayShop].list);
  }, []);
  return (
    <div className=" topUnderNav padV20 flexSetCenter of-a OrederDetailForPay">
      <div className="disf jc-c fd-c ai-c w80p gap20 padV20">
        <p className="fs36 fw6 ta-c marb15">你的訂單</p>
        <PayPageCart />
        {/* <p className="fs24 fw5">
          {cartContents.cartList[chooseedPayShop].shopName}
        </p> */}
        {/* <div className="w100p borderBotGray3 padV5"> */}
        {/* 在這之間MAP--商品明細 */}
        {/* {
            "1": {
            "amount": 1,
          "name": "一號產品",
          "price": 40,
          "cuttedPrice": 40,
          "imageUrl": "",
          "details": { }
          },
          "2": {
            "amount": "13",
          "name": "二號產品",
          "price": 80,
          "cuttedPrice": 70,
          "imageUrl": "",
          "details": { }
          },
          } */}
        {/* 樣板 */}
        {/* <div className="disf jc-sb w100p ">
            <p className="w70p disf gap10 ">
              <span className="fontMainColor fw5">2x</span>
              <span>菜品</span>
            </p>
            <p className="w30p ta-e">NT$80</p>
          </div> */}
        {/* {Object.keys(productList).map((sid, index) => {
            const divideProduct = productList[sid];
            return (
              <div key={sid} className="disf jc-sb w100p marb15">
                <p className="w70p disf ">
                  <span className="fontMainColor w20p fw5">
                    {divideProduct.amount}x
                  </span>
                  <span>{divideProduct.name}</span>
                </p>
                <p className="w30p ta-e">
                  NT${divideProduct.amount * divideProduct.cuttedPrice}
                </p>
              </div>
            );
          })} */}

        {/* 在這之間MAP */}
        {/* </div> */}

        {/* {
    "shopTotal": 20,
    "shopName": "一號店",
    "shopPriceTotal": 1290
} */}
        <div className="w100p">
          <p className="w100p disf jc-sb marb10">
            <span>小計</span>
            <span>
              {/* NT${cartContents.cartList[89].shopPriceTotal} */}
              NT${cartContents.cartList[chooseedPayShop].shopPriceTotal}
            </span>
          </p>
          <p className="w100p disf jc-sb marb10">
            <span>+外送服務費</span>
            {/* TODO:外送服務費 */}
            <span>NT${deliverFee}</span>
          </p>
          {couponCutAmount > 0 ? (
            <>
              <p className="w100p disf jc-sb marb10">
                <span>-優惠券</span>
                <span>-NT${couponCutAmount}</span>
              </p>
            </>
          ) : null}
        </div>
        <p className="w100p disf jc-sb borderBotGray3">
          <span className="fw7">總計金額</span>
          <span>
            NT$
            {cartContents.cartList[chooseedPayShop].shopPriceTotal -
              couponCutAmount +
              deliverFee}
          </span>
        </p>
        <p className="w100p disf jc-sb">
          <span>本次消費獲得紅利(10%)</span>
          <span>
            {parseInt(
              (cartContents.cartList[chooseedPayShop].shopPriceTotal -
                couponCutAmount) /
                10
            )}
            點
          </span>
        </p>
        {/* TODO:繼續加購商品 */}
        <p
          className="payPageButton"
          onClick={() => {
            navi(`/StoreDetail?shopSid=${chooseedPayShop}`);
          }}
        >
          繼續加購
        </p>
      </div>
    </div>
  );
}
export default OrederDetailForPay;
