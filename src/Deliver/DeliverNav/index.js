import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import Menu from './Menu';
const siteName = window.location.hostname;
//確認登入資訊
function fetchLoginCheck(setfunc) {
  fetch(`http://${siteName}:3001/LoginCheck/Deliver`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Deliver'),
    },
  })
    .then((r) => r.json())
    .then((res) => {
      // console.log({ res });
      if (res === 1) {
        setfunc(true);
      } else {
        setfunc(false);
      }
      //收到1代表有登入
      //收到0代表沒登入
    });
}
//獲得會員名
function getName(setMemberName) {
  const settedName = localStorage.getItem('DeliverName');
  if (!!settedName) {
    setMemberName(settedName);
  }
}
function DeliverNav() {
  const navi = useNavigate();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);

  const { authDeliver, setAuthDeliver } = useAuth();
  //登入的會員名
  const [memberName, setMemberName] = useState('');

  useEffect(() => {
    fetchLoginCheck(setAuthDeliver);
  }, []);

  useEffect(() => {
    getName(setMemberName);
  }, [authDeliver]);
  return (
    <>
      <nav className="deliverNav">
        <div
          // 目錄按鈕(三橫線)
          onClick={() => {
            setToggle(!toggle);
          }}
          className="menubtn"
        >
          <div
            className={`menubtn_bar menubtn_bar_01 ${toggle ? 'changed' : ''}`}
          ></div>
          <div
            className={`menubtn_bar menubtn_bar_02 ${toggle ? 'changed' : ''}`}
          ></div>
          <div
            className={`menubtn_bar menubtn_bar_03 ${toggle ? 'changed' : ''}`}
          ></div>
        </div>

        {/* 名稱顯示 暫放 */}
        <p>會員名稱:{memberName}</p>
        <p
          className="logCheck"
          onClick={
            authDeliver
              ? () => {
                  localStorage.removeItem('Deliver');
                  localStorage.removeItem('DeliverName');
                  setMemberName('');
                  setAuthDeliver(!authDeliver);
                }
              : () => {
                  navi('/Deliver/DeliverLogin ');
                  // setDisplayIndex(0);
                }
          }
        >
          {authDeliver ? '登出' : '登入'}
        </p>
      </nav>
      {toggle ? <Menu setToggle={setToggle} toggle={toggle} /> : <></>}
    </>
  );
}
export default DeliverNav;
