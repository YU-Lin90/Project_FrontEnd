import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';

function DeliverOrder() {
  const navi = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [total, setTotal] = useState([]);
  const ordersid = localStorage.getItem('order_sid');

  async function getOrder() {
    const response = await axios.get(
      `http://localhost:3001/deliver/deliverorder/${ordersid}`
    );
    setOrderData(response.data.rows);
    setFoodData(response.data.food);
    setTotal(response.data.total);
    console.log(response.data);
  }

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <div className="Dttcontext">
        <div className="Dtopcontext">
          <p>取餐資訊</p>
          <p>{}</p>
        </div>
        {orderData.map((ddate, i) => {
          return (
            <div className="Dinfo1" key={i}>
              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-regular fa-user"></i>
                  </div>
                  <div>
                    <p>{ddate.name}</p>
                    <p className="Dcontext">客戶地址</p>
                  </div>
                </div>
              </div>
              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-store"></i>
                  </div>
                  <div>
                    <p>{ddate.shopname}</p>
                    <p className="Dcontext">{ddate.address}</p>
                  </div>
                </div>
                <i className="Dsimgicon fa-solid fa-phone-flip"></i>
              </div>

              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-utensils"></i>
                  </div>
                  <div>
                    {foodData.map((v, i) => {
                      return (
                        <p key={i}>
                          {v.amount}X {v.name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div>
                  {foodData.map((v, i) => {
                    return <p key={i}>{v.product_price}</p>; //這有問題之後處理
                  })}
                </div>
              </div>

              <div className="Dinfodata">
                <div className="Dinfotext">
                  <div className="Dicon">
                    <i className="Dimgicon fa-solid fa-box-archive"></i>
                  </div>
                  <div>
                    <p>備註</p>
                    <p className="Dcontext">{ddate.deliver_memo}</p>
                  </div>
                </div>
              </div>
              <div className="Dinfodata">
                <button
                  className="Dbbtn"
                  onClick={() => {
                    navi('/Deliver/DeliverMap'); //還要修正按鈕
                  }}
                >
                  前往地圖
                </button>
              </div>
              <div className="Dfooter">
                {total.map((v, i) => {
                  return <p key={i}>總計金額：{v.total}</p>;
                })}
                <p>外送費用：{ddate.deliver_fee}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default DeliverOrder;
