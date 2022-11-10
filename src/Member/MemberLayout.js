import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import './MemberLayout.css';
function MemberLayout() {
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '基本資料', link: '/Member', index: 0 },
    { text: '訂單紀錄', link: '/Member/MemberOrder', index: 1 },
    { text: '優惠券', link: '/Member/MemberCoupon', index: 2 },
    { text: '紅利明細', link: '/Member/MemberPoint', index: 3 },
    { text: '最愛店家', link: '/Member/FavoriteStore', index: 4 },
    { text: '位置管理', link: '/Member/MemberLocation', index: 5 },
    { text: '客服中心', link: '/Member/MemberService', index: 6 },
  ];

  return (
    <>
      {/* 會員中心 外層 */}
      <div className="memberCenter">
        <div className="memberCenterList">
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
        <div className="memberCenterContent">{<Outlet />}</div>
      </div>
    </>
  );
}
export default MemberLayout;
