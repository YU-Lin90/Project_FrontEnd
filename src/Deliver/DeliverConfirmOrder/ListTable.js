import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListTable({ name, address, shop_sid, member_sid,  order_sid}) {
  const [btn, setBtn] = useState(false);
  const [toggle, setToggle] = useState(false);

  const navi = useNavigate();

  return (
    <>
      <li className="Doldeitem">
        <div className="Dinfo">
          <i
            className={btn ? "fa-solid fa-angle-down" : "fa-solid fa-angle-right"}
            onClick={() => {
              setBtn(!btn);
            }}
          ></i>
          <p>製作時間{}</p>
          <p>距離{}</p>
          {/* ----------------------接單按鈕----------------------- */}
          <button
            className={toggle ? "Dbtn Dactive" : "Dbtn"}
            disabled={toggle}
            onClick={() => {
              if (localStorage.getItem('onlie_state')) {     //判斷是否登入(localStorage) 
                const argee = window.confirm('確定接單嗎？');
                if (argee) {
                  setToggle(!toggle);
                  
                  // const member = 1;  //不用特別寫
                  // const shop_sid = {}; //不用特別寫
                  const deliver_sid = Number(localStorage.getItem('deliver_sid'));
                  const deliver_order_sid = "3" + Number(new Date());  
                  const store_order_sid = 1;  //店家訂單sid應概是店家產生(再研究)
                  // const order_sid = order_sid;  //會員訂單sid在shop_order.order_sid抓出來就不用再寫了
                  const deliver_memo = 'apple2';  //外送員備註(再研究)
                  const order_finish = 0;     //自動生成0即可
                  const deliver_fee = 50;     //外送費(再研究)
                  const ordernum = {deliver_order_sid, member_sid, shop_sid, deliver_sid, store_order_sid, order_sid, order_finish, deliver_fee, deliver_memo}
                  // console.log(ordernum);
                  localStorage.setItem('order_sid', JSON.stringify(order_sid));
                  localStorage.setItem('deliver_order_sid', JSON.stringify(deliver_order_sid));
                  axios.post('http://localhost:3001/sendOrder', ordernum)
                  .then(r => r.json);
                  navi('/Deliver/DeliverOrder');   //還要修正按鈕按下時其他都不能按
                }
              } else {
                alert('你尚未登入'); //導入到登入畫面
                navi('/Deliver/DeliverLogin');
              }
            }}
          >
            {toggle ? '已接單' : '接單'}
          </button>
          {/* ----------------------------------------------------- */}
        </div>
        {btn &&<div className="Dshopmore">
        <i className="fa-solid fa-store Dicon"></i>
        <div>
          <p>{name}</p>
          <p>{address}</p>
        </div>
        </div>}
      </li>
    </>
  );
}

export default ListTable;
