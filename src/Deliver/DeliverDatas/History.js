import { useState } from 'react';
import axios from 'axios';
import dayjs from "dayjs"

function History({
  order_sid,
  deliver_order_sid,
  deliver_fee,
  name,
  deliver_check_time,
  shopname,
  address,
  deliver_take_time,
  complete_time,
}) {
  const [btn, setBtn] = useState(false);
  const [food, setFood] = useState([]);
  // const day = 

  async function foodmeun() {
    const repon = await axios.get(`http://localhost:3001/foodmeun/${order_sid}`);
    setFood(repon.data);
  }

  return (
    <li className="Dhistorylist">
      <div className="Dhistoryitem">
        <div className="Dfristcontext">
          <i
            className={
              btn ? 'fa-solid fa-angle-down' : 'fa-solid fa-angle-right'
            }
            onClick={() => {
              setBtn(!btn);
              foodmeun();
            }}
          ></i>
          <p>{deliver_order_sid}</p>
        </div>
        <div className="Dsecondtext">
          <p>外送費</p>
          <p>{deliver_fee}</p>
        </div>
        <div className="Dsecondtext">
          <p>客戶</p>
          <p>{name}</p>
        </div>
        <p>{dayjs(deliver_check_time).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div>
        {btn && (
          <div className="Dhistorydetail">
            <div className="Ddetaillist">
              <div className="Ddetailcontext">
                <div>
                  <i className="fa-solid fa-store Dicon"></i>
                </div>
                <div>
                  <p>{shopname}</p>
                  <p>{address}</p>
                </div>
              </div>
              <div>
                <p>接單時間&nbsp;&nbsp;&nbsp;{dayjs(deliver_take_time).format('HH:mm')}</p>
                <p>取餐時間&nbsp;&nbsp;&nbsp;{dayjs(complete_time).format('HH:mm')}</p>
              </div>
            </div>
            <div className="Dfoodmeun">
              <p className="Dfoodtop">餐點內容</p>
              <ul>
                {food.map((val)=>{
                    return(
                        <li className="Dfoodcontext">
                            <p>{val.amount}X {val.name}</p>
                            <p>{val.price}</p>
                        </li>
                    )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

export default History;
