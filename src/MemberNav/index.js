import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import Menu from './Menu';
import ChooseCart from '../Shopping/ChooseCart';
import Cart from '../Shopping/Cart';
import { Link } from 'react-router-dom';
const siteName = window.location.hostname;
//確認登入資訊
function fetchLoginCheck(setfunc) {
  fetch(`http://${siteName}:3001/LoginCheck/Member`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Member'),
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
  const settedName = localStorage.getItem('MemberName');
  if (!!settedName) {
    setMemberName(settedName);
  }
}
function MemberNav() {
  const navi = useNavigate();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);

  const { authMember, setAuthMember } = useAuth();
  //登入的會員名
  const [memberName, setMemberName] = useState('');

  //TODO 之後購物車按鈕要獨立出去成為一個元件 不然這邊太擠
  //選擇店家頁面
  const [showChooseShop, setShowChooseShop] = useState(false);

  //購物車商品列表頁面(已經選擇店家)
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchLoginCheck(setAuthMember);
  }, []);

  useEffect(() => {
    getName(setMemberName);
  }, [authMember]);
  return (
    <>
      <nav className="memberNav">
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
          className="cartButton"
          onClick={() => {
            if (showCart) {
              setShowCart(false);
            } else {
              // (T/F) 切換 設定方式
              setShowChooseShop((v) => !v);
            }
          }}
        >
          購物車
        </p>
        <p
          className="logCheck"
          onClick={
            authMember
              ? () => {
                  localStorage.removeItem('Member');
                  localStorage.removeItem('MemberName');
                  setMemberName('');
                  setAuthMember(!authMember);
                }
              : () => {
                  navi('/Member/MemberLogin ');
                  // setDisplayIndex(0);
                }
          }
        >
          {authMember ? '登出' : '登入'}
        </p>
      </nav>
      {toggle ? <Menu setToggle={setToggle} toggle={toggle} /> : <></>}
      {showChooseShop ? (
        <ChooseCart
          setShowCart={setShowCart}
          setShowChooseShop={setShowChooseShop}
        />
      ) : (
        <></>
      )}
      {showCart ? (
        <Cart setShowCart={setShowCart} setShowChooseShop={setShowChooseShop} />
      ) : (
        <></>
      )}
    </>
  );
}
export default MemberNav;
