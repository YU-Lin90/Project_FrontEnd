import { useEffect, useState } from 'react';
import './Member_Point.css';
const reasons = ['兌換優惠券', '消費獲得'];
const siteName = window.location.hostname;
function MemberPoint() {
  const [productData, setproductData] = useState([
    {
      coupon_sid: 0,
      point_amount: 0,
      point_change_time: null,
      point_change_method: 0,
      coupon_name: '',
    },
  ]);
  function getData() {
    fetch(`http://${siteName}:3001/MemberPointApi`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        //從本機儲存空間拿出資料掛在HEADER傳到後端
        Authorization: 'Bearer ' + localStorage.getItem('Member'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        // console.log(res);
        setproductData(res);
      });
  }
  useEffect(() => {
    getData();
    // LoginCheck(1, '/', null, getData);
  }, []);
  // getData()
  return (
    <>
      <div>
        {' '}
        <table className="memberPointTable">
          <thead>
            <tr key={0}>
              <th className="points">異動點數</th>
              <th className="points">異動時間</th>
              <th className="points">異動原因</th>
              <th className="points">優惠券名稱</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((value, i) => {
              const {
                coupon_sid,
                point_amount,
                point_change_time,
                point_change_method,
                coupon_name,
              } = value;
              return (
                <tr key={i + 1}>
                  <td className="points">{point_amount}</td>
                  <td className="points">{point_change_time}</td>
                  <td className="points">{reasons[point_change_method]}</td>
                  <td className="points">{coupon_name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="h200 w100p bigHidden"></div>
      </div>
    </>
  );
}
export default MemberPoint;
