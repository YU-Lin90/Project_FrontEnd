import StoreNav from './StoreNav';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './StoreLayout.css';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import Swal from 'sweetalert2';
import { useFunc } from '../Context/FunctionProvider';
const siteName = window.location.hostname;
//這邊要放NAVBAR
function Store() {
  const { authStore } = useAuth();
  const { loginCheckPostFetch } = useFunc();
  const [localAuth, setLocalAuth] = useState(false);
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '現在訂單', link: '/Store', index: 0 },
    { text: '歷史訂單', link: '/Store/StoreOldOrder', index: 1 },
    { text: '店家資料', link: '/Store/StoreDatas', index: 2 },
    { text: '餐點管理', link: '/Store/StoreTypeEdit', index: 3 },
    { text: '消費分析', link: '/Store/StoreSellAnalyze', index: 4 },
    { text: '客服中心', link: '/Store/StoreService', index: 5 },
  ];
  const loginCheck = async () => {
    const res = await loginCheckPostFetch('LoginCheck/Store', 'Store');
    return res;
  };
  ///LoginCheck/Store
  useEffect(() => {
    const checkFirst = loginCheck();
    if (checkFirst) {
      setLocalAuth(true);
    } else {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
      });
      navi('/Store/StoreLogin');
    }
  }, []);
  useEffect(() => {
    if (localAuth && !authStore && location !== '/Store/StoreLogin') {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
      });
      navi('/Store/StoreLogin');
    }
  }, [location]);
  return (
    <>
      <StoreNav />
      <div className="container">
        <div className="storeCenter">
          <div className="storeCenterList">
            {menuList.map((value, index) => {
              return (
                <p
                  className={`pointer  ${
                    value.link === location ? 'active' : ''
                  }`}
                  key={index}
                  onClick={() => {
                    navi(value.link);
                  }}
                >
                  {value.text}
                </p>
              );
            })}
          </div>
          <div className="storeContent">{<Outlet />}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Store;
