//購物車選擇店家頁面
import { useEffect, useState } from 'react';
import { useCart } from '../../Context/CartProvider';

import '../Cart.css';

function ChooseCart({ setShowChooseShop, setShowCart }) {
  const { chooseedPayShop, setChooseedPayShop, setChooseedPayShopContents } =
    useCart();
  const [cart, setCart] = useState(false);
  const [shoplist, setShopList] = useState({});
  //選擇店家到下一步
  const setChoosedShop = (shopSid) => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    cartData.choosedSid = shopSid;
    localStorage.setItem('cart', JSON.stringify(cartData));
    setChooseedPayShopContents(cartData.cartList[shopSid]);
    setChooseedPayShop(shopSid);
    setShowChooseShop(false);
    setShowCart(true);
  };
  //一開始先從localStorage拿購物車資料 如果沒有就顯示購物車為空
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(true);
      // console.log(JSON.parse(cartData).cartList)
      setShopList(JSON.parse(cartData).cartList);
    } else {
      setCart(false);
    }
  }, []);
  //空購物車
  const emptyCart = () => {
    return (
      <>
        <div className="chooseCart flexSetCenter ">
          <div className="append1s flexSetCenter fd-c">
            <h3 className="chooseCartH3">購物車為空</h3>
            <div>
              <i className="fa-solid fa-cart-shopping emptyCart"></i>
            </div>
          </div>
        </div>
      </>
    );
  };
  //有購物車
  const setShops = () => {
    return (
      <div className="cartFrame">
        <div className="chooseCart">
          <div className="w100p disf fd-rr">
            <i
              onClick={() => {
                setShowChooseShop(false);
              }}
              className="fa-solid fa-circle-xmark pointer cartX"
            ></i>
          </div>
          <h3 className="chooseCartH3">請選擇店家</h3>
          {Object.keys(shoplist).map((keyName, index) => {
            return (
              <div
                onClick={() => {
                  setChooseedPayShop(Number(keyName));
                  setChoosedShop(keyName);
                }}
                className="cartShopList"
                // keyName = 商店SID
                key={keyName}
              >
                {/* 商店名稱 */}
                <p className="chooseCartName">{shoplist[keyName].shopName}</p>
                {/* 商店總數 */}
                <p className="chooseCartName">
                  商品總數:{shoplist[keyName].shopTotal}
                </p>
                {/* 商店總價 */}
                <p className="chooseCartPrice">
                  {shoplist[keyName].shopPriceTotal}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <>{cart ? setShops() : emptyCart()}</>;
}
export default ChooseCart;
