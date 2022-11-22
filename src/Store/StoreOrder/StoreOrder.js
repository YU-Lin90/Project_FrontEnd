//訂單第一層
import { useEffect, useState } from 'react';
import './StoreOrder.css';
import StoreOrderDetails from './StoreOrderDetails';
import StoreOrderConfirm from './StoreOrderConfirm';
import StoreSetWaitTime from './StoreSetWaitTime';
const siteName = window.location.hostname;
const fetchList = ['checkDisConfirm', 'checkConfirmed', 'checkCompleted'];

function StoreOrder({ orderSocket }) {
  //現在顯示哪種內容
  const [page, setPage] = useState(0);
  //顯示的訂單內容
  const [datas, setDatas] = useState([]);
  //開啟確認訂單/完成訂單燈箱
  const [openDetail, setOpenDetail] = useState(false);
  //選定的訂單SID
  const [choosedOrderSid, setChoosedOrderSid] = useState(0);
  //設定等待時間
  const [chageTime, setChangeTime] = useState(false);

  const options = [
    { name: '未確認', index: 0 },
    { name: '已接受', index: 1 },
    { name: '未取餐', index: 2 },
  ];

  const scrollTop = (value) => {
    if (value !== page) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    }
  };
  //獲得訂單資訊
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

  //===============================================分隔線================================================
  useEffect(() => {
    getData();
  }, [page]);
  //===============================================分隔線================================================

  // TODO: 之後要在這裡加上偵測訂單
  return (
    <div>
      {/* <OrderSocket /> */}
      <div className="orderOptions">
        <div className="disf gap10">
          {options.map((v, i) => {
            return (
              <div
                key={v.index}
                onClick={() => {
                  scrollTop(v.index);
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
              // setOrder(2, 1);
              // completeOrder(2);
            }}
          >
            <i className="fa-regular fa-circle-check"></i>今日完成
          </span>
          <span
            onClick={() => {
              setChangeTime(true);
            }}
          >
            <i className="fa-regular fa-clock"></i>設定等待時間
          </span>
        </div>
      </div>
      <StoreOrderDetails
        setOpenDetail={setOpenDetail}
        datas={datas}
        page={page}
        setChoosedOrderSid={setChoosedOrderSid}
        // fetchName={fetchList[page]}
      />
      {openDetail ? (
        <StoreOrderConfirm
          setOpenDetail={setOpenDetail}
          page={page}
          choosedOrderSid={choosedOrderSid}
          setPage={setPage}
          orderSocket={orderSocket}
        />
      ) : null}
      {chageTime ? <StoreSetWaitTime setChangeTime={setChangeTime} /> : null}
    </div>
  );
}
export default StoreOrder;