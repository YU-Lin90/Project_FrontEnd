//訂單第二層
import { useEffect, useState } from 'react';
import OrderDetailsCard from '../OrderDetailsCard';
const siteName = window.location.hostname;
function StoreOrderDetails({ fetchName = 'checkDisConfirm', page }) {
  const [showDatas, setShowDatas] = useState([]);
  function getData() {
    fetch(`http://${siteName}:3001/StoreOrders/${fetchName}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
        setShowDatas(res);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w100p disf fw-w ">
      {/* {fetchName} */}
      {showDatas.map((v, i) => {
        return <OrderDetailsCard page={page} datas={v} key={v.sid} />;
      })}
    </div>
  );
}
export default StoreOrderDetails;
