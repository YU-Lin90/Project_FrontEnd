import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function ListTable({ cook_time, member_sid, shop_sid, sid, name, address, order_sid, deliver_memo, deliver_fee}) {
  const [btn, setBtn] = useState(false);
  const [delivertake, setDelivertake] = useState(true);
  // const [dosid, setDosid] = useState([]);

  const navi = useNavigate();
  /* -----------後端動作--------------------- */
  async function sqlactive(){
    const deliver_sid = Number(localStorage.getItem('deliver_sid'));
    const order_finish = 0;     //自動生成0即可
    const ordernum = { member_sid, shop_sid, deliver_sid, sid, order_sid, deliver_memo, order_finish, deliver_fee}
    const res = await axios.post('http://localhost:3001/deliver/sendOrder', ordernum);
    localStorage.setItem('order_sid', JSON.stringify(order_sid));
    await localStorage.setItem('deliver_order_sid', JSON.stringify(res.data[0].deliver_order_sid));
  }
  /* --------------------------------------- */
  /* ---------------彈跳視窗----------------- */
  function chceklogin(){
    if(localStorage.getItem('onlie_state')){
      Swal.fire({
        title: '確定接單嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:'謝謝你的辛苦',}
          ).then((result)=>{
            navi('/Deliver/DeliverOrder')
          })
          sqlactive()
          take()
        }
      })
    }else{    //
      Swal.fire({
        icon: 'error',                  
        text: '你尚未登入!',
      })
      navi('/Deliver/DeliverLogin'); //導入到登入畫面
    }
  }
  /* -------------------------------- */
  /* ------------接單後禁止在點取-------------- */
  function take(){
    const addtake = JSON.parse(localStorage.getItem('delivertake'));
    setDelivertake(addtake)
  }
  
  useEffect(()=>{
    take();
  },[])
  /* -------------------------------- */

  return (
    <>
      <li className="Doldeitem">
        <div className="Dinfo">
          {/* ------------------------下拉式店家按鈕------------------ */}
          <div className='DDown'
            onClick={() => setBtn(!btn)}
          >
            <i className={btn ? "fa-solid fa-angle-down" : "fa-solid fa-angle-right"}></i>
          </div>
          {/* ----------------------------------------------------- */}
          <div className='Dcook'>
            <p className='Dcooktitle'>製作時間</p>
            <p className='Dcooktext'>{cook_time+"min"}</p>
          </div>
          
          <div className='Dcook'>
            <p className='Dcooktitle'>距離</p>
            <p className='Dcooktext'>{}</p>    {/* 未完成 */}
          </div>
          {/* ----------------------接單按鈕----------------------- */}
          <button
            className={delivertake ? "Dbtn" : "Dbtn Dactive"}
            disabled={delivertake ? false : true} 
            onClick={()=>{
              chceklogin()
              localStorage.setItem('delivertake',false);
            }}
          >
            接單
          </button>
          {/* ----------------------------------------------------- */}
        </div>
        {/* --------------------下拉式店家資訊----------------------- */}
        {btn &&<div className="Dshopmore">
        <i className="fa-solid fa-store Dicon"></i>
        <div>
          <p>{name}</p>
          <p>{address}</p>
        </div>
        </div>}
        {/* ----------------------------------------------------- */}
      </li>
    </>
  );
}

export default ListTable;
