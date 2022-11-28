import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import './coupon.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
function Coupon() {
  const [user, setUser] = useState([]);
  const [user2, setUser2] = useState([]);
  const [user3, setUser3] = useState([]);
  const [text, setText] = useState([]);
  const forms = useRef(null);
  const forms2 = useRef(null);
  const forms3 = useRef(null);
  const navigate = useNavigate();
  function calcu(a, b) {
    const result = {
      hit: [],
      miss: [],
    };
    for (let i = 0; i < b.length; i++) {
      let hit = false;
      for (let j = 0; j < a.length; j++) {
        if (b[i].sid === a[j].coupon_sid) {
          hit = true;
          j = a.length;
        }
      }
      if (hit === true) {
        result.hit.push(b[i]);
      } else {
        result.miss.push(b[i]);
      }
    }

    return result;
  }
  const getform = async () => {
    const sid = localStorage.getItem('MemberSid');
    if (!sid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入會員',
      });
      navigate('/MemberLogin');
    } else {
      try {
        const res = await axios.get(
          `http://localhost:3001/MemberCouponGetRenderApi/${sid}`
        );
        console.log(res.data);
        console.log(res.data.coupons);
        console.log(res.data.check);
        console.log(res.data.point);
        const a = res.data.check;
        const b = res.data.coupons;
        calcu(a, b);
        const result = calcu(a, b);
        console.log(result);
        console.log(result.hit);
        console.log(result.miss);
        setUser(result.miss);
        setText(Array(result.miss.length).fill(''));
        console.log(text);
        setUser2(result.hit);
        setUser3(res.data.point);
      } catch (e) {
        console.error(e.message);
      }
    }
  };
  const get = async () => {
    if (user3 < 0) {
      Swal.fire({ icon: 'warning', title: '點數不足' });
    }
    if (forms2.current.value > user3) {
      Swal.fire({ icon: 'warning', title: '點數不足' });
    } else {
      setText(!text);
      // e.preventDefault();
      console.log(forms.current.value);
      const sid = localStorage.getItem('MemberSid');
      let FD = JSON.stringify({
        coupon_sid: forms.current.value,
        use_point: forms2.current.value,
        expire: forms3.current.value,
      });

      await fetch(`http://localhost:3001/MemberCouponGetApi/${sid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: FD,
      })
        .then((r) => r.json())
        .then((res) => {
          if (res === 1) {
            Swal.fire('領取成功');
            console.log(res);
          } else {
            Swal.fire('領取失敗');
            console.log(res);
          }
        });
    }
  };
  useEffect(() => {
    getform();
  }, []);
  const display = user.map((v, i) => {
    return (
      <div className="sc_col" key={v.sid}>
        <div className="sc_card">
          <div className="sc_total">
            <p>{v.sale_detail}元</p>
          </div>

          <div className="sc_sale_detail">
            <p>優惠券名稱:{v.coupon_name}</p>
            <p>{v.name}</p>
            <p>需要點數:{v.need_point}</p>
            <p>
              使用期限:<Moment format="YYYY/MM/DD">{v.expire}</Moment>
            </p>
          </div>
          <form
            onSubmit={() => {
              get();
              const a = [...text];
              if (a[i] === '') {
                a[i] = 'disabled';
                setText(a);
                // alert('領取成功');
              } else {
                a[i] = '';
                setText(a);
              }
            }}
          >
            <input
              type="hidden"
              name="coupon_sid"
              value={v.sid}
              ref={forms}
            ></input>
            <input
              type="hidden"
              name="need_point"
              value={v.need_point}
              ref={forms2}
            ></input>
            <input
              type="hidden"
              name="expire"
              value={v.expire}
              ref={forms3}
            ></input>
            <div className="sc_buttonbox">
              <button className="sc_button" onClick={get}>
                <p className="sc_buttonfont">領</p>
                <p className="sc_buttonfont">取</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  });
  const display2 = user2.map((v, i) => {
    return (
      <div className="sc_col" key={v.sid}>
        <div className="sc_card2">
          <div className="sc_total2">
            <p>{v.sale_detail}元</p>
          </div>

          <div className="sc_sale_detail2">
            <p>優惠券名稱:{v.coupon_name}</p>
            <p>{v.name === '管理者' ? '全站通用' : v.name}</p>
            <p>需要點數:{v.need_point}</p>
            <p>
              使用期限:<Moment format="YYYY/MM/DD">{v.expire}</Moment>
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      {/* <button onClick={getform}>按鈕</button> */}
      <h3 className="sc_h3">持有紅利點數:{user3}</h3>
      <div className="sc_wrap"> {display}</div>
      <div className="sc_wrap"> {display2}</div>
    </>
  );
}
export default Coupon;
