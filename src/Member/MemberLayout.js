import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './MemberLayout.css';
function MemberLayout() {
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '會員資料', link: '/Member', index: 0, svg: '/memberData.svg' },
    {
      text: '現在訂單',
      link: '/Member/MemberOrder',
      index: 1,
      svg: '/order.svg',
    },
    {
      text: '歷史訂單',
      link: '/Member/MemberOldOrder',
      index: 2,
      svg: '/oldOrder.svg',
    },
    {
      text: '紅利明細',
      link: '/Member/MemberPoint',
      index: 3,
      svg: '/award.svg',
    },
    {
      text: '最愛店家',
      link: '/Member/FavoriteStore',
      index: 4,
      svg: '/shopFavor.svg',
    },
    {
      text: '優惠票券',
      link: '/Member/MemberCoupon',
      index: 5,
      svg: '/cup.svg',
    },
    {
      text: '客服中心',
      link: '/Member/MemberService',
      index: 6,
      svg: '/messages.svg',
    },
  ];

  return (
    <>
      {/* 會員中心 外層 */}
      <div className="memberCenter">
        <div className="memberCenterList">
          {menuList.map((value, index) => {
            return (
              <div key={index} className="disf fd-c jc-sb pointer">
                <p className="bigHidden">
                  <img src={value.svg} alt={value.text} />
                </p>
                <p
                  className={`fontMainColor memberCenterButton  ${
                    value.link === location ? 'active' : ''
                  }`}
                  onClick={() => {
                    navi(value.link);
                  }}
                >
                  {value.text}
                </p>
              </div>
            );
          })}
        </div>
        <div className="memberCenterContent">{<Outlet />}</div>
      </div>
    </>
  );
}
export default MemberLayout;
