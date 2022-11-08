import './Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
function Menu({ setToggle, toggle }) {
  const location = useLocation().pathname;

  const navi = useNavigate();
  const menuList = [
    { text: '找店家', link: '/Shopping' },
    { text: '店家內商品列表', link: '/StoreDetail' },
    { text: '結帳頁', link: '/Pay' },
    { text: '台北市', link: '/City/Taipei' },
    // { text: '附近美食', link: '/' },
    // { text: '找餐點', link: '/' },
    { text: '優惠券', link: '/Coupon' },
    { text: '會員中心', link: '/Member' },
    { text: '會員登入', link: '/MemberLogin' },
    { text: '會員註冊', link: '/MemberRegister' },
    { text: '測試購物車頁', link: '/CartTemp' },
    { text: '店家首頁', link: '/Store' },
    { text: '外送員首頁', link: '/Deliver' },
    { text: '管理者首頁', link: '/Admin' },
  ];
  return (
    <>
      <div className="menu">
        {menuList.map((value, index) => {
          return (
            <p
              key={index}
              onClick={() => {
                navi(value.link);
                setToggle(!toggle);
              }}
            >
              {value.text}
            </p>
          );
        })}
      </div>
    </>
    // onBlur={setToggle(!toggle)}
  );
}
export default Menu;
