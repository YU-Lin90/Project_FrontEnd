import { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthProvider';
import { usePay } from '../Context/PayPageContext';
import { useSVG } from '../Context/SVGProvider';
import NavAddress from './NavAddress';

import { useNavigate, Link } from 'react-router-dom';
import './NavBar.css';
import Menu from './Menu';
import ChooseCart from '../Shopping/ChooseCart';
import Cart from '../Shopping/Cart';
import MemberCenter from './MemberCenter';
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
//===============================================分隔線================================================
function MemberNav() {
  const { logoSVG } = useSVG();
  const navi = useNavigate();
  //目錄開合切換
  const [toggle, setToggle] = useState(false);

  const { authMember, setAuthMember } = useAuth();

  const {
    cartTotal,
    setCartTotal,
    sendAddress,
    setSendAddress,
    setCartContents,
  } = usePay();

  //登入的會員名
  const [memberName, setMemberName] = useState('');

  //選擇店家頁面
  const [showChooseShop, setShowChooseShop] = useState(false);

  //會員中心頁面
  const [openMemberCenter, setOpenMemberCenter] = useState(false);

  //購物車商品列表頁面(已經選擇店家)
  const [showCart, setShowCart] = useState(false);

  //連結
  const navList = [
    { text: '找店家', link: '/Shopping' },
    { text: '附近美食', link: '/' },
    { text: '優惠券', link: '/Coupon' },
  ];

  //購物車檢查
  function checkCartAmount() {
    let localCart = JSON.parse(localStorage.getItem('cart'));
    if (!localCart || !localCart.cartTotal) {
      return;
    }
    setCartTotal(localCart.cartTotal);
    setCartContents(localCart);
  }

  useEffect(() => {
    checkCartAmount();
    fetchLoginCheck(setAuthMember);
  }, []);

  useEffect(() => {
    getName(setMemberName);
  }, [authMember]);
  return (
    <>
      <nav className="memberNav">
        {/* 目錄按鈕(三橫線) */}
        <div className="disf ai-c jc-c pad5 gap10">
          <div
            onClick={() => {
              setToggle(!toggle);
            }}
            className="menubtn"
          >
            <div
              className={`menubtn_bar menubtn_bar_01 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_02 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
            <div
              className={`menubtn_bar menubtn_bar_03 ${
                toggle ? 'changed' : ''
              }`}
            ></div>
          </div>
          <div
            className="h40"
            onClick={() => {
              setToggle(false);
            }}
          >
            <Link to="/">{logoSVG('h100p navLogo')}</Link>
          </div>
          {/* 連結 */}
          <div className="navLinks">
            {navList.map((v, i) => {
              return (
                <p key={i}>
                  <Link to={v.link}>{v.text}</Link>
                </p>
              );
            })}
          </div>
        </div>

        {/* 名稱顯示 暫放 */}
        <NavAddress sendAddress={sendAddress} setSendAddress={setSendAddress} />
        {/* 購物車按鈕 */}
        <div className="navRight">
          {window.location.pathname === '/Pay' ? (
            <></>
          ) : (
            <div
              className="po-r pointer"
              onClick={() => {
                if (showCart) {
                  setShowCart(false);
                } else {
                  // (T/F) 切換 設定方式
                  setShowChooseShop((v) => !v);
                }
              }}
            >
              <p className="cartButton">
                <i className="fa-solid fa-cart-shopping"></i>
              </p>
              <p className="navCartTotal">{cartTotal}</p>
            </div>
          )}

          {/* 會員中心按鈕 */}
          <div
            className="cartButton navUser"
            onClick={() => {
              setOpenMemberCenter((v) => !v);
            }}
          >
            <i className="fa-solid fa-user"></i>
          </div>
          {/* 登入登出按鈕 */}
          <p
            className="logCheck flexSetCenter"
            onClick={
              authMember
                ? () => {
                    localStorage.removeItem('Member');
                    localStorage.removeItem('MemberName');
                    setMemberName('');
                    setAuthMember(!authMember);
                  }
                : () => {
                    navi('/MemberLogin ');
                    // setDisplayIndex(0);
                  }
            }
          >
            {authMember ? '登出' : '登入'}
          </p>
        </div>
      </nav>
      {/* 目錄切換 */}
      {toggle ? <Menu setToggle={setToggle} toggle={toggle} /> : <></>}
      {/* 選擇店家切換 */}
      {showChooseShop ? (
        <ChooseCart
          setShowCart={setShowCart}
          setShowChooseShop={setShowChooseShop}
        />
      ) : (
        <></>
      )}
      {/* 購物車切換 */}
      {showCart ? (
        <Cart setShowCart={setShowCart} setShowChooseShop={setShowChooseShop} />
      ) : (
        <></>
      )}
      {/* 會員中心切換 */}
      {openMemberCenter ? (
        <MemberCenter setOpenMemberCenter={setOpenMemberCenter} />
      ) : (
        <></>
      )}
    </>
  );
}
export default MemberNav;
