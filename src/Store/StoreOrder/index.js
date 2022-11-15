//訂單第一層
import { useEffect, useState } from 'react';
import './StoreOrder.css';
import StoreOrderDetails from './StoreOrderDetails';
const siteName = window.location.hostname;
const fetchList = ['checkDisConfirm', 'checkConfirmed', 'checkCompleted'];

function StoreOrder() {
  const [page, setPage] = useState(0);
  const [datas, setDatas] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const options = [
    { name: '未確認', index: 0 },
    { name: '已接受', index: 1 },
    { name: '未取餐', index: 2 },
  ];
  //接單API 之後往下放
  function setOrder(orderSid, member_sid) {
    const postData = JSON.stringify({ sid: orderSid, member_sid: member_sid });
    fetch(`http://${siteName}:3001/StoreConfirmOrders/confirm`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
      });
  }
  function completeOrder(storeOrderSid) {
    const postData = JSON.stringify({ storeOrderSid: storeOrderSid });
    fetch(`http://${siteName}:3001/StoreConfirmOrders/CompleteOrder`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('Store'),
      },
      body: postData,
    })
      .then((r) => r.json())
      .then((res) => {
        console.log({ res });
      });
  }

  function getData() {
    fetch(`http://${siteName}:3001/StoreOrders/${fetchList[page]}`, {
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
        setDatas(res);
        // setShowDatas(res);
      });
  }
  // function getData() {
  //   fetch(`http://${siteName}:3001/StoreOrders/checkDisConfirm`, {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('Store'),
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((res) => {
  //       console.log({ res });
  //     });
  // }
  useEffect(() => {
    getData();
  }, [page]);

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
          <span
            onClick={() => {
              // setOrder(1, 1);
              completeOrder(3);
            }}
          >
            <i className="fa-regular fa-circle-check"></i>今日完成
          </span>
          <span>
            <i className="fa-regular fa-clock"></i>設定等待時間
          </span>
        </div>
      </div>
      <StoreOrderDetails
        setOpenDetail={setOpenDetail}
        datas={datas}
        page={page}
        // fetchName={fetchList[page]}
      />
    </div>
  );
}
export default StoreOrder;
