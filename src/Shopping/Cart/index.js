//購物車頁面
import { useEffect, useState } from 'react';
import '../Cart.css';
import { useNavigate } from 'react-router-dom';
import { usePay } from '../../Context/PayPageContext';

function Cart({ setShowCart, setShowChooseShop }) {
  const { cartTotal, setCartTotal } = usePay();

  const navi = useNavigate();
  const selectOptions = new Array(31).fill(1);
  //===============================================分隔線================================================
  //購物車下拉式API 已經有資料
  function editCartBySelect(shopSid, productSid, amount) {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    //選擇不是0就設定數量
    if (amount > 0) {
      localCart.cartList[shopSid].list[productSid].amount = amount;
    } else {
      delete localCart.cartList[shopSid].list[productSid];
    }

    //店家總金額
    let shopPriceTotal = 0;
    let shopAmountTotal = 0;
    for (let element in localCart.cartList[shopSid].list) {
      if (element) {
        shopAmountTotal += Number(
          localCart.cartList[shopSid].list[element].amount
        );
        const dividedProduct = localCart.cartList[shopSid].list[element];
        // console.log(shopPriceTotal);
        // console.log(localCart.cartList[shopSid].list[element]);
        shopPriceTotal +=
          Number(dividedProduct.cuttedPrice) * Number(dividedProduct.amount);
      }
    }

    setTotalPrice(shopPriceTotal);

    localCart.cartList[shopSid].shopPriceTotal = shopPriceTotal;
    localCart.cartList[shopSid].shopTotal = shopAmountTotal;

    //總數重新計算
    let countCartTotal = 0;

    for (let element in localCart.cartList) {
      if (element) {
        countCartTotal += localCart.cartList[element].shopTotal;
      }
    }
    setCartTotal(countCartTotal);
    //如果歸零直接刪除
    if (countCartTotal === 0) {
      localStorage.removeItem('cart');
    } else {
      localCart.cartTotal = countCartTotal;
      // localStorage.removeItem("cart");
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
    console.log(localCart);
    if (shopPriceTotal === 0) {
      setShowChooseShop(true);
      setShowCart(false);
      delete localCart.cartList[shopSid];
    }
    if (countCartTotal === 0) {
      setShowChooseShop(false);
      setShowCart(false);
    }
    setProducts(localCart.cartList[shopSid].list);
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
  //備註
  const [memos, setMemos] = useState(false);

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
    setShopName(getShopData().shopName);
    setShopSid(getShopData('sid'));
    setProducts(getShopData().list);
    setTotalPrice(getShopData().shopPriceTotal);
  }, []);

  // console.log(prouducts)
  return (
    <div className="cartFrame ">
      <div className="chooseCart">
        <div className="w100p disf jc-sb ">
          <i
            onClick={() => {
              setShowCart(false);
              setShowChooseShop(true);
            }}
            className="fa-solid fa-circle-chevron-left cartX pointer"
          ></i>
          <i
            onClick={() => {
              setShowCart(false);
              setShowChooseShop(false);
            }}
            className="fa-solid fa-circle-xmark pointer cartX"
          ></i>
        </div>
        <h3 className="chooseCartH3">{shopName}</h3>
        <div>
          {Object.keys(prouducts).map((key, index) => {
            const cutBefore = prouducts[key].price * prouducts[key].amount;
            const cutAfter = prouducts[key].cuttedPrice * prouducts[key].amount;

            return (
              <div
                onClick={(e) => {
                  console.log(e.target.name);
                  if (!e.target.name) {
                    console.log(123);
                  }
                }}
                key={key}
                className="cartShopList"
              >
                <div>
                  {/* prouducts[key].amount數量 */}
                  {/* prouducts[key].name */}
                  {/* prouducts[key].cuttedPrice */}
                  {/* prouducts[key].details */}
                  <select
                    name="selects"
                    value={prouducts[key].amount}
                    onChange={(e) => {
                      editCartBySelect(shopSid, key, e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {selectOptions.map((v, i) => {
                      return (
                        <option key={i} value={i}>
                          {i === 0 ? '清除' : i}
                        </option>
                      );
                    })}
                  </select>

                  {/* <i
                    onClick={() => {
                      addCart(shopSid, key);
                      setProducts(getShopData().list);
                      setTotalPrice(getShopData().shopTotal);
                    }}
                    className="fa-solid fa-circle-plus"
                  ></i>
                </div>
                <p>數量:{prouducts[key]}</p>
                <div>
                  <i
                    onClick={() => {
                      reduceCart(shopSid, key);
                      setProducts(getShopData().list);
                      setTotalPrice(getShopData().shopTotal);
                      emptyCheck(totalPrice - 1);
                      // TODO 這裡要加入判斷式 如果變0要提醒並關掉這頁
                    }}
                    className="fa-solid fa-circle-minus"
                  ></i> */}
                </div>

                <p>{prouducts[key].name}</p>
                {/* 價格 */}
                <div>
                  <p className="chooseCartPrice">
                    {prouducts[key].cuttedPrice * prouducts[key].amount}
                  </p>
                  {/* 折價前後是否相等 */}
                  {cutBefore === cutAfter ? (
                    <></>
                  ) : (
                    <p className="chooseCartPrice cuttedPrice">
                      {prouducts[key].price * prouducts[key].amount}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {}}
          className="bgcGray pointer ai-c disf jc-sb padH20 padV20"
        >
          <p>
            <span className="fw7 fs24">新增訂單備註</span>
            <br />
            <span className="lh36"> 餐具、特殊指示等</span>
          </p>
          <p>
            <i className="fs36 fa-solid fa-plus"></i>
          </p>
        </div>
        <div
          className="goPayButoon"
          onClick={() => {
            navi('/Pay');
            setShowCart(false);
            setShowChooseShop(false);
          }}
        >
          前往結帳．${totalPrice}
        </div>
      </div>
    </div>
  );
}
export default Cart;
