import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './MemberLayout.css';
import { useSVG } from '../Context/SVGProvider';
function MemberLayout() {
  const {
    memberDataSVG,
    orderNowSVG,
    oldOrderSVG,
    pointSVG,
    favorStoreSVG,
    couponSVG,
    serviceSVG,
  } = useSVG();
  const location = useLocation().pathname;
  const navi = useNavigate();
  const menuList = [
    { text: '會員資料', link: '/Member', index: 0, svg: memberDataSVG },
    {
      text: '現在訂單',
      link: '/Member/MemberOrder',
      index: 1,
      svg: orderNowSVG,
    },
    {
      text: '歷史訂單',
      link: '/Member/MemberOldOrder',
      index: 2,
      svg: oldOrderSVG,
    },
    {
      text: '紅利明細',
      link: '/Member/MemberPoint',
      index: 3,
      svg: pointSVG,
    },
    {
      text: '最愛店家',
      link: '/Member/FavoriteStore',
      index: 4,
      svg: favorStoreSVG,
    },
    {
      text: '優惠票券',
      link: '/Member/MemberCoupon',
      index: 5,
      svg: couponSVG,
    },
    {
      text: '客服中心',
      link: '/Member/MemberService',
      index: 6,
      svg: serviceSVG,
    },
  ];

  return (
    <>
      {/* 會員中心 外層 */}
      <div className="memberCenter">
        <div className="memberCenterList">
          {menuList.map((value, index) => {
            return (
              <div
                key={index}
                className="disf fd-c jc-sb pointer"
                onClick={() => {
                  navi(value.link);
                }}
              >
                <p className="bigHidden">
                  {value.svg(`${value.link === location ? 'fillMemberCenterColor' : 'fillMainColor'} w100p`)}
                </p>
                <p
                  className={`fontMainColor memberCenterButton  ${
                    value.link === location ? 'active' : ''
                  }`}
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
