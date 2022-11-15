//訂單第一層
import { useEffect, useState } from 'react';
import './StoreOrder.css';
import StoreOrderDetails from './StoreOrderDetails';
const siteName = window.location.hostname;
const fetchList = ['checkDisConfirm'];
// const fetchList = ['checkDisConfirm', 'checkConfirmed', 'checkCompleted'];

function StoreOrder() {
  const [page, setPage] = useState(0);
  const options = [
    { name: '未確認', index: 0 },
    { name: '已接受', index: 1 },
    { name: '未取餐', index: 2 },
  ];
  function getData() {
    fetch(`http://${siteName}:3001/StoreOrders/checkDisConfirm`, {
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
      });
  }
  useEffect(() => {
    // getData();
  }, []);

  // TODO: 之後要在這裡加上偵測訂單
  return (
    <div>
      <div className="orderOptions">
        <div className="disf gap10">
          {options.map((v, i) => {
            return (
              <div
                key={v.index}
                onClick={() => {
                  setPage(v.index);
                }}
                className={`pointer storeOrderSwith ${
                  page === v.index ? 'active' : ''
                }`}
              >
                {v.name}
              </div>
            );
          })}
        </div>
        <div className="storeTimes">
          <span>
            <i className="fa-regular fa-circle-check"></i>今日完成
          </span>
          <span>
            <i className="fa-regular fa-clock"></i>設定等待時間
          </span>
        </div>
      </div>
      <StoreOrderDetails page={page} fetchName={fetchList[page]} />
    </div>
  );
}
export default StoreOrder;
