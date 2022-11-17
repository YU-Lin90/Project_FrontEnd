//結帳頁--訂單細節(右半邊)
import { useEffect } from 'react';
import { useCart } from '../../../Context/CartProvider';

function OrederDetailForPay({ couponCutAmount }) {
  const { chooseedPayShopContents } = useCart();

  useEffect(() => {
    console.log(chooseedPayShopContents);
  }, []);
  return (
    <div className="vhNoNav topUnderNav w30p po-s flexSetCenter">
      <div className="disf jc-c fd-c ai-c w80p gap20">
        <p className="fs36 fw6 ta-c marb15">你的訂單</p>
        <div className="w100p borderBotGray3 padV5">
          {/* 在這之間MAP--商品明細 */}
          <div className="disf jc-sb w100p marb10">
            <p className="w70p disf gap10 ">
              <span className="fontMainColor fw5">2x</span>
              <span>菜品</span>
            </p>
            <p className="w30p ta-e">NT$80</p>
          </div>
          {/*  */}
          <div className="disf jc-sb w100p ">
            <p className="w70p disf gap10 ">
              <span className="fontMainColor fw5">2x</span>
              <span>菜品</span>
            </p>
            <p className="w30p ta-e">NT$80</p>
          </div>
          {/* 在這之間MAP */}
        </div>
        <div className="w100p">
          <p className="w100p disf jc-sb marb10">
            <span>小計</span>
            <span>NT$80</span>
          </p>
          <p className="w100p disf jc-sb marb10">
            <span>+外送服務費</span>
            <span>NT$80</span>
          </p>
          <p className="w100p disf jc-sb marb10">
            <span>-優惠券</span>
            <span>-NT$80</span>
          </p>
        </div>
        <p className="w100p disf jc-sb borderBotGray3">
          <span className="fw7">總計金額</span>
          <span>NT$150</span>
        </p>
        <p className="w100p disf jc-sb">
          <span>本次消費獲得紅利</span>
          <span>8點</span>
        </p>
      </div>
    </div>
  );
}
export default OrederDetailForPay;
