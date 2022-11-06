import { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
// import { Link } from 'react-router-dom';
const siteName = window.location.hostname;

//獲得會員名
function getName(setStoreName) {
  const settedName = localStorage.getItem('StoreName');
  if (!!settedName) {
    setStoreName(settedName);
  }
}
function StoreNav() {
  const navi = useNavigate();

  const { authStore, setAuthStore } = useAuth();
  //登入的會員名
  const [storeName, setStoreName] = useState('');
  //確認登入資訊
  function fetchLoginCheck(setfunc) {
    fetch(`http://${siteName}:3001/LoginCheck/Store`, {
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
        if (res === 1) {
          setfunc(true);
        } else {
          setfunc(false);
        }
        //收到1代表有登入
        //收到0代表沒登入
      });
  }

  useEffect(() => {
    fetchLoginCheck(setAuthStore);
  });

  useEffect(() => {
    getName(setStoreName);
  }, [authStore]);
  return (
    <>
      <nav className="storeNav">
        <div className="disf">
          連結
          <p
            onClick={() => {
              navi('/Store');
            }}
          >
            店家首頁
          </p>
        </div>
        {/* 名稱顯示 暫放 */}
        <p>店家名稱:{storeName}</p>
        <p
          className="logCheck"
          onClick={
            authStore
              ? () => {
                  localStorage.removeItem('Store');
                  localStorage.removeItem('StoreName');
                  setStoreName('');
                  setAuthStore(!authStore);
                }
              : () => {
                  navi('/Store/StoreLogin');
                }
          }
        >
          {authStore ? '登出' : '登入'}
        </p>
      </nav>
    </>
  );
}
export default StoreNav;
