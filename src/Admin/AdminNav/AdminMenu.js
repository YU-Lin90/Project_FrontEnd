import './Menu.css';
import { useNavigate } from 'react-router-dom';
function AdminMenu({ setToggle, toggle }) {
  const navi = useNavigate();
  const menuList = [
    { text: '管理優惠券', link: '/Admin/EditCoupon' },
    { text: '管理會員', link: '/Admin/EditMemberData' },
    { text: '管理店家', link: '/Admin/EditStoreData' },
    { text: '管理外送員', link: '/Admin/EditDeliverData' },
    { text: '客服系統', link: '/Admin/AdminService' },
    { text: '管理者首頁', link: '/Admin' },
    { text: '店家首頁', link: '/Store' },
    { text: '會員首頁', link: '/' },
    { text: '外送員首頁', link: '/Deliver' },
  ];
  return (
    <>
      <div className="adminMenu">
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
export default AdminMenu;
