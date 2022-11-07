import './Menu.css';
import { useNavigate } from 'react-router-dom';
function StoreMenu({ setToggle, toggle }) {
  const navi = useNavigate();
  const menuList = [
    { text: '店家首頁', link: '/Store' },
    { text: '會員首頁', link: '/' },
    { text: '外送員首頁', link: '/Deliver' },
    { text: '管理者首頁', link: '/Admin' },
  ];
  return (
    <>
      <div className="storeMenu">
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
export default StoreMenu;
