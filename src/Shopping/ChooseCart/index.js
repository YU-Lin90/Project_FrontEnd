import { useEffect, useState } from 'react';
import '../Cart.css';

function ChooseCart({ setShowChooseShop, setShowCart }) {
  const [cart, setCart] = useState(false);
  const [shoplist, setShopList] = useState({});
  //選擇店家到下一步
  const setChoosedShop = (shopSid) => {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    cartData.choosedSid = shopSid;
    localStorage.setItem('cart', JSON.stringify(cartData));
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
        <div className="chooseCart">購物車為空</div>
      </>
    );
  };
  //有購物車
  const setShops = () => {
    return (
      <>
        <div className="chooseCart">
          <div
            onClick={() => {
              setShowChooseShop(false);
            }}
          >
            X
          </div>
          <h3 className="chooseCartH3">請選擇店家</h3>
          {Object.keys(shoplist).map((keyName, index) => {
            return (
              <div
                onClick={() => {
                  setChoosedShop(keyName);
                }}
                className="cartShopList"
                key={keyName}
              >
                <p className="chooseCartName">店家SID{keyName}</p>
                <p className="chooseCartName">
                  商品總數:{shoplist[keyName].shopTotal}
                </p>
                <p>總價:123</p>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return <>{cart ? setShops() : emptyCart()}</>;
}
export default ChooseCart;
