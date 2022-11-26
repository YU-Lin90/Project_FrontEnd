import { useState, useEffect } from 'react';
import axios from 'axios';
import './card.css';
import Moment from 'react-moment';
function MemberCoupon() {
  const [user, setUser] = useState([]);
  const getform = async () => {
    const sid = localStorage.getItem('MemberSid');
    try {
      const response = await axios.get(
        `http://localhost:3001/MemberLogin/api5/${sid}`
      );

      console.log(localStorage.getItem('MemberSid'));
      console.log(response.data);
      // console.log(response.data[0].name);
      // setUser(response.data[0]);
      // const image = response.data[0].image;
      // console.log(image);
      setUser(response.data);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    getform();
  }, []);

  const display = user.map((v, i) => {
    return (
      <div className="col" key={v.sid}>
        <div className="card">
          <p>優惠券名稱{v.coupon_name}</p>
          <p>折扣金額{v.sale_detail}</p>
          <p>優惠券使用限制{v.use_range}</p>
          <p>
            使用期限<Moment format="YYYY/MM/DD">{v.expire}</Moment>
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <button onClick={getform}>按鈕</button>
      <div className="con"> {display}</div>
    </>
  );
}
export default MemberCoupon;
