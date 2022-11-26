
import { useNavigate, useLocation } from 'react-router-dom';

import './Bottom.css';
function BottomNav() {
  const location = useLocation().pathname;
  const navi = useNavigate();

  const bottomList = [
    { text: '狀態', icon:'fa-solid fa-check', link: '/Deliver/DeliverConfirmOrder' },
    { text: '訂單', icon:'fa-solid fa-list', link: '/Deliver/DeliverOrder' },
    { text: '地圖', icon:'fa-sharp fa-solid fa-map', link: '/Deliver/DeliverMap' },
    { text: '過往紀錄', icon:'fa-regular fa-clock', link: '/Deliver/DeliverDatas' },
    { text: '統計 ', icon:'fa-solid fa-chart-simple', link: '/Deliver/DeliverStatistics' },
  ];

  return (
    <>
      <url className="DBottomNav">
        {bottomList.map((value, index) => {
          return (
            <li
              className={
                //這段無法執行
                location === value.link ? 'Dactive' : ''
              }
              key={index}
              onClick={() => {
                navi(value.link);
                // setToggle(!toggle);
              }}
            >
              <i className={value.icon}></i>
              {value.text}
            </li>
          );
        })}
      </url>
    </>
  );
  
}


export default BottomNav;
