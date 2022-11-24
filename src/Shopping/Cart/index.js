//購物車頁面
import { useEffect, useState } from 'react';
import '../Cart.css';
import { useNavigate } from 'react-router-dom';
import { usePay } from '../../Context/PayPageContext';
import { useCart } from '../../Context/CartProvider';
function Cart({ setShowCart, setShowChooseShop }) {
  const { editCartBySelect } = useCart();
  const navi = useNavigate();
  const selectOptions = new Array(31).fill(1);
  //===============================================分隔線================================================
  //產品資料
  const [prouducts, setProducts] = useState({});
  //購物車內容
  const { cartContents, chooseedPayShop } = usePay();

  //清空檢查
  function emptyCheck(totalPrice) {
    if (!totalPrice) {
      setShowCart(false);
      setShowChooseShop(true);
    }
  }

  useEffect(() => {
    //一開始先抓全域狀態資料出來顯示
    setProducts(cartContents.cartList[chooseedPayShop].list);
  }, [cartContents]);
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
        <h3 className="chooseCartH3">
          {cartContents.cartList[chooseedPayShop].shopName}
        </h3>
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
                      //下拉式選單函式
                      editCartBySelect(
                        chooseedPayShop,
                        key,
                        e.target.value,
                        setShowCart,
                        setShowChooseShop
                      );
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
                  {/* TODO 這裡要加入判斷式 如果變0要提醒並關掉這頁 */}
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
          前往結帳．${cartContents.cartList[chooseedPayShop].shopPriceTotal}
        </div>
        <div className="w100p h200 bigHidden"></div>
      </div>
    </div>
  );
}
export default Cart;
