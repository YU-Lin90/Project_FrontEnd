import { useEffect, useState } from 'react';
import '../Cart.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

function Cart({ setShowCart, setShowChooseShop }) {
  const { cartTotal, setCartTotal } = useAuth();
  const navi = useNavigate();
  //===============================================分隔線================================================
  //購物車API
  //+
  function addCart(shopSid, productSid) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart) {
      localCart = {};
    }
    if (!localCart.cartList) {
      localCart.cartList = {};
    }
    if (!localCart.cartList[shopSid]) {
      localCart.cartList[shopSid] = {};
      localCart.cartList[shopSid].shopTotal = 0;
    }
    if (!localCart.cartList[shopSid].list) {
      localCart.cartList[shopSid].list = {};
    }
    //本來就有就+1 沒有就設定成1
    localCart.cartList[shopSid].list[productSid]
      ? localCart.cartList[shopSid].list[productSid]++
      : (localCart.cartList[shopSid].list[productSid] = 1);
    localCart.cartList[shopSid].shopTotal++;

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    setCartTotal(countCartTotal)
    //放回去
    localCart.cartTotal = countCartTotal;
    localStorage.setItem('cart', JSON.stringify(localCart));
  }
  //-
  function reduceCart(shopSid, productSid) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (
      !localCart ||
      !localCart.cartList ||
      !localCart.cartList[shopSid] ||
      !localCart.cartList[shopSid].list ||
      !localCart.cartList[shopSid].list[productSid]
    ) {
      return;
    }
    //判斷現在幾個
    if (localCart.cartList[shopSid].list[productSid] > 1) {
      localCart.cartList[shopSid].list[productSid]--;
    } else if (localCart.cartList[shopSid].list[productSid] === 1) {
      delete localCart.cartList[shopSid].list[productSid];
    }
    //如果是最後一個則清除 不然只-1
    localCart.cartList[shopSid].shopTotal === 1
      ? delete localCart.cartList[shopSid]
      : localCart.cartList[shopSid].shopTotal--;

    //總數重新計算
    let countCartTotal = 0;
    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    setCartTotal(countCartTotal)
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
    } else {
      localCart.cartTotal = countCartTotal;
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
  }
  //===============================================分隔線================================================
  //產品資料
  const [prouducts, setProducts] = useState({});
  //店家名稱 現在沒有店名先用SID代替
  const [shopName, setShopName] = useState('');
  //店家名稱 現在沒有店名先用SID代替
  const [shopSid, setShopSid] = useState('');
  //總金額 現在先用總數代替
  const [totalPrice, setTotalPrice] = useState(0);

  function emptyCheck(totalPrice) {
    if (!totalPrice) {
      setShowCart(false);
      setShowChooseShop(true);
    }
  }

  //取得儲存的購物車資料
  function getShopData(what) {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const shopSid = cartData.choosedSid;
    if (what === 'sid') {
      return shopSid;
    }
    const shopData = cartData.cartList[shopSid];
    return shopData;
  }

  useEffect(() => {
    //一開始先抓購物車裡面的資料出來顯示
    //現在沒有店名先用SID代替
    setShopName(getShopData('sid'));
    setShopSid(getShopData('sid'));
    setProducts(getShopData().list);
    setTotalPrice(getShopData().shopTotal);
  }, []);

  // console.log(prouducts)
  return (
    <div className="cart">
      <h2
        onClick={() => {
          setShowCart(false);
          setShowChooseShop(true);
        }}
      >
        返回選取店家
      </h2>
      <h3>店名{shopName}</h3>
      <div>
        {Object.keys(prouducts).map((key, index) => {
          return (
            <div key={key} className="cartList">
              <p>商品SID:{key}</p>
              <button
                onClick={() => {
                  addCart(shopSid, key);
                  setProducts(getShopData().list);
                  setTotalPrice(getShopData().shopTotal);
                }}
              >
                +
              </button>
              <p>數量:{prouducts[key]}</p>
              <button
                onClick={() => {
                  reduceCart(shopSid, key);
                  setProducts(getShopData().list);
                  setTotalPrice(getShopData().shopTotal);
                  emptyCheck(totalPrice - 1);
                  // TODO 這裡要加入判斷式 如果變0要提醒並關掉這頁
                }}
              >
                -
              </button>
            </div>
          );
        })}
      </div>
      <h3>總數:{totalPrice}</h3>
      <div
        onClick={() => {
          navi('/Pay');
          setShowCart(false);
          setShowChooseShop(false);
        }}
      >
        前往結帳
      </div>
    </div>
  );
}
export default Cart;
