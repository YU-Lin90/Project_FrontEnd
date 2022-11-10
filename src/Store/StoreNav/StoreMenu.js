import './Menu.css';
import { useNavigate } from 'react-router-dom';
function StoreMenu({ setToggle, toggle }) {
  const navi = useNavigate();
  const menuList = [
    { text: '店家首頁(現在訂單)', link: '/Store' },
    { text: '店家登入', link: '/Store/StoreLogin' },
    { text: '店家資料', link: '/Store/StoreDatas' },
    { text: '店家商品管理', link: '/Store/StoreProductEdit' },
    { text: '店家分類管理', link: '/Store/StoreTypeEdit' },
    { text: '店家註冊', link: '/Store/StoreRegister' },
    { text: '店家歷史訂單', link: '/Store/StoreOldOrder' },
    { text: '店家銷售分析', link: '/Store/StoreSellAnalyze' },
    { text: '店家客服', link: '/Store/StoreService' },
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
  );
}
export default StoreMenu;
